<template>
	<div>
		<validation-observer ref="observer">
			<div class="row">
				<div class="col-12">
					<!-- Token input -->
					<autocomplete
						v-model="model.token.address"
						label="Token"
						name="token"
						placeholder="Type to search (name, symbol, address)"
						rules="required|isAddress"
						:suggestions="tokens"
						:loading="tokensLoading"
						:no-data="'No Tokens'"
						@input="fetchTokens"
						@complete="handleTokenComplete"
					></autocomplete>

					<div class="fs-2">
						Don't have a token?
						<nuxt-link
							v-slot="{ navigate }"
							custom
							to="/factory/token"
							class="font-weight-bold text-white underline"
						>
							<span class="cursor-pointer" role="link" @click="navigate">
								<u>Create it now!</u>
							</span>
						</nuxt-link>
					</div>
					<base-divider class="my-5" />
				</div>

				<!-- Alert -->
				<div class="col-12">
					<base-alert v-if="!coinbase" type="danger">
						<strong>Error</strong>
						<span class="alert-inner--text">
							Account is not connected. Please connect to Ethereum wallet to be
							able to proceed
						</span>
					</base-alert>
					<base-alert v-else-if="userHasToken" type="secondary">
						<div class="text-primary">
							<span class="alert-inner--text text-primary">
								<strong>Note:</strong>
								Your
								<strong>token balance</strong>
								must be higher than or equal to
								<strong>allowance</strong>
								.
								<strong>Token amount</strong>
								must be lower or equal to
								<strong>allowance</strong>
								, otherwise you can approve the new allowance in any amount.
							</span>
						</div>
					</base-alert>
					<base-alert
						v-else-if="model.token.symbol && !userLoading"
						type="danger"
					>
						<span class="alert-inner--text">
							You don't have any {{ model.token.symbol }}
						</span>
					</base-alert>
				</div>

				<!-- Approve -->
				<div class="col-12">
					<div class="d-flex justify-content-between">
						<div class="d-flex flex-column">
							<span class="font-weight-bold">YOUR TOKEN BALANCE</span>
							<span class="font-weight-bold text-white">
								{{ formatedTokenBalance }} {{ model.token.symbol }}
							</span>
						</div>
						<div
							v-if="model.token.address && coinbase"
							class="d-flex flex-column step"
						>
							<base-button
								class="btn"
								:loading="userLoading"
								@click="updateUserInfo"
							>
								refresh
							</base-button>
						</div>
						<div class="d-flex flex-column">
							<span class="font-weight-bold">YOUR TOKEN ALLOWANCE</span>
							<span class="font-weight-bold text-white">
								{{ formatedAllowance }} {{ model.token.symbol }}
							</span>
						</div>
					</div>
					<div class="mt-5">
						<base-input
							v-model="model.tokenSupply"
							:disabled="!userHasToken"
							name="token amount"
							placeholder="Token amount"
							type="number"
							:rules="`required|decimal|max_value:${formatedTokenBalance}`"
						>
							<template #label>
								<span class="font-weight-bold">TOKEN AMOUNT</span>
							</template>
						</base-input>
					</div>
					<div v-if="!tokensApproved && model.tokenSupply > 0" class="mt-5">
						<base-button
							class="btn"
							:loading="approveLoading"
							@click="approve()"
						>
							Approve
						</base-button>
					</div>
				</div>

				<div class="col-12">
					<base-divider class="my-5" />
					<div class="row">
						<div class="col-12">
							<payment-currency
								:tokens-approved="tokensApproved"
								@currency-updated="updateCurrency($event)"
							/>
						</div>
						<!-- input line 1 -->
						<div class="col-12">
							<div class="row mt-4">
								<base-input
									v-model="model.startPrice"
									:disabled="!tokensApproved"
									name="starting price"
									class="col-md-6"
									type="text"
									placeholder="0"
									:rules="`required|decimal|isBigger:${model.minPrice}`"
								>
									<template #label>
										<span class="font-weight-bold">STARTING PRICE</span>
										- Dutch auction starts high
									</template>
								</base-input>
								<base-input
									name="max raise"
									class="col-md-6"
									type="text"
									:placeholder="maxRaise"
									disabled
								>
									<template #label>
										<span class="font-weight-bold">MAX RAISE</span>
										- Maximum raised at starting price
									</template>
								</base-input>
							</div>
						</div>

						<!-- input line 2 -->
						<div class="col-12">
							<div class="row mt-4">
								<base-input
									v-model="model.minPrice"
									:disabled="!tokensApproved"
									name="minimum price"
									class="col-md-6"
									type="text"
									placeholder="0"
									:rules="`required|decimal|isLess:${model.startPrice}`"
								>
									<template #label>
										<span class="font-weight-bold">MIN PRICE</span>
										- Auction ends at the lowest price
									</template>
								</base-input>
								<base-input
									class="col-md-6"
									type="text"
									name="minRaise"
									:placeholder="minRaise"
									disabled
								>
									<template #label>
										<span class="font-weight-bold">MIN RAISED</span>
										- Amount need to be successful
									</template>
								</base-input>
							</div>
						</div>

						<!-- input line 3 -->
						<div class="col-12">
							<div class="row">
								<div class="col-12">
									<base-input
										:disabled="!tokensApproved"
										class="col-md-6 right-icon position-relative"
										name="start date"
										type="text"
										:rules="`required|afterNow:${
											(model.startDate, 'start date')
										}`"
									>
										<el-date-picker
											v-model="model.startDate"
											:disabled="!tokensApproved"
											type="datetime"
											:picker-options="{
												start: '00:00',
												step: '00:15',
												end: '23:59',
											}"
										></el-date-picker>
										<template #timestemp>
											<span class="position-absolute timeZone">
												{{ getStartTimeAbbr }}
											</span>
										</template>
										<template #label>
											<span class="font-weight-bold">START DATE</span>
											- Must be a future date
										</template>
									</base-input>
								</div>
								<div class="col-md-6 col-sm-12">
									<base-input
										:placeholder="getDuration"
										disabled
										class="endDate"
									>
										<template #prepend>
											<svg-icon
												icon="clock"
												width="20"
												height="21"
												:fill="false"
											/>
										</template>
										<template #label>
											<span class="font-weight-bold text-uppercase">
												duration
											</span>
										</template>
									</base-input>
								</div>
								<div class="col-md-6 col-sm-12">
									<div class="d-flex flex-column">
										<div class="d-flex justify-content-start">
											<div>
												<div class="text-left pl-5 ml-2 text-capitalize">
													days
												</div>
												<div class="d-flex justify-content-start number-input">
													<p class="number-input_down d-flex align-items-start">
														<button
															class="btn btn-primary rounded-circle"
															:disabled="numberOfDays <= 0 || !tokensApproved"
															@click="numberOfDays--"
														>
															<span>
																<svg-icon
																	icon="minus"
																	height="20"
																	width="20"
																	:fill="false"
																/>
															</span>
														</button>
													</p>
													<base-input
														:placeholder="numberOfDays"
														:disabled="!tokensApproved"
														class="w-25 input_days"
													/>
													<p class="number-input_up d-flex align-items-start">
														<button
															class="btn btn-primary rounded-circle"
															:disabled="!tokensApproved"
															@click="numberOfDays++"
														>
															<span>
																<svg-icon
																	icon="plus"
																	height="20"
																	width="20"
																	:fill="false"
																/>
															</span>
														</button>
													</p>
												</div>
											</div>
											<div>
												<div class="text-left pl-5 ml-1 text-capitalize">
													hours
												</div>
												<div class="d-flex justify-content-start number-input">
													<p class="number-input_down d-flex align-items-start">
														<button
															class="btn btn-primary rounded-circle"
															:disabled="numberOfHours <= 0 || !tokensApproved"
															@click="numberOfHours--"
														>
															<span>
																<svg-icon
																	icon="minus"
																	height="20"
																	width="20"
																	:fill="false"
																/>
															</span>
														</button>
													</p>
													<base-input
														:placeholder="numberOfHours"
														:disabled="!tokensApproved"
														class="w-25 input_hours"
													/>
													<p class="number-input_up d-flex align-items-start">
														<button
															class="btn btn-primary rounded-circle"
															:disabled="!tokensApproved"
															@click="numberOfHours++"
														>
															<span>
																<svg-icon
																	icon="plus"
																	height="20"
																	width="20"
																	:fill="false"
																/>
															</span>
														</button>
													</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<!-- input line 3 -->
						<div class="col-12">
							<div class="row mt-4">
								<base-input
									v-model="model.fundWallet"
									:disabled="!tokensApproved"
									class="col"
									name="address"
									placeholder="Ethereum Address"
									rules="required|isAddress"
								>
									<template #prepend>
										<svg-icon
											class="svg-icon-left"
											icon="ethereum"
											height="24"
											width="20"
										/>
									</template>
									<template #label>
										<span class="font-weight-bold">FUND WALLET</span>
										- Where the funds will go
									</template>
								</base-input>
							</div>
						</div>
					</div>
					<p
						class="font-weight-bold cursor-pointer"
						@click="selectCurrentAccount"
					>
						Send to my account
					</p>
				</div>

				<div class="col-12">
					<div class="line-divider my-5"></div>
				</div>
			</div>
		</validation-observer>
	</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import { BaseDivider, BaseAlert } from "@/components"
import { DatePicker, TimeSelect } from "element-ui"
import { getContractInstance as erc20Contract } from "@/services/web3/erc20Token"
import { misoMarket as misoMarketConfig } from "@/constants/contractConfig"
import { makeBatchCall, sendTransactionAndWait } from "@/services/web3/base"
import { toDecimals, to18Decimals } from "@/util"
import { duration } from "@/mixins/duration.js"
import Autocomplete from "@/components/Inputs/Autocomplete"
import PaymentCurrency from "../PaymentCurrency.vue"

export default {
	components: {
		[DatePicker.name]: DatePicker,
		[TimeSelect.name]: TimeSelect,
		Autocomplete,
		BaseDivider,
		BaseAlert,
		PaymentCurrency,
	},
	mixins: [duration],
	data() {
		return {
			misoMarketAddress: "",
			model: {
				token: {
					address: this.$route.query.token,
					name: "",
					symbol: "",
					decimals: 0,
				},
				paymentCurrency: {
					address: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
					name: "Ethereum",
					symbol: "ETH",
					decimals: 18,
				},
				startPrice: "",
				minPrice: "",
				startDate: "",
				endDate: "",
				fundWallet: "",
				tokenSupply: 0,
			},
			user: {
				tokenBalance: 0,
				allowance: 0,
			},
			tokensLoading: false,
			userLoading: false,
			approveLoading: false,
		}
	},
	computed: {
		...mapGetters({
			currentProvidersNetworkId: "ethereum/currentProvidersNetworkId",
			coinbase: "ethereum/coinbase",
			explorer: "ethereum/explorer",
			tokens: "tokens/list",
		}),
		formatedTokenBalance() {
			if (!this.user.tokenBalance) return 0
			return toDecimals(this.user.tokenBalance)
		},
		formatedAllowance() {
			if (!this.user.allowance) return 0
			return toDecimals(this.user.allowance)
		},
		userHasToken() {
			return this.user.tokenBalance > 0
		},
		tokensApproved() {
			return (
				parseFloat(this.model.tokenSupply) !== 0 &&
				parseFloat(this.formatedAllowance) >= parseFloat(this.model.tokenSupply)
			)
		},
		getStartTimeAbbr() {
			return new Date(this.model.startDate)
				.toLocaleTimeString("en-us", { timeZoneName: "short" })
				.split(" ")[2]
		},
		getEndTimeAbbr() {
			return new Date(this.model.endDate)
				.toLocaleTimeString("en-us", { timeZoneName: "short" })
				.split(" ")[2]
		},
		maxRaise() {
			if (this.model.startPrice !== "") {
				return (
					parseFloat(this.model.tokenSupply) * parseFloat(this.model.startPrice)
				)
			}
			return 0
		},
		minRaise() {
			if (this.model.minPrice !== "") {
				return (
					parseFloat(this.model.tokenSupply) * parseFloat(this.model.minPrice)
				)
			}
			return 0
		},
	},
	async mounted() {
		this.misoMarketAddress =
			misoMarketConfig.address[this.currentProvidersNetworkId]
		const tokenAddress = this.model.token.address
		if ((tokenAddress || "").length > 0) {
			await this.fetchTokens()
			const matches = this.tokens.filter(
				(token) => token.addr.toLowerCase() === tokenAddress.toLowerCase()
			)
			if (matches.length > 0) {
				this.handleTokenComplete(matches[0])
			}
		}
	},
	methods: {
		...mapActions({
			getTokens: "tokens/getTokens",
		}),
		validate() {
			return this.$refs.observer.validate().then((res) => {
				this.$emit("on-validated", res, this.model)
				return res && this.model.paymentCurrency.address
			})
		},
		async fetchTokens() {
			// Clear Tokens
			this.user.allowance = 0
			this.user.tokenBalance = 0
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
		async updateUserInfo() {
			this.userLoading = true
			const methods = [
				{
					methodName: "allowance",
					args: [this.coinbase, this.misoMarketAddress],
				},
				{
					methodName: "balanceOf",
					args: [this.coinbase],
				},
			]

			const data = await makeBatchCall(
				erc20Contract(this.model.token.address),
				methods
			)
			if (data) {
				;[this.user.allowance, this.user.tokenBalance] = data
			}
			this.userLoading = false
		},
		approve() {
			if (!this.tokensApproved) {
				this.approveLoading = true
				const method = erc20Contract(this.model.token.address).methods.approve(
					this.misoMarketAddress,
					to18Decimals(this.model.tokenSupply)
				)

				sendTransactionAndWait(method, { from: this.coinbase }, (receipt) => {
					if (receipt.status) {
						this.user.allowance = receipt.events.Approval.returnValues[2]
					}
					this.approveLoading = false
				})
			}
		},
		handleTokenComplete(token) {
			this.model.token = {
				address: token.addr,
				name: token.name,
				symbol: token.symbol,
				decimals: token.decimals,
			}
			this.updateUserInfo()
		},
		selectCurrentAccount() {
			this.model.fundWallet = this.coinbase
		},
		updateCurrency(currency) {
			this.model.paymentCurrency = currency
		},
	},
}
</script>
<style lang="scss">
.right-icon {
	.el-input__prefix {
		font-size: 20px;
		margin-right: 10px;
	}
	.el-input__inner {
		padding-left: 40px;
	}
}
.svg-icon-left {
	position: absolute;
	z-index: 10;
	left: 10px;
}
/* .step {
	.btn {
		background: transparent !important;
		border: 2px solid #23306b;
		border-radius: 0;
		color: white;
	}
} */
.el-date-picker .el-picker-panel__footer .el-button:first-child {
	display: none;
}
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
.input {
	&_days {
		margin-top: 0.5rem;
		.form-group {
			margin-bottom: 0;
		}
		input {
			&:disabled::placeholder {
				color: #6c757c;
			}
			&::placeholder {
				color: #fff;
			}
		}
	}
	&_hours {
		margin-top: 0.5rem;
		input {
			&:disabled::placeholder {
				color: #6c757c;
			}
			&::placeholder {
				color: #fff;
			}
		}
	}
}
.endDate {
	input::placeholder {
		color: #cad1d7;
		font-weight: normal;
	}
	.input-group-text {
		padding: 6px 0 6px 6px !important;
		color: #cad1d7 !important;
	}
}
</style>
