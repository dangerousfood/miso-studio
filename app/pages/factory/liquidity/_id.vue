<template>
	<div class="pl-3">
		<div class="row">
			<div class="col-12 col-lg-9 col-xl-8">
				<div class="d-flex align-items-center mt-4">
					<svg-icon icon="liquid-luncher" height="70" width="70" />
					<h2 class="mb-0 pl-3 text-white font-weight-bold fs-10">
						Liquidity Launcher
					</h2>
				</div>
			</div>
			<div class="col-12 mt-5">
				<div class="row">
					<div class="col-md-6 col-sm-12">
						<div class="row">
							<div class="col-12">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-4">
										<div class="font-weight-bold fs-4 mb-2">YOUR TOKEN PAIR</div>
									</div>
								</div>
								<div class="fs-2">
									<span class="text-white font-weight-bold fs-4">LCRX</span>
									({{ liquidity.token.address | truncate(6) }}) +
									<span class="text-white font-weight-bold fs-4">ETH</span>
								</div>
							</div>
							<div class="col-12 mt-5">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-4">
										<div class="font-weight-bold fs-4 mb-2">LIQUIDITY PROVISION</div>
									</div>
								</div>
								<div class="fs-2">
									<span class="text-white font-weight-bold fs-4">LCRX</span>
									({{ liquidity.token.address | truncate(6) }}) +
									<span class="text-white font-weight-bold fs-4">ETH 50% / 50%</span>
								</div>
								<div class="text-white mt-3 fs-2 w-75">
									25% of amount raised from auction in ETH, pairing with 200,000 LCRX,
									will be launched on SushiSwap as a 50/50 weighting liquidity pool.
								</div>
							</div>
							<div class="col-12 mt-5">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-3">
										<div class="font-weight-bold fs-4">LAUNCH SETTINGS</div>
									</div>
								</div>
								<div class="font-weight-bold fs-3">Launch Date</div>
								<div class="font-weight-bold text-white mt-1 fs-2">
									May 20th, 2021
								</div>
								<div class="font-weight-bold fs-3 mt-3">Liquidity Lockup</div>
								<div class="font-weight-bold text-white fs-2 mt-1">
									{{ getDays }} Days &nbsp;&nbsp; Unlocks: {{ endDate }}
								</div>
							</div>
						</div>
					</div>
					<div class="col-md-6 col-lg-5 col-sm-12 offset-lg-1 mt-sm-5 mt-md-0">
						<div class="row">
							<div class="col-12">
								<div class="d-flex">
									<div class="d-inline border-bottom mb-4">
										<div class="font-weight-bold fs-4 mb-2">YOUR TOKEN PAIR</div>
									</div>
								</div>
								<div class="row">
									<div class="col-12 mb-3">
										<div class="fs-4 font-weight-bold">Admin Address</div>
										<span class="font-weight-bold text-white mt-1 fs-2">
											{{ liquidity.token.address }}
										</span>
									</div>
									<div v-if="liquidity.auction" class="col-12 mb-3">
										<div class="fs-4 font-weight-bold">Auction Address</div>
										<span class="font-weight-bold text-white mt-1 fs-2">
											{{ liquidity.auction }}
										</span>
									</div>
									<div class="col-12">
										<div class="fs-4 font-weight-bold">Vault Address</div>
										<span class="font-weight-bold text-white mt-1 fs-2">
											{{ liquidity.vaultAddr }}
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-12">
				<div class="mt-5 pt-5">
					<base-divider />
					<div class="d-flex justify-content-between mt-4">
						<base-button tag="nuxt-link" to="/factory/liquidity" type="primary">
							PREVIOUS
						</base-button>
						<base-button type="primary" @click="daplyLiquid">DEPLOY</base-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import { BaseButton, BaseDivider } from '~/components'

export default {
	components: { BaseDivider, BaseButton },
	middleware: 'liquidity',
	computed: {
		...mapGetters({ liquidity: 'factory/liquidModel' }),
		getDays() {
			const diff =
				(new Date(this.liquidity.endTime) - new Date(this.liquidity.lunchDate)) /
				(1000 * 60 * 60 * 24)
			return diff
		},
		endDate() {
			return new Date(this.liquidity.lunchDate).toDateString()
		},
	},
	methods: {
		daplyLiquid() {
			// daloyment of auction
		},
	},
}
</script>

<style lang="scss" scoped></style>
