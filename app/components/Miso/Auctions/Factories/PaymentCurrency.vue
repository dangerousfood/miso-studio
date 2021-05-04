<template>
	<div class="row">
		<div class="col-12">
			<div class="mt-3 mb-2 fs-2">
				<span class="font-weight-bold">PAYMENT CURRENCY</span>
				- The currency people will pay during the auction
			</div>
		</div>
		<div class="col-md-6">
			<div
				class="border border-2 d-flex justify-content-between align-items-baseline my-2 px-3 py-2 cursor-pointer"
				:class="{ 'bg-primary': paymentCurrency.symbol === 'ETH' }"
				@click="onCurrencyChanged('ETH')"
			>
				<span
					:disabled="!tokensApproved"
					inline
					name="ETH"
					class="m-0 p-0 font-weight-bold"
					:class="{ 'text-white': paymentCurrency.symbol === 'ETH' }"
				>
					ETH
				</span>
				<span :class="{ 'text-white': paymentCurrency.symbol === 'ETH' }">
					Most Common
				</span>
			</div>
		</div>
		<div class="col-md-6">
			<div
				class="border border-2 d-flex justify-content-between align-items-baseline my-2 px-3 py-2 cursor-pointer"
				:class="{ 'bg-primary': paymentCurrency.symbol === 'DAI' }"
				@click="onCurrencyChanged('DAI')"
			>
				<span
					:disabled="!tokensApproved"
					inline
					:class="{ 'text-white': paymentCurrency.symbol === 'DAI' }"
					name="DAI"
					class="m-0 p-0 font-weight-bold"
				>
					DAI
				</span>
				<span :class="{ 'text-white': paymentCurrency.symbol === 'DAI' }">
					Stable Coin
				</span>
			</div>
		</div>
		<div class="col-12 mt-2">
			<div class="is-relative">
				<base-input
					v-model="customToken"
					:disabled="loading"
					placehoder="custom"
					class="custom"
				>
					<template slot="error">
						<div
							v-if="errorMessage"
							class="invalid-feedback"
							style="display: block"
						>
							{{ errorMessage }}
						</div>
					</template>
					<template slot="success">
						<div v-if="success" class="valid-feedback" style="display: block">
							{{ paymentCurrency.name }} ({{ paymentCurrency.symbol }})
						</div>
					</template>
				</base-input>
				<span class="text-capitalize position-absolute custom-token">
					Payment Token Address (ERC20)
				</span>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { isErc20Token } from "@/services/web3/erc20Token"
import { dai } from "@/config/contractConfig"

export default {
	props: {
		tokensApproved: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			paymentCurrency: {
				address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
				name: "Ethereum",
				symbol: "ETH",
				decimals: 18,
			},
			customToken: "",
			loading: false,
			success: false,
			errorMessage: null,
		}
	},
	computed: {
		...mapGetters({
			currentProvidersNetworkId: "ethereum/currentProvidersNetworkId",
		}),
	},
	watch: {
		customToken(newValue) {
			if (newValue !== "") {
				this.paymentCurrency.symbol = ""
				this.updateCustomCurrency(newValue)
			}
		},
	},
	methods: {
		async updateCustomCurrency(currency) {
			this.loading = true
			this.customToken = currency
			const isValidAddress = web3.utils.isAddress(currency)
			if (isValidAddress) {
				const erc20Info = await isErc20Token(currency)
				if (!erc20Info) {
					this.errorMessage = "Address is not ERC20"
					this.success = false
				} else {
					this.paymentCurrency = erc20Info
					this.paymentCurrency.address = currency
					this.errorMessage = null
					this.success = true
				}
			} else {
				this.errorMessage = "Invalid Address"
				this.success = false
			}

			if (!this.success) {
				this.resetPaymentCurrency()
			}
			this.loading = false
			this.$emit("currency-updated", this.paymentCurrency)
		},

		onCurrencyChanged(currency) {
			this.errorMessage = null
			this.success = false
			const paymentCurrency = this.paymentCurrency
			if (currency === "ETH") {
				paymentCurrency.address = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE"
				paymentCurrency.name = "Ethereum"
				paymentCurrency.symbol = "ETH"
				paymentCurrency.decimals = 18
			} else {
				paymentCurrency.address = dai.address[this.currentProvidersNetworkId]
				paymentCurrency.name = "Dai Stablecoin"
				paymentCurrency.symbol = "DAI"
				paymentCurrency.decimals = 18
			}

			this.$emit("currency-updated", this.paymentCurrency)
			this.customToken = ""
		},

		resetPaymentCurrency() {
			this.paymentCurrency = {
				address: "",
				name: "",
				symbol: "",
				decimals: 0,
			}
		},
	},
}
</script>

<style lang="scss">
.custom {
	input {
		padding-right: 80px !important;
		border: 0.0625rem solid #23306b !important;
		background: #000a35 !important;
	}
	&-token {
		top: 35%;
		transform: translateY(-35%);
		right: 30px;
	}
}
</style>
