import Web3 from "web3"
import networkConfig from "../constants/networkConfig"

const defaultNetwork = networkConfig.defaultNetwork

export default ({ store }) => {
	if (window.ethereum) {
		window.ethereum.autoRefreshOnNetworkChange = false
		store.dispatch("ethereum/setProvider", ethereum)
	} else {
		window.web3 = getHttpWeb3Provider()
	}
	window.web3socket = getWssWeb3Provider()
}

const getHttpWeb3Provider = () => {
	const httpProvider = networkConfig[defaultNetwork].httpProvider
	return new Web3(new Web3.providers.HttpProvider(httpProvider))
}

const getWssWeb3Provider = () => {
	const wssProvider = networkConfig[defaultNetwork].wssProvider
	return new Web3(new Web3.providers.WebsocketProvider(wssProvider))
}
