import { misoHelper } from "@/config/contractConfig"
import { getNetworkId } from "./base"

const misoHelperAbi = misoHelper.abi
const misoHelperAddress = misoHelper.address
let contractInstance

export const getContractInstance = () => {
	if (
		!contractInstance ||
		web3.currentProvider.isMetaMask !==
			contractInstance.currentProvider.isMetaMask
	) {
		const address = misoHelperAddress[getNetworkId()]
		contractInstance = new web3.eth.Contract(misoHelperAbi, address)
	}

	return contractInstance
}
