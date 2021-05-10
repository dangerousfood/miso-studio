<template>
	<div class="container-fluid container-padding">
		<div class="my-4 gradient-background">
			<div class="top-50 text-white title">
				Let us celebrate with a sip of SAKE.
			</div>
			<img class="sake-img" src="@/assets/svg/sake.svg" />
		</div>
		<div v-if="!loading" class="row">
			<div
				v-for="(auction, id) in auctionsList.slice(0, 1)"
				:key="id"
				class="col-lg-4 col-md-6 col-12 mb-3"
			>
				<div class="text-white card-title">SAKE Sale</div>
				<nuxt-link
					:to="`/auctions/${auction}`"
					tag="div"
					class="cursor-pointer specialCard"
				>
					<special-card
						:auction="auction"
						:ingredients="ingredients"
						:buybuttonflag="true"
					/>
				</nuxt-link>
			</div>
			<div class="col-lg-8 col-md-6 col-12 mb-3">
				<div class="text-white card-title">Gallery</div>
				<card v-if="!loading" class="gallery-card p-2 card-hight">
					<img src="@/assets/images/gallery01.png" />
					<p class="sake-com">sake.com</p>
					<a href="https://www.youtube.com/watch?v=IV0V7vjakKg" target="_blank">
						<img src="@/assets/images/playbutton.png" class="gal-play" />
					</a>
				</card>
			</div>
		</div>
		<loader v-else width="80" height="80" y="250" />
		<div class="ama-cards row">
			<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
				<ama-card
					headerimage="amaheader01.png"
					:youtubeflag="true"
					title="What is MISO?"
					pubdate="Feb 2, 2021"
					linkurl="https://www.youtube.com/watch?v=IV0V7vjakKg"
				/>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
				<ama-card
					headerimage="amaheader02.png"
					:youtubeflag="false"
					title="SAKE NFT"
					pubdate="Feb 2, 2021"
					linkurl="https://sakeswap.medium.com/introducing-sakeswap-irreversible-nft-a-new-way-of-sake-burn-449cd65c75f6"
				/>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
				<ama-card
					headerimage="amaheader03.png"
					:youtubeflag="false"
					title="MISO Fermenter"
					pubdate="Feb 2, 2021"
					linkurl="https://medium.com/@LumpyBatter/what-is-miso-86f3bc117ea4"
				/>
			</div>
			<div class="col-lg-3 col-md-6 col-12 mb-3 ama-card-single">
				<ama-card
					headerimage="amaheader04.png"
					:youtubeflag="false"
					title="MISO Factory"
					pubdate="Feb 2, 2021"
					linkurl="https://medium.com/@LumpyBatter/what-is-miso-86f3bc117ea4"
				/>
			</div>
			<div class="miso-ama">
				<div class="miso-ama-logo">
					<img src="@/assets/svg/misoamalog.svg" />
				</div>
				<div class="miso-ama-description">
					Follow interviews and articles on Medium and Youtube to find out more
					about MISO.
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import SpecialCard from "@/components/Miso/Auctions/Specials/SpecialCard"
import AmaCard from "@/components/Miso/Auctions/Specials/AmaCard"
import { mapGetters, mapActions } from "vuex"

export default {
	name: "LiveAuctions",
	components: {
		SpecialCard,
		AmaCard,
	},
	data() {
		return {
			loading: true,
			auctionsList: [],
			ingredients: [
				{
					icon: "wheat",
					text: "Mintable",
				},
				{
					icon: "teapot",
					text: "Pool Liquidity",
				},
				{
					icon: "crowd",
					text: "Crowdsale",
				},
			],
		}
	},
	computed: {
		...mapGetters({ auctions: "auctions/list" }),
	},
	mounted() {
		this.initAuctions()
	},
	methods: {
		...mapActions({
			getAuctions: "auctions/getAuctions",
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
	@media screen and (max-width: 768px) {
		font-size: 18px;
	}
	@media screen and (max-width: 400px) {
		font-size: 15px;
	}
}
.specialCard {
	transition: all 0.4s ease-in-out;
	transform: scale(1);
	max-width: 490px;
	@media screen and (max-width: 768px) {
		max-width: 100%;
	}
	&:hover {
		transition: all 0.4s ease-in-out;
		transform: scale(1.025);
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
	padding-top: 60px;
}

.miso-ama {
	background-image: url("@/assets/images/misoama.png");
	height: 361px;
	background-size: 100% 100%;
	text-align: center;
	left: 0;
	right: 0;
	z-index: 1;
	position: absolute;
	transform: translateY(-60%);
}

.miso-ama-description {
	position: relative;
	top: 36%;
	color: white;
}

.miso-ama-logo {
	position: relative;
	top: 25%;
}

.ama-cards {
	top: 45%;
	margin-top: 250px;
}

.ama-card-single {
	z-index: 2;
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
	text-align: right;
	padding-top: 20px;
	text-decoration: underline;
}

.gal-play {
	position: absolute;
	left: 45%;
	top: 35%;
}
</style>
