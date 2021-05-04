<template>
	<div>
		<div class="row d-flex justify-content-center">
			<div class="col-md-11 mt-6">
				<liquidity-pool-form></liquidity-pool-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { liquidityLauncher } from "@/config/contractConfig"
import LiquidityPoolForm from "@/components/Miso/Liquiditys/LiquidityPoolForm"

const contractAddress = liquidityLauncher.address

export default {
	components: {
		LiquidityPoolForm,
	},
	layout: "DashboardLayout",
	data() {
		return {
			contractAddress: "",
			tokenAddress: this.$route.query.token,
			deploymentFee: 0,
		}
	},
	computed: {
		...mapGetters({
			currentProvidersNetworkId: "ethereum/currentProvidersNetworkId",
		}),
	},
	mounted() {
		this.contractAddress = this.getLauncherAddress()
	},
	methods: {
		getLauncherAddress() {
			return contractAddress[this.currentProvidersNetworkId]
		},
	},
}
</script>

<style scoped></style>
