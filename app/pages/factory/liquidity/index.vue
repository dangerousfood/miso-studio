<template>
	<div class="row">
		<div class="col-12 col-lg-9 col-xl-8 order-1 order-lg-0">
			<div class="d-flex align-items-center mt-4">
				<svg-icon icon="liquid-luncher" height="70" width="70" />
				<h2 class="mb-0 pl-3 text-white font-weight-bold fs-10">
					Liquidity Launcher
				</h2>
			</div>
			<div class="row">
				<div class="col-12">
					<div>
						<client-only>
							<liquid-wizard
								:next-button-text="nextBtnText"
								:next-btn-loading="nextBtnLoading"
								@update:startIndex="onTabChanged"
							>
								<wizard-tab :before-change="() => validateStep('step-1')">
									<template slot="label">
										<span class="fs-4 font-weight-bold">1</span>
										<p>INITIAL SETUP</p>
									</template>
									<first-step
										ref="step-1"
										@active-input="firstStepInputs($event)"
										@on-validated="onStepValidated"
									/>
									<base-divider class="mt-4" />
								</wizard-tab>
								<wizard-tab :before-change="() => validateStep('step-2')">
									<template slot="label">
										<span class="fs-4 font-weight-bold">2</span>
										<p>LIQUIDITY OPTIONS</p>
									</template>
									<second-step
										ref="step-2"
										@active-input="secondStepInputs($event)"
										@on-validated="onStepValidated"
									/>
								</wizard-tab>
								<wizard-tab :before-change="() => validateStep('step-3')">
									<template slot="label">
										<span class="fs-4 font-weight-bold">3</span>
										<p>LAUNCH SETTINGS</p>
									</template>
									<third-step ref="step-3" @on-validated="onStepValidated" />
								</wizard-tab>
							</liquid-wizard>
						</client-only>
					</div>
				</div>
			</div>
		</div>

		<div
			class="col-12 col-lg-3 col-xl-4 bg-dark mb-sm-5 mb-md-0 darker-side order-0 position-relative"
		>
			<div class="d-flex align-items-center mt-5 mb-2 pl-3">
				<div class="text-white fs-7 text-capitalize font-weight-bold pr-3">
					{{ sidebarTitles[tabIndex] }}
				</div>
				<p
					class="bg-brown fs-3 py-1 px-3 mb-0 d-flex align-items-center radius-lg text-white font-weight-bold"
				>
					Step {{ tabIndex + 1 }} of 3
				</p>
			</div>
			<div class="pl-3">* indicates required step</div>
			<div v-if="tabIndex === 0">
				<template v-for="(item, index) in firstSteps">
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
			<div v-if="tabIndex === 1">
				<template v-for="(item, index) in SecondStep">
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
import Notificatoin from "@/components/Miso/Factory/Liquidity/sidebarNotification"
import { LiquidWizard, WizardTab, BaseDivider } from "@/components"
import FirstStep from "@/components/Miso/Factory/Liquidity/FirstStep"
import SecondStep from "@/components/Miso/Factory/Liquidity/SecondtStep"
import ThirdStep from "@/components/Miso/Factory/Liquidity/ThirdStep"
import { Vue } from "vue-property-decorator"
import { ZoomYTransition } from "vue2-transitions"
// import ThirdStep from "@/components/Miso/Factory/Liquidity/FirstStep"
export default {
	name: "LiquidityFactoory",
	components: {
		LiquidWizard,
		WizardTab,
		BaseDivider,
		Notificatoin,
		ZoomYTransition,
		FirstStep,
		SecondStep,
		ThirdStep,
	},
	data() {
		return {
			breackpoint: null,
			nextBtnLoading: false,
			tabIndex: 0,
			model: null,
			chosenAuctionType: 1,
			firstSteps: [
				{
					active: false,
					top: 24.5,
					title: "ADMIN ADDRESS*",
					desctiption:
						"Enter the wallet address used to create this token on MISO. This enables you to proceed with launching liquidity on SUSHI, and is needed for administrative actions like defining access/permission lists and setting token distribution percentages and lockup timelines.",
				},
				{
					active: false,
					top: 46.5,
					title: "AUCTION ADDRESS (optional)",
					desctiption:
						"Enter the address of the auction held for this token. This enables us to import data from the auction to facilitate the launching process. This is not required, if you did not have an auction, leave this field blank.",
				},
				{
					active: false,
					top: 64.5,
					title: "YOUR TOKEN ADDRESS",
					desctiption:
						"Search by token name or token symbol. Or, Enter the contract address of your MISO-created token.",
				},
			],
			SecondStep: [
				{
					active: false,
					top: 24.5,
					title: "LIQUIDITY PAIR TOKEN*",
					desctiption:
						"Select the asset that your custom token will be paired with when it’s liquidity pool is launched on SushiSwap.  Common pair tokens are ETH and stablecoins, but you can use any ERC-20 token.",
				},
				{
					active: false,
					top: 60,
					title: "SUSHI LIQUIDITY PROVISIONING*",
					desctiption:
						"Select the amount of your custom token and it’s pair token to be allocated for it’s upcoming liquidity pool on SushiSwap.",
				},
			],
			sidebarTitles: ["Initial Setup", "Liquidity Options", "Launch Settings"],
		}
	},
	computed: {
		stepTitle() {
			return ""
		},
		nextBtnText() {
			if (this.tabIndex === 2) return "Review"
			return "Next"
		},
	},
	watch: {
		"$screen.breakpoint"(val) {
			this.breackpoint = val
		},
		tabIndex() {
			this.firstSteps.forEach((el) => {
				el.active = false
			})
		},
	},
	mounted() {
		this.breackpoint = this.$screen.breakpoint
	},
	methods: {
		firstStepInputs(event) {
			let i = 0
			for (const key in event) {
				Vue.set(this.firstSteps[i], "active", event[key])
				i++
			}
		},
		secondStepInputs(event) {
			let i = 0
			for (const key in event) {
				Vue.set(this.SecondStep[i], "active", event[key])
				i++
			}
		},
		async validateStep(ref) {
			return await this.$refs[ref].validate()
		},
		onTabChanged(newValue) {
			this.tabIndex = newValue
		},
		onStepValidated(validated, model) {
			console.log(validated, model)
			if (this.model === null) {
				this.model = model
			} else {
				Object.assign(this.model, model)
			}
		},
	},
}
</script>

<style lang="scss" scoped></style>
