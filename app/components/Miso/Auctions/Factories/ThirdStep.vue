<template>
	<div class="row">
		<div class="col-md-6">
			<card>
				<div slot="header" class="row">
					<div class="col">
						<h6 class="text-uppercase text-muted ls-1 mb-1">Auction</h6>
					</div>
				</div>
				<div class="col-sm-12 col-md-12">
					<span class="h6 surtitle text-muted">Contract</span>
					<n-link :to="`/auctions/${market.address}`">
						{{ market.address }}
					</n-link>
				</div>
			</card>
		</div>
		<div class="col-md-6">
			<card>
				<div slot="header" class="row">
					<div class="col">
						<h6 class="text-uppercase text-muted ls-1 mb-1">
							Transaction Hash
						</h6>
					</div>
				</div>
				<div class="col-sm-12 col-md-12">
					<a
						class="d-block"
						:href="`${explorer.root}${explorer.tx}${market.txHash}`"
						target="blank"
					>
						{{ market.txHash }}
					</a>
				</div>
			</card>
		</div>
	</div>
</template>
<script>
import { mapGetters } from "vuex"

export default {
	props: {
		market: {
			type: Object,
			required: true,
		},
	},
	computed: {
		...mapGetters({
			explorer: "ethereum/explorer",
		}),
	},
	methods: {
		redirect(url) {
			this.$router.push(url)
		},
		validate() {
			return this.$validator.validateAll().then((res) => {
				this.$emit("on-validated", res, this.model)
				return res
			})
		},
	},
}
</script>
<style></style>
