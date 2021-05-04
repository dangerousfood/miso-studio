<template>
  <card>
    <h3 slot="header" class="mb-0 text-center">Create Dutch Market</h3>
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step title="Create Dutch Market"></el-step>
      <el-step title="Deployment"></el-step>
      <el-step title="Result"></el-step>
    </el-steps>
    <div class="mt-5">
      <validation-observer v-if="activeStep === 0" v-slot="{ handleSubmit }">
        <form class="needs-validation" @submit.prevent="handleSubmit(createMisoMarket)">
          <div class="form-row justify-content-md-center">
            <div class="col-lg-6 mr-1">

              <base-input label="Funder" name="funder" placeholder="funder"
                          type="text" :rules="`required`"
                          v-model="misoMarketDetailsForm.funder"></base-input>
              <base-input label="Token" name="token" placeholder="token"
                          type="text" :rules="`required`"
                          v-model="misoMarketDetailsForm.token"></base-input>
              <base-input label="Payment Currency" name="peyment currency" placeholder="paymentCurrency"
                          type="text" :rules="`required`"
                          v-model="misoMarketDetailsForm.paymentCurrency"></base-input>
              <base-input label="Total Tokens" name="totalTokens" placeholder="totalTokens"
                          type="number" :rules="`required|min_value:0`"
                          v-model="misoMarketDetailsForm.totalTokens"></base-input>
              <base-input label="Start date" name="start date" placeholder="startTime"
                          type="text" :rules="`required`"
                          v-model="misoMarketDetailsForm.startTime">
                <!--                prependIcon="ni ni-calendar-grid-58"-->
                <!--                <flat-picker slot-scope="{ focus, blur }" @on-open="focus" @on-close="blur" :config="{-->
                <!--                    allowInput: true,-->
                <!--                    enableTime: true,-->
                <!--                    minDate: 'today',-->
                <!--                    dateFormat: 'Y-m-d H:i'-->
                <!--                  }" class="form-control datepicker" v-model="misoMarketDetailsForm.startDate"></flat-picker>-->
              </base-input>
              <base-input label="End date" name="end date" placeholder="endTime"
                          type="text" :rules="`required`"
                          v-model="misoMarketDetailsForm.endTime">
                <!--                <flat-picker slot-scope="{ focus, blur }" @on-open="focus" @on-close="blur" :config="{-->
                <!--                    allowInput: true,-->
                <!--                    enableTime: true,-->
                <!--                    minDate: 'today',-->
                <!--                    dateFormat: 'Y-m-d H:i'-->
                <!--                  }" class="form-control datepicker" v-model="misoMarketDetailsForm.endDate"></flat-picker>-->
              </base-input>
              <base-input label="Start Price" name="start price" placeholder="start price"
                          type="number" :rules="`required|min_value:0`"
                          v-model="misoMarketDetailsForm.startPrice"></base-input>
              <base-input label="Min Price" name="min price" placeholder="min price"
                          type="number" :rules="`required|min_value:0`"
                          v-model="misoMarketDetailsForm.endPrice"></base-input>
              <base-input label="Wallet" name="wallet" placeholder="wallet"
                          type="text" :rules="`required`"
                          v-model="misoMarketDetailsForm.wallet"></base-input>
            </div>
          </div>
          <hr />
          <base-button class="float-right"
                       v-if="!hideNextBtn"
                       :loading="waitingForConfirmation"
                       type="primary" native-type="submit">Deploy
          </base-button>
        </form>
      </validation-observer>
      <div v-if="activeStep === 1">
        <div class="row">
          <div class="col-md-6">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Miso Market</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Funder</span>
                <span class="d-block h4">{{misoMarketDetailsForm.funder}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Token</span>
                <span class="d-block h4">{{misoMarketDetailsForm.token}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Payment Currency</span>
                <span class="d-block h4">{{misoMarketDetailsForm.paymentCurrency}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Total Tokens</span>
                <span class="d-block h4">{{misoMarketDetailsForm.totalTokens}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Start Time</span>
                <span class="d-block h4">{{misoMarketDetailsForm.startTime}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">End Time</span>
                <span class="d-block h4">{{misoMarketDetailsForm.endTime}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Start Price</span>
                <span class="d-block h4">{{misoMarketDetailsForm.startPrice}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">End Price</span>
                <span class="d-block h4">{{misoMarketDetailsForm.endPrice}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Wallet</span>
                <span class="d-block h4">{{misoMarketDetailsForm.wallet}}</span>
              </div>
            </card>
          </div>
          <div class="col-md-6">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Transaction</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Transaction Hash</span>
                <a
                    class="d-block"
                    :href="`${explorer.root}${explorer.tx}${transactionHash}`"
                    target="blank"
                >{{transactionHash}}</a>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Status</span>
                <span class="d-block h4">
              Pending
              <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
            </span>
              </div>
            </card>
          </div>
        </div>
        <hr />
      </div>
      <div v-if="activeStep === 2">
        <div class="row justify-content-md-center">
          <div class="col-sm-12 col-md-8">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Transaction Confirmed</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Transaction Hash</span>
                <a
                    class="d-block h4 text-primary"
                    :href="`${explorer.root}${explorer.tx}${transactionHash}`"
                    target="blank"
                >{{transactionHash}}</a>
              </div>
              <!--              <div class="col-sm-12 col-md-12">-->
              <!--                <span class="h6 surtitle text-muted">Factory</span>-->
              <!--                <span class="d-block h4">-->
              <!--                <nuxt-link :to="`/tokens/${tokenAddress}`">{{tokenAddress}}</nuxt-link>-->
              <!--              </span>-->
              <!--                <n-link :to="'/factory/auction?token='+tokenAddress">-->
              <!--                  <base-button outline type="primary">Create Auction</base-button>-->
              <!--                </n-link>-->
              <!--              </div>-->
            </card>
          </div>
        </div>
        <hr>

        <!--        @click="redirect(`/tokens/${tokenAddress}`)"-->
        <base-button
            class="float-right"
            type="primary"
        >View FarmFactory Info</base-button>

      </div>
    </div>
  </card>
</template>

<script>
import {Step, Steps} from "element-ui";
import {mapGetters} from "vuex";
import {
  sendTransaction as misoMarketCreate,
} from "@/services/web3/templates/dutchTemplate";
import {ValidationObserver} from "vee-validate";
// import flatPicker from "vue-flatpickr-component";
// import "flatpickr/dist/flatpickr.css";
import * as _moment from 'moment';
const moment = _moment;
export default {
  name: 'BaseCrowdsaleMarketValidation',
  components: {
    [Steps.name]: Steps,
    [Step.name]: Step,
    ValidationObserver,
    // flatPicker
  },
  data() {
    return {
      waitingForConfirmation: false,
      activeStep: 0,
      transactionHash: null,
      misoMarketAddress: null,
      misoMarketDetailsForm: {
        funder: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52',
        token: '0xaef979505Ac3E83dD48cE4948814Ed4F03871265', // <-- created token
        paymentCurrency: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52',
        totalTokens: 10,
        startTime: moment().format('YYYY-MM-DD HH:mm'),
        endTime: moment(this.startTime).add(1, 'days').format('YYYY-MM-DD HH:mm'),
        startPrice: 2,
        endPrice: 1,
        wallet: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52'
      },
      misoMarketCreatedEventSubscribtion: null
    }
  },
  computed: {
    ...mapGetters({
      coinbase: "ethereum/coinbase",
      explorer: 'ethereum/explorer'
    }),
    hideNextBtn() {
      return this.activeStep === 1;
    }
  },
  methods: {
    async createMisoMarket() {
      this.waitingForConfirmation = true;
      const startDate = new Date(this.misoMarketDetailsForm.startTime).getTime() / 1000;
      const endDate = new Date(this.misoMarketDetailsForm.endTime).getTime() / 1000;
      const dataParams = [
        this.misoMarketDetailsForm.funder,
        this.misoMarketDetailsForm.token,
        this.misoMarketDetailsForm.totalTokens,
        startDate,
        endDate,
        this.misoMarketDetailsForm.paymentCurrency,
        this.misoMarketDetailsForm.startPrice,
        this.misoMarketDetailsForm.endPrice,
        this.misoMarketDetailsForm.wallet
      ];
      const data = web3.eth.abi.encodeParameters(
          [
            'address',
            'address',
            'uint256',
            'uint256',
            'uint256',
            'address',
            'uint256',
            'uint256',
            'address'
          ], dataParams);
      //
      console.log(dataParams);
      console.log(data);
      const args = [data];
      const initMarket = await misoMarketCreate('initMarket', args, { from: this.coinbase });
      console.log(initMarket);
      // if (txHash) {
      //   this.transactionHash = txHash;
      //   this.changeStep()
      // }
      // }
      this.waitingForConfirmation = false;
    },
    changeStep() {
      if (this.activeStep === 2) {
        this.misoMarketDetailsForm = {
          rewardsAddress: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52',
          rewardsAmountPerBlock: 0,
          startBlock: 0,
          devaddr: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52',
          accessControls: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52',
          templateId: 1
        };
        this.activeStep = 0;
      } else {
        this.activeStep++;
      }
    },
    redirect(url) {
      this.$router.push(url);
    }
  }
}
</script>

<style>
.el-step__head.is-process .el-step__icon.is-text {
  color: #fff;
  background-color: var(--primary);
  border-color: var(--primary);
}
.el-step__head.is-success {
  color: var(--primary);
  border-color: var(--primary);
}
.el-step__head.is-success .el-step__line {
  color: var(--primary);
  border-color: var(--primary);
  background-color: var(--primary);
}
.el-step__title.is-success {
  color: var(--primary);
}
</style>
