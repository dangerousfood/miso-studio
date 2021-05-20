<template>
	<div class="container-fluid container-padding">
		<div v-if="!loading" class="row video-normal">
			<div class="col-lg-4 col-md-6 col-12 mb-3">
				<div class="text-white card-title">SAKE Sale</div>
				<div class="text-white card-description pb-2">
					Participate in the Sake Sale, the first sale to launch on MISO.
				</div>
				<nuxt-link
					:to="`/auctions/${saketokenauction}`"
					tag="div"
					class="cursor-pointer specialCard"
				>
					<special-card
						:auction="saketokenauction"
						:ingredients="ingredients"
						:buybuttonflag="true"
					/>
				</nuxt-link>
			</div>
			<div class="col-lg-8 col-md-6 col-12 mb-3">
				<div class="text-white card-title">About SAKE</div>
				<div class="text-white card-description pb-2">
					Sake documentary teaser. Visit&nbsp;
					<a
						href="https://sake.sushi.com"
						target="_blank"
						class="sake-com text-white"
					>
						sake.sushi.com
					</a>
					&nbsp;for more information.
				</div>
				<vue-plyr :options="options">
					<div class="plyr__video-embed">
						<iframe
							src="https://www.youtube.com/watch?v=IUb6K1AMUvA"
							allowfullscreen
							allowtransparency
						></iframe>
					</div>
				</vue-plyr>
			</div>
		</div>
		<loader v-else width="80" height="80" y="250" />
		<div>
			<div class="miso-ama-logo px-2">
				<img :src="computedMisoAma" />
			</div>
			<div class="miso-ama-description px-2 text-white">
				Follow interviews and articles on Medium and Youtube to find out more about
				MISO.
			</div>
			<div class="ama-cards row">
				<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
					<ama-card
						headerimage="amaheader01.png"
						:youtubeflag="true"
						title="MISO Token Launchpad Intro"
						pubdate="May 12, 2021"
						linkurl="https://www.youtube.com/watch?v=DthRoorpw60"
					/>
				</div>
				<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
					<ama-card
						headerimage="amaheader02.png"
						:youtubeflag="false"
						title="How To Participate in MISO Auctions"
						pubdate="May 2, 2021"
						linkurl="https://instantmiso.gitbook.io/miso/using-miso/participating-in-an-auction"
					/>
				</div>
				<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
					<ama-card
						headerimage="amaheader03.png"
						:youtubeflag="false"
						title="SUSHI + MISO: The Perfect Combo"
						pubdate="May 14, 2021"
						linkurl="https://medium.com/sushiswap-org/sushi-miso-the-perfect-combo-9883548706b1"
					/>
				</div>
				<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
					<ama-card
						headerimage="amaheader04.png"
						:youtubeflag="false"
						title="MISO: Cooking New Tokens From Scratch"
						pubdate="May 16, 2021"
						linkurl="https://medium.com/sushiswap-org/miso-cooking-new-tokens-from-scratch-c6be6aad64a"
					/>
				</div>
			</div>
		</div>
		<auction-modal
			v-if="showModal && coinbase && !isRightNetwork"
			@close="showModal = false"
		></auction-modal>
	</div>
</template>

<script>
import SpecialCard from '@/components/Miso/Auctions/Specials/SpecialCard'
import AmaCard from '@/components/Miso/Auctions/Specials/AmaCard'
import AuctionModal from '@/components/web3-core/navbar/AuctionModal'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'LiveAuctions',
	components: {
		SpecialCard,
		AmaCard,
		AuctionModal,
	},
	data() {
		return {
			loading: true,
			auctionsList: [],
			ingredients: [
				{
					icon: 'wheat',
					text: 'Mintable',
				},
				{
					icon: 'teapot',
					text: 'Pool Liquidity',
				},
				{
					icon: 'crowd',
					text: 'Crowdsale',
				},
			],
			options: { quality: { default: '1080p' } },
			saketokenauction: '0x5cFEb913fe8aE7e5E63E5930F044f36Ba4B882aB',
			showModal: true,
		}
	},
	computed: {
		...mapGetters({
			auctions: 'auctions/list',
			coinbase: 'ethereum/coinbase',
			isRightNetwork: 'ethereum/isRightNetwork',
			mode: 'theme/getMode',
		}),
		computedSakeImage() {
			if (this.mode) {
				return require('~/assets/images/sake_white.png')
			}
			return require('~/assets/images/sake_black.png')
		},
		computedMisoAma() {
			if (this.mode) {
				return require('~/assets/svg/misoamalog.svg')
			}
			return require('~/assets/svg/misoamalog-dark.svg')
		},
	},
	watch: {},
	mounted() {
		this.initAuctions()
	},
	methods: {
		...mapActions({
			getAuctions: 'auctions/getAuctions',
		}),
		async initAuctions() {
			await this.getAuctions()
			this.auctionsList = this.auctions
				.filter((aution) => {
					const currentTimestamp = Date.parse(new Date()) / 1000
					return (
						currentTimestamp >= parseInt(aution.startTime) &&
						currentTimestamp < parseInt(aution.endTime)
					)
				})
				.map((x) => x[0])
			this.loading = false
		},
	},
}
</script>

<style lang="scss" scoped>
.title {
	font-size: 1rem;
	letter-spacing: 0.25rem;
	padding-left: 3rem;
	// padding-right: 3rem;
	@media screen and (max-width: 800px) {
		padding-left: 2rem;
		// padding-right: 2rem;
	}
	@media screen and (max-width: 750px) {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	@media screen and (max-width: 700px) {
		font-size: 0.7rem;
		letter-spacing: 0.1rem;
		padding-left: 0.7rem;
		padding-right: 0.7rem;
	}
	@media screen and (max-width: 500px) {
		font-size: 0.5rem;
		letter-spacing: 0.08rem;
		padding-left: 0.5rem;
		padding-right: 0.5rem;
	}
	@media screen and (max-width: 360px) {
		font-size: 0.4rem;
		letter-spacing: 0.04rem;
		padding-left: 0.4rem;
		padding-right: 0.4rem;
	}
}

.image-rem-size {
	width: 6rem;
	height: 6rem;
	@media screen and (max-width: 700px) {
		width: 4rem;
		height: 4rem;
	}
	@media screen and (max-width: 500px) {
		width: 3rem;
		height: 3rem;
	}
	@media screen and (max-width: 360px) {
		width: 2rem;
		height: 2rem;
	}
}

.specialCard {
	transition: all 0.4s ease-in-out;
	transform: scale(1);
	max-width: 490px;
	@media screen and (max-width: 768px) {
		max-width: 100%;
	}
}

.gradient-background {
	background-image: linear-gradient(
		90deg,
		rgba(91, 13, 131, 0.3) 24.52%,
		rgba(248, 60, 44, 0.3) 52.9%
	);
	text-align: center;
	font-weight: bold;
	font-size: 24px;
	height: 100px;
	min-height: 100px;
	width: 100%;
	border-radius: 6px;
}

.top-50 {
	top: 50%;
	position: relative;
}

.sake-img {
	width: 80px;
	position: relative;
	top: -80%;
}

.container-padding {
	padding-top: 20px;
}

.miso-ama {
	background-image: linear-gradient(
		180deg,
		rgba(59, 20, 99, 0.8) 5%,
		rgba(59, 20, 99, 1) 20%,
		rgba(59, 20, 99, 0) 55%
	);
	background-size: 100% 100%;
	text-align: center;
	border-radius: 8px;
}

.miso-ama-description {
	color: white;
	padding-top: 50px;
}

.miso-ama-logo {
	padding-top: 75px;
}

.ama-cards {
	padding-top: 50px;
	padding-bottom: 30px;
	margin-left: 5px;
	margin-right: 5px;
}

.ama-card-single {
	z-index: 2;
	padding-left: 5px;
	padding-right: 5px;
}

.footer-link {
	display: none;
}

.copyright {
	display: none;
}

.card-title {
	font-size: 18px;
	font-weight: bold;
}

.gallery-card {
	padding-top: 15px !important;
	text-align: center;
}

.sake-com {
	// color: white;
	text-decoration: underline;
}

.gal-play {
	position: absolute;
	left: 45%;
	top: 35%;
}

.card-description {
	font-size: 12px;
	min-height: 52px;
}

.sake-text {
	display: flex;
	justify-content: space-between;
	flex: 1;
}

.video-poster {
	object-fit: cover;
}

.video-mobile {
	display: none;
	@media screen and (max-width: 767px) {
		display: block;
	}
}

.video-normal {
	@media screen and (max-width: 768px) {
		flex-direction: column-reverse;
	}
}

.header-left {
	flex: 1;
}

.header-right {
	flex: 2;
	@media screen and (min-width: 768px) and (max-width: 991px) {
		flex: 1;
	}
	@media screen and (max-width: 767px) {
		flex: 1;
	}
}

.sake-logo-image {
	@media screen and (min-width: 992px) {
		padding-left: 0.5rem;
	}
	@media screen and (min-width: 768px) and (max-width: 991px) {
		padding-left: 2rem;
	}
}
</style>
