<template>
	<div>
		<div class="row">
			<div class="col-md-6">
				<card>
					<div slot="header" class="row">
						<div class="col">
							<h6 class="text-uppercase text-white ls-1 mb-1 fs-3">Token</h6>
						</div>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Contract</span>
						<span class="d-block h4 text-white fs-2">
							{{ model.token.address }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Name</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.token.name }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Symbol</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.token.symbol }}
						</span>
					</div>
				</card>
			</div>
			<div class="col-md-6">
				<card>
					<div slot="header" class="row">
						<div class="col">
							<h6 class="text-uppercase text-white ls-1 mb-1 fs-3">
								Auction Details
							</h6>
						</div>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Token Supply</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.tokenSupply }} {{ model.token.symbol }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Payment Type</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ paymentType }}
						</span>
					</div>
					<div v-if="!isETH" class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Payment Token Address</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							<eth-image
								class="avatar avatar-xs mr-2"
								:opts="{
									seed: model.paymentCurrency.address,
									size: 10,
									scale: 5,
								}"
							/>
							{{ model.paymentCurrency.address }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Minimum amount</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.minimumCommitmentAmount }}
							{{ model.paymentCurrency.symbol }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Start Date</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.startDate }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">End Date</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.endDate }}
						</span>
					</div>
					<div class="col-sm-12 col-md-12">
						<span class="h6 surtitle text-muted fs-3">Fund Wallet</span>
						<span class="d-block h4 has-text-weight-bold text-white fs-2">
							{{ model.fundWallet }}
						</span>
					</div>
				</card>
			</div>
		</div>
	</div>
</template>
<script>
import EthImage from '@/components/web3-core/eth-identication/EthImage'

export default {
	components: {
		EthImage,
	},
	props: {
		model: {
			type: Object,
			required: true,
		},
	},
	computed: {
		isETH() {
			return (
				this.model.paymentCurrency.address ===
				'0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
			)
		},
		paymentType() {
			return this.isETH ? 'ETH' : 'ERC20'
		},
	},
}
</script>
<style></style>
