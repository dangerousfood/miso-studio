<template>
	<div class="pl-3">
		<div class="row">
			<div class="col-12 col-lg-9 col-xl-8">
				<div class="d-flex align-items-center mt-4">
					<svg-icon icon="liquid-luncher" height="70" width="70" />
					<h2 class="mb-0 pl-3 text-white font-weight-bold fs-10">
						Confirm Your Launch
					</h2>
				</div>
			</div>
			<div class="col-12 mt-5">
				<div class="row">
					<div class="col-md-6 col-sm-12">
						<div class="row">
							<div class="col-12">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-4">
										<div class="font-weight-bold fs-4 mb-2">YOUR TOKEN PAIR</div>
									</div>
								</div>
								<div class="fs-2">
									<span class="text-white font-weight-bold fs-4">
										{{ liquidity.token.symbol }}
									</span>
									({{ liquidity.token.address | truncate(6) }})
									<span class="text-white font-weight-bold fs-4">
										+ ({{ liquidity.token.name }}) ({{ liquidity.token.symbol }})
									</span>
								</div>
							</div>
							<div class="col-12 mt-5">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-4">
										<div class="font-weight-bold fs-4 mb-2">LIQUIDITY PROVISION</div>
									</div>
								</div>
								<div class="fs-2">
									<span class="text-white font-weight-bold fs-4">
										{{ liquidity.token.symbol }}
									</span>
									({{ liquidity.token.address | truncate(6) }})
									<span class="text-white font-weight-bold fs-4">
										+ ({{ liquidity.token.name }}) ({{ liquidity.token.symbol }})
										50%({{ liquidity.amount }}) / 50%
									</span>
								</div>
								<div class="text-white mt-3 fs-2 w-75">
									25% of amount raised from auction in
									{{ liquidity.auction.payment_currency }}, pairing with
									{{ liquidity.amount }} {{ liquidity.token.symbol }}, will be
									launched on SushiSwap as a 50/50 weighting liquidity pool.
								</div>
							</div>
							<div class="col-12 mt-5">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-3">
										<div class="font-weight-bold fs-4">LAUNCH SETTINGS</div>
									</div>
								</div>
								<div class="font-weight-bold fs-3">Liquidity Lockup</div>
								<div
									v-if="liquidity.customDays"
									class="font-weight-bold text-white fs-2 mt-1"
								>
									Liquidity is set to unlock {{ liquidity.customDays }} Days after the
									auction is finalized.
								</div>
								<div v-else class="font-weight-bold text-white fs-2 mt-1">
									Liquidity is set to unlock {{ liquidity.inputDays }} Days after the
									auction is finalized.
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-5 col-sm-12 offset-lg-1 mt-sm-5 mt-md-0">
						<div class="row">
							<div class="col-12">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-4">
										<div class="font-weight-bold fs-4 mb-2">CONNECTED ADDRESSES</div>
									</div>
								</div>
								<div class="row">
									<div class="col-12 mb-3">
										<div class="fs-4 font-weight-bold">Admin Address</div>
										<span class="font-weight-bold text-white mt-1 fs-2">
											{{ liquidity.token.address }}
										</span>
									</div>
									<div v-if="liquidity.auction" class="col-12 mb-3">
										<div class="fs-4 font-weight-bold">Auction Address</div>
										<span class="font-weight-bold text-white mt-1 fs-2">
											{{ liquidity.auctionAddress }}
										</span>
									</div>
									<div class="col-12">
										<div class="fs-4 font-weight-bold">Vault Address</div>
										<span class="font-weight-bold text-white mt-1 fs-2">
											{{ liquidity.vaultAddr }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="mt-5 pt-5">
					<base-divider />
					<div class="d-flex justify-content-between mt-4">
						<base-button
							tag="nuxt-link"
							to="/factory/liquidity"
							type="primary"
							style="border-radius: 1.85rem !important"
						>
							PREVIOUS
						</base-button>
						<base-button
							type="primary"
							style="border-radius: 1.85rem !important"
							@click="deployLiquid"
						>
							DEPLOY
						</base-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { sendTransactionAndWait } from '@/services/web3/base'
import { to18Decimals } from '@/util'
import { dai, usdc, tether } from '@/constants/contracts'
import { getContractInstance as misoMarketContract } from '@/services/web3/misoMarket'
import { BaseButton, BaseDivider } from '~/components'

export default {
	components: { BaseDivider, BaseButton },
	middleware: 'liquidity',
	data() {
		return {
			nextBtnLoading: false,
			deployedMarket: {
				address: '',
				txHash: '',
			},
		}
	},
	computed: {
		...mapGetters({
			liquidity: 'factory/liquidModel',
			coinbase: 'ethereum/coinbase',
			currentProvidersNetworkId: 'ethereum/currentProvidersNetworkId',
		}),
		getDays() {
			const diff =
				(new Date(this.liquidity.endTime) - new Date(this.liquidity.lunchDate)) /
				(1000 * 60 * 60 * 24)
			return diff
		},
		endDate() {
			return new Date(this.liquidity.lunchDate).toDateString()
		},
	},
	mounted() {
		this.breackpoint = this.$screen.breakpoint
		this.marketFactoryAddress = misoMarketContract().options.address
	},
	methods: {
		deployLiquid() {
			return new Promise((resolve) => {
				this.nextBtnLoading = true
				const launcherTemplateID = 1
				const model = this.liquidity
				let data
				switch (launcherTemplateID) {
					case 1:
						data = this.getData()
						break
					default:
						data = this.getData()
						break
				}
				console.log(data)
				const method = misoMarketContract().methods.createMarket(
					launcherTemplateID,
					model.token.address,
					to18Decimals(model.amount),
					dai.misoFeeAcct,
					data
				)

				sendTransactionAndWait(method, { from: this.coinbase }, (receipt) => {
					this.nextBtnLoading = false
					if (receipt) {
						this.deployedMarket.txHash = receipt.transactionHash
						this.deployedMarket.address = receipt.events.MarketCreated.returnValues[1]
					}
					resolve(receipt.status)
				})
			})
		},
		getData() {
			const model = this.liquidity
			console.log('model-----', model)
			const end =
				model.inputDays === null
					? this.liquidity.customDays
					: this.liquidity.inputDays
			console.log('end-----', end)

			const timestamp = new Date().getTime() + end * 1000 * 3600 * 24
			const startDate = new Date().getTime() / 1000
			const endDate = timestamp / 1000
			console.log('startDate-----', startDate)
			console.log('endDate-----', endDate)

			let paymentCurrencyAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
			const pointList = '0x0000000000000000000000000000000000000000'
			const operator = this.coinbase
			switch (model.auction.payment_currency) {
				case 'ETH':
					paymentCurrencyAddress = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
					break
				case 'USDC':
					paymentCurrencyAddress = usdc.address[this.currentProvidersNetworkId]
					break
				case 'TETHER':
					paymentCurrencyAddress = tether.address[this.currentProvidersNetworkId]
					break
				case 'DAI':
					paymentCurrencyAddress = tether.address[this.currentProvidersNetworkId]
					break
				default:
					paymentCurrencyAddress = model.auction.address
					break
			}

			const dataParams = [
				this.marketFactoryAddress,
				model.token.address,
				to18Decimals(model.amount),
				startDate,
				endDate,
				paymentCurrencyAddress,
				to18Decimals(model.amount),
				to18Decimals(model.amount),
				operator,
				pointList,
				model.wallet,
			]

			return web3.eth.abi.encodeParameters(
				[
					'address',
					'address',
					'uint256',
					'uint256',
					'uint256',
					'address',
					'uint256',
					'uint256',
					'address',
					'address',
					'address',
				],
				dataParams
			)
		},
	},
}
</script>

<style lang="scss" scoped></style>
