<template>
  <client-only>
    <div v-if="walletInitialized">
      <base-button
        :class="[isOk ? 'text-success' : 'text-danger']"
        size="sm"
        type="neutral"
        @click="checkEthConnection()"
      >
        <i class="fas fa-exclamation-circle" v-if="!isOk"></i>
        {{getConnectionTitle()}}
      </base-button>
    </div>
  </client-only>
</template>

<script>
import { mapGetters } from "vuex";
import networkConfig from "@/config/networkConfig";
import ethereumConnectionModalMixin from "@/components/web3-core/modal/ethereumConnectionModalMixin";

export default {
  mixins: [ethereumConnectionModalMixin],
  name: "WalletConnectionBadge",
  components: {}
};
</script>
<style>
</style>
