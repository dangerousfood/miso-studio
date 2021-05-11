<template>
	<div class="row">
		<div class="col-12 col-lg-9 col-xl-8 order-1 order-lg-0" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
			<div
				class="hero-section mt-4 border-bottom-after position-relative px-5"
			>
				<span
					class="text-uppercase text-secondary white-txt font-weight-bold pb-2 fs-10 h-100"
					v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2"
				>
					Create Auction
				</span>
				<span
					class="text-uppercase text-secondary white-txt font-weight-bold pb-2 fs-10 h-100"
					v-else
				>
					Confirm Your Auction Setup
				</span>
			</div>
			<div :class="{ 'px-5': breackpoint !== 'sm' }">
				<client-only>
					<simpleauction-wizard
						:next-button-text="nextBtnText"
						:next-btn-loading="nextBtnLoading"
						@update:startIndex="onTabChanged"
					>
						<wizard-tab>
							<template slot="label" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
								<span class="fs-5">1</span>
								<p>Auction Type</p>
							</template>

							<div class="row mb-5">
								<div class="col-12 bottom-45">
									<span class="font-weight-bold fs-4 text-secondary white-txt border-bottom">
										Auction Type*
									</span>
								</div>
								<auction-type-form
									:auctionTypes="auctionTypes"
									@active-focus="allStepInputs"
								></auction-type-form>
							</div>
							<base-divider class="my-5" />
						</wizard-tab>
						<wizard-tab :before-change="() => deployAuction('step1')">
							<template slot="label" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
								<span class="fs-5">2</span>
								<p>AUCTION SETUP</p>
							</template>
							<template v-if="chosenAuctionType === 1">
								<dutch-first-step
									ref="step1"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></dutch-first-step>
							</template>
							<template v-else-if="chosenAuctionType === 2">
								<crowdsale-first-step
									ref="step1"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></crowdsale-first-step>
							</template>
							<template v-else-if="chosenAuctionType === 3">
								<batch-first-step
									ref="step1"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></batch-first-step>
							</template>
						</wizard-tab>
						<wizard-tab :before-change="() => deployAuction('step2')">
							<template slot="label" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
								<span class="fs-5">3</span>
								<p>SALE SETTINGS </p>
							</template>
							<template v-if="chosenAuctionType === 1">
								<dutch-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></dutch-second-step>
							</template>
							<template v-if="chosenAuctionType === 2">
								<crowdsale-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></crowdsale-second-step>
							</template>
							<template v-if="chosenAuctionType === 3">
								<batch-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></batch-second-step>
							</template>
						</wizard-tab>
						<wizard-tab :before-change="() => validateStep('step3')">
							<dutch-third-step
								v-if="model"
								ref="step3"
								:model="model"
								@on-validated="onStepValidated"
							></dutch-third-step>
						</wizard-tab>
						<wizard-tab>
							<final-step
								v-if="model"
								:model="model"
								@on-validated="onStepValidated"
							></final-step>
						</wizard-tab>
					</simpleauction-wizard>
				</client-only>
			</div>
		</div>
		<div class="col-12 col-lg-9 col-xl-12 order-1 order-lg-0" v-else>
			<div
				class="hero-section mt-4 border-bottom-after position-relative px-5"
			>
				<span
					class="text-uppercase text-secondary white-txt font-weight-bold pb-2 fs-10 h-100"
					v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2"
				>
					Create Auction
				</span>
				<span
					class="text-uppercase text-secondary white-txt font-weight-bold pb-2 fs-10 h-100"
					v-else
				>
					Confirm Your Auction Setup
				</span>
			</div>
			<div :class="{ 'px-5': breackpoint !== 'sm' }">
				<client-only>
					<simpleauction-wizard
						:next-button-text="nextBtnText"
						:next-btn-loading="nextBtnLoading"
						@update:startIndex="onTabChanged"
					>
						<wizard-tab>
							<template slot="label" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
								<span class="fs-5">1</span>
								<p>Auction Type</p>
							</template>

							<div class="row mb-5">
								<div class="col-12 bottom-45">
									<span class="font-weight-bold fs-4 text-secondary white-txt border-bottom">
										Auction Type*
									</span>
								</div>
								<auction-type-form
									:auctionTypes="auctionTypes"
									@active-focus="allStepInputs"
								></auction-type-form>
							</div>
							<base-divider class="my-5" />
						</wizard-tab>
						<wizard-tab :before-change="() => deployAuction('step1')">
							<template slot="label" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
								<span class="fs-5">2</span>
								<p>AUCTION SETUP</p>
							</template>
							<template v-if="chosenAuctionType === 1">
								<dutch-first-step
									ref="step1"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></dutch-first-step>
							</template>
							<template v-else-if="chosenAuctionType === 2">
								<crowdsale-first-step
									ref="step1"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></crowdsale-first-step>
							</template>
							<template v-else-if="chosenAuctionType === 3">
								<batch-first-step
									ref="step1"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></batch-first-step>
							</template>
						</wizard-tab>
						<wizard-tab :before-change="() => deployAuction('step2')">
							<template slot="label" v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2">
								<span class="fs-5">3</span>
								<p>SALE SETTINGS </p>
							</template>
							<template v-if="chosenAuctionType === 1">
								<dutch-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></dutch-second-step>
							</template>
							<template v-if="chosenAuctionType === 2">
								<crowdsale-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></crowdsale-second-step>
							</template>
							<template v-if="chosenAuctionType === 3">
								<batch-second-step
									v-if="model"
									ref="step2"
									:model="model"
									@on-validated="onStepValidated"
									@active-focus="allStepInputs"
								></batch-second-step>
							</template>
						</wizard-tab>
						<wizard-tab :before-change="() => validateStep('step3')">
							<dutch-third-step
								v-if="model"
								ref="step3"
								:model="model"
								@on-validated="onStepValidated"
							></dutch-third-step>
						</wizard-tab>
						<wizard-tab>
							<final-step
								v-if="model"
								:model="model"
								@on-validated="onStepValidated"
							></final-step>
						</wizard-tab>
					</simpleauction-wizard>
				</client-only>
			</div>
		</div>
		<div
			class="col-12 col-lg-3 col-xl-4 bg-dark mb-sm-5 mb-md-0 darker-side order-0"
			 v-if="tabIndex === 1 || tabIndex === 0 || tabIndex === 2"
		>
			<div class="d-flex align-items-center mt-5 mb-2 pl-3">
				<div class="text-white fs-7 text-capitalize font-weight-bold pr-3">
					{{ sidebarTitles[tabIndex] }}
				</div>
				<p
					class="bg-brown fs-3 py-1 px-3 mb-0 d-flex align-items-center radius-lg text-white font-weight-bold"
				>	Step {{ tabIndex + 1 }} of 3
				</p>
				<!-- <span class="text-uppercase text-secondary font-weight-bold border-bottom pb-2 fs-4 h-100">
					Auction factory
				</span> -->
			</div>
			<!-- <div v-if="tabIndex > 1" class="d-flex flex-column my-4">
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
			</div> -->
			<div class="pl-3">* indicates required step</div>
			<div v-if="tabIndex === 0 || tabIndex === 1 || tabIndex === 2">
				<template v-for="(item, index) in allSteps">
					<zoom-y-transition :key="index" :duration="300">
						<notificatoin
							:active="item.active"
							:title="item.title"
							:description="item.desctiption"
							:top="item.top"
						/>
					</zoom-y-transition>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex"
import { BaseDivider, SimpleauctionWizard, WizardTab } from "@/components"

import { theme } from '@/mixins/theme'
import { sendTransactionAndWait } from '@/services/web3/base'
import { to18Decimals } from '@/util'
import { dai } from '@/constants/contractConfig'
import { getContractInstance as misoMarketContract } from '@/services/web3/misoMarket'

import DutchFirstStep from "@/components/Miso/Auctions/Factories/DutchFactoryForm/DutchFirstStep"
import DutchSecondStep from "@/components/Miso/Auctions/Factories/DutchFactoryForm/DutchSecondStep.vue"
import DutchThirdStep from "@/components/Miso/Auctions/Factories/DutchThirdStep.vue"

import CrowdsaleFirstStep from '@/components/Miso/Auctions/Factories/CrowdsaleFactoryForm/CrowdsaleFirstStep'
import CrowdsaleSecondStep from '@/components/Miso/Auctions/Factories/CrowdsaleFactoryForm/CrowdsaleSecondStep'

import BatchFirstStep from '@/components/Miso/Auctions/Factories/BatchFactoryForm/BatchFirstStep'
import BatchSecondStep from '@/components/Miso/Auctions/Factories/BatchFactoryForm/BatchSecondStep'

import AuctionTypeForm from "./AuctionTypeForm.vue"
import ThirdStep from "~/components/Miso/Auctions/Factories/ThirdStep.vue"
import FinalStep from "~/components/Miso/Auctions/Factories/FinalStep.vue"
import { Vue } from "vue-property-decorator"
import { ZoomYTransition } from "vue2-transitions"
import Notificatoin from "@/components/Miso/Factory/Liquidity/sidebarNotification"

export default {
	name: 'WizardForm',
	components: {
		BaseDivider,
		SimpleauctionWizard,
		WizardTab,
		DutchFirstStep,
		DutchSecondStep,
		DutchThirdStep,
		CrowdsaleFirstStep,
		CrowdsaleSecondStep,
		BatchFirstStep,
		BatchSecondStep,
		ThirdStep,
		FinalStep,
		AuctionTypeForm,
		Notificatoin,
		ZoomYTransition,
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
					icon: "dutch",
					content: "The price is set at a higher value per token than expected and descends over time.",
					description: "Great for finding the true market value of a completely novel item"
				},
				{
					title: "Crowdsale",
					id: 2,
					disabled: false,
					icon: "crowdsale",
					content: "A set amount of tokens are divided amongst all the contributors to the Market event, weighted according to their contribution to the pool.",
					description: "Great for projects looking to ensure that everyone taking part is rewarded"
				},
				{
					title: 'Batch Auction',
					id: 3,
					disabled: false,
					icon: "batch",
					content: "A fixed price and a fixed set of tokens.",
					description: "Great when the token price is already known or has been decided on previously"
				}
			],
			allSteps: [
				{
					active: false,
					top: 32,
					title: "SELECT AUCTION TYPE*",
					desctiption:
						"Choose which type of auction you’d like to hold.  Each of the three types has their own unique characteristics, so choose the one you think is most appropriate for your project.  Need more information on what these mean, and which is best for you? Read our documentation here.",
				},
				{
					active: false,
					top: 22,
					title: "AUCTION TOKEN*",
					desctiption:
						"Enter the token you’re looking to create an auction for.  Either search by name or symbol, or paste in the token’s contract address.",
				},
				{
					active: false,
					top: 38,
					title: "AUCTION TOKEN ALLOWANCE*",
					desctiption:
						"Enter the token you’re looking to create an auction for.  Either search by name or symbol, or paste in the token’s contract address. ",
				},
				{
					active: false,
					top: 57,
					title: "AUCTION TOKEN AMOUNT*",
					desctiption:
						"Enter the token you’re looking to create an auction for.  Either search by name or symbol, or paste in the token’s contract address. ",
				},
				{
					active: false,
					top: 22,
					title: "PAYMENT CURRENCY*",
					desctiption:
						"Select the currency you want to accept as payment during the auction.  ETH is the most common, but some also prefer to use stablecoins like DAI or USDC.  However, you can also accept any ERC-20 you like by providing it’s address in the custom field.",
				},
				{
					active: false,
					top: 35,
					title: "FUND WALLET*",
					desctiption:
						"Enter the wallet address where the funds raised from this auction will be deposited. Can be the admin address, or another one for you’ve designated for storing funds.",
				},
				{
					active: false,
					top: 57,
					title: "DUTCH AUCTION SETTINGS*",
					desctiption:
						"Set the start and end price for your Dutch Auction.  This will auto-calculate the maximum and minimum amounts you could raise with your selected price range. ",
				},
				{
					active: false,
					top: 76,
					title: "AUCTION START & END*",
					desctiption:
						"Select the dates for when your auction will be hold.  Most common duration is two weeks, but it can be whatever you like.",
				},
			],
			nextBtnLoading: false,
			deployedMarket: {
				address: '',
				txHash: '',
			},
			breackpoint: null,
			
			sidebarTitles: ["Auction Type", "Auction Setup", "Sale Settings"],
		}
	},
	computed: {
		...mapGetters({
			coinbase: 'ethereum/coinbase',
		}),
		nextBtnText() {
			if (this.tabIndex === 2) return "Review"
			else if (this.tabIndex === 3) return "DEPLOY"
			return "Next"
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
		async deployAuction(ref) {
			return await this.$refs[ref].validate()
		},
		onStepValidated(validated, model) {
			this.model = { ...this.model, ...model }
		},
		async validateStep(ref) {
			if ( !await this.$refs[ref].validate()) return false;

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
				const method = misoMarketContract().methods.createMarket(
					this.chosenAuctionType,
					model.token.address,
					to18Decimals(model.tokenSupply),
					dai.misoFeeAcct,
					data
				)

				sendTransactionAndWait(method, { from: this.coinbase }, (receipt) => {
					this.nextBtnLoading = false
					this.$router.push({path: "/auctions/upcoming"});
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
		allStepInputs(event, val) {			
			let i = 0
			for (const key in event) {
				Vue.set(this.allSteps[i], "active", event[key])
				i++
			}
			this.chosenAuctionType = val
		},
	},
}
</script>

<style scoped>
	.card-wizard .disabled {
		display: block;
	}
	.white-txt {
		color: #ffffff;
	}
	.wid_90 {
		width: 90%;
	}
	.bottom-45 {
		padding-bottom: 45px;
	}
</style>
