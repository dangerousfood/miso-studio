import abiDecoder from "abi-decoder"
import { misoMarket } from "@/config/contractConfig"
import {
	sendTransactionAndWait,
	getTransactionDetail,
	getEvents,
	getNetworkId,
	unix2datetime,
	makeBatchCall,
} from "./base"
import { getContractInstance as getTokenContract } from "./erc20Token"

const auctionFactoryAbi = misoMarket.abi
const auctionFactoryAddress = misoMarket.address
let contractInstance

abiDecoder.addABI(auctionFactoryAbi)

export const getContractInstance = () => {
	if (
		!contractInstance ||
		web3.currentProvider.isMetaMask !==
			contractInstance.currentProvider.isMetaMask
	) {
		const address = auctionFactoryAddress[getNetworkId()]
		contractInstance = new web3.eth.Contract(auctionFactoryAbi, address)
	}
}

export const deployDutchAuctionAndWait = async (
	token,
	tokenSupply,
	startDate,
	endDate,
	paymentCurrency,
	startPrice,
	minimumPrice,
	wallet,
	from,
	callback
) => {
	getContractInstance()
	const method = contractInstance.methods.deployDutchAuction(
		token,
		tokenSupply,
		startDate,
		endDate,
		paymentCurrency,
		startPrice,
		minimumPrice,
		wallet
	)
	const txHash = await sendTransactionAndWait(method, from, 0, callback)
	return txHash
}

export const getAuctions = async (fromBlock) => {
	getContractInstance()
	const auctions = []
	const events = await getEvents(
		contractInstance,
		"DutchAuctionDeployed",
		fromBlock
	)
	for (let i = 0; i < events.length; i++) {
		const auction = await getAuctionInputDataFromEvent(events[i])
		auctions.push(auction)
	}
	return auctions
}

const getAuctionInputDataFromEvent = async (event) => {
	const transactionDetail = await getTransactionDetail(event.transactionHash)
	const decodedData = abiDecoder.decodeMethod(transactionDetail.input)
	const token = decodedData.params[0].value
	const tokenSupply = decodedData.params[1].value
	const startDateInUnix = decodedData.params[2].value
	const endDateInUnix = decodedData.params[3].value
	const address = event.returnValues.addr
	const startDate = unix2datetime(startDateInUnix)
	const endDate = unix2datetime(endDateInUnix)
	const blockNumber = event.blockNumber
	const block = await web3.eth.getBlock(blockNumber)
	const createdAt = unix2datetime(block.timestamp)
	const now = Date.now()
	const tokenContractInstance = getTokenContract(token)
	const methods = [{ methodName: "name" }, { methodName: "symbol" }]
	const [tokenName, tokenSymbol] = await makeBatchCall(
		tokenContractInstance,
		methods
	)
	let status
	let statusType
	if (now < startDateInUnix * 1000) {
		status = "not started"
		statusType = "info"
	} else if (now > endDateInUnix * 1000) {
		status = "finished"
		statusType = "danger"
	} else {
		status = "in process"
		statusType = "success"
	}
	// const status = now < startDate ? "not started" : now > endDate ? "finished" : "in process";
	const auction = {
		address,
		token,
		tokenName,
		tokenSymbol,
		tokenSupply,
		startDate,
		endDate,
		createdAt,
		status,
		statusType,
		blockNumber,
	}
	return auction
}
