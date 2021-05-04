<template>
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col">
        <div class="row block">
          <div class="col">
            <div class="metamaskExtension">
              <div class="metamask" v-if="!ethereum.isInjected && ethereum.initialized">
                <img :src="'/metamask/metamask.png'" />
                <h3>Metamask is not detected in your browser :(</h3>
                <p>To continue please install Metamask extension for your browser</p>
                <a v-bind:href="'https://metamask.io/'" target="_blank">
                  <base-button type="primary">Get MetaMask</base-button>
                </a>
              </div>
              <div class="metamask" v-else-if="!ethereum.coinbase">
                {{ethereum.coinbase}}
                <img
                  ref="img"
                  :src="'/metamask/metamask.png'"
                  draggable="false"
                />
                <h3>Please log into your metamask account or connect it</h3>
              </div>
              <div v-if="ethereum.networkId !== ethereum.rightNetwork && ethereum.coinbase">
                <img ref="img" :src="'/metamask/switch-to-mainnet.png'" />
                <h3>Please change Metamask network to Ropsten to continue</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EthereumConnection",
  components: {},
  data() {
    return {
      validated: false,
      errorMessage: "Enable metamask"
    };
  },
  computed: {
    ...mapGetters(["ethereum"])
  },
  methods: {}
};
</script>
<style>
.block {
  text-align: center;
}

.metamaskExtension .metamask img {
  width: 175px;
  margin: auto;
}

@media only screen and (max-width: 422px) {
  .metamaskExtension img {
    width: 250px;
  }
}
</style>
