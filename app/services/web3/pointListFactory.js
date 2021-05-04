import { pointListFactory } from "@/config/contractConfig"
import { getNetworkId } from "./base"

const pointListFactoryAbi = pointListFactory.abi
const pointListFactoryAddress = pointListFactory.address
let contractInstance

export const getContractInstance = () => {
	if (
		!contractInstance ||
		web3.currentProvider.isMetaMask !==
			contractInstance.currentProvider.isMetaMask
	) {
		const address = pointListFactoryAddress[getNetworkId()]
		contractInstance = new web3.eth.Contract(pointListFactoryAbi, address)
	}

	return contractInstance
}

export const subscribeToPointListDeployedEvent = (fromBlock = 0) => {
	getContractInstance()
	return contractInstance.events.PointListDeployed({
		fromBlock,
	})
}
