<template>
  <card>
    <h3 slot="header" class="mb-0 text-center">Create Crowdsale Market</h3>
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step title="Create Crowdsale Market"></el-step>
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
                          v-model="token.address"></base-input>

              <form class="needs-validation" @submit.prevent="handleSubmit(approve)">
                <div class="form-row justify-content-md-center">
                  <div class="col-lg-6 mr-1">
                    <base-alert type="secondary">
                      <div class>
                                <span class="alert-inner--text">
                                    <strong>Note:</strong>
                                    Your
                                    <strong>token balance</strong> must be higher then or equal to
                                    <strong>allowance</strong>.
                                    <strong>Token amount</strong> must be lower or equal to
                                    <strong>allowance</strong>, otherwise you can approve the new allowance in any
                                    amount.
                                </span>
                      </div>
                    </base-alert>
                    <base-alert type="danger">
                      <div class>
                                <span class="alert-inner--text">
                                    <strong>Error</strong>
                                    You don't have any {{token.symbol}}
                                </span>
                      </div>
                    </base-alert>
                    <p>Your Token Balance: {{formatedTokenBalance}} {{token.symbol}}</p>
                    <p>Your Allowance: {{formatedAllowance}} {{token.symbol}}</p>
                    <base-input label="Token Amount" name="token amount" placeholder="Token amount"
                                type="number" :rules="`required|min_value:1|max_value:${formatedTokenBalance}`"
                                v-model="approvalForm.tokenSupply" :bind="approvalFormCom"></base-input>
                  </div>
                  <!--                  <div class="col-lg-6 text-right mt-3">-->
                  <!--                    <base-button v-if="hasToken" type="primary" native-type="submit"-->
                  <!--                                 :loading="nextBtnLoading">{{approveBtnText}}</base-button>-->
                  <!--                  </div>-->
                </div>
                <hr />
                <!--                <base-button v-if="hasToken" class="float-right" type="primary" native-type="submit"-->
                <!--                    :loading="nextBtnLoading">{{approveBtnText}}</base-button>-->
              </form>

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
              <base-input label="Rate" name="rate" placeholder="rate"
                          type="number" :rules="`required|min_value:0`"
                          v-model="misoMarketDetailsForm.rate"></base-input>
              <base-input label="Goal" name="goal" placeholder="goal"
                          type="number" :rules="`required|min_value:0`"
                          v-model="misoMarketDetailsForm.goal"></base-input>
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
                <span class="h6 surtitle text-muted">Rate</span>
                <span class="d-block h4">{{misoMarketDetailsForm.rate}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Goal</span>
                <span class="d-block h4">{{misoMarketDetailsForm.goal}}</span>
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
import { fromWei } from "@/services/web3/base";
import { approveAndWait, call } from "@/services/web3/fixedToken";
import {
  sendTransaction as misoMarketCreate,
  subscribeToTokensPurchasedEvent
} from "@/services/web3/templates/crowdsaleTemplate";
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
        paymentCurrency: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52',
        totalTokens: 10,
        startTime: moment().add(1, 'days').format('YYYY-MM-DD HH:mm'),
        endTime: moment(this.startTime).add(2, 'days').format('YYYY-MM-DD HH:mm'),
        rate: 1,
        goal: 2,
        wallet: '0x8031EE7A32e9296e636428AF0Beea74Ae7BbEb52'
      },
      approvalForm: {
        tokenSupply: 0
      },
      token: {
        address: "0x28c79fa56cA29d2d761401F3f745e3c233Bd7185", // <-- created token
        name: "",
        symbol: ""
      },
      account: {
        allowance: 0,
        tokenBalance: 0
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
    },
    approvalFormCom() {
      this.showNextPartTwo = false;
      clearInterval(this.timer);
      if (+this.approvalForm.tokenSupply <= +fromWei(this.account.tokenBalance) && +this.approvalForm.tokenSupply > 0) {
        this.timer = setInterval(() => {
          this.approve();
          clearInterval(this.timer);
        }, 1500)
      }
    },
    hasToken() {
      return this.account.tokenBalance > 0;
    },
    formatedTokenBalance() {
      console.log(2)
      return fromWei(this.account.tokenBalance);
    },
    formatedAllowance() {
      console.log(3)
      return fromWei(this.account.allowance);
    },
  },
  mounted() {
    this.subscribeToTokensPurchasedEvent();
    console.log(1)
  },
  beforeDestroy() {
    this.unsubscribeFromMisoMarketCreatedEvent();
  },
  methods: {
    async createMisoMarket() {
      this.waitingForConfirmation = true;
      const startDate = new Date(this.misoMarketDetailsForm.startTime).getTime() / 1000;
      const endDate = new Date(this.misoMarketDetailsForm.endTime).getTime() / 1000;
      const dataParams = [
        this.misoMarketDetailsForm.funder,
        this.misoMarketDetailsForm.token,
        this.misoMarketDetailsForm.paymentCurrency,
        this.misoMarketDetailsForm.totalTokens,
        startDate,
        endDate,
        this.misoMarketDetailsForm.rate,
        this.misoMarketDetailsForm.goal,
        this.misoMarketDetailsForm.wallet
      ];
      const data = web3.eth.abi.encodeParameters(
          [
            'address',
            'address',
            'address',
            'uint256',
            'uint256',
            'uint256',
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
    async approval() {
      const methods = [
        {
          methodName: "allowance",
          args: [this.coinbase, this.contractAddress]
        },
        {
          methodName: "balanceOf",
          args: [this.coinbase]
        }
      ];
      [this.account.allowance, this.account.tokenBalance] = await call(
          this.token.address,
          methods
      );
    },
    async approve() {
      this.nextBtnLoading = true;
      if (
          this.approvalForm.tokenSupply >
          this.formatedAllowance
      ) {
        const isEthConnectionOk = this.checkEthConnection();
        if (isEthConnectionOk) {
          this.approvalModal = true;
          const data = {
            spender: this.contractAddress,
            amount: this.approvalForm.tokenSupply
          };
          const receipt = await approveAndWait(
              this.token.address,
              data,
              this.coinbase,
              txHash => {
                if (txHash) {
                  this.approvalTransaction.txHash = txHash;
                } else {
                  this.approvalTransaction.rejected = true;
                }
              }
          );

          if (receipt) {
            if (receipt.status) {
              this.approvalTransaction.confirmed = true;
              this.account.allowance =
                  receipt.events.Approval.returnValues.tokens;
              this.showNextPartTwo = true;
            } else {
              this.approvalTransaction.failed = true;
            }
          }
        }
      } else {
        this.showNextPartTwo = true;
        // this.changeStep();
      }
      this.nextBtnLoading = false;
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
        this.account = {
          allowance: 0,
          tokenBalance: 0
        };
        this.activeStep = 0;
      } else {
        this.activeStep++;
      }
    },
    subscribeToTokensPurchasedEvent() {
      this.misoMarketCreatedEventSubscribtion = subscribeToTokensPurchasedEvent()
          .on("data", async event => {
            if (this.transactionHash) {
              if (this.transactionHash.toLowerCase() === event.transactionHash) {
                // console.log(event.returnValues, 'token');
                // this.farmAddress = event.returnValues.token;
                this.changeStep();
              }
            }
          })
          .on("error", error => {
            console.log("event error:", error);
          });
    },
    unsubscribeFromMisoMarketCreatedEvent() {
      if (this.misoMarketCreatedEventSubscribtion) {
        this.misoMarketCreatedEventSubscribtion.unsubscribe();
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
