import Web3 from 'web3'
import { EXPLORERS, RIGHT_NETWORKS, DEFAULT_NETWORK } from '@/constants/networks'
import walletProvider from '../services/walletProvider'

export const state = () => ({
	networkId: null,
	coinbase: null,
	metamask: false,
	defaultNetworkId: DEFAULT_NETWORK,
	explorer: {
		root: null,
		address: null,
		tx: null,
	},
	gasPrice: 0,
})

export const mutations = {
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
	SET_METAMASK: (state, payload) => {
		state.metamask = payload
	},
}

export const actions = {
	async enableAccount({ dispatch }) {
		const provider = await walletProvider.connectWallet()
		dispatch('setProvider', provider)
	},
	async disconnectAccount({ commit }) {
		await walletProvider.disconnectProvider()
		commit('SET_COINBASE', null)
	},
	async changeWallet({ dispatch }) {
		const provider = await walletProvider.changeWallet()
		dispatch('setProvider', provider)
	},
	setProvider({ commit, state, dispatch }, provider) {
		const data = {
			account: null,
			networkId: null,
		}

		if (provider) {
			if (provider.isMetaMask) {
				data.account = provider.selectedAddress
				data.networkId = provider.networkVersion
				commit('SET_METAMASK', true)
			} else {
				data.account = provider.accounts[0]
				data.networkId = provider.chainId
			}

			provider.on('accountsChanged', (accounts) => {
				if (state.coinbase) {
					commit('SET_COINBASE', accounts[0])
				}
			})

			provider.on('chainChanged', (chainId) => {
				dispatch('setNetwork', chainId)
			})

			commit('SET_COINBASE', data.account)
			dispatch('setNetwork', data.networkId)

			if (isRightNetwork(data.networkId)) {
				web3 = new Web3(provider)
			} else {
				const httpProvider = EXPLORERS[state.defaultNetworkId].httpProvider
				web3 = new Web3(new Web3.providers.HttpProvider(httpProvider))
			}
		}
	},

	setCoinbase({ commit }, payload) {
		commit('SET_COINBASE', payload)
	},

	setNetwork({ commit, state }, networkId) {
		commit('SET_NETWORK', networkId)
		if (isRightNetwork(networkId)) {
			commit('SET_EXPLORER', EXPLORERS[networkId].explorer)
		} else {
			commit('SET_EXPLORER', EXPLORERS[state.defaultNetworkId].explorer)
		}
	},

	setExplorer({ commit }, payload) {
		commit('SET_EXPLORER', payload)
	},
}

export const getters = {
	isOk: (state) => {
		return !!(isRightNetwork(state.networkId) && state.coinbase)
	},

	isRightNetwork: (state) => {
		return isRightNetwork(state.networkId)
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

	gasPrice: (state) => {
		return state.gasPrice
	},

	isMetamask: (state) => {
		return state.metamask
	},
}

const isRightNetwork = (netId) => {
	return RIGHT_NETWORKS.includes(parseInt(netId))
}
