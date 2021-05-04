<template>
	<div>
		<div class="row d-flex justify-content-center">
			<div class="col-md-11 mt-6">
				<token-factory-form></token-factory-form>
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from "vuex"
import { tokenFactory } from "@/config/contractConfig"
import TokenFactoryForm from "@/components/Miso/Tokens/TokenFactoryForm"

const tokenFactoryAddress = tokenFactory.address

export default {
	components: {
		TokenFactoryForm,
	},
	layout: "DashboardLayout",
	data() {
		return {
			contractAddress: "",
			deploymentFee: 0.1,
		}
	},
	computed: {
		...mapGetters({
			currentProvidersNetworkId: "ethereum/currentProvidersNetworkId",
		}),
	},
	mounted() {
		this.contractAddress = this.getTokenFactoryAddress()
	},
	methods: {
		getTokenFactoryAddress() {
			return tokenFactoryAddress[this.currentProvidersNetworkId]
		},
	},
}
</script>
