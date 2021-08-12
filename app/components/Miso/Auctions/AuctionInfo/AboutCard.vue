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
				<div class="d-flex align-items-center w-100">
					<!-- Logo !-->
					<div class="token-img mr-4">
						<img :src="computedTokenImg" class="img-fluid" />
					</div>
					<!-- Logo !-->

					<div class="d-flex flex-column w-100">
						<div class="d-flex justify-content-between align-items-center">
							<div class="d-flex align-items-center">
								<!-- Title !-->
								<h4 class="card-title font-weight-bold text-capitalize fs-5 mb-1">
									{{ textCheck(title, 'title') }}
								</h4>
								<!-- Title !-->

								<!-- Auction Status !-->
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
								<!-- Auction Status !-->

								<!-- Private !-->
								<div
									v-if="isPrivate"
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
									<img src="@/assets/svg/private.svg" class="mr-2 mb-0" />
									Private
								</div>
								<!-- Private !-->
							</div>

							<!-- Timer !-->
							<div
								v-if="status.auction !== 'upcoming' && status.auction !== 'finished'"
								class="duration mt-sm-0 mt-3 ml-2"
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
							<!-- Timer !-->

							<!-- Status !-->
							<div v-else>
								<span
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
							<!-- Status !-->
						</div>
						<!-- Token Price !-->
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
						<!-- Token Price !-->
					</div>
				</div>
			</div>

			<div v-if="airdropAuctionIds.includes(auctionAddress)">
				<base-divider class="mb-4 mt-2 py-1" />
				<div class="airdrop-info">
					<div class="title text-white font-weight-bold">
						🎈 Airdrop bonus for participants of this auction 🎈
					</div>
					<div class="text-white px-5 my-3">
						Participants are eligible to receive up to a 40% bonus airdrop. Early
						participants enjoy a larger bonus rate.
					</div>
					<div>
						<span class="text-white">To learn about the airdrop details,</span>
						<span
							class="hyperlink font-weight-bold cursor-pointer"
							@click="openModal"
						>
							Click here.
						</span>
					</div>
				</div>
				<warning-modal
					id="warningModal"
					:show.sync="warningModalVisible"
					class="modal-search"
					:centered="true"
					:show-close="false"
					modal-classes="wide-modal"
				>
					<div
						class="d-flex flex-col h-full w-100 bg-white rounded overflow-y-auto p-6"
					>
						<div class="relative mb-2">
							<h2
								class="text-h6 mt-2.5 font-bold mb-0 airdrop-modal-text text-center"
							>
								🎈 BitDAO Airdrop for MISO 🎈
								<br />
								auction participants
							</h2>
						</div>
						<div class="d-flex flex-column flex-sm-row airdrop-modal-content">
							<div class="w-full h-full position-relative" style="flex: 1">
								<div
									class="airdrop-gradient"
									style="width: calc(100% - 20px); height: calc(100% - 20px)"
								></div>
								<div
									class="airdrop-gradient position-absolute"
									style="
										left: 20px;
										top: 20px;
										width: calc(100% - 20px);
										height: calc(100% - 20px);
									"
								>
									<div
										class="
											airdrop-white airdrop-modal-text
											text-center
											d-flex
											flex-column
											items-center
											justify-content-center
										"
									>
										<div class="my-1">Bonus will be in the form of</div>
										<div class="my-1">
											<span class="airdrop-highlight-primary">BIT-ETH-SLP</span>
											<span class="airdrop-modal-text">based on final price</span>
										</div>
										<div
											class="airdrop-gradient my-3"
											style="width: calc(100% - 40px); height: 3px"
										></div>
										<div class="my-1">
											<span class="airdrop-modal-text">SLP will be saked for</span>
											<span class="airdrop-highlight-secondary">90 days,</span>
										</div>
										<div class="my-1">then airdropped after.</div>
									</div>
								</div>
							</div>
							<div
								class="w-full h-full airdrop-gradient ml-sm-3 mt-sm-0 mt-3"
								style="flex: 1; min-height: 150px"
							>
								<div class="airdrop-white">
									<div class="airdrop-table">
										<div class="airdrop-table-row">
											<div class="font-bold">Airdrop Tier</div>
											<div class="font-bold">Bonus Allocation</div>
										</div>
										<div class="airdrop-table-row">
											<div>First 10% of commitments</div>
											<div>40%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>35.6%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>31.1%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>26.7%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>22.2%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>17.8%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>13.3%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>8.9%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>4.4%</div>
										</div>
										<div class="airdrop-table-row">
											<div>Next 10% of commitments</div>
											<div>0%</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</warning-modal>
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
				<nuxt-link :to="`/auction-admin/${auctionAddress}`">Edit</nuxt-link>
			</div>
			<div v-if="info.description" class="pt-4 pr-5">
				<h5 class="fs-1 mb-1 font-weight-bold text-uppercase">Description:</h5>
				<p class="fs-2">
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
import { theme } from '@/mixins/theme'
import { divNumbers, toPrecision, zeroAddress } from '@/util'
import BigNumber from 'bignumber.js'
import { mapGetters } from 'vuex'
import WarningModal from '@/components/WarningModal.vue'

export default {
	components: {
		Card,
		BaseDivider,
		WarningModal,
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
			airdropAuctionIds: [
				'0xc9d8f38fEfD57B77beEdC156C955Db8E5084912e',
				'0x831dC63790468299c57928809ec4eA34DC8C475f',
				'0x4c4564a1FE775D97297F9e3Dc2e762e0Ed5Dda0e',
			],
			warningModalVisible: false,
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
		isPrivate() {
			return (
				this.marketInfo.hasPointList &&
				this.marketInfo.pointListAddress !== zeroAddress
			)
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
						BigNumber(this.marketInfo.commitmentsTotal).comparedTo(
							this.marketInfo.minimumCommitmentAmount
						) < 0
					)
						return 'bg-danger'
					return 'bg-success'
				}
				if (this.type === 'crowdsale') {
					if (
						BigNumber(this.marketInfo.commitmentsTotal).comparedTo(
							this.marketInfo.goal
						) < 0
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
				return 'Auction is only successful if amount raised goes above min raise.'
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
		openModal() {
			this.warningModalVisible = true
		},
		closeModal() {
			this.warningModalVisible = false
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

.airdrop-info {
	text-align: center;
	.title {
		font-size: 1rem;
	}
	.hyperlink {
		color: rgb(186, 35, 171);
	}
}
.airdrop-gradient {
	background: linear-gradient(
		90.07deg,
		#eb8a90 0.06%,
		#f9c2ca 35.13%,
		#2d82b7 63.04%,
		#5cc7f2 86.62%,
		#5cc7f2 99.94%
	);
	border-radius: 8px;
}
.airdrop-white {
	background: white;
	width: calc(100% - 3px);
	height: calc(100% - 3px);
	margin-left: 1.5px;
	margin-top: 1.5px;
	border-radius: 8px;
	padding: 10px;

	span {
		font-size: 14px !important;
	}
}
.airdrop-highlight-primary {
	color: #3989bb !important;
}
.airdrop-highlight-secondary {
	color: #db627d !important;
}
.airdrop-modal-content {
	height: 300px;
}
@media screen and (max-width: 575px) {
	.airdrop-modal-content {
		height: 450px;
	}
}
.airdrop-table {
	overflow-y: scroll;
	height: 100%;
	.airdrop-table-row {
		display: flex;
		flex-direction: row;
		padding: 15px 0;
		border-bottom: 0.4px solid rgba(0, 0, 0, 0.3);
		div:first-child {
			flex: 6;
			margin-right: 15px;
		}
		div:last-child {
			flex: 4;
		}
	}
}
.airdrop-modal-text {
	color: black !important;
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
