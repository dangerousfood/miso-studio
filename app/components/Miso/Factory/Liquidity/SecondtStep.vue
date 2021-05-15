<template>
	<div>
		<validation-observer ref="observer">
			<div class="row">
				<div class="col-12">
					<div class="d-flex">
						<div class="d-inline border-bottom mb-4">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': type !== '' }"
							>
								LIQUIDITY PAIR TOKEN*
							</div>
						</div>
					</div>
					<div
						class="
							border-miso
							radio_wrapper
							d-flex
							justify-content-between
							align-items-center
						"
					>
						<div
							class="d-flex align-items-center pl-3"
							@click="activeSectionCalc('token')"
						>
							<base-radio
								v-model="type"
								name="ETH"
								class="text-white font-weight-bold fs-4 mr-3 mb-2"
							>
								ETHEREUM
							</base-radio>
							<svg-icon icon="ethereum" height="30" width="30" />
						</div>
						<p class="pr-3 mb-0">Most Common</p>
					</div>
					<div class="row mt-3">
						<div class="col-lg-4 mb-3">
							<div class="border-miso radio_wrapper">
								<div
									class="d-flex h-100 fs-4 mr-3 pl-3 align-items-center"
									@click="activeSectionCalc('token')"
								>
									<base-radio
										v-model="type"
										name="DAI"
										class="text-white font-weight-bold fs-3 mr-3 mb-2"
									>
										DAI
									</base-radio>
									<div class="tokenImage">
										<img src="@/assets/svg/DAI.svg" alt="DAI" class="img-fluid" />
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-4 mb-3">
							<div class="border-miso radio_wrapper">
								<div
									class="d-flex h-100 fs-4 mr-3 pl-3 align-items-center"
									@click="activeSectionCalc('token')"
								>
									<base-radio
										v-model="type"
										name="USD"
										class="text-white font-weight-bold mr-3 mb-2"
										:class="computedFontSize"
									>
										USDC
									</base-radio>
									<div class="tokenImage">
										<img src="@/assets/svg/USD.svg" alt="USD" />
									</div>
								</div>
							</div>
						</div>

						<div class="col-lg-4 mb-3">
							<div class="border-miso radio_wrapper">
								<div
									class="d-flex h-100 fs-3 mr-3 pl-3 align-items-center"
									@click="activeSectionCalc('token')"
								>
									<base-radio
										v-model="type"
										name="USDT"
										class="text-white font-weight-bold fs-4 mr-3 mb-2"
									>
										TETHER (USDT)
									</base-radio>
									<div class="tokenImage">
										<img src="@/assets/svg/USDT.svg" alt="USDT" class="img-fluid" />
									</div>
								</div>
							</div>
						</div>
						<div class="col-4">
							<div class="border-miso radio_wrapper">
								<div
									class="d-flex h-100 fs-3 mr-3 pl-3 align-items-center"
									@click="activeSectionCalc('token')"
								>
									<base-radio
										v-model="type"
										name="custom"
										class="text-white text-uppercase font-weight-bold fs-4 mr-3 mb-2"
									>
										custom
									</base-radio>
								</div>
							</div>
						</div>
						<div class="col-8">
							<base-input
								v-model="customType"
								:disabled="!inputActive"
								placeholder="Search by token name, token symbol, or Enter an ERC-20 token address"
								class="custom-input"
								name="token"
								:rules="rule"
							/>
						</div>
					</div>
				</div>
				<div class="col-12 mt-5">
					<div class="d-flex">
						<div class="d-inline border-bottom mb-4">
							<div
								class="font-weight-bold fs-4 mb-2"
								:class="{ 'text-white': amountType !== '' }"
							>
								SUSHI LIQUIDITY PROVISIONING*
							</div>
						</div>
					</div>
					<div class="row">
						<div class="col-6" @click="activeSectionCalc('provision')">
							<base-radio
								v-model="amountType"
								name="input"
								class="text-white fs-4 mr-3 mb-2"
							>
								Enter the amount of token you would like to provide
							</base-radio>
						</div>
						<div class="col-6" @click="activeSectionCalc('provision')">
							<base-radio
								v-model="amountType"
								name="slider"
								class="text-white fs-4 mr-3 mb-2"
							>
								Select the percentage of auction fund reserved for provision
							</base-radio>
						</div>
						<div class="col-12">
							<div class="d-flex amount">
								<div class="amount_section">
									<div class="d-flex align-items-center w-100 mb-3">
										<base-input
											v-model="model.amount"
											:disabled="amountType !== 'input'"
											rules="required"
											name="amount"
											placeholder="200,000"
											class="custom-input w-100"
											@focus="activeSectionCalc('provision')"
										/>
										<span class="ml-3">LCRX</span>
									</div>
									<span class="fs-1">
										Remaining Token Balance: {{ remainingTokens }}
									</span>
								</div>
								<div class="amount_or d-flex justify-content-center pt-3">- Or -</div>
								<div class="amount_section">
									<div
										class="
											d-flex
											align-items-center
											justify-content-between
											slider-label
										"
									>
										<span class="fs-1">0%</span>
										<span class="fs-1">100% (ETH)</span>
									</div>
									<client-only>
										<vue-slider
											v-model="percentage"
											:lazy="true"
											:disabled="amountType !== 'slider'"
											:max="100"
											:min="0"
											:interval="1"
											:dot-style="{
												background: '#f46e41',
											}"
											:process-style="{
												background: '#f46e41',
											}"
											tooltip="none"
											class="vue-slider mt-4"
										></vue-slider>
									</client-only>
									<div class="mt-4 pt-2">
										<span class="fs-1">Your auction allocation: 800,000 LCRX</span>
									</div>
								</div>
							</div>
						</div>
						<div class="col-12">
							<div class="mt-5 fs-2">
								25% of amount raised from auction in ETH, pairing with 200,000 LCRX,
								will be launched on SushiSwap as a 50/50 weighting liquidity pool.
							</div>
						</div>
					</div>
				</div>
			</div>
		</validation-observer>
	</div>
</template>

<script>
export default {
	name: 'SecondStep',
	props: ['data'],
	data() {
		return {
			colors: {
				token: false,
			},
			model: {
				type: 'ETH',
				amount: '',
			},
			type: 'ETH',
			amountType: 'input',
			inputActive: false,
			customType: '',
			percentage: 0,
			activeSection: {
				token: false,
				provision: false,
			},
			rule: '',
		}
	},
	computed: {
		computedFontSize() {
			const width = this.$screen.width
			if (width >= 1200 && width <= 1400) {
				return 'fs-xs'
			}
			return 'fs-1'
		},
		computedCustomType() {
			if (this.custom === 'custom') {
				return true
			}
			return false
		},
		// user remaining tokens
		remainingTokens() {
			const userEth = 10 // wallet max Eth
			const rate = 0.0001 // rate ETH - token
			const submitedTokens = userEth / rate - this.model.amount
			return this.model.amount !== '' ? submitedTokens : 0
		},
	},
	watch: {
		customType(val) {
			const typeChecks = ['USD', 'ETH', 'DAI', 'USDT']
			typeChecks.forEach((el) => {
				if (el !== this.customType) {
					this.model.type = val
				} else {
					this.type = val
					this.inputActive = false
					this.customType = ''
				}
			})
		},
		type(val) {
			if (val !== 'custom') {
				this.rule = ''
				this.model.type = val
				this.inputActive = false
			} else {
				this.rule = 'required'
				this.inputActive = true
			}
		},
	},
	created() {
		const typeChecks = ['USD', 'ETH', 'DAI', 'USDT']
		if (this.data) {
			Object.assign(this.model, this.data)
			typeChecks.forEach((el) => {
				if (el !== this.model.type) {
					this.type = 'custom'
					this.customType = this.model.type
				} else {
					this.type = this.data.type
				}
			})
		}
	},
	methods: {
		validate() {
			return this.$refs.observer.validate().then((res) => {
				this.$emit('on-validated', res, this.model)
				return res
			})
		},
		activeSectionCalc(val) {
			for (const key in this.activeSection) {
				if (val === key) {
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
.radio {
	&_wrapper {
		height: 54px;
	}
}
.amount {
	&_or {
		width: 15%;
		position: relative;
	}
	&_section {
		width: calc(85% / 2);
	}
}
.slider-label {
	margin-bottom: -15px;
}
.fs-xs {
	font-size: 10px !important;
}
.custom-input {
	height: 50px !important;
}
.tokenImage {
	width: 30px;
	height: 30px;
	img {
		width: 100%;
		height: 100%;
		@media screen and (max-width: 1400px) and (min-width: 1200px) {
			max-width: none;
			width: 20px;
			height: 20px;
		}
	}
}
</style>

<style>
.custom-input input {
	height: 50px !important;
}
@media screen and (max-width: 1400px) and (min-width: 1200px) {
	.radio_wrapper label {
		font-size: 10px !important;
	}
}
</style>
