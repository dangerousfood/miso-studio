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
						class="
							font-weight-bold
							border-bottom
							d-inline
							cursor-pointer
							use_my_account
						"
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
								AUCTION ADDRESS*
							</div>
						</div>
					</div>
					<base-input
						v-model="auctionAddress"
						name="auction"
						rules="required|isAddress"
						placeholder="Enter the address of the auction you held for your token. (Optional)"
						@focus="focuseColor('auction')"
					/>
				</div>
				<div class="col-12 ma-30">
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
					<div
						class="justify-content-between row align-items-center"
						@click="focuseColor('token')"
					>
						<div class="d-flex col-lg-12">
							<autocomplete
								v-model="model.token.address"
								label=""
								name="token"
								placeholder="Enter the contract address of your MISO-created token."
								rules="required|isAddress"
								:suggestions="tokens"
								:loading="tokensLoading"
								:no-data="'No Tokens'"
								tabindex="“-1”"
								:style="{ flex: 1 }"
								@input="fetchTokens"
								@complete="handleTokenComplete"
							></autocomplete>

							<div class="text-right ml-4">
								<base-button
									class="text-capitalize btn btn-customs disabled btn-default m-0"
								>
									<span v-if="model.token.name">
										{{ model.token.name }} ({{ model.token.symbol }})
									</span>
									<span v-else>SYMBOL</span>
								</base-button>
							</div>
						</div>
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
import { mapGetters, mapActions } from 'vuex'
import { BaseInput } from '@/components'
import Autocomplete from '@/components/Inputs/Autocomplete'
import { getContractInstance as dutchAuctionContract } from '@/services/web3/auctions/dutch'
import { getContractInstance as crowdsaleContract } from '@/services/web3/auctions/crowdsale'
import { getContractInstance as batchAuctionContract } from '@/services/web3/auctions/batch'
import { makeBatchCall } from '@/services/web3/base'
import { getContractInstance as misoHelperContract } from '@/services/web3/misoHelper'

export default {
	name: 'LiqudityStepOne',
	components: {
		BaseInput,
		Autocomplete,
	},
	props: {
		data: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			colors: {
				admin: false,
				auction: false,
				token: false,
			},
			auctionAddress: '',
			tokensLoading: false,
			marketInfo: {
				startTime: 0,
				endTime: 0,
				currentPrice: 0,
				totalTokensCommitted: 0,
				paymentCurrency: {
					addr: null,
					name: '',
					symbol: '',
					decimals: 0,
				},
				hasPointList: false,
				totalTokens: 0,
				commitmentsTotal: 0,
				finalized: 0,
			},
		}
	},
	computed: {
		model() {
			return this.data
		},
		...mapGetters({ coinbase: 'ethereum/coinbase', tokens: 'tokens/list' }),
	},
	watch: {
		async auctionAddress(val) {
			if (val) {
				await this.getTemplateId(val)
				// let finishAuction
				console.log(this.marketTemplateId)
				switch (parseInt(this.marketTemplateId)) {
					case 1:
						this.contractInstance = crowdsaleContract(val)
						await this.setCrowdsaleData(val)
						break
					case 2:
						this.contractInstance = dutchAuctionContract(val)
						await this.setDutchAuctionData(val)
						break
					case 3:
						this.contractInstance = batchAuctionContract(val)
						await this.setBatchData(val)
						break
					case 4:
						break
					default:
						break
				}
				this.model.auction.address = this.marketInfo.paymentCurrency.addr
				this.model.auction.payment_currency = this.marketInfo.paymentCurrency.symbol
			}
		},
	},
	created() {
		if (this.data) {
			Object.assign(this.model, this.data)
		}
	},
	methods: {
		async getTemplateId(val) {
			const methods = [{ methodName: 'marketTemplate' }]
			const [marketTemplate] = await makeBatchCall(
				dutchAuctionContract(val.toLowerCase()),
				methods
			)
			this.marketTemplateId = marketTemplate
		},
		async setDutchAuctionData(val) {
			const methods = [{ methodName: 'getDutchAuctionInfo', args: [val] }]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			console.log(data)
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo
		},

		async setCrowdsaleData(val) {
			const methods = [{ methodName: 'getCrowdsaleInfo', args: [val] }]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			console.log(data)
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo
		},

		async setBatchData(val) {
			const methods = [{ methodName: 'getBatchAuctionInfo', args: [val] }]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			console.log(data)
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo
		},
		...mapActions({
			getTokens: 'tokens/getTokens',
		}),
		focuseColor(val) {
			for (const key in this.colors) {
				if (val === key) {
					this.colors[key] = true
				} else {
					this.colors[key] = false
				}
			}
			this.$emit('active-input', this.colors)
		},
		validate() {
			return this.$refs.observer.validate().then((res) => {
				this.$emit('on-validated', res, this.model)
				return res
			})
		},
		selectCurrentAccount() {
			this.focuseColor('admin')
			this.model.wallet = this.coinbase
		},
		async fetchTokens() {
			// Clear Tokens
			this.model.token.name = ''
			this.model.token.symbol = ''
			this.model.token.decimals = ''

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

<style lang="scss">
.use_my_account:hover {
	color: #f66645;
}
.btn-customs {
	border-radius: unset;
	height: 38px;
}
.dropdown-menu.show {
	min-width: calc(100%);
}
</style>
