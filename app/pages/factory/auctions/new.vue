<template>
	<div class="row">
		<div class="col-12 col-lg-10 col-xl-9 order-1 order-lg-0">
			<div class="hero-section mt-4 pt-3 pb-2 border-bottom-after position-relative">
				<span
					class="
						text-uppercase text-secondary
						font-weight-bold
						border-bottom
						pb-2
						fs-4
						h-100
					"
				>
					Auction form
				</span>
			</div>
			<div :class="{ 'px-5': breackpoint !== 'sm' }">
				<client-only>
					<simple-wizard
						:next-button-text="nextBtnText"
						:next-btn-loading="nextBtnLoading"
						@update:startIndex="onTabChanged"
					>
						<wizard-tab :before-change="() => validateStep('step1')">
							<template slot="label">
								<i class="tim-icons icon-minimal-right"></i>
								<p>Details</p>
							</template>

							<div class="row mb-5">
								<div class="col-12">
									<div class="font-weight-bold text-uppercase fs-2">
										Choose the auction type
									</div>
								</div>
								<div
									class="
										col-lg-10 col-12
										m-auto
										d-flex
										flex-sm-row flex-column
										justify-content-between
									"
								>
									<div v-for="option in auctionTypes" :key="option.id" class="mt-5">
										<div
											class="
												d-flex
												flex-column
												align-items-center
												justify-content-around
											"
										>
											<svg-icon
												:icon="option.icon"
												width="60"
												height="60"
												class="mr-3"
												:color="computedIconColor"
											/>
											<base-radio
												v-model="chosenAuctionType"
												:name="option.id"
												class="mb-3 text-capitalize"
											>
												{{ option.title }}
											</base-radio>
										</div>
									</div>
								</div>
							</div>
							<base-divider class="my-5" />
							<template v-if="chosenAuctionType === 1">
								<dutch-first-step
									ref="step1"
									@on-validated="onStepValidated"
								></dutch-first-step>
							</template>
							<template v-else-if="chosenAuctionType === 2">
								<crowdsale-first-step
									ref="step1"
									@on-validated="onStepValidated"
								></crowdsale-first-step>
							</template>
							<template v-else-if="chosenAuctionType === 3">
								<batch-first-step
									ref="step1"
									@on-validated="onStepValidated"
								></batch-first-step>
							</template>
						</wizard-tab>
						<wizard-tab :before-change="() => deployAuction()">
							<template slot="label">
								<i class="tim-icons icon-minimal-right"></i>
								<p>Deployment</p>
							</template>
							<template v-if="chosenAuctionType === 1">
								<dutch-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
								></dutch-second-step>
							</template>
							<template v-if="chosenAuctionType === 2">
								<crowdsale-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
								></crowdsale-second-step>
							</template>
							<template v-if="chosenAuctionType === 3">
								<batch-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
								></batch-second-step>
							</template>
						</wizard-tab>
						<wizard-tab :before-change="() => validateStep('step3')">
							<template slot="label">
								<i class="tim-icons icon-minimal-right"></i>
								<p>Result</p>
							</template>
							<third-step ref="step3" :market="deployedMarket"></third-step>
						</wizard-tab>
					</simple-wizard>
				</client-only>
			</div>
		</div>
		<div class="col-12 col-lg-2 col-xl-3 bg-dark mb-sm-5 mb-md-0 darker-side order-0">
			<div class="hero-section mt-4 pt-3 pb-2 border-bottom-after position-relative">
				<span
					class="
						text-uppercase text-secondary
						font-weight-bold
						border-bottom
						pb-2
						fs-4
						h-100
					"
				>
					Auction factory
				</span>
			</div>
			<div v-if="tabIndex > 1" class="d-flex flex-column my-4">
				<span class="font-weight-bold pb-1 fs-1">CONTRACT</span>
				<base-button
					:to="{ path: `/auctions/${deployedMarket.address}` }"
					tag="nuxt-link"
					:round="true"
					type="primary"
					pryma
					:disabled="tabIndex < 2"
					:class="tabIndex < 2 ? 'cursor-none' : ''"
				>
					View Auction
				</base-button>
			</div>
			<div class="d-flex flex-column my-4">
				<span class="font-weight-bold pb-1 fs-1">DETAILS</span>
				<span class="text-white fs-3">
					Create your own Auction at the Market Factory. For details on all current
					Market types, please visit our
					<a
						href="https://instantmiso.gitbook.io/miso/markets/markets"
						target="_blank"
					>
						Documentation
					</a>
				</span>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { BaseDivider, SimpleWizard, WizardTab } from '@/components'

import { theme } from '@/mixins/theme'
import { sendTransactionAndWait } from '@/services/web3/base'
import { to18Decimals } from '@/util'
import { dai } from '@/constants/contractConfig'
import { getContractInstance as misoMarketContract } from '@/services/web3/misoMarket'

import DutchFirstStep from '@/components/Miso/Auctions/Factories/DutchFactoryForm/DutchFirstStep'
import DutchSecondStep from '@/components/Miso/Auctions/Factories/DutchFactoryForm/DutchSecondStep.vue'

import CrowdsaleFirstStep from '@/components/Miso/Auctions/Factories/CrowdsaleFactoryForm/CrowdsaleFirstStep'
import CrowdsaleSecondStep from '@/components/Miso/Auctions/Factories/CrowdsaleFactoryForm/CrowdsaleSecondStep'

import BatchFirstStep from '@/components/Miso/Auctions/Factories/BatchFactoryForm/BatchFirstStep'
import BatchSecondStep from '@/components/Miso/Auctions/Factories/BatchFactoryForm/BatchSecondStep'

import ThirdStep from '~/components/Miso/Auctions/Factories/ThirdStep.vue'

export default {
	name: 'WizardForm',
	components: {
		BaseDivider,
		SimpleWizard,
		WizardTab,
		DutchFirstStep,
		DutchSecondStep,
		CrowdsaleFirstStep,
		CrowdsaleSecondStep,
		BatchFirstStep,
		BatchSecondStep,
		ThirdStep,
	},
	mixins: [theme],
	data() {
		return {
			model: null,
			marketFactoryAddress: null,
			tabIndex: 0,
			chosenAuctionType: 1,
			auctionTypes: [
				{
					title: 'Dutch Auction',
					id: 1,
					disabled: false,
					icon: 'dutch',
				},
				{
					title: 'Fixed Price Crowdsale',
					id: 2,
					disabled: false,
					icon: 'crowdsale',
				},
				{
					title: 'Batch Auction',
					id: 3,
					disabled: false,
					icon: 'batch',
				},
				/* {
					title: "Hyperbolic Auction",
					id: "4",
					disabled: true,
				}, */
			],
			nextBtnLoading: false,
			deployedMarket: {
				address: '',
				txHash: '',
			},
			breackpoint: null,
		}
	},
	computed: {
		...mapGetters({
			coinbase: 'ethereum/coinbase',
		}),
		nextBtnText() {
			if (this.tabIndex === 1) return 'Create'
			return 'Next'
		},
	},
	watch: {
		'$screen.breakpoint'(val) {
			this.breackpoint = val
		},
	},
	mounted() {
		this.breackpoint = this.$screen.breakpoint
		this.marketFactoryAddress = misoMarketContract().options.address
	},
	methods: {
		async validateStep(ref) {
			return await this.$refs[ref].validate()
		},
		onStepValidated(validated, model) {
			this.model = { ...this.model, ...model }
		},
		deployAuction() {
			return new Promise((resolve) => {
				this.nextBtnLoading = true
				const model = this.model
				let data
				switch (this.chosenAuctionType) {
					case 1:
						data = this.getDutchData()
						break
					case 2:
						data = this.getCrowdsaleData()
						break
					case 3:
						data = this.getBatchData()
						break
				}
				console.log('data:', data)
				const method = misoMarketContract().methods.createMarket(
					this.chosenAuctionType,
					model.token.address,
					to18Decimals(model.tokenSupply),
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
		getDutchData() {
			const model = this.model
			const startDate = new Date(model.startDate).getTime() / 1000
			const endDate = new Date(model.endDate).getTime() / 1000

			const pointList = '0x0000000000000000000000000000000000000000'
			const operator = this.coinbase
			const dataParams = [
				this.marketFactoryAddress,
				model.token.address,
				to18Decimals(model.tokenSupply),
				startDate,
				endDate,
				model.paymentCurrency.address,
				to18Decimals(model.startPrice),
				to18Decimals(model.minPrice),
				operator,
				pointList,
				model.fundWallet,
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
		getCrowdsaleData() {
			const model = this.model
			const startDate = new Date(model.startDate).getTime() / 1000
			const endDate = new Date(model.endDate).getTime() / 1000

			const pointList = '0x0000000000000000000000000000000000000000'
			const operator = this.coinbase
			const rate = to18Decimals(1 / this.model.tokenPrice)
			const dataParams = [
				this.marketFactoryAddress,
				model.token.address,
				model.paymentCurrency.address,
				to18Decimals(this.model.tokenSupply),
				startDate,
				endDate,
				rate,
				to18Decimals(model.goal),
				operator,
				pointList,
				model.fundWallet,
			]

			return web3.eth.abi.encodeParameters(
				[
					'address',
					'address',
					'address',
					'uint256',
					'uint256',
					'uint256',
					'uint256',
					'uint256',
					'address',
					'address',
					'address',
				],
				dataParams
			)
		},
		getBatchData() {
			const model = this.model
			const startDate = new Date(model.startDate).getTime() / 1000
			const endDate = new Date(model.endDate).getTime() / 1000

			const pointList = '0x0000000000000000000000000000000000000000'
			const operator = this.coinbase
			const dataParams = [
				this.marketFactoryAddress,
				model.token.address,
				to18Decimals(model.tokenSupply),
				startDate,
				endDate,
				model.paymentCurrency.address,
				to18Decimals(model.minimumCommitmentAmount),
				operator,
				pointList,
				model.fundWallet,
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
					'address',
					'address',
					'address',
				],
				dataParams
			)
		},
		onTabChanged(newValue) {
			this.tabIndex = newValue
		},
	},
}
</script>

<style scoped>
.card-wizard .disabled {
	display: block;
}
</style>
