<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mt-5">
        <recipe02-form></recipe02-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { recipe02 } from "@/config/contractConfig"
import Recipe02Form from "@/components/Miso/Recipes/Recipe02Form"

const contractAddress = recipe02.address

export default {
  layout: "DashboardLayout",
  components: {
    Recipe02Form
  },
  computed: {
    ...mapGetters({
      currentProvidersNetworkId: "ethereum/currentProvidersNetworkId"
    })
  },
  data() {
    return {
      contractAddress: "",
      tokenAddress: this.$route.query.token,
      deploymentFee: 0
    };
  },
  mounted() {
    this.contractAddress = this.getLauncherAddress();
  },
  methods: {
    getLauncherAddress() {
      return contractAddress[this.currentProvidersNetworkId];
    }
  }
}
</script>

<style scoped>

</style>
