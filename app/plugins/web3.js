import Web3 from "web3"
import {
	getAccount,
	getNetwork,
	getNetworkOldVersion,
	isRightNetwork,
} from "@/services/web3Provider"
import networkConfig from "../config/networkConfig"

const defaultNetwork = networkConfig.defaultNetwork
let localStore

export default async ({ store }) => {
	localStore = store

	const web3Data = {
		injectedWeb3: false,
		coinbase: null,
		initialized: false,
		networkId: false,
		walletFound: false,
	}

	// Modern dapp browser
	if (window.ethereum) {
		window.ethereum.autoRefreshOnNetworkChange = false
		web3Data.injectedWeb3 = true
		web3Data.walletFound = true
		web3Data.initialized = true

		web3Data.networkId = await getNetwork()
		if (window.ethereum.isMetaMask) {
			window.ethereum.on("chainChanged", handleChainChanged)
			window.ethereum.on("accountsChanged", handleAccountsChanged)
		}

		if (isRightNetwork(web3Data.networkId)) {
			window.web3 = new Web3(ethereum)
		} else {
			window.web3 = getHttpWeb3Provider()
		}
		web3Data.coinbase = window.ethereum.selectedAddress
	} else if (window.web3) {
		try {
			web3Data.injectedWeb3 = true
			web3Data.walletFound = true
			web3Data.initialized = true
			web3Data.networkId = await getNetworkOldVersion()
			const coinbase = await getAccount()
			web3Data.coinbase = coinbase
			accountInterval()
			if (isRightNetwork(web3Data.networkId)) {
				window.web3 = new Web3(web3.currentProvider)
			} else {
				window.web3 = getHttpWeb3Provider()
			}
		} catch (error) {
			console.log("error:", error)
		}
	} // Non-dapp browsers
	else {
		try {
			window.web3 = getHttpWeb3Provider()
			web3Data.initialized = true
		} catch (error) {
			console.log(error)
		}
	}
	window.web3socket = getWssWeb3Provider()
	store.dispatch("ethereum/injectWeb3", web3Data)
}

const handleChainChanged = (chainId) => {
	window.location.reload()
}

const handleAccountsChanged = (accounts) => {
	if (accounts.length !== 0) {
		if (accounts[0] !== localStore.state.coinbase) {
			localStore.dispatch("ethereum/setCoinbase", accounts[0])
		}
	} else {
		localStore.dispatch("ethereum/setCoinbase", null)
	}
}

const accountInterval = () =>
	setInterval(() => {
		web3.eth.getAccounts(async (err, accounts) => {
			const account = localStore.state.ethereum.coinbase
			if (!err) {
				if (accounts[0] !== account) {
					localStore.dispatch("ethereum/setCoinbase", accounts[0])
					let networkId = localStore.state.ethereum.networkId
					if (networkId === undefined) {
						networkId = await getNetworkOldVersion()
						localStore.dispatch("ethereum/setNetwork", networkId)
					}
				}
			}
		})
	}, 1000)

const getHttpWeb3Provider = () => {
	const httpProvider = networkConfig[defaultNetwork].httpProvider
	return new Web3(new Web3.providers.HttpProvider(httpProvider))
}

const getWssWeb3Provider = () => {
	const wssProvider = networkConfig[defaultNetwork].wssProvider
	return new Web3(new Web3.providers.WebsocketProvider(wssProvider))
}
