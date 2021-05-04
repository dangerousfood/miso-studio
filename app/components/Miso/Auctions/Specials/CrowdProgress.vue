<template>
	<div class="d-flex progress-status">
		<div class="d-flex w-100 position-relative">
			<!-- soft cap section -->
			<span
				class="progress-status_start"
				:class="[statusColor]"
				:style="{ left: startPosition + '%' }"
			>
				<span class="d-flex flex-column progress-status_text-box left">
					<span
						class="progress-status_text-line left"
						:class="[getMode ? 'bg-dark' : 'bg-light']"
					></span>
					<span class="text pl-2 text-uppercase font-weight-bold">
						soft cap:
					</span>
					<span class="fs-2 pl-2 text-white font-weight-bold no-whitespace">
						{{ soft }} ETH
					</span>
				</span>
			</span>
			<!-- soft cap section -->

			<span
				class="w-100 progress-status_line d-inline-block position-relative"
				:class="[statusLightColor]"
			>
				<span
					class="bg-success fill position-absolute"
					:class="[statusColor]"
					:style="{ width: progress + '%' }"
				></span>
				<span
					v-if="progress !== 0"
					class="text-box d-flex align-items-end"
					:style="{
						left: computedProgess + '%',
						transform: `translateX(${computedProctessStyle})`,
					}"
				>
					<span
						v-if="progress > 80"
						class="font-weight-bold price-left text-center"
					>
						<span class="pr-2">
							<span class="text-white">
								{{ marketInfo.commitmentsTotal.toLocaleString("en-US") }}
							</span>
							/
							<span>{{ hard.toLocaleString("en-US") }}</span>
						</span>
						<span
							class="line-left"
							:class="[getMode ? 'bg-dark' : 'bg-light']"
						></span>
					</span>

					<span
						v-if="progress <= 80"
						class="font-weight-bold price-right text-center"
					>
						<span
							class="line-right mr-2"
							:class="[getMode ? 'bg-dark' : 'bg-light']"
						></span>
						<span class="pl-2">
							<span class="text-white">
								{{ marketInfo.commitmentsTotal.toLocaleString("en-US") }}
							</span>
							/
							<span>{{ hard.toLocaleString("en-US") }}</span>
						</span>
					</span>
				</span>
			</span>

			<!-- hard cap section -->
			<span class="progress-status_end" :class="[statusColor]">
				<span class="d-flex flex-column progress-status_text-box right">
					<span class="text pr-2 text-right text-uppercase font-weight-bold">
						hard cap:
					</span>
					<span class="fs-2 pr-2 text-white font-weight-bold text-right">
						{{ hard }} ETH
					</span>
					<span
						class="progress-status_text-line rigth"
						:class="[getMode ? 'bg-dark' : 'bg-light']"
					></span>
				</span>
			</span>
			<!-- hard cap section -->
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
export default {
	props: {
		progress: {
			type: [Number, String],
			default: 0,
			description: "progress in percentage",
		},
		status: [Object],
		marketInfo: {
			type: [Object],
			currentPrice: {
				type: [Number, String],
				required: true,
			},
			startPrice: {
				type: [Number, String],
				required: true,
			},
			minimumPrice: {
				type: [Number, String],
				required: true,
			},
			paymentCurrency: {
				type: [String],
				required: true,
			},
		},
	},
	computed: {
		...mapGetters("theme", ["getMode"]),
		startPosition() {
			return (parseInt(this.soft) * 100) / parseInt(this.hard)
		},
		activeAuction() {
			if (this.status.auction === "live") {
				return true
			}
			return false
		},
		statusColor() {
			return {
				"bg-success": this.activeAuction,
				"bg-danger": !this.activeAuction && !this.status.auctionSuccessful,
				"bg-link": !this.activeAuction && this.status.auctionSuccessful,
			}
		},
		statusLightColor() {
			return {
				"bg-success-light": this.activeAuction,
				"bg-danger-light":
					!this.activeAuction && !this.status.auctionSuccessful,
				"bg-link": !this.activeAuction && this.status.auctionSuccessful,
			}
		},
		soft() {
			return this.marketInfo.goal
		},
		hard() {
			return this.marketInfo.totalTokens * this.marketInfo.rate
		},
		computedProgess() {
			if (this.progress > 99 && this.$route.name.includes("auctions-address")) {
				if (this.$route.name.includes("auctions-address")) {
					return this.progress - 1
				}
			} else if (this.progress > 99) {
				return this.progress - 1.5
			}

			return this.progress
		},
		computedProctessStyle() {
			if (this.progress < 2) {
				return "6px"
			}
			return 0
		},
	},
}
</script>

<style lang="scss" scoped>
.progress-status {
	padding: 60px 0 60px 0;
	.text {
		font-size: 11px;
		@media screen and (max-width: 450px) {
			font-size: 10px;
		}
	}
	&_line {
		height: 4px;
		border-radius: 4px;
		.fill {
			display: inline-block;
			height: 4px;
			border-radius: 4px;
		}
		.text-box {
			position: absolute;
			min-height: 40px;
			top: 12px;
			.line-left {
				position: absolute;
				height: 90%;
				width: 1px;
				bottom: 3px;
				right: 0;
				height: 38px;
			}
			.line-right {
				position: absolute;
				height: 90%;
				width: 1px;
				bottom: 3px;
				left: 0;
			}
			.price-left {
				transform: translateX(-100%);
				white-space: nowrap;
			}
		}
	}
	&_start {
		position: absolute;
		top: 50%;
		z-index: 99;
		transform: translate(0%, -50%);
		content: "";
		width: 15px;
		height: 15px;
		border-radius: 100%;
		border: 1px solid #fff;
	}
	&_end {
		position: absolute;
		top: 50%;
		right: 0;
		z-index: 99;
		transform: translate(0%, -50%);
		content: "";
		width: 15px;
		height: 15px;
		border-radius: 100%;
		border: 1px solid #fff;
	}
	&_text {
		&-box {
			position: absolute;
			bottom: 15px;
			width: 100px;
			height: 50px;
			@media screen and (max-width: 450px) {
				span {
					font-size: 11px;
				}
			}
			&.left {
				left: 40%;
			}
			&.right {
				right: 40%;
			}
		}
		&-line {
			content: "";
			position: absolute;
			bottom: 0;
			height: 94%;
			width: 1px;
			&.left {
				left: 0;
			}
			&.rigth {
				right: 0;
			}
		}
	}
	.bg-light {
		background: rgba(0, 10, 53, 0.2) !important;
	}
	.bg-dark {
		background: rgba(255, 255, 255, 0.2) !important;
	}
}
@media screen and (max-width: 500px) {
	.price {
		font-size: 10px;
	}
}
</style>
