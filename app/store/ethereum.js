import { isRightNetwork } from "@/services/web3Provider"
import networkConfig from "../config/networkConfig"

export const state = () => ({
	loading: true,
	walletFound: false,
	initialized: false,
	isInjected: false,
	networkId: null,
	coinbase: null,
	rightNetworks: networkConfig.rightNetworks,
	defaultNetworkId: networkConfig.defaultNetwork,
	explorer: {
		root: null,
		address: null,
		tx: null,
	},
	gasPrice: 0,
})

export const mutations = {
	INIT_WEB3_INSTANCE: (state, payload) => {
		const web3Copy = state
		web3Copy.initialized = payload.initialized
		web3Copy.isInjected = payload.injectedWeb3
		web3Copy.walletFound = payload.walletFound
		web3Copy.coinbase = payload.coinbase
		if (payload.networkId) {
			web3Copy.networkId = parseInt(payload.networkId)
		}
		state = web3Copy
	},
	SET_COINBASE: (state, account) => {
		state.coinbase = account
	},
	SET_NETWORK: (state, networkId) => {
		state.networkId = parseInt(networkId)
	},
	SET_LOADING: (state, loading) => {
		state.loading = loading
	},
	SET_EXPLORER: (state, payload) => {
		state.explorer = payload
	},
}

export const actions = {
	injectWeb3({ commit, state }, payload) {
		if (!state.isInjected) {
			commit("INIT_WEB3_INSTANCE", payload)
			commit("SET_LOADING", false)

			if (isRightNetwork(state.networkId)) {
				commit("SET_EXPLORER", networkConfig[state.networkId].explorer)
			} else {
				commit("SET_EXPLORER", networkConfig[state.defaultNetworkId].explorer)
			}
		}
	},

	async enableAccount({ commit, state }) {
		if (state.isInjected) {
			if (!state.coinbase) {
				let account = null
				try {
					const accounts = await window.ethereum.enable()
					account = accounts[0]
				} catch (error) {
					console.log("error on connecting account", error)
				}
				commit("SET_COINBASE", account)
				return true
			} else {
				return false
			}
		}
	},

	setCoinbase({ commit }, payload) {
		commit("SET_COINBASE", payload)
	},

	setNetwork({ commit }, networkId) {
		commit("SET_NETWORK", networkId)
	},

	setExplorer({ commit }, payload) {
		commit("SET_EXPLORER", payload)
	},
}

export const getters = {
	isOk: (state) => {
		return !!(
			isRightNetwork(state.networkId) &&
			state.coinbase &&
			state.isInjected
		)
	},

	isRightNetwork: (state) => {
		return isRightNetwork(state.networkId)
	},

	isInjected: (state) => {
		return state.isInjected
	},

	initialized: (state) => {
		return state.initialized
	},

	rightNetwork: (state) => {
		return state.rightNetwork
	},

	networkId: (state) => {
		return state.networkId
	},

	defaultNetworkId: (state) => {
		return state.defaultNetworkId
	},

	currentProvidersNetworkId: (state) => {
		if (isRightNetwork(state.networkId)) {
			return state.networkId
		} else {
			return state.defaultNetworkId
		}
	},

	coinbase: (state) => {
		return state.coinbase
	},

	explorer: (state) => {
		return state.explorer
	},

	txUrl: (state) => {
		return state.explorer.root + state.explorer.tx
	},

	loading: (state) => {
		return state.loading
	},

	gasPrice: (state) => {
		return state.gasPrice
	},

	walletFound: (state) => {
		return state.walletFound
	},
}
