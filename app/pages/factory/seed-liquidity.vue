<template>
  <div>
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 mt-5">
        <liquidity-seed-form></liquidity-seed-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { liquidityLauncher } from "@/config/contractConfig"
import LiquiditySeedForm from "@/components/Miso/Liquiditys/LiquiditySeedForm"

const contractAddress = liquidityLauncher.address
export default {
  layout: "DashboardLayout",
  components: {
    LiquiditySeedForm
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
