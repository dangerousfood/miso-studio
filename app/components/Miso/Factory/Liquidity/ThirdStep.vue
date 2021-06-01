<template>
	<div>
		<validation-observer ref="observer">
			<div class="row">
				<div class="col-12">
					<div class="d-flex">
						<div class="d-inline border-bottom mb-4">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': activeSection.one }"
							>
								VAULT ADDRESS*
							</div>
						</div>
					</div>
					<div class="d-flex flex-column">
						<base-input
							v-model="model.vaultAddr"
							class="position-relative vault"
							placeholder="Enter the wallet address where your SLP tokens and extra base pair tokens will go"
							rules="required|isAddress"
							name="vault"
							@focus="setActiveSection('one')"
						>
							<template #svgIcon>
								<svg-icon
									class="position-absolute svg-icon"
									icon="ethereum"
									height="20"
									width="20"
								/>
							</template>
						</base-input>
					</div>
					<p
						class="font-weight-bold border-bottom d-inline cursor-pointer"
						@click="selectCurrentAccount"
					>
						Use my account
					</p>
				</div>
				<div class="col-12">
					<div class="d-flex mt-5">
						<div class="d-inline border-bottom mb-4">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': activeSection.two }"
							>
								LAUNCH DATE*
							</div>
						</div>
					</div>
					<div class="row">
						<div
							class="col-md-7 col-xs-12 col-sm-12"
							@click="setActiveSection('two')"
						>
							<base-input rules="required|afterNow">
								<el-date-picker
									v-model="model.lunchDate"
									type="datetime"
									placeholder="Select date and time"
								></el-date-picker>
							</base-input>
						</div>
					</div>
				</div>

				<div class="col-12">
					<div class="d-flex mt-5">
						<div class="d-inline border-bottom mb-4">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': activeSection.three }"
							>
								LIQUIDITY LOCKUP TIMELINE*
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-xs-12 col-sm-12 col-md-7">
							<div class="row">
								<div class="col-6">
									<div class="border-miso radio_wrapper">
										<div
											class="d-flex h-100 fs-3 mr-3 pl-3 align-items-center"
											@click="setActiveSection('three')"
										>
											<base-radio
												v-model="type"
												:name="180"
												class="text-white font-weight-bold fs-4 mr-3 mb-2"
											>
												180 DAYS
											</base-radio>
										</div>
									</div>
								</div>
								<div class="col-6">
									<div class="border-miso radio_wrapper">
										<div
											class="d-flex h-100 fs-3 mr-3 pl-3 align-items-center"
											@click="setActiveSection('three')"
										>
											<base-radio
												v-model="type"
												:name="90"
												class="text-white font-weight-bold fs-4 mr-3 mb-2"
											>
												90 DAYS
											</base-radio>
										</div>
									</div>
								</div>
								<div class="col-6 mt-3 pr-0 custom-radio">
									<div class="border-miso radio_wrapper">
										<div
											class="d-flex h-100 fs-3 mr-3 pl-3 align-items-center"
											@click="setActiveSection('three')"
										>
											<base-radio
												v-model="type"
												name="custom"
												class="
													text-white text-uppercase
													font-weight-bold
													fs-4
													mr-3
													mb-2
												"
											>
												custom
											</base-radio>
										</div>
									</div>
								</div>
								<div class="col-6 mt-3 px-0 custom-col">
									<base-input
										v-model="inputDays"
										:disabled="type !== 'custom'"
										:rules="rule"
										name="Timeline"
										class="position-relative wrapper-custom w-60"
									></base-input>
								</div>
							</div>
						</div>
						<div class="col-xs-12 col-sm-12 col-md-6"></div>
					</div>
				</div>
			</div>
		</validation-observer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DatePicker, TimeSelect } from 'element-ui'
import { BaseInput, BaseRadio } from '@/components'

export default {
	components: {
		BaseInput,
		BaseRadio,
		[DatePicker.name]: DatePicker,
		[TimeSelect.name]: TimeSelect,
	},
	props: {
		data: {
			type: Object,
			default: null,
		},
	},
	data() {
		return {
			type: 180,
			rule: '',
			customDays: '',
			inputDays: null,
			activeSection: {
				one: false,
				two: false,
				three: false,
			},
		}
	},
	computed: {
		model() {
			return this.data
		},
		...mapGetters({ coinbase: 'ethereum/coinbase' }),
	},
	watch: {
		type(val) {
			if (val !== 'custom') {
				this.customDays = val
				this.inputDays = null
				this.rule = ''
			} else {
				this.customDays = null
				this.rule = 'isNumber|required'
			}
		},
		inputDays(val) {
			this.customDays = parseInt(val)
		},
		'model.lunchDate'(val) {
			if (this.customDays) {
				const result = new Date(val)
				result.setDate(val.getDate() + this.customDays)
				this.model.endTime = result
			}
		},
		customDays(val) {
			if (this.model.lunchDate) {
				const result = new Date(this.model.lunchDate)
				const days = parseInt(val)
				if (days > 0) {
					result.setDate(this.model.lunchDate.getDate() + days)
					this.model.endTime = result
				}
			}
		},
	},
	created() {
		if (this.data) {
			Object.assign(this.model, this.data)
			const diff =
				(new Date(this.model.endTime) - new Date(this.model.lunchDate)) /
				(1000 * 60 * 60 * 24)

			if (diff !== 180 && diff !== 90 && !isNaN(diff)) {
				this.type = 'custom'
				this.inputDays = diff
			}
		}
	},
	methods: {
		selectCurrentAccount() {
			this.model.vaultAddr = this.coinbase
			this.setActiveSection('one')
		},
		validate() {
			return this.$refs.observer.validate().then((res) => {
				this.$emit('on-validated', res, this.model)
				return res
			})
		},
		setActiveSection(val) {
			for (const key in this.activeSection) {
				if (key === val) {
					this.activeSection[key] = true
				} else {
					this.activeSection[key] = false
				}
			}
			this.$emit('active-input', this.activeSection)
		},
	},
}
</script>

<style lang="scss" scoped>
.svg-icon {
	left: 6px;
	top: 8px;
}
.w-55 {
	width: 55%;
}
.custom {
	&-radio {
		margin-right: -15px;
	}
	&-col {
		margin-right: -15px;
	}
}
</style>

<style lang="scss">
.vault input {
	padding-left: 30px !important;
}

.wrapper-custom .form-control {
	height: 47px;
}
</style>
