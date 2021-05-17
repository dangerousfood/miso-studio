<template>
	<div class="row">
		<div class="col-12">
			<div class="mt-3 mb-2 fs-2">
				<span class="font-weight-bold fs-4 text-secondary white-txt border-bottom">
					Payment Currency*
				</span>
			</div>
		</div>
		<div class="col-md-12">
			<div
				class="
					border border-2
					d-flex
					justify-content-between
					align-items-baseline
					my-2
					px-3
					py-2
					cursor-pointer
				"
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
					<i
						v-if="paymentCurrency.symbol == 'ETH'"
						class="far fa-circle fa-white-circle text-white"
					></i>
					<i v-else class="far fa-circle text-transparent"></i>
					ETHEREUM
					<svg-icon icon="ethereum" height="24" width="20" />
				</span>
				<span :class="{ 'text-white': paymentCurrency.symbol === 'ETH' }">
					Most Common
				</span>
			</div>
		</div>
		<div class="col-md-12 d-flex">
			<div class="col-md-3 p-0">
				<div
					class="
						border border-2
						d-flex
						justify-content-between
						align-items-baseline
						my-2
						px-3
						py-2
						cursor-pointer
					"
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
						<i
							v-if="paymentCurrency.symbol == 'DAI'"
							class="far fa-circle fa-white-circle text-white"
						></i>
						<i v-else class="far fa-circle text-transparent"></i>
						DAI
					</span>
				</div>
			</div>
			<div class="col-md-3">
				<div
					class="
						border border-2
						d-flex
						justify-content-between
						align-items-baseline
						my-2
						px-3
						py-2
						cursor-pointer
					"
					:class="{ 'bg-primary': paymentCurrency.symbol === 'USDC' }"
					@click="onCurrencyChanged('USDC')"
				>
					<span
						:disabled="!tokensApproved"
						inline
						:class="{ 'text-white': paymentCurrency.symbol === 'USDC' }"
						name="USDC"
						class="m-0 p-0 font-weight-bold"
					>
						<i
							v-if="paymentCurrency.symbol == 'USDC'"
							class="far fa-circle fa-white-circle text-white"
						></i>
						<i v-else class="far fa-circle text-transparent"></i>
						USDC
					</span>
				</div>
			</div>
			<div class="col-md-3 p-0">
				<div
					class="
						border border-2
						d-flex
						justify-content-between
						align-items-baseline
						my-2
						px-3
						py-2
						cursor-pointer
					"
					:class="{ 'bg-primary': paymentCurrency.symbol === 'TETHER' }"
					@click="onCurrencyChanged('TETHER')"
				>
					<span
						:disabled="!tokensApproved"
						inline
						:class="{ 'text-white': paymentCurrency.symbol === 'TETHER' }"
						name="TETHER"
						class="m-0 p-0 font-weight-bold"
					>
						<i
							v-if="paymentCurrency.symbol == 'TETHER'"
							class="far fa-circle fa-white-circle text-white"
						></i>
						<i v-else class="far fa-circle text-transparent"></i>
						TETHER (USDT)
					</span>
				</div>
			</div>
			<div class="col-md-3 pr-0 d-flex align-items-center justify-content-center">
				<span :class="{ 'text-white': paymentCurrency.symbol === 'DAI' }">
					Stablecoins
				</span>
			</div>
		</div>
		<div class="col-md-12 d-flex align-items-center">
			<div class="col-md-3 p-0">
				<div
					class="
						border border-2
						d-flex
						justify-content-between
						align-items-baseline
						my-2
						px-3
						py-2
						cursor-pointer
					"
					:class="{ 'bg-primary': paymentCurrency.symbol === 'CUSTOM' }"
					@click="onCurrencyChanged('CUSTOM')"
				>
					<span
						:disabled="!tokensApproved"
						inline
						:class="{ 'text-white': paymentCurrency.symbol === 'CUSTOM' }"
						name="CUSTOM"
						class="m-0 p-0 font-weight-bold"
					>
						<i
							v-if="paymentCurrency.symbol == 'CUSTOM'"
							class="far fa-circle fa-white-circle text-white"
						></i>
						<i v-else class="far fa-circle text-transparent"></i>
						CUSTOM
					</span>
				</div>
			</div>
			<div class="col-md-9 p-0 pt-2">
				<base-input
					v-model="customToken"
					:disabled="loading"
					placeholder="Enter an ERC-20 token address"
					class="custom"
				>
					<template slot="success">
						<div v-if="success" class="valid-feedback" style="display: block">
							{{ paymentCurrency.name }} ({{ paymentCurrency.symbol }})
						</div>
					</template>
				</base-input>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { isErc20Token } from '@/services/web3/erc20Token'
import { dai } from '@/constants/contracts'

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
				address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE',
				name: 'Ethereum',
				symbol: 'ETH',
				decimals: 18,
			},
			customToken: '',
			loading: false,
			success: false,
			errorMessage: null,
		}
	},
	computed: {
		...mapGetters({
			currentProvidersNetworkId: 'ethereum/currentProvidersNetworkId',
		}),
	},
	watch: {
		customToken(newValue) {
			if (newValue !== '') {
				this.paymentCurrency.symbol = ''
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
					this.errorMessage = 'Address is not ERC20'
					this.success = false
				} else {
					this.paymentCurrency = erc20Info
					this.paymentCurrency.address = currency
					this.errorMessage = null
					this.success = true
				}
			} else {
				this.errorMessage = 'Invalid Address'
				this.success = false
			}

			if (!this.success) {
				this.resetPaymentCurrency()
			}
			this.loading = false
			this.$emit('currency-updated', this.paymentCurrency)
		},

		onCurrencyChanged(currency) {
			this.errorMessage = null
			this.success = false
			const paymentCurrency = this.paymentCurrency
			if (currency === 'ETH') {
				paymentCurrency.address = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
				paymentCurrency.name = 'Ethereum'
				paymentCurrency.symbol = 'ETH'
				paymentCurrency.decimals = 18
			} else if (currency === 'USDC') {
				paymentCurrency.address = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
				paymentCurrency.name = 'USDC'
				paymentCurrency.symbol = 'USDC'
				paymentCurrency.decimals = 18
			} else if (currency === 'TETHER') {
				paymentCurrency.address = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
				paymentCurrency.name = 'TETHER'
				paymentCurrency.symbol = 'TETHER'
				paymentCurrency.decimals = 18
			} else if (currency === 'DAI') {
				paymentCurrency.address = dai.address[this.currentProvidersNetworkId]
				paymentCurrency.name = 'Dai Stablecoin'
				paymentCurrency.symbol = 'DAI'
				paymentCurrency.decimals = 18
			} else {
				paymentCurrency.address = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
				paymentCurrency.name = 'CUSTOM'
				paymentCurrency.symbol = 'CUSTOM'
				paymentCurrency.decimals = 18
			}

			this.$emit('currency-updated', this.paymentCurrency)
			this.customToken = ''
		},

		resetPaymentCurrency() {
			this.paymentCurrency = {
				address: '',
				name: '',
				symbol: '',
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
.fa-white-circle {
	background-color: white;
	border-radius: 50px;
}
</style>
