<template>
	<div>
		<validation-observer ref="observer">
			<div class="row">
				<div class="col-12">
					<div class="d-flex">
						<div class="d-inline border-bottom mb-4">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': colors.admin }"
							>
								ADMIN ADDRESS*
							</div>
						</div>
					</div>
					<base-input
						v-model="model.wallet"
						name="admin"
						rules="required|isAddress"
						placeholder="Enter the wallet address of the token creator/administrator"
						@focus="focuseColor('admin')"
					/>
					<p
						class="font-weight-bold border-bottom d-inline cursor-pointer"
						@click="selectCurrentAccount"
					>
						Use my account
					</p>
				</div>
				<div class="col-12">
					<div class="d-flex mt-4">
						<div class="d-inline border-bottom mb-4 mt-5">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': colors.auction }"
							>
								AUCTION ADDRESS
							</div>
						</div>
					</div>
					<base-input
						v-model="model.auction"
						name="auction"
						rules="isAddress"
						placeholder="Enter the address of the auction you held for your token. (Optional)"
						@focus="focuseColor('auction')"
					/>
				</div>
				<div class="col-12">
					<div class="d-flex mt-4">
						<div class="d-inline border-bottom mb-4 mt-5">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': colors.token }"
							>
								YOUR TOKEN*
							</div>
						</div>
					</div>
					<div @click="focuseColor('token')">
						<autocomplete
							v-model="model.token.address"
							label=""
							name="token"
							placeholder="Type to search (name, symbol, address)"
							rules="required|isAddress"
							:suggestions="tokens"
							:loading="tokensLoading"
							:no-data="'No Tokens'"
							tabindex="“-1”"
							@input="fetchTokens"
							@complete="handleTokenComplete"
						></autocomplete>
					</div>
					<p class="d-inline">
						Don’t have a token?
						<nuxt-link
							to="/factory/token"
							tag="span"
							class="font-weight-bold cursor-pointer border-bottom"
						>
							Create it now!
						</nuxt-link>
					</p>
				</div>
			</div>
		</validation-observer>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { BaseInput } from "@/components"
import Autocomplete from "@/components/Inputs/Autocomplete"

export default {
	name: "LiqudityStepOne",
	components: {
		BaseInput,
		Autocomplete,
	},
	props: ["data"],
	data() {
		return {
			model: {
				wallet: "",
				token: {
					address: "",
					name: "",
					symbol: "",
				},
			},
			colors: {
				admin: false,
				auction: false,
				token: false,
			},
			tokensLoading: false,
		}
	},
	computed: {
		...mapGetters({ coinbase: "ethereum/coinbase", tokens: "tokens/list" }),
	},
	created() {
		if (this.data) {
			Object.assign(this.model, this.data)
		}
	},
	methods: {
		...mapActions({
			getTokens: "tokens/getTokens",
		}),
		focuseColor(val) {
			for (const key in this.colors) {
				if (val === key) {
					this.colors[key] = true
				} else {
					this.colors[key] = false
				}
			}
			this.$emit("active-input", this.colors)
		},
		validate() {
			return this.$refs.observer.validate().then((res) => {
				this.$emit("on-validated", res, this.model)
				return res
			})
		},
		selectCurrentAccount() {
			this.focuseColor("admin")
			this.model.wallet = this.coinbase
		},
		async fetchTokens() {
			// Clear Tokens
			this.model.token.name = ""
			this.model.token.symbol = ""
			this.model.token.decimals = ""

			// Get Tokens
			if (!this.tokensLoading) {
				this.tokensLoading = true
				if (this.tokens.length === 0) {
					await this.getTokens()
				}
				this.tokensLoading = false
			}
		},
		handleTokenComplete(token) {
			this.model.token = {
				address: token.addr,
				name: token.name,
				symbol: token.symbol,
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
