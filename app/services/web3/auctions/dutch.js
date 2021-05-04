import abiDecoder from "abi-decoder"
import { dutchAuction } from "@/config/contractConfig"
// import { sendTransaction } from "./base"

const dutchAuctionAbi = dutchAuction.abi
let contractInstance
let addedCommitmentSubscription

abiDecoder.addABI(dutchAuctionAbi)

export const getContractInstance = (address) => {
	if (
		!contractInstance ||
		web3.currentProvider.isMetaMask !==
			contractInstance.currentProvider.isMetaMask
	) {
		contractInstance = new web3.eth.Contract(dutchAuctionAbi, address)
	} else if (
		contractInstance.options.address.toLowerCase() !== address.toLowerCase()
	) {
		contractInstance.options.address = address
	}

	return contractInstance
}

export const getCommitments = async (contractAddress, fromBlock) => {
	getContractInstance(contractAddress)
	const events = await contractInstance.getPastEvents("AddedCommitment", {
		fromBlock,
		toBlock: "latest",
	})
	const commitments = []
	for (const event of events) {
		const block = await web3.eth.getBlock(event.blockNumber)
		commitments.push({
			txHash: event.transactionHash,
			address: event.returnValues.addr,
			commitment: event.returnValues.commitment,
			price: event.returnValues.price,
			timestamp: block.timestamp * 1000,
			blockNumber: event.blockNumber,
		})
	}
	return commitments
}

export const subscribeToAddedCommitmentEvent = (
	contractAddress,
	fromBlock = 0,
	store
) => {
	getContractInstance(contractAddress)
	addedCommitmentSubscription = contractInstance.events
		.AddedCommitment({
			fromBlock,
		})
		.on("data", async (event) => {
			const block = await web3.eth.getBlock(event.blockNumber)
			const commitment = {
				txHash: event.transactionHash,
				address: event.returnValues.addr,
				commitment: event.returnValues.commitment,
				price: event.returnValues.price,
				timestamp: block.timestamp * 1000,
				blockNumber: event.blockNumber,
			}
			store.dispatch("commitments/addCommitment", commitment)

			// this.commitments.push(commitment);
			// this.commitments.sort((a, b) => a.timestamp - b.timestamp);
		})
		.on("error", (error) => {
			console.log("error on getting commitments:", error)
		})
}

export const unsubscribeAddedCommitmentEvent = () => {
	if (addedCommitmentSubscription) {
		addedCommitmentSubscription.unsubscribe()
	}
}

export const decodeData = (data) => {
	// const transactionDetail = await getTransactionDetail(event.transactionHash)
	return abiDecoder.decodeMethod(data)
}

export const tokenPrice = (marketInfo) => {
	return (marketInfo.commitmentsTotal * 1e18) / marketInfo.totalTokens
}

export const clearingPrice = (marketInfo) => {
	const tPrice = tokenPrice(marketInfo)
	const fPrice = priceFunction(marketInfo)
	if (tPrice > fPrice) {
		return tPrice
	}
	return fPrice
}

export const priceFunction = (marketInfo) => {
	if (marketInfo.currentTimestamp <= marketInfo.startTime) {
		return marketInfo.startPrice
	}
	if (marketInfo.currentTimestamp >= marketInfo.endTime) {
		return marketInfo.minimumPrice
	}
	return currentPrice(marketInfo)
}

const currentPrice = (marketInfo) => {
	const priceDiff =
		(marketInfo.currentTimestamp - marketInfo.startTime) * priceDrop(marketInfo)

	return marketInfo.startPrice - priceDiff
}

const priceDrop = (marketInfo) => {
	const numerator = marketInfo.startPrice - marketInfo.minimumPrice
	const denominator = marketInfo.endTime - marketInfo.startTime
	return parseInt(numerator / denominator)
}
