// import { getCreatedTokens } from "@/services/web3/tokenFactory"
// import { getContractInstance } from "@/services/web3/erc20Token"
import { getContractInstance as getMisoHelperContract } from '@/services/web3/misoHelper'
import { makeBatchCall } from '@/services/web3/base'

const getDefaultState = () => ({
	tokens: [],
	lastBlockNumber: 0,
	loading: false,
})

export const state = () => getDefaultState()

export const mutations = {
	SET_TOKENS: (state, tokens) => {
		state.tokens = tokens
		state.lastBlockNumber = tokens[0].blockNumber
	},
	MERGE_TOKENS: (state, tokens) => {
		state.tokens = tokens.concat(state.tokens)
		state.lastBlockNumber = tokens[0].blockNumber
	},
	SET_LOADING: (state, loading) => {
		state.loading = loading
	},
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
}

export const actions = {
	async getTokens({ commit, state }) {
		commit('SET_LOADING', true)

		const methods = [{ methodName: 'getTokens' }]
		const tokens = await makeBatchCall(getMisoHelperContract(), methods)
		const filteredTokens = filterArrayToJson(tokens)
		console.log('filteredTokens:', filteredTokens)
		if (filteredTokens.length > 0) {
			const sortedTokens = sort(filteredTokens, 'createdAt', 'desc')
			if (state.lastBlockNumber !== 0) {
				commit('MERGE_TOKENS', sortedTokens)
			} else {
				commit('SET_TOKENS', sortedTokens)
			}
		}
		commit('SET_LOADING', false)
	},
	// async getTokens({ commit, state }) {
	// 	// TODO - wait for new version of contracts
	// 	commit("SET_LOADING", true)
	// 	const tokens = await getCreatedTokens(state.lastBlockNumber + 1)
	// 	if (tokens.length > 0) {
	// 		const sortedTokens = sort(tokens, "createdAt", "desc")
	// 		tokens.forEach(async (token) => {
	// 			const contract = getContractInstance(token.address)
	// 			const methods = [{ methodName: "name" }, { methodName: "symbol" }]
	// 			const [name, symbol] = await makeBatchCall(contract, methods)
	// 			token.name = name
	// 			token.symbol = symbol
	// 		})
	// 		if (state.lastBlockNumber !== 0) {
	// 			commit("MERGE_TOKENS", sortedTokens)
	// 		} else {
	// 			commit("SET_TOKENS", sortedTokens)
	// 		}
	// 	}
	// 	commit("SET_LOADING", false)
	// },
	// async setTokens({ commit, state }) {
	// 	commit("SET_LOADING", true)
	// 	const tokens = await getCreatedTokens(state.lastBlockNumber + 1)
	// 	if (tokens.length > 0) {
	// 		const sortedTokens = sort(tokens, "createdAt", "desc")
	// 		if (state.lastBlockNumber !== 0) {
	// 			commit("MERGE_TOKENS", sortedTokens)
	// 		} else {
	// 			commit("SET_TOKENS", sortedTokens)
	// 		}
	// 	}
	// 	commit("SET_LOADING", false)
	// },
}

export const getters = {
	list: (state) => {
		return state.tokens
	},
	size: (state) => {
		return state.tokens.length
	},
	loading: (state) => {
		return state.loading
	},
}

const sort = (arr, obj, orderBy) => {
	if (orderBy === 'desc') {
		return arr.sort((current, next) =>
			current[obj] < next[obj] ? 1 : current[obj] > next[obj] ? -1 : 0
		)
	} else {
		return arr.sort((current, next) =>
			current[obj] > next[obj] ? 1 : current[obj] < next[obj] ? -1 : 0
		)
	}
}

const filterArrayToJson = (array) => {
	const arrayJson = []
	for (let i = 0; i < array[0].length; i++) {
		const element = array[0][i]
		const json = { ...element }
		arrayJson.push(json)
	}
	return arrayJson
}
