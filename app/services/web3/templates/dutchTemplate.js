import { dutchAuction } from "@/config/contractConfig"
import {
	getNetworkId,
	makeBatchCall as _makeBatchCall,
	sendTransaction as _sendTransaction,
} from "../base"

const dutchTemplateAbi = dutchAuction.abi
const dutchTemplateAddress = dutchAuction.address
let contractInstance

const initContractInstance = () => {
	if (
		!contractInstance ||
		web3.currentProvider.isMetaMask !==
			contractInstance.currentProvider.isMetaMask
	) {
		const address = dutchTemplateAddress[getNetworkId()]
		contractInstance = new web3.eth.Contract(dutchTemplateAbi, address)
	}
}

export const sendTransaction = async (methodName, args, options) => {
	initContractInstance()
	const method = contractInstance.methods[methodName](...args)
	return await _sendTransaction(method, options)
}

export const makeBatchCall = async (methods) => {
	initContractInstance()
	return await _makeBatchCall(contractInstance, methods)
}

// export const getFarmCreated = async (fromBlock) => {
//   initContractInstance();
//   const events = await getEvents(contractInstance, "FarmCreated", fromBlock);
//   let farms = [];
//   for (let i = 0; i < events.length; i++) {
//     const token = await getFixedFarmDetailFromEvent(events[i]);
//     farms.push(token);
//   }
//   return farms;
// };

// export const subscribeToTokensPurchasedEvent = (fromBlock = 0, store) => {
//   initContractInstance();
//   return contractInstance.events.TokensPurchased({
//     fromBlock: fromBlock
//   });
// }
