<template>
	<card v-if="!loading" class="special p-2 card-hight">
		<div @mouseover="cardhover" @mouseout="cardout">
			<div class="d-flex justify-content-end align-items-center">
				<!-- 
					// uncomment then web3 link for img are ready.
					// wrapper to justify-content-between
					<div class="token-img mr-2">
					<img :src="computedTokenImg" class="img-fluid" />
				</div> 
				-->
				<div class="d-flex align-items-center">
					<div
						v-if="status.auction !== 'live' && status.auction !== 'upcoming'"
						class="
							special_status
							px-2
							py-2
							mr-2
							text-white
							font-weight-bold
							text-uppercase
						"
						:class="'border-' + computedStatusColor"
					>
						<svg-icon
							v-if="status.auctionSuccessful"
							icon="check"
							height="20"
							width="20"
							:color="computedIconColor"
						/>
						<svg-icon
							v-else
							icon="cancel"
							height="20"
							width="20"
							:color="computedIconColor"
						/>
					</div>
					<div
						v-if="marketInfo.hasPointList && marketInfo.pointListAddress"
						class="
							special_status
							px-3
							py-2
							mr-2
							text-white
							font-weight-bold
							border-danger
						"
					>
						<svg
							class="mr-2 mb-0"
							width="12"
							height="16"
							viewBox="0 0 12 16"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M11 7.15625H9.9375V3.21875C9.9375 1.97598 9.04219 0.96875 7.9375 0.96875H4.0625C2.95781 0.96875 2.0625 1.97598 2.0625 3.21875V7.15625H1C0.723437 7.15625 0.5 7.40762 0.5 7.71875V14.4688C0.5 14.7799 0.723437 15.0312 1 15.0312H11C11.2766 15.0312 11.5 14.7799 11.5 14.4688V7.71875C11.5 7.40762 11.2766 7.15625 11 7.15625ZM6.4375 11.3223V12.2539C6.4375 12.3313 6.38125 12.3945 6.3125 12.3945H5.6875C5.61875 12.3945 5.5625 12.3313 5.5625 12.2539V11.3223C5.43352 11.2181 5.33725 11.0706 5.28755 10.9009C5.23784 10.7313 5.23727 10.5482 5.28591 10.3782C5.33455 10.2082 5.42989 10.0599 5.55821 9.95468C5.68654 9.84948 5.84122 9.7928 6 9.7928C6.15878 9.7928 6.31346 9.84948 6.44179 9.95468C6.57011 10.0599 6.66545 10.2082 6.71409 10.3782C6.76273 10.5482 6.76216 10.7313 6.71245 10.9009C6.66275 11.0706 6.56648 11.2181 6.4375 11.3223ZM8.8125 7.15625H3.1875V3.21875C3.1875 2.67559 3.57969 2.23438 4.0625 2.23438H7.9375C8.42031 2.23438 8.8125 2.67559 8.8125 3.21875V7.15625Z"
								fill="#F3664A"
							/>
						</svg>
						Private
					</div>
					<div
						class="
							special_status
							px-3
							py-2
							text-white
							font-weight-bold
							text-uppercase
						"
						:class="'border-' + computedStatusColor"
					>
						<span class="mr-2" :class="'bg-' + computedStatusColor"></span>
						{{ status.auction }}
					</div>
				</div>
			</div>
			<div class="d-flex flex-column mt-3">
				<div class="text-capitalize fs-5 font-weight-bold text-white">
					{{ checkTitle(about.title) }}
				</div>
				<!-- <div class="fs-2 text-white">This is a first line of a Subtitle</div>
				<div class="fs-2 text-white">Second line of subtitle goes here</div> -->
			</div>
			<base-divider class="mb-4 mt-2 py-1" />
			<div v-if="!isUpcoming">
				<!-- CrowedProgress -->
				<crowd-progress
					v-if="status.type === 'crowdsale'"
					:status="status"
					:token-info="tokenInfo"
					:market-info="marketInfo"
					:progress="crowdProgress"
				/>
				<!-- CrowedProgress -->

				<!-- DutchProgress -->
				<dutch-progress
					v-if="status.type === 'dutch'"
					class="mt-4 mb-3"
					:status="status"
					:progress="dutchProgress"
					:market-info="marketInfo"
				/>
				<!-- DutchProgress -->

				<!-- BatchProgress -->
				<batch-progress
					v-if="status.type === 'batch'"
					class="mt-4"
					:status="status"
					:progress="timeProgress"
					:market-info="marketInfo"
				/>
				<!-- BatchProgress -->
			</div>
			<div v-else class="d-flex flex-column flex-grow-1">
				<div class="text-white text-center">COUNTDOWN</div>
				<div class="text-white font-weight-bold text-center fs-16">
					<span class="upcoming counter-line">{{ getFullTime }}</span>
				</div>
			</div>
			<base-divider class="mb-4 mt-2 py-1" />
			<!-- <div class="d-flex flex-column">
				<div class="font-weight-bold text-white text-uppercase fs-1">recipe:</div>
				<div class="fs-3 font-weight-bold text-white mt-1">
					{{ about.recipe }}
				</div>
			</div> -->
			<div class="text-white text-uppercase font-weight-bold ingredients mt-5">
				auction type:
			</div>
			<div
				v-if="buybuttonflag && buyhoverflag"
				class="font-weight-bold text-white text-uppercase buy-sake-full py-4"
			>
				buy sake
			</div>
			<div class="d-flex flex-column">
				<div class="font-weight-bold text-white text-uppercase fs-1"></div>
				<div class="d-flex align-items-center mt-3">
					<span class="mr-1">
						<svg-icon
							:icon="status.type"
							height="50"
							width="48"
							:color="computedIconColor"
						/>
					</span>
					<span
						v-if="!buybuttonflag"
						class="text-capitalize font-weight-bold text-white"
					>
						{{ auctionType }}
					</span>
					<div
						v-if="buybuttonflag && !buyhoverflag"
						class="font-weight-bold text-white text-uppercase buy-sake"
					>
						buy sake
					</div>
				</div>
			</div>
		</div>
	</card>
</template>

<script>
import { Card, BaseDivider } from '@/components'
import { theme } from '@/mixins/theme'

import { getContractInstance as misoHelperContract } from '@/services/web3/misoHelper'
import {
	getContractInstance as dutchAuctionContract,
	clearingPrice,
} from '@/services/web3/auctions/dutch'
import { getContractInstance as crowdsaleContract } from '@/services/web3/auctions/crowdsale'
import { getContractInstance as batchAuctionContract } from '@/services/web3/auctions/batch'
import { makeBatchCall } from '@/services/web3/base'
import { toDecimals, toPrecision, to18Decimals, toNDecimals } from '@/util/index'

import CrowdProgress from '~/components/Miso/Auctions/Specials/CrowdProgress'
import DutchProgress from '~/components/Miso/Auctions/Specials/DutchIndicator'
import BatchProgress from '~/components/Miso/Auctions/Specials/BatchIndicator '

export default {
	name: 'SpecialCard',
	components: {
		Card,
		BaseDivider,
		CrowdProgress,
		DutchProgress,
		BatchProgress,
	},
	mixins: [theme],
	props: {
		iconLink: {
			type: String,
			default: undefined,
		},
		auction: {
			type: String,
			required: true,
		},
		ingredients: {
			type: Array,
			required: true,
		},
		buybuttonflag: {
			type: Boolean,
			default: false,
			required: false,
		},
	},
	data() {
		return {
			// can be Object or Array
			about: {
				title: '',
				tokenPair: '',
				recipe: 'Classic Miso',
			},
			status: {
				date: '',
				participants: 0,
				finished: false,
				auctionSuccessful: false,
			},
			marketInfo: {
				startTime: 0,
				endTime: 0,
				currentPrice: 0,
				totalTokensCommitted: 0,
				paymentCurrency: 'ETH',
				hasPointList: false,
				pointListAddress: '',
				totalTokens: 0,
				commitmentsTotal: 0,
			},
			tokenInfo: {
				address: '',
				name: '',
				symbol: '',
			},
			contractInstance: null,
			loading: true,
			now: new Date(),
			displaySeconds: '00',
			displayMinutes: '00',
			displayHours: '00',
			displayDays: '00',
			buyhoverflag: false,
		}
	},
	computed: {
		seconds: () => 1000,
		minutes() {
			return this.seconds * 60
		},
		hours() {
			return this.minutes * 60
		},
		days() {
			return this.hours * 24
		},
		auctionType() {
			if (this.status.type === 'crowdsale') {
				return 'Crowdsale'
			}
			return `${this.status.type} Auction`
		},
		computedStatusColor() {
			if (this.status.auction === 'upcoming') {
				return 'info'
			} else if (
				this.status.auction === 'finished' &&
				this.status.auctionSuccessful
			) {
				return 'link'
			} else if (
				this.status.auction === 'finished' &&
				!this.status.auctionSuccessful
			) {
				return 'danger'
			}

			return 'success'
		},
		isUpcoming() {
			const currentTimestamp = Date.parse(new Date()) / 1000
			return this.marketInfo.startTime > currentTimestamp
		},
		sliderMax() {
			if (this.limit > 0) {
				return this.limit
			}
			return 100
		},
		dutchProgress() {
			const startPrice = this.marketInfo.startPrice
			const minimumPrice = this.marketInfo.minimumPrice
			const currentPrice = this.marketInfo.currentPrice

			const d1 = startPrice - minimumPrice
			const d2 = Math.max(0, currentPrice - minimumPrice)
			const progress = 100 - (100 * d2) / d1

			return progress
		},
		crowdProgress() {
			const startPrice = 0
			const hard = this.marketInfo.totalTokens / this.marketInfo.rate
			const commitmentsTotal = this.marketInfo.commitmentsTotal

			const d1 = hard - startPrice
			const d2 = Math.max(0, hard - commitmentsTotal)
			const progress = 100 - (100 * d2) / d1

			return progress
		},
		timeProgress() {
			const startTime = new Date(parseInt(this.marketInfo.startTime) * 1000)
			const endTime = new Date(parseInt(this.marketInfo.endTime) * 1000)
			if (endTime <= this.now) return 100
			const d1 = startTime - endTime
			const d2 = this.now - endTime
			const progress = 100 - (100 * d2) / d1

			return progress
		},

		getFullTime() {
			return `${this.displayDays}d : ${this.displayHours}h : ${this.displayMinutes}m : ${this.displaySeconds}s`
		},
		computedTokenImg() {
			if (this.iconLink) {
				return this.iconLink
			}
			return require('static/s3/img/token_placeholder.png')
		},
	},
	async mounted() {
		this.showCountDown()
		await this.getTemplateId()
		let type
		switch (parseInt(this.marketTemplateId)) {
			case 1:
				type = 'crowdsale'
				this.contractInstance = crowdsaleContract(this.auction)
				await this.setCrowdsaleData()
				break
			case 2:
				type = 'dutch'
				this.contractInstance = dutchAuctionContract(this.auction)
				await this.setDutchAuctionData()
				break
			case 3:
				type = 'batch'
				this.contractInstance = batchAuctionContract(this.auction)
				await this.setBatchData()
				break
			case 4:
				type = 'hyperbolic'
				break
			default:
				break
		}

		// PointList
		const pointListMethod = [{ methodName: 'pointList' }]
		const [pointList] = await makeBatchCall(this.contractInstance, pointListMethod)
		this.marketInfo.pointListAddress = pointList

		const currentTimestamp = Date.parse(new Date()) / 1000
		let auction
		if (this.marketInfo.startTime > currentTimestamp) {
			auction = 'upcoming'
			this.status.date = new Date(this.marketInfo.startTime * 1000)
		} else if (currentTimestamp < this.marketInfo.endTime) {
			auction = 'live'
			this.status.date = new Date(this.marketInfo.endTime * 1000)
		} else {
			auction = 'finished'
		}
		Object.assign(this.status, { type, auction })
		this.loading = false
	},
	beforeDestroy() {
		clearInterval(this.interval)
	},
	methods: {
		cardhover() {
			this.buyhoverflag = true
		},
		cardout() {
			this.buyhoverflag = false
		},
		checkTitle(value) {
			const pattern = /^[()\s0-9a-zA-Z.,/$#:&_-]+$/
			if (value.match(pattern)) {
				return value
			} else {
				return (
					this.tokenInfo.addr.substring(0, 6) +
					'...' +
					this.tokenInfo.addr.substring(this.tokenInfo.addr.length - 10)
				)
			}
		},
		showCountDown() {
			if (this.status.auction === 'finished') return
			const timer = setInterval(() => {
				// Get today's date
				const now = new Date().getTime()
				// Set the date counting down to
				const countDownDate = new Date(this.status.date).getTime()
				// Find the distance between now and the count down time
				const distance = countDownDate - now
				// If the count down is finished, write some text
				if (distance < 0) {
					this.live = false
					clearInterval(timer)
					return
				}
				// Time calculations for days, hours, minutes and seconds
				const days = Math.floor(distance / this.days)
				const hours = Math.floor((distance % this.days) / this.hours)
				const minutes = Math.floor((distance % this.hours) / this.minutes)
				const seconds = Math.floor((distance % this.minutes) / this.seconds)

				// Update display days, hours, minutes and seconds
				this.displaySeconds = seconds < 10 ? '0' + seconds : seconds
				this.displayMinutes = minutes < 10 ? '0' + minutes : minutes
				this.displayHours = hours < 10 ? '0' + hours : hours
				this.displayDays = days < 10 ? '0' + days : days
			}, 1000)
		},

		async setDutchAuctionData() {
			const methods = [{ methodName: 'getDutchAuctionInfo', args: [this.auction] }]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			const tokenInfo = data.tokenInfo
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo

			this.setTokenInfo(tokenInfo)
			this.marketInfo.startTime = data.startTime
			this.marketInfo.endTime = data.endTime
			this.marketInfo.hasPointList = data.usePointList
			this.marketInfo.startPrice = toDecimals(
				data.startPrice,
				this.marketInfo.paymentCurrency.decimals
			)
			this.marketInfo.minimumPrice = toDecimals(
				data.minimumPrice,
				this.marketInfo.paymentCurrency.decimals
			)
			this.marketInfo.commitmentsTotal = toPrecision(
				toDecimals(data.commitmentsTotal, this.marketInfo.paymentCurrency.decimals),
				3
			)

			this.marketInfo.totalTokens = toDecimals(data.totalTokens)

			this.status.auctionSuccessful = data.auctionSuccessful
			const currentTimestamp = Date.parse(new Date()) / 1000
			if (data.startTime > currentTimestamp) {
				this.status.date = new Date(data.startTime * 1000)
			} else {
				this.status.date = new Date(data.endTime * 1000)
			}
			const marketInfo = {
				currentTimestamp: Date.parse(new Date()) / 1000,
				startTime: this.marketInfo.startTime,
				endTime: this.marketInfo.endTime,
				startPrice: toNDecimals(
					this.marketInfo.startPrice,
					this.marketInfo.paymentCurrency.decimals
				),
				minimumPrice: toNDecimals(
					this.marketInfo.minimumPrice,
					this.marketInfo.paymentCurrency.decimals
				),
				totalTokens: to18Decimals(this.marketInfo.totalTokens),
				commitmentsTotal: toNDecimals(
					this.commitmentsTotal,
					this.marketInfo.paymentCurrency.decimals
				),
			}
			const price = clearingPrice(marketInfo)
			this.marketInfo.currentPrice = toPrecision(
				toDecimals(price, this.marketInfo.paymentCurrency.decimals),
				3
			)
			const tokensCommitted =
				this.marketInfo.commitmentsTotal / this.marketInfo.currentPrice
			this.marketInfo.totalTokensCommitted = toPrecision(tokensCommitted, 3)
		},

		async setCrowdsaleData() {
			const methods = [{ methodName: 'getCrowdsaleInfo', args: [this.auction] }]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			const tokenInfo = data.tokenInfo
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo

			this.setTokenInfo(tokenInfo)
			this.marketInfo.startTime = data.startTime
			this.marketInfo.endTime = data.endTime
			this.marketInfo.hasPointList = data.usePointList
			this.marketInfo.rate = toDecimals(
				data.rate,
				this.marketInfo.paymentCurrency.decimals
			)
			this.marketInfo.goal = toDecimals(
				data.goal,
				this.marketInfo.paymentCurrency.decimals
			)
			this.marketInfo.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.commitmentsTotal = toPrecision(
				toDecimals(data.commitmentsTotal, this.marketInfo.paymentCurrency.decimals),
				2
			)

			this.status.auctionSuccessful = data.auctionSuccessful
			this.status.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.currentPrice = toPrecision(
				data.rate / this.status.totalTokens,
				2
			)
			const tokensCommitted = this.marketInfo.commitmentsTotal * this.marketInfo.rate
			this.marketInfo.totalTokensCommitted = tokensCommitted
		},

		async setBatchData() {
			const methods = [{ methodName: 'getBatchAuctionInfo', args: [this.auction] }]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			const tokenInfo = data.tokenInfo
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo

			this.setTokenInfo(tokenInfo)
			this.marketInfo.startTime = data.startTime
			this.marketInfo.endTime = data.endTime
			this.marketInfo.hasPointList = data.usePointList
			this.marketInfo.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.commitmentsTotal = toPrecision(
				toDecimals(data.commitmentsTotal, this.marketInfo.paymentCurrency.decimals),
				2
			)
			this.marketInfo.minimumCommitmentAmount = toDecimals(
				data.minimumCommitmentAmount,
				this.marketInfo.paymentCurrency.decimals
			)

			this.status.auctionSuccessful = data.auctionSuccessful
			this.status.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.currentPrice = toPrecision(
				this.marketInfo.commitmentsTotal / this.status.totalTokens,
				2
			)
		},

		async getTemplateId() {
			const methods = [{ methodName: 'marketTemplate' }]
			const [marketTemplate] = await makeBatchCall(
				dutchAuctionContract(this.auction),
				methods
			)
			this.marketTemplateId = marketTemplate
		},

		setTokenInfo(tokenInfo) {
			this.tokenInfo = tokenInfo
			this.about.title = `${tokenInfo.name} (${tokenInfo.symbol})`
			this.about.tokenPair = `${tokenInfo.symbol}/${this.marketInfo.paymentCurrency.symbol}`
		},
	},
}
</script>

<style lang="scss" scoped>
.card-hight {
	min-height: 440px;
}
.token-img {
	height: 40px;
	width: 40px;
}
.special {
	&_status {
		border-radius: 8px;
		border-width: 1px;
		border-style: solid;
		display: flex;
		align-items: center;
		span {
			display: block;
			height: 8px;
			width: 8px;
			border-radius: 100%;
		}
	}
}
.counter-line {
	font-size: 28px;
	max-width: 300px;
	@media screen and (min-width: 992px) and (max-width: 1450px) {
		font-size: 22px;
		min-width: 235px;
	}
	@media screen and (max-width: 500px) {
		font-size: 20px;
		min-width: 225px;
	}
}
.buy-sake {
	position: absolute;
	right: 24px;
	bottom: 30px;
	background-image: linear-gradient(
		135deg,
		rgba(245, 62, 46, 1) 36.52%,
		rgba(209, 54, 158, 1) 72.9%
	);
	text-align: center;
	padding: 8px 20px;
	border-radius: 6px;
	font-size: 14px;
}
.buy-sake-full {
	background-image: linear-gradient(
		135deg,
		rgba(245, 62, 46, 1) 36.52%,
		rgba(209, 54, 158, 1) 72.9%
	);
	text-align: center;
	font-size: 14px;
	width: 100%;
	position: absolute;
	left: 0;
	bottom: 0;
	border-radius: 0 0 8px 8px;
}
.ingredients {
	font-size: 10px;
}
</style>
