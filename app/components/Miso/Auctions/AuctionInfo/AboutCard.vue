<template>
	<card class="pt-2 pb-4 mb-1 h-100 about-project">
		<div class="d-flex flex-column">
			<div
				class="
					d-flex
					flex-column flex-sm-row
					justify-content-between
					align-items-start
				"
			>
				<div class="d-flex align-items-center">
					<div class="token-img mr-2">
						<img :src="computedTokenImg" class="img-fluid" />
					</div>
					<div class="d-flex flex-column" :class="{ 'pl-4': checkImage }">
						<div class="d-flex align-items-center">
							<h4 class="card-title font-weight-bold text-capitalize fs-5 mb-1">
								{{ textCheck(title, 'title') }}
							</h4>
							<div class="d-flex flex-column">
								<span
									v-if="
										status.auction !== 'upcoming' && status.auction !== 'finished'
									"
									class="
										fs-2
										font-weight-bold
										text-capitalize text-white
										d-flex
										align-items-center
										pl-2
									"
								>
									<span
										class="radius-full status-indicator mr-2"
										:class="computedStatusColor"
									></span>
									{{ status.auction }}
								</span>
							</div>
							<div
								v-if="
									pointList &&
									marketInfo.pointListAddress !=
										'0x0000000000000000000000000000000000000000'
								"
								class="
									d-flex
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
						</div>
						<p class="font-weight-bold text-uppercase fs-2 d-flex align-items-center">
							{{ tokenPriceTitle }}
							<span class="text-white ml-2">{{ tokenPrice }}</span>
							<el-tooltip
								:disabled="tokenPriceStatusColor !== 'bg-danger'"
								:content="tokenPriceTooltip"
								:open-delay="200"
								placement="top-start"
								:effect="getTooltipEffect"
							>
								<span
									class="radius-full token-price-status-indicator ml-2"
									:class="tokenPriceStatusColor"
								></span>
							</el-tooltip>
						</p>
					</div>
				</div>
				<div>
					<span
						v-if="status.auction === 'upcoming' || status.auction === 'finished'"
						class="
							fs-3
							font-weight-bold
							text-capitalize text-white
							d-flex
							align-items-center
							pl-2
						"
					>
						<span
							class="radius-full status-indicator mr-2"
							:class="computedStatusColor"
						></span>
						{{ status.auction }}
					</span>
				</div>
				<div
					v-if="status.auction !== 'upcoming' && status.auction !== 'finished'"
					class="duration mt-sm-0 mt-3"
				>
					<div class="bg-primary radius-md">
						<div class="d-flex justify-content-around text-white">
							<div class="d-flex flex-column align-items-center text-uppercase">
								<span class="fs-2 font-weight-bold">
									{{ displayDays }}
								</span>
								<span class="abbr">days</span>
							</div>
							&nbsp;:&nbsp;
							<div class="d-flex flex-column align-items-center text-uppercase">
								<span class="fs-2 font-weight-bold">
									{{ displayHours }}
								</span>
								<span class="abbr">hrs</span>
							</div>
							&nbsp;:&nbsp;
							<div class="d-flex flex-column align-items-center text-uppercase">
								<span class="fs-2 font-weight-bold">
									{{ displayMinutes }}
								</span>
								<span class="abbr">min</span>
							</div>
							&nbsp;:&nbsp;
							<div class="d-flex flex-column align-items-center text-uppercase">
								<span class="fs-2 font-weight-bold">
									{{ displaySeconds }}
								</span>
								<span class="abbr">Sec</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			<base-divider class="mb-4 mt-2 py-1" />
			<div class="pt-2">
				<!-- Auction Contract -->
				<div class="pt-3 mt-1 pr-5">
					<h5 class="fs-1 font-weight-bold text-uppercase mb-0">CONTRACT:</h5>
					<div class="d-flex align-items-center">
						<a
							class="font-weight-bold text-white text-uppercase fs-3 mb-0"
							:href="`${explorer.root}${explorer.address}${$route.params.address}`"
							target="blank"
						>
							{{ $route.params.address | truncate(6) }}
						</a>
						<div class="copy-box d-flex align-items-center ml-2">
							<div class="copy-box_icon">
								<svg-icon
									class="cursor-pointer"
									icon="copy"
									height="20"
									width="20"
									color="#F46E41"
									:fill="false"
									@click="copyToClipboard($route.params.address)"
								/>
							</div>
							<span class="font-weight-bolder text-white fs-2 pl-1">copy</span>
						</div>
					</div>
				</div>

				<!-- Token Contract -->
				<div class="pt-3 mt-1 pr-5">
					<h5 class="fs-1 font-weight-bold text-uppercase mb-0">TOKEN:</h5>
					<div class="d-flex align-items-center">
						<a
							class="font-weight-bold text-white text-uppercase fs-3 mb-0"
							:href="`${explorer.root}${explorer.address}${tokenInfo.addr}`"
							target="blank"
						>
							{{ tokenInfo.addr | truncate(6) }}
						</a>
						<div class="copy-box d-flex align-items-center ml-2">
							<div class="copy-box_icon">
								<svg-icon
									class="cursor-pointer"
									icon="copy"
									height="20"
									width="20"
									color="#F46E41"
									:fill="false"
									@click="copyToClipboard(tokenInfo.addr)"
								/>
							</div>
							<span class="font-weight-bolder text-white fs-2 pl-1">copy</span>
						</div>
					</div>
				</div>

				<!-- LPToken Contract -->
				<div v-if="marketInfo.liquidity.lpTokenAddress" class="pt-3 mt-1 pr-5">
					<h5 class="fs-1 font-weight-bold text-uppercase mb-0">LPTOKEN:</h5>
					<div class="d-flex align-items-center">
						<a
							class="font-weight-bold text-white text-uppercase fs-3 mb-0"
							:href="`https://analytics.sushi.com/pairs/${marketInfo.liquidity.lpTokenAddress}`"
							target="blank"
						>
							{{ marketInfo.liquidity.lpTokenAddress | truncate(6) }}
						</a>
						<div class="copy-box d-flex align-items-center ml-2">
							<div class="copy-box_icon">
								<svg-icon
									class="cursor-pointer"
									icon="copy"
									height="20"
									width="20"
									color="#F46E41"
									:fill="false"
									@click="copyToClipboard(marketInfo.liquidity.lpTokenAddress)"
								/>
							</div>
							<span class="font-weight-bolder text-white fs-2 pl-1">copy</span>
						</div>
					</div>
				</div>

				<!-- Auction Detail -->
				<div v-if="info.website && urlCheck" class="pt-3">
					<h5 class="fs-1 font-weight-bold mb-2 text-uppercase">Website:</h5>
					<a
						:href="info.website"
						target="_blank"
						class="font-weight-bold text-white pt-0 mt-0 fs-3"
					>
						<u>{{ info.website }}</u>
					</a>
				</div>
				<div v-if="Object.keys(info.icons.social).length" class="pt-3">
					<div class="d-flex justify-content-between flex-wrap">
						<div class="d-flex flex-column mb-3">
							<h5 class="fs-1 font-weight-bold text-uppercase mb-2">About:</h5>
							<div class="social-sections d-flex flex-wrap">
								<a
									v-for="(item, index) in info.icons.social"
									:key="index"
									:href="item"
									class="
										socials-icon
										svg-color
										pr-4
										fs-3
										font-weight-bold
										text-capitalize
									"
									target="_blank"
								>
									<i :class="icons[index]" class="fs-4" />
									<span>{{ index }}</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div v-if="user.isAdmin" class="pt-4 pr-5">
				<!-- <h5 class="fs-1 mb-1 font-weight-bold text-uppercase">admin:</h5> -->
				<nuxt-link :to="`/auction-admin/${auctionAddress}`">Edit</nuxt-link>
			</div>
			<div v-if="info.description" class="pt-4 pr-5">
				<h5 class="fs-1 mb-1 font-weight-bold text-uppercase">Description:</h5>
				<p class="fs-2">
					<!-- {{ textCheck(info.description, "description") }} -->
					{{ info.description }}
				</p>
			</div>
			<base-divider v-if="!info.description" class="my-4 py-2" />
			<div v-if="info.icons.ingredient.length" class="pt-4 pr-5">
				<h5 class="fs-1 font-weight-bold text-uppercase">Auction Type:</h5>
				<div class="d-flex align-items-center">
					<span class="mr-3">
						<svg-icon
							slot="reference"
							class="mr-2 cursor-pointer"
							:icon="type"
							height="45"
							width="45"
							:original="true"
							:color="computedIconColor"
						/>
					</span>
					<span class="text-capitalize font-weight-bold text-white">
						{{ auctionType }}
					</span>
				</div>
			</div>
		</div>
	</card>
</template>

<script>
import { Card, BaseDivider } from '@/components'
// import { Popover } from "element-ui"
import { theme } from '@/mixins/theme'
import { divNumbers, toPrecision } from '@/util'
import BigNumber from 'bignumber.js'
import { mapGetters } from 'vuex'

export default {
	components: {
		Card,
		BaseDivider,
	},
	mixins: [theme],
	props: {
		user: {
			type: [Object],
			required: true,
		},
		status: {
			type: [Object, Array],
			required: true,
			description: 'full data for status card',
		},
		info: {
			type: [Object, Array],
			required: true,
			description: 'full data for about card',
		},
		marketInfo: {
			type: [Object, Array],
			required: true,
		},
		tokenInfo: {
			type: [Object, Array],
			required: true,
		},
		price: {
			type: [String, Number],
			required: true,
			description: 'current price of the auction',
		},
		type: {
			type: String,
			required: true,
			description: 'full data for status card',
		},
		pointList: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			displaySeconds: '00',
			displayMinutes: '00',
			displayHours: '00',
			displayDays: '00',
			theme: false,
			auctionAddress: this.$route.params.address,
			hoverIcon: {},
			icons: {
				whitepaper: 'fa fa-file',
				github: 'fab fa-github',
				telegram: 'fab fa-telegram',
				wechat: 'fab fa-weixin',
				discord: 'fab fa-discord',
				medium: 'fab fa-medium',
				reddit: 'fab fa-reddit',
				twitter: 'fab fa-twitter',
				docs: 'fa fa-book',
			},
		}
	},
	computed: {
		...mapGetters({
			explorer: 'ethereum/explorer',
		}),
		seconds: () => 1000,
		minutes() {
			return this.seconds * 60
		},
		hours() {
			return this.minutes * 60
		},
		computedStatusColor() {
			if (this.status.auction === 'live') {
				return 'bg-success'
			} else if (this.status.auction === 'upcoming') {
				return 'bg-info'
			}
			return this.status.auction === 'finished' && this.status.auctionSuccessful
				? 'bg-link'
				: 'bg-danger'
		},
		getTooltipEffect() {
			if (this.mode) {
				return 'light'
			}
			return 'dark'
		},
		days() {
			return this.hours * 24
		},
		getFullTime() {
			return `${this.displayDays} : ${this.displayHours} : ${this.displayMinutes} : ${this.displaySeconds}`
		},
		auctionType() {
			if (this.type === 'crowdsale') {
				return 'Crowd Sale'
			}
			return `${this.type} Auction`
		},
		tooltip() {
			if (this.type.toLowerCase() === 'dutch') {
				return 'Dutch Auction'
			} else if (this.type.toLowerCase() === 'batch') {
				return 'Batch Auction'
			}
			return 'Crowdsale'
		},
		checkImage() {
			if (this.info.icon) {
				return this.info.icon.match(/\.(jpeg|jpg|gif|png)$/) != null
			}
			return false
		},
		urlCheck() {
			const pattern = new RegExp(
				'^(https?:\\/\\/)?' + // protocol
					'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
					'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
					'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
					'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
					'(\\#[-a-z\\d_]*)?$',
				'i'
			) // fragment locator

			return !!pattern.test(this.info.website)
		},
		title() {
			return `${this.tokenInfo.name} (${this.tokenInfo.symbol})`
		},
		tokenPriceTitle() {
			if (this.type === 'batch' && parseFloat(this.price) === 0) return 'Token Price:'

			if (this.type === 'dutch' || this.type === 'batch')
				return 'Current Token Price:'

			return 'Token Price:'
		},
		tokenPrice() {
			if (this.type === 'batch' && parseFloat(this.price) === 0)
				return 'Price not determined'

			if (this.type === 'dutch' || this.type === 'batch')
				return `${toPrecision(
					divNumbers(this.marketInfo.commitmentsTotal, this.marketInfo.totalTokens),
					5
				)} ${this.marketInfo.paymentCurrency.symbol}`

			return `${toPrecision(this.marketInfo.currentPrice, 5)} ${
				this.marketInfo.paymentCurrency.symbol
			}`
		},
		tokenPriceStatusColor() {
			if (this.status.auction === 'live') {
				if (this.type === 'dutch') {
					if (
						BigNumber(
							divNumbers(
								this.marketInfo.commitmentsTotal,
								this.marketInfo.totalTokens
							)
						).comparedTo(this.marketInfo.minimumPrice) < 0
					)
						return 'bg-danger'
					return 'bg-success'
				}
				if (this.type === 'batch') {
					if (
						BigNumber(
							divNumbers(
								this.marketInfo.commitmentsTotal,
								this.marketInfo.totalTokens
							)
						).comparedTo(this.marketInfo.minimumCommitmentAmount) < 0
					)
						return 'bg-danger'
					return 'bg-success'
				}
			}
			return 'bg-none'
		},
		tokenPriceTooltip() {
			if (this.type === 'dutch') {
				return 'Auction is only successful if token price goes above reserve price.'
			}
			if (this.type === 'batch') {
				return 'Auction is only successful if token price goes above minimum price.'
			}
			return ''
		},
		computedTokenImg() {
			if (this.info.icon) {
				return this.info.icon
			}
			return require('static/s3/img/token_placeholder.png')
		},
	},
	mounted() {
		this.showCountDown()
	},
	methods: {
		// copy data to clipboard on click & display message
		copyToClipboard(value) {
			navigator.clipboard.writeText(value).then(() => {
				this.$notify({
					type: 'success',
					verticalAlign: 'bottom',
					horizontalAlign: 'right',
					message: 'successfully copied to clipboard!',
				})
			})
		},
		textCheck(str, val) {
			const pattern = /^[()\s0-9a-zA-Z.,/$#:&_-]+$/
			if (str.match(pattern)) {
				return str
			} else {
				return `${val} price`
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
		getIconTooltip(val) {
			const name = `${val} Page`
			const nameCapitalized = name.charAt(0).toUpperCase() + name.slice(1)
			return val === 'whitepaper' ? 'Documentation' : nameCapitalized
		},
	},
}
</script>

<style lang="scss" scoped>
// remove when icon
.social-sections a {
	min-width: 140px;
	margin-bottom: 1rem;
	span {
		text-decoration: underline;
	}
}
.token-img {
	height: 45px;
	width: 45px;
	@media screen and (min-width: 1200px) and (max-width: 1300px) {
		width: 40px;
	}
}
.status-indicator {
	height: 8px;
	width: 8px;
	display: block;
}
.token-price-status-indicator {
	height: 12px;
	width: 12px;
	display: block;
}
.duration {
	min-height: 50px;
	min-width: 152px;
	.bg-primary {
		height: 100%;
		padding: 4px 14px;
		.abbr {
			font-size: 11px;
		}
	}
}

.is-60x60 {
	height: 60px;
	width: 60px;
}
.copy-box {
	padding: 4px 6px;
	position: relative;
	span {
		z-index: 2;
		opacity: 0;
		transition: all 0.3s ease-in;
	}
	svg {
		position: relative;
		z-index: 2;
	}
	&_icon::after {
		position: absolute;
		border-radius: 2px;
		content: '';
		transition: all 0.3s ease-in;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: transparent;
	}
	&_icon:hover {
		& ~ span {
			opacity: 1;
			transition: all 0.3s ease-in;
		}
		&:after {
			content: '';
			opacity: 1;
			background: #111b47;
			transition: all 0.3s ease-in;
		}
	}
}
.about-project {
	@media screen and (max-width: 450px) {
		h4 {
			font-size: 16px;
		}
		p {
			font-size: 12px;
		}
	}
	@media screen and (min-width: 1200px) and (max-width: 1362px) {
		h4 {
			font-size: 15px;
		}
	}
}
@media screen and (min-width: 1200px) and (max-width: 1300px) {
	.card-title {
		font-size: 16px !important;
	}
}
@media screen and (min-width: 976px) and (max-width: 1050px) {
	.card-title {
		font-size: 16px !important;
	}
}
</style>

<style>
.el-popover {
	min-width: auto !important;
}
.popper__arrow::after {
	background: transparent !important;
}
</style>
