<template>
	<div>
		<div v-if="restricted" class="col-12 restricted-card-container">
			<region-restricted-card :warning-content="bannedWarning" />
		</div>
		<warning-modal
			id="warningModal"
			:show.sync="warningModalVisible"
			class="modal-search"
			:centered="true"
			:show-close="true"
			:cancellable="false"
		>
			<div
				class="d-flex flex-col h-full w-100 bg-dark-900 rounded overflow-y-auto p-6"
			>
				<div class="relative mb-2">
					<h2 class="text-h6 mt-2.5 font-bold mb-0 text-primary text-center">
						Region Restriction Detected
					</h2>
					<div
						class="p-1 absolute top-0 right-0 w-5 h-5 rounded-full border-2 text-primary hover:text-high-emphesis border-primary d-flex items-center justify-content-center cursor-pointer"
						@click="closeModal"
					>
						<svg
							width="8px"
							height="8px"
							viewBox="0 0 8 8"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								class="stroke-current stroke-1"
								d="M6.8746 7.54507C6.6953 7.54507 6.52679 7.47526 6.40003 7.34844L4.00001 4.94841L1.60003 7.34844C1.47327 7.47526 1.30473 7.54507 1.12547 7.54507C0.946204 7.54507 0.777659 7.47526 0.650905 7.34844C0.524152 7.22169 0.454346 7.05317 0.454346 6.87394C0.454346 6.69468 0.524152 6.52616 0.650905 6.39938L3.05093 3.99934L0.650905 1.5993C0.389254 1.33762 0.389254 0.911858 0.650905 0.650175C0.777659 0.52342 0.946174 0.453613 1.12547 0.453613C1.30473 0.453613 1.47327 0.52342 1.60003 0.650175L4.00005 3.05021L6.40007 0.650175C6.52685 0.52342 6.69536 0.453613 6.87463 0.453613C7.05386 0.453613 7.22237 0.52342 7.34912 0.650175C7.47591 0.776929 7.54568 0.945476 7.54568 1.12474C7.54568 1.304 7.47591 1.47255 7.34912 1.5993L4.94911 3.99934L7.34919 6.39938C7.47597 6.52616 7.54578 6.69468 7.54578 6.87394C7.54578 7.05317 7.47597 7.22169 7.34919 7.34844C7.22234 7.47523 7.05383 7.54507 6.8746 7.54507ZM4.00001 4.90511L6.42168 7.3268C6.54262 7.4478 6.70348 7.51445 6.8746 7.51445C7.04565 7.51445 7.20651 7.4478 7.32751 7.3268C7.44848 7.20586 7.51513 7.04503 7.51513 6.87394C7.51513 6.70285 7.44848 6.54199 7.32751 6.42102L4.90578 3.99934L7.32745 1.57766C7.44842 1.45669 7.51504 1.29583 7.51504 1.12474C7.51504 0.95365 7.44842 0.792819 7.32745 0.671851C7.20651 0.550883 7.04568 0.484261 6.8746 0.484261C6.70351 0.484261 6.54265 0.550883 6.42168 0.671851L4.00001 3.09354L1.57835 0.671851C1.45738 0.550883 1.29652 0.484261 1.12543 0.484261C0.954348 0.484261 0.793519 0.550883 0.672552 0.671851C0.422841 0.921594 0.422841 1.32791 0.672552 1.57766L3.09422 3.99934L0.672552 6.42102C0.551585 6.54199 0.484962 6.70285 0.484962 6.87394C0.484962 7.04503 0.551585 7.20586 0.672552 7.3268C0.793549 7.4478 0.954379 7.51445 1.12547 7.51445C1.29655 7.51445 1.45738 7.4478 1.57838 7.3268L4.00001 4.90511Z"
							/>
						</svg>
					</div>
				</div>
				<div class="restriction-panel">
					<div class="restriction-line">
						Unfortunately, the project has detected you are visiting from a country
						they have restricted from participating.
					</div>
					<div class="restriction-line">
						<span class="font-bold">
							By clicking the [Agree and Continue] button below,
						</span>
						<span>
							I (the “Buyer”) hereby acknowledge, represent and warrant that the
							statements set forth below are true and correct as of the date hereof:
						</span>
					</div>
					<div class="restriction-line">
						1. The Buyer is not a U.S. person (as defined in Rule 902(k) of Regulation
						S under the Securities Act) and is not purchasing the BitDAO tokens for
						the account or benefit of a U.S. person.
					</div>
					<div class="restriction-line">
						2. The Buyer is not a person in the United States when the BitDAO tokens
						were or are offered to the Buyer or, if applicable, its Affiliates (as
						defined in Rule 501(b) of Regulation D under the U.S. Securities Act of
						1933, as amended (the “Securities Act”)); and the Buyer, including any
						authorized director, employee, signatory or representative who places the
						buy order, is outside the United States at the time the buy order is
						originated.
					</div>
					<div class="restriction-line">
						3. The Buyer is eligible to participate in the BitDAO token offering,
						whether as a professional, sophisticated or accredited investor or
						otherwise, as may be required under the laws of the jurisdiction in which
						it is located or other applicable to it.
					</div>
					<div class="restriction-line">
						4. The Buyer has the requisite experience, knowledge and expertise in
						financial and business matters as to be capable of evaluating the merits,
						risks and suitability of participating in the BitDAO token offering.
					</div>
					<div class="restriction-line">
						5. The Buyer has not entered into any agreement or arrangement (including
						any derivatives arrangement) for or in connection with, and is not
						purchasing the BitDAO tokens with the view of entering into any agreement
						or arrangement (including any derivatives arrangement) with another person
						for or in connection with, the resale or transfer of the BitDAO tokens,
						under which the economic benefits and risks of the BitDAO tokens would
						pass on to such person. Notwithstanding the foregoing, the Buyer shall not
						transfer any BitDAO tokens at any time if such transfer would result in a
						violation of any applicable laws, including but not limited to transfer
						restrictions.
					</div>
					<div class="restriction-line">
						6. The Buyer understands that to the extent that the BitDAO tokens are
						securities or other regulated products or instruments under the laws of
						any jurisdiction in which the BitDAO tokens are to be traded or subject of
						transfers, such trades or transfers of the BitDAO tokens may be restricted
						by such laws.
					</div>
					<div class="restriction-line">
						7. The Buyer further understands and agrees that the BitDAO tokens shall
						be subject to transfer restrictions under applicable laws. The Buyer
						agrees, and undertakes to notify and procure each subsequent buyer or
						transferee of BitDAO tokens to agree, that the BitDAO tokens may be
						offered, sold or otherwise transferred only:
					</div>
					<div class="restriction-line">
						a. pursuant to a registration statement that has been declared effective
						under the Securities Act;
					</div>
					<div class="restriction-line">
						b. outside the United States in compliance with Rule 904 of Regulation S
						under the Securities Act; or
					</div>
					<div class="restriction-line">
						c. pursuant to any other available exemption from the registration
						requirements of the Securities Act,
					</div>
					<div class="restriction-line">
						subject, in each of the above cases, to any requirement of laws that the
						disposition of property by the Buyer or subsequent buyer or transferee, as
						the case may be, be at all times within the Buyer’s or subsequent buyer’s
						or transferee’s control, as the case may be, and in compliance with
						applicable state and other securities laws.
					</div>
				</div>
				<div class="mt-3 d-flex justify-content-center">
					<base-button type="primary" :round="true" @click="closeModal">
						Agree and Continue
					</base-button>
				</div>
			</div>
		</warning-modal>
		<div v-if="!loading" class="row mt-4 pt-3 justify-content-center">
			<div class="col-12 col-lg-6">
				<about-card
					:info="about"
					:market-info="marketInfo"
					:token-info="tokenInfo"
					:user="userInfo"
					:price="marketInfo.currentPrice"
					:type="status.type"
					:status="status"
				/>
			</div>
			<div class="col-12 col-lg-6 mt-4 pt-3 pt-lg-0 mt-lg-0">
				<live-status
					:status="status"
					:market-info="marketInfo"
					:token-info="tokenInfo"
					:user-info="userInfo"
					:restricted="restricted"
					@updateUserInfo="updateUserInfo"
					@auctionFinalized="finalizeAuction"
				/>
			</div>
			<br />
			<div class="col-12 col-lg-12 mt-4 pt-3">
				<commitments
					:commitments="listCommitments"
					:short-currency="marketInfo.paymentCurrency.symbol"
					:total-tokens="marketInfo.totalTokens"
					:total-tokens-committed="marketInfo.totalTokensCommitted"
					:current-price="marketInfo.currentPrice"
					:minimum-price="marketInfo.minimumPrice"
				/>
			</div>
		</div>
		<loader v-else width="80" height="80" y="250" />
	</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { getContractInstance as misoHelperContract } from '@/services/web3/misoHelper'
import { clearingPrice } from '@/services/web3/auctions/dutch'
import { getContractInstance as getAuctionContract } from '@/services/web3/auctions/auction'
import { getContractInstance as postAuctionLauncherContract } from '@/services/web3/postAuctionLauncher'
import { makeBatchCall } from '@/services/web3/base'
import { toDecimals, toPrecision, to18Decimals, toNDecimals } from '@/util/index'
import AboutCard from '@/components/Miso/Auctions/AuctionInfo/AboutCard'
import RegionRestrictedCard from '@/components/Miso/Auctions/AuctionInfo/RegionRestrictedCard'
import LiveStatus from '@/components/Miso/Auctions/AuctionInfo/LiveStatus'
import Commitments from '@/components/Miso/Auctions/Commitments'
import WarningModal from '@/components/WarningModal.vue'
import {
	badAuctions as badAuctionsAddress,
	commitmentDisableAuctions as commitmentDisableAuctionsAddress,
} from '@/constants/contracts'
import BigNumber from 'bignumber.js'

const TOPIC_ADDED_COMMITMENT =
	'0x077511a636ba1f10551cc7b89c13ff66a6ac9344e8a917527817a9690b15af7a'

export default {
	name: 'AuctionInfo',
	components: {
		LiveStatus,
		AboutCard,
		Commitments,
		RegionRestrictedCard,
		WarningModal,
	},
	data() {
		return {
			auctionAddress: this.$route.params.address,
			auctionCommitmentsTotal: BigNumber(0),
			// can be Object or Array
			about: {
				icons: {
					social: {},
					ingredient: [
						{
							icon: 'liquidity-1',
							text: 'Pool Liquidity',
						},
						{
							icon: 'mintable-2',
							text: 'Mintable',
						},
						{
							icon: 'crowdsale',
							text: 'Crowdsale',
						},
					],
				},
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
				paymentCurrency: {
					addr: null,
					name: '',
					symbol: '',
					decimals: 0,
				},
				hasPointList: false,
				pointListAddress: '',
				totalTokens: 0,
				commitmentsTotal: 0,
				wallet: '',
				liquidity: {
					liquidityTemplate: null,
					lpTokenAddress: null,
				},
				finalized: 0,
			},
			tokenInfo: {
				address: '',
				name: '',
				symbol: '',
			},
			userInfo: {
				commitments: 0,
				tokensClaimable: 0,
				claimed: 0,
				isAdmin: 0,
			},
			contractInstance: null,
			loading: true,
			subscription: null,
			aboutStatus: {},
			restricted: false,
			bannedWarning: '',
			bannedCountries: [],
			warningModalVisible: false,
		}
	},
	computed: {
		...mapGetters({
			coinbase: 'ethereum/coinbase',
			commitmentsTotal: 'commitments/commitmentsTotal',
			listCommitments: 'commitments/list',
		}),
	},
	watch: {
		commitmentsTotal(newValue) {
			this.marketInfo.commitmentsTotal = toPrecision(newValue, 5)
			if (this.status.type === 'dutch') {
				this.updateDutchData()
			} else if (this.status.type === 'crowdsale') {
				this.updateCrowdsaleData()
			} else if (this.status.type === 'batch') {
				this.updateBatchData()
			}
		},
	},
	async mounted() {
		if (badAuctionsAddress.includes(this.auctionAddress)) {
			this.$router.push('/')
			return
		}
		await this.getTemplateId()
		let type
		// let finishAuction
		switch (parseInt(this.marketTemplateId)) {
			case 1:
				type = 'crowdsale'
				await this.setCrowdsaleData()
				// finishAuction = this.marketInfo.totalTokensCommitted
				break
			case 2:
				type = 'dutch'
				await this.setDutchAuctionData()
				break
			case 3:
				type = 'batch'
				await this.setBatchData()
				break
			case 4:
				type = 'hyperbolic'
				break
			default:
				break
		}
		const currentTimestamp = Date.parse(new Date()) / 1000
		let auction
		if (this.marketInfo.finalized) {
			auction = 'finished'
		} else if (this.marketInfo.startTime > currentTimestamp) {
			auction = 'upcoming'
			this.status.date = new Date(this.marketInfo.startTime * 1000)
		} else if (currentTimestamp < this.marketInfo.endTime) {
			auction = 'live'
			this.status.date = new Date(this.marketInfo.endTime * 1000)
		} else {
			auction = 'finished'
		}
		Object.assign(this.status, { type, auction })
		if (this.coinbase) {
			await this.updateUserInfo()
		}
		if (commitmentDisableAuctionsAddress.includes(this.auctionAddress)) {
			await this.getPastCommitmentsForDisableAuction()
		} else {
			await this.getPastCommitments()
		}
		this.subscribeToNewCommitments()

		// Documents
		const methods = [{ methodName: 'getDocuments', args: [this.auctionAddress] }]
		const [documents] = await makeBatchCall(misoHelperContract(), methods)

		documents.forEach((document) => {
			const name = document['0']
			const data = document['1']
			if (name && data && data.length > 0) {
				switch (name) {
					case 'website':
					case 'icon':
					case 'desktopBanner':
					case 'mobileBanner':
					case 'description':
						this.about[name] = data
						break
					case 'bannedWarning':
						this.bannedWarning = data
						break
					case 'bannedCountries':
						this.bannedCountries = data.split(',')
						break
					default:
						this.about.icons.social[name] = data
				}
			}
		})

		// PointList
		const pointListMethod = [{ methodName: 'pointList' }]
		const [pointList] = await makeBatchCall(
			getAuctionContract(this.auctionAddress),
			pointListMethod
		)
		this.marketInfo.pointListAddress = pointList

		// Check banned countries
		if (this.bannedCountries.length > 0) {
			try {
				const country = await (await fetch('https://ipapi.co/country')).text()
				if (this.bannedCountries.includes(country)) {
					this.restricted = true
					this.warningModalVisible = true
				}
			} catch (error) {}
		}

		this.loading = false
	},
	beforeDestroy() {
		this.subscription.unsubscribe()
		this.resetCommitmentsState()
	},
	methods: {
		...mapActions({
			setCommitments: 'commitments/setCommitments',
			addCommitment: 'commitments/addCommitment',
			resetCommitmentsState: 'commitments/resetCommitmentsState',
		}),
		async setDutchAuctionData() {
			const methods = [
				{ methodName: 'getDutchAuctionInfo', args: [this.auctionAddress] },
			]
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
			this.marketInfo.finalized = data.finalized
			this.marketInfo.commitmentsTotal = toPrecision(
				toDecimals(data.commitmentsTotal, this.marketInfo.paymentCurrency.decimals),
				5
			)

			this.marketInfo.totalTokens = toDecimals(data.totalTokens)

			this.status.auctionSuccessful = data.auctionSuccessful
			const currentTimestamp = Date.parse(new Date()) / 1000
			if (data.startTime > currentTimestamp) {
				this.status.date = new Date(data.startTime * 1000)
			} else {
				this.status.date = new Date(data.endTime * 1000)
			}
			this.updateDutchData()

			this.auctionCommitmentsTotal = BigNumber(data.commitmentsTotal)
		},

		async setCrowdsaleData() {
			const methods = [
				{ methodName: 'getCrowdsaleInfo', args: [this.auctionAddress] },
			]
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
			// this.marketInfo.finalized = false
			this.marketInfo.finalized = data.finalized
			this.marketInfo.commitmentsTotal = toPrecision(
				toDecimals(data.commitmentsTotal, this.marketInfo.paymentCurrency.decimals),
				5
			)

			this.status.auctionSuccessful = data.auctionSuccessful
			this.status.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.currentPrice = toPrecision(1 / this.marketInfo.rate, 2)
			this.updateCrowdsaleData()

			this.auctionCommitmentsTotal = BigNumber(data.commitmentsTotal)
		},

		async setBatchData() {
			const methods = [
				{ methodName: 'getBatchAuctionInfo', args: [this.auctionAddress] },
			]
			const [data] = await makeBatchCall(misoHelperContract(), methods)
			const tokenInfo = data.tokenInfo
			this.marketInfo.paymentCurrency = data.paymentCurrencyInfo

			this.setTokenInfo(tokenInfo)
			this.marketInfo.startTime = data.startTime
			this.marketInfo.endTime = data.endTime
			this.marketInfo.hasPointList = data.usePointList
			this.marketInfo.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.finalized = data.finalized
			this.marketInfo.commitmentsTotal = toPrecision(
				toDecimals(data.commitmentsTotal, this.marketInfo.paymentCurrency.decimals),
				5
			)
			this.marketInfo.minimumCommitmentAmount = toDecimals(
				data.minimumCommitmentAmount,
				this.marketInfo.paymentCurrency.decimals
			)

			this.status.auctionSuccessful = data.auctionSuccessful
			this.status.totalTokens = toDecimals(data.totalTokens)
			this.marketInfo.currentPrice = toPrecision(
				this.marketInfo.commitmentsTotal / this.status.totalTokens,
				5
			)

			this.auctionCommitmentsTotal = BigNumber(data.commitmentsTotal)
		},

		updateDutchData() {
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
					this.marketInfo.commitmentsTotal,
					this.marketInfo.paymentCurrency.decimals
				),
			}
			const price = clearingPrice(marketInfo)
			this.marketInfo.currentPrice = toPrecision(
				toDecimals(price, this.marketInfo.paymentCurrency.decimals),
				5
			)
			const tokensCommitted =
				this.marketInfo.commitmentsTotal / this.marketInfo.currentPrice
			this.marketInfo.totalTokensCommitted = toPrecision(tokensCommitted, 3)
		},

		updateCrowdsaleData() {
			const tokensCommitted = this.marketInfo.commitmentsTotal * this.marketInfo.rate
			this.marketInfo.totalTokensCommitted = toPrecision(tokensCommitted, 3)
		},

		updateBatchData() {
			const price = this.marketInfo.commitmentsTotal / this.marketInfo.totalTokens
			this.marketInfo.currentPrice = toPrecision(price, 3)
		},

		async updateUserInfo() {
			const methods = [
				{
					methodName: 'getUserMarketInfo',
					args: [this.auctionAddress, this.coinbase],
				},
			]

			const [userInfo] = await makeBatchCall(misoHelperContract(), methods)

			this.userInfo.commitments = userInfo.commitments
			this.userInfo.tokensClaimable = userInfo.tokensClaimable
			this.userInfo.claimed = userInfo.claimed
			this.userInfo.isAdmin = userInfo.isAdmin
		},

		async getTemplateId() {
			const methods = [{ methodName: 'marketTemplate' }, { methodName: 'wallet' }]
			const [marketTemplate, wallet] = await makeBatchCall(
				getAuctionContract(this.auctionAddress),
				methods
			)
			this.marketTemplateId = marketTemplate
			this.marketInfo.wallet = wallet

			// Get Liquidity Template
			const method = [
				{ methodName: 'liquidityTemplate' },
				{ methodName: 'getLPTokenAddress' },
			]
			try {
				const [liquidityTemplate, lpTokenAddress] = await makeBatchCall(
					postAuctionLauncherContract(wallet),
					method
				)
				this.marketInfo.liquidity.liquidityTemplate = Number(liquidityTemplate)
				this.marketInfo.liquidity.lpTokenAddress = lpTokenAddress
			} catch (error) {
				this.marketInfo.liquidity.liquidityTemplate = null
				this.marketInfo.liquidity.lpTokenAddress = null
			}
		},

		finalizeAuction() {
			this.marketInfo.finalized = true
		},

		setTokenInfo(tokenInfo) {
			this.tokenInfo = tokenInfo
		},

		subscribeToNewCommitments() {
			this.subscription = web3socket.eth
				.subscribe(
					'logs',
					{
						address: this.auctionAddress,
						topics: [TOPIC_ADDED_COMMITMENT],
					},
					(error, result) => {
						if (!error) {
							const decodedData = web3.eth.abi.decodeParameters(
								['address', 'uint256'],
								result.data
							)
							this.addCommitment({
								txHash: result.transactionHash,
								timestamp: result.blockNumber,
								address: decodedData[0],
								amount: toDecimals(
									decodedData[1],
									this.marketInfo.paymentCurrency.decimals
								),
							})
						}
					}
				)
				.on('connected', function (subscriptionId) {
					console.log('subscriptionId:', subscriptionId)
				})
				.on('data', function (log) {})
				.on('changed', function (log) {
					console.log('changed:', log)
				})
		},
		async getPastCommitmentsForDisableAuction() {
			const commitments = []
			let total = BigNumber(0)
			let blockNumber = await web3.eth.getBlockNumber()

			while (blockNumber > 0 && this.auctionCommitmentsTotal.isGreaterThan(total)) {
				const logs = await web3.eth.getPastLogs({
					fromBlock: blockNumber - 100,
					toBlock: blockNumber,
					address: this.auctionAddress,
					topics: [TOPIC_ADDED_COMMITMENT],
				})
				blockNumber -= 101
				logs.forEach((log) => {
					const decodedData = web3.eth.abi.decodeParameters(
						['address', 'uint256'],
						log.data
					)
					total = total.plus(BigNumber(decodedData[1]))
					commitments.push({
						txHash: log.transactionHash,
						timestamp: log.blockNumber,
						address: decodedData[0],
						amount: toDecimals(
							decodedData[1],
							this.marketInfo.paymentCurrency.decimals
						),
					})
				})
			}

			this.setCommitments(commitments)
		},
		async getPastCommitments() {
			const commitments = []
			const logs = await web3.eth.getPastLogs({
				fromBlock: 0,
				toBlock: 'latest',
				address: this.auctionAddress,
				topics: [TOPIC_ADDED_COMMITMENT],
			})
			logs.forEach((log) => {
				const decodedData = web3.eth.abi.decodeParameters(
					['address', 'uint256'],
					log.data
				)
				commitments.push({
					txHash: log.transactionHash,
					timestamp: log.blockNumber,
					address: decodedData[0],
					amount: toDecimals(
						decodedData[1],
						this.marketInfo.paymentCurrency.decimals
					),
				})
			})

			this.setCommitments(commitments)
		},
		closeModal() {
			this.warningModalVisible = false
		},
	},
}
</script>

<style lang="scss" scoped>
.restricted-card-container {
	padding: 0;
	margin-left: -30px;
	width: calc(100% + 60px);
	max-width: calc(100% + 60px);
}
.text-h6 {
	font-size: 20px !important;
	line-height: 24px !important;
	letter-spacing: -0.01em;
}
.restriction-panel {
	background: rgba(50, 55, 80, 0.49);
	border-radius: 8px;
	height: 100%;
	max-height: 450px;
	overflow-y: scroll;
	padding: 20px;
}
.restriction-line {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.8);
	margin: 8px 0;
	span {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
	}
}
</style>
