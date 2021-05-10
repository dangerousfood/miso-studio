<template>
	<div>
		<div class="row d-flex justify-content-center">
			<div class="col-md-11 mt-6">
				<farm-factory-form></farm-factory-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { farmFactory } from "@/constants/contractConfig"
import FarmFactoryForm from "@/components/Miso/Farms/FarmFactoryForm"

const farmFactoryAddress = farmFactory.address
export default {
	components: {
		FarmFactoryForm,
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
		this.contractAddress = this.getFarmFactoryAddress()
	},
	methods: {
		getFarmFactoryAddress() {
			return farmFactoryAddress[this.currentProvidersNetworkId]
		},
	},
}
</script>
