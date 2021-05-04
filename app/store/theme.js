export const state = () => ({
	theme: false,
})

export const mutations = {
	SET_THEME(state, value) {
		state.theme = value
	},
}

export const getters = {
	getMode(state) {
		return state.theme
	},
}
