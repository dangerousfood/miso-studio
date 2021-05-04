<template>
	<card class="pt-2 pb-4 mb-1 h-100 about-project">
		<div class="d-flex flex-column">
			<div class="d-flex">
				<!-- <svg-icon icon="sooper" height="60" width="52" /> -->
				<div class="pl-4 d-flex flex-column">
					<h4 class="card-title font-weight-bold text-capitalize fs-5 mb-1">
						{{ textCheck(info.title, "title") }}
					</h4>
					<p class="font-weight-bold text-uppercase fs-2">
						{{ textCheck(info.tokenPair, "token") }}:
						<span class="text-white">{{ tokenPrice }}</span>
					</p>
				</div>
			</div>

			<base-divider class="mb-4 mt-2 py-1" />
			<div class="pt-2">
				<div class="pt-3 mt-1 pr-5">
					<h5 class="fs-1 font-weight-bold text-uppercase mb-0">CONTRACT:</h5>
					<div class="d-flex align-items-center">
						<p class="font-weight-bold text-white text-uppercase fs-3 mb-0">
							{{ $route.params.address | truncate(6) }}
						</p>
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
				<div v-if="info.website && urlCheck" class="pt-3">
					<h5 class="fs-1 font-weight-bold mb-2">Website:</h5>
					<a
						:href="info.website"
						target="_blank"
						class="font-weight-bold text-white pt-0 mt-0 fs-3"
					>
						<u>{{ info.website }}</u>
					</a>
				</div>
				<div v-if="Object.keys(info.icons.social).length" class="pt-3">
					<h5 class="fs-1 font-weight-bold mb-2">SOCIAL:</h5>
					<div class="d-block">
						<a
							v-for="(item, index) in info.icons.social"
							:key="index"
							:href="item"
							class="socials-icon svg-color"
							target="_blank"
						>
							<i
								:class="icons[index]"
								style="font-size: 26px; margin-right: 8px"
							/>
						</a>
					</div>
				</div>
			</div>
			<div class="pt-4 pr-5">
				<h5 class="fs-1 mb-1 font-weight-bold text-uppercase">admin:</h5>
				<nuxt-link :to="`/auction-admin/${auctionAddress}`">Edit</nuxt-link>
			</div>
			<base-divider class="my-4 py-2" />

			<div v-if="info.icons.ingredient.length" class="pt-4 mt-3 pr-5">
				<h5 class="fs-1 font-weight-bold text-uppercase">ingredients:</h5>
				<div class="d-flex">
					<el-popover
						:close-delay="60"
						trigger="hover"
						placement="top"
						class="vue-icon p-1"
					>
						<div>
							<div class="font-weight-bold p-0 text-center">
								{{ tooltip }}
							</div>
						</div>

						<svg-icon
							slot="reference"
							class="mr-2 cursor-pointer"
							:icon="type"
							height="45"
							width="45"
							:original="true"
							:color="computedIconColor"
						/>
					</el-popover>
				</div>
			</div>
		</div>
	</card>
</template>

<script>
import { Card, BaseDivider } from "@/components"
import { Popover } from "element-ui"
import { theme } from "@/mixins/theme"

export default {
	components: {
		Card,
		BaseDivider,
		[Popover.name]: Popover,
	},
	mixins: [theme],
	props: {
		info: {
			type: [Object, Array],
			required: true,
			description: "full data for about card",
		},
		price: {
			type: [String, Number],
			required: true,
			description: "current price of the auction",
		},
		type: {
			type: String,
			required: true,
			description: "full data for status card",
		},
	},
	data() {
		return {
			theme: false,
			auctionAddress: this.$route.params.address,
			hoverIcon: {},
			icons: {
				whitepaper: "fa fa-file",
				github: "fab fa-github",
				telegram: "fab fa-telegram",
				wechat: "fab fa-weixin",
				discord: "fab fa-discord",
				medium: "fab fa-medium",
				reddit: "fab fa-reddit",
				twitter: "fab fa-twitter",
				docs: "fa fa-book",
			},
		}
	},
	computed: {
		tooltip() {
			if (this.type.toLowerCase() === "dutch") {
				return "Dutch Auction"
			} else if (this.type.toLowerCase() === "batch") {
				return "Batch Auction"
			}
			return "Crowdsale"
		},
		urlCheck() {
			const pattern = new RegExp(
				"^(https?:\\/\\/)?" + // protocol
					"((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
					"((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
					"(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
					"(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
					"(\\#[-a-z\\d_]*)?$",
				"i"
			) // fragment locator

			return !!pattern.test(this.info.website)
		},
		tokenPrice() {
			if (this.type === "batch" && parseFloat(this.price) === 0)
				return "Price not determined"
			return this.price
		},
	},
	methods: {
		// copy data to clipboard on click & display message
		copyToClipboard(value) {
			navigator.clipboard.writeText(value).then(() => {
				this.$notify({
					type: "success",
					verticalAlign: "bottom",
					horizontalAlign: "right",
					message: "successfully copied to clipboard!",
				})
			})
		},
		textCheck(str, val) {
			const pattern = /^[()\s0-9a-zA-Z]+$/
			if (str.match(pattern)) {
				return str
			} else {
				return `No ${val}`
			}
		},
	},
}
</script>

<style lang="scss" scoped>
// remove when icon
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
		content: "";
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
			content: "";
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
</style>

<style>
.el-popover {
	min-width: auto !important;
}
.popper__arrow::after {
	background: transparent !important;
}
</style>
