<template>
  <card>
    <h3 slot="header" class="mb-0">Auction Form</h3>
    <el-steps :active="activeStep" finish-status="success" align-center>
      <el-step title="Choose Token"></el-step>
      <!--            <el-step title="Approve Tokens"></el-step>-->
      <!--            <el-step title="Auction Details"></el-step>-->
      <el-step title="Deployment"></el-step>
      <el-step title="Result"></el-step>
    </el-steps>
    <div class="mt-5">
      <validation-observer v-if="activeStep === 0" v-slot="{ handleSubmit }">
        <form class="needs-validation" @submit.prevent="handleSubmit(changeStepToApproveTokens)">
          <div class="form-row justify-content-md-center">
            <div class="col-lg-6 mr-1">
              <autocomplete label="Token" name="token" placeholder="Type to search (name, symbol, address)"
                            rules="required|isAddress" v-model="token.address" :suggestions="suggestions"
                            :loading="tokensLoading" @input="fetchTokens" @complete="handleTokenComplete">
              </autocomplete>
            </div>
            <div class="col-lg-6 mr-1">
              <div>
                Don’t have a token?
                <n-link class="text-underline" to="/factory/token">Create it now</n-link>
              </div>
            </div>
            <!--                    <div class="col-lg-6 text-right mt-3">-->
            <!--                      <base-button type="primary" native-type="submit" :loading="nextBtnLoading">Next-->
            <!--                      </base-button>-->
            <!--                    </div>-->
          </div>
          <hr />
        </form>
      </validation-observer>
      <validation-observer v-if="activeStep === 0" v-slot="{ handleSubmit }">
        <form class="needs-validation" @submit.prevent="handleSubmit(approve)">
          <div class="form-row justify-content-md-center">
            <div class="col-lg-6 mr-1">
              <base-alert v-if="hasToken" type="secondary">
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
              <base-alert v-else-if="showNextPartOne" type="danger">
                <div class>
                                <span class="alert-inner--text">
                                    <strong>Error</strong>
                                    You don't have any {{token.symbol}}
                                </span>
                </div>
              </base-alert>
              <p>Your Token Balance: {{formatedTokenBalance}} {{token.symbol}}</p>
              <p>Your Allowance: {{formatedAllowance}} {{token.symbol}}</p>
              <base-input v-if="hasToken" label="Token Amount" name="token amount" placeholder="Token amount"
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
      </validation-observer>
      <validation-observer v-if="activeStep === 0" v-slot="{ handleSubmit }" ref="auctionDetails">
        <form class="needs-validation" @submit.prevent="handleSubmit(changeStep)">
          <div class="form-row justify-content-md-center">
            <div class="col-lg-8 mr-1">
              <label class="form-control-label font-weight-bolder">Payment Currency</label>
              <label class="form-control-label">The currency people will pay during the auction</label>
              <div class="row">
                <div class="col-12">
                  <base-radio class="mb-3" :disabled="!showNextPartTwo" name="eth" v-model="auctionDetailsForm.paymentType"
                              @input="changePaymentType">ETH &#8195;(Most common)</base-radio>
                </div>
                <div class="col-12">
                  <base-radio class="mb-3" name="dai" v-model="auctionDetailsForm.paymentType" :disabled="!isMainNet || !showNextPartTwo" @input="changePaymentType">
                    {{stableCoinRadioText}}
                  </base-radio>
                </div>
                <div class="col-12">
                  <base-radio class="mb-3" :disabled="!showNextPartTwo" name="token" v-model="auctionDetailsForm.paymentType">
                    ERC20 Token &#8195;(Custom)
                  </base-radio>
                </div>
              </div>
            </div>
            <div class="col-lg-8">
              <base-input v-if="auctionDetailsForm.paymentType === 'token'" :disabled="!showNextPartTwo" prependIcon="fab fa-ethereum" :appendIcon="paymentTokenIcon"
                          name="payment currency" placeholder="ERC-20 token address" type="text"
                          rules="required|isAddress" v-model="auctionDetailsForm.paymentToken.address" @input="handlePaymentTokenInput($event)">
                <template v-if="auctionDetailsForm.paymentToken.invalid" slot="error">
                  <div class="invalid-feedback" style="display: block;">Invalid ERC20 token address</div>
                </template>
              </base-input>
            </div>
            <div class="w-100"></div>

            <div v-if="auctionDetailsForm.paymentToken.name" class="col-lg-6 list-group list-group-flush mb-3">
              <label class="form-control-label">Token</label>
              <span class="list-group-item flex-column align-items-start">
                            <div class="d-flex w-100 justify-content-between">
                                <div>
                                    <div class="d-flex w-100 align-items-center">
                                        <eth-image
                                            class="avatar avatar-xs mr-2"
                                            :opts="{
                                              seed: auctionDetailsForm.paymentToken.address,
                                              size: 10,
                                              scale: 5
                                            }"
                                        />
                                        <h5 class="mb-1">{{auctionDetailsForm.paymentToken.name}}</h5>
                                    </div>
                                </div>
                                <small>{{auctionDetailsForm.paymentToken.symbol}}</small>
                            </div>
                        </span>
            </div>
            <div class="w-100"></div>

            <div class="col-lg-4">
              <base-input label="Starting price" :disabled="!showNextPartTwo" name="starting price" min="0" placeholder="0" type="number"
                          step="any" :rules="`required|isBigger:${auctionDetailsForm.minimumPrice}`"
                          v-bind:bind="parseStartToNumber"
                          v-model="auctionDetailsForm.startPrice"></base-input>
            </div>
            <div class="w-100"></div>
            <div class="col-lg-4">
              <base-input label="Minimum price" :disabled="!showNextPartTwo" name="minimum price" min="0" placeholder="0" step="any" type="number"
                          :rules="`required|isLess:${auctionDetailsForm.startPrice}`"
                          v-bind:bind="parseMinToNumber"
                          v-model="auctionDetailsForm.minimumPrice"></base-input>
            </div>
            <div class="w-100"></div>
            <div class="col-lg-4">
              <base-input
                  :disabled="!showNextPartTwo"
                  class="col-md-6 right-icon"
                  name="start date"
                  type="text"
                  :rules="`required`"
              >
                <el-date-picker
                    :disabled="!showNextPartTwo"
                    v-model="auctionDetailsForm.startDate"
                    type="date"
                ></el-date-picker>
                <template #label>
                  <span class="font-weight-bold">START DATE</span>
                </template>
              </base-input>
            </div>

            <div class="col-lg-4">
              <base-input
                  :disabled="!showNextPartTwo"
                  class="col-md-6 right-icon"
                  name="end date"
                  :rules="`required`"
              >
                <el-date-picker
                    :disabled="!showNextPartTwo"
                    v-model="auctionDetailsForm.endDate"
                    type="date"
                ></el-date-picker>
                <template #label>
                  <span class="font-weight-bold">END DATE</span>
                </template>
              </base-input>
            </div>

            <!--                    <div class="col-lg-4">-->
            <!--                        <base-input prependIcon="ni ni-calendar-grid-58" :disabled="!showNextPartTwo" label="End date" name="end date" type="text"-->
            <!--                            :rules="`required|isBigger:${auctionDetailsForm.startDate}`">-->
            <!--                            <flat-picker slot-scope="{ focus, blur }" :disabled="!showNextPartTwo" @on-open="focus" @on-close="blur" :config="{-->
            <!--                        allowInput: true,-->
            <!--                        enableTime: true,-->
            <!--                        minDate: auctionDetailsForm.startDate,-->
            <!--                        dateFormat: 'Y-m-d H:i'-->
            <!--                  }" class="form-control datepicker" v-model="auctionDetailsForm.endDate"></flat-picker>-->
            <!--                        </base-input>-->
            <!--                    </div>-->
            <div class="col-lg-8 mr-1">
              <label class="form-control-label font-weight-bolder">Fund wallet</label>
              <br>
              <label class="form-control-label">Where the funds will go</label>
              <base-input prependIcon="fab fa-ethereum" :disabled="!showNextPartTwo" name="fund wallet"
                          placeholder="Ethereum address" type="text" rules="required|isAddress"
                          v-model="auctionDetailsForm.fundWallet"></base-input>
              <base-button class="btn btn-link text-underline mt--4" :disabled="!showNextPartTwo" outline type="neutral"
                           @click="selectCurrentAccount">Send to my account</base-button>
            </div>
          </div>
          <hr />
          <base-button class="float-right"
                       type="primary"
                       native-type="submit"
                       :loading="nextBtnLoading"
                       :disabled="!showNextPartTwo
                        || auctionDetailsForm.paymentToken.loading
                         || auctionDetailsForm.paymentToken.invalid">
            Next
          </base-button>
        </form>
      </validation-observer>
      <div v-if="activeStep === 1">
        <div class="row">
          <div class="col-md-6">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Token</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Contract</span>
                <span class="d-block h4">{{token.address}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Name</span>
                <span class="d-block h4">{{token.name}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Symbol</span>
                <span class="d-block h4">{{token.symbol}}</span>
              </div>
            </card>
          </div>
          <div class="col-md-6">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Auction Details</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Token Supply</span>
                <span class="d-block h4">{{approvalForm.tokenSupply}} {{token.symbol}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Payment Type</span>
                <span class="d-block h4">{{auctionDetailsForm.paymentType.toUpperCase()}}</span>
              </div>
              <div class="col-sm-12 col-md-12" v-if="auctionDetailsForm.paymentToken.address">
                <span class="h6 surtitle text-muted">Payment Token Address</span>
                <span class="d-block h4">
                                <eth-image
                                    class="avatar avatar-xs mr-2"
                                    :opts="{
                                  seed: auctionDetailsForm.paymentToken.address,
                                  size: 10,
                                  scale: 5
                                }"
                                />
                                {{auctionDetailsForm.paymentToken.address}}
                            </span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Start Price</span>
                <span class="d-block h4">{{auctionDetailsForm.startPrice}} {{paymentCurrencySymbol}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Minimum Price</span>
                <span class="d-block h4">
                                {{auctionDetailsForm.minimumPrice}}
                                {{paymentCurrencySymbol}}
                            </span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Start Date</span>
                <span class="d-block h4">{{auctionDetailsForm.startDate}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">End Date</span>
                <span class="d-block h4">{{auctionDetailsForm.endDate}}</span>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Fund Wallet</span>
                <span class="d-block h4">{{auctionDetailsForm.fundWallet}}</span>
              </div>
            </card>
          </div>
        </div>
        <hr />
        <base-button class="float-right" type="primary" @click="deployAuction()" :loading="nextBtnLoading">Deploy
        </base-button>
      </div>
      <div v-if="activeStep === 2">
        <div class="row">
          <div class="col-lg-12">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Status</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <div v-if="auctionDepoymentTransaction.confirmed" class="d-flex justify-content-between align-items-center">
                  <div>
                              <span class="d-block h4">
                                  Confirmed
                                  <i class="fa fa-check-circle fa-1x text-success"></i>
                              </span>
                    <h5>Congratulations, your auction has been confirmed.</h5>
                  </div>
                  <base-button type="primary" @click="redirect(`/auctions/${result.auctionContract}`)" class="btn btn-outline-primary">View Auction</base-button>
                </div>
                <span v-else-if="auctionDepoymentTransaction.failed || auctionDepoymentTransaction.rejected"
                      class="d-block h4">
                                Failed
                                <i class="fa fa-exclamation-circle fa-1x text-danger"></i>
                            </span>
                <span v-else class="d-block h4">
                                Pending
                                <i class="fa fa-spinner fa-pulse fa-1x fa-fw"></i>
                            </span>
              </div>
            </card>
          </div>
          <div class="col-md-6" v-if="auctionDepoymentTransaction.confirmed">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Auction</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <span class="h6 surtitle text-muted">Contract</span>
                <n-link :to="`/auctions/${result.auctionContract}`">{{result.auctionContract}}</n-link>
              </div>
            </card>
          </div>
          <div class="col-md-6" v-if="auctionDepoymentTransaction.txHash">
            <card>
              <div slot="header" class="row">
                <div class="col">
                  <h6 class="text-uppercase text-muted ls-1 mb-1">Transaction Hash</h6>
                </div>
              </div>
              <div class="col-sm-12 col-md-12">
                <a class="d-block"
                   :href="`${explorer.root}${explorer.tx}${auctionDepoymentTransaction.txHash}`"
                   target="blank">{{auctionDepoymentTransaction.txHash}}</a>
              </div>
            </card>
          </div>
        </div>
        <hr />
        <base-button class="float-right" type="primary" @click="changeStep()" :disabled="nextBtnLoading">Start Over
        </base-button>
      </div>

      <base-button class="float-left" type="primary" @click="prev" :disabled="prevBtnDisabled">Back</base-button>
    </div>
<!--    <div>-->
<!--      <modal :show.sync="approvalModal" :showClose="false">-->
<!--        <h6 slot="header" class="modal-title" id="modal-title-default">{{modalTitle}}</h6>-->
<!--        <div class="text-center mb-3">-->
<!--          <i v-if="approvalTransaction.confirmed" class="fa fa-check-circle fa-5x text-success"></i>-->
<!--          <i v-else-if="approvalTransaction.failed || approvalTransaction.rejected"-->
<!--             class="fa fa-exclamation-circle fa-5x text-danger"></i>-->
<!--          <i v-else class="fa fa-spinner fa-pulse fa-5x fa-fw"></i>-->
<!--        </div>-->
<!--        &lt;!&ndash; <h5 class="text-left">Token contract: 0x799899ae9bcacea5871a295169a0b5f63f9241d6</h5> &ndash;&gt;-->
<!--        <h5 class="text-left">Approval amount: {{approvalForm.tokenSupply}}</h5>-->
<!--        <span v-if="approvalTransaction.txHash" class="h5 text-left">-->
<!--                Transaction:-->
<!--                <a :href="txLink" target="_blank">{{approvalTransaction.txHash}}</a>-->
<!--            </span>-->

<!--        <template slot="footer"-->
<!--                  v-if="approvalTransaction.confirmed || approvalTransaction.failed || approvalTransaction.rejected">-->
<!--          <base-button type="link" @click="closeApprovalModal()">Close</base-button>-->
<!--        </template>-->
<!--      </modal>-->
<!--    </div>-->
  </card>
</template>


<script>
import { mapGetters, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";
import { Steps, Step } from "element-ui";
import "flatpickr/dist/flatpickr.css";
import Autocomplete from "@/components/web3-core/inputs/Autocomplete";
import EthImage from "@/components/web3-core/eth-identication/EthImage";
import BaseAlert from "@/components/BaseAlert";
import ethereumConnectionModalMixin from "@/components/web3-core/modal/ethereumConnectionModalMixin";
import {
  sendTransaction as misoMarketCreate,
  subscribeToTokensPurchasedEvent
} from "@/services/web3/templates/dutchTemplate";
import { approveAndWait, isErc20Token, call } from "@/services/web3/fixedToken";
import { DatePicker, TimeSelect } from "element-ui"
import { fromWei, toWei, isAddress } from "@/services/web3/base";
import { dai } from "@/config/contractConfig";
import * as _moment from "moment";

const moment = _moment;

export default {
  mixins: [ethereumConnectionModalMixin],
  components: {
    [DatePicker.name]: DatePicker,
    [TimeSelect.name]: TimeSelect,
    [Steps.name]: Steps,
    [Step.name]: Step,
    ValidationObserver,
    Autocomplete,
    BaseAlert,
    EthImage
  },
  props: {
    contractAddress: {
      type: String,
      required: true
    },
    tokenAddress: {
      type: String,
      required: false
    }
  },
  mounted() {
    this.fetchTokens();
    if (this.tokenAddress) {
      this.token.address = this.tokenAddress;
    }
  },
  data() {
    return {
      timer: 0,
      activeStep: 0,
      showNextPartOne: false,
      showNextPartTwo: false,
      suggestions: [],
      tokensLoading: false,
      errorMessage: '',
      token: {
        address: "",
        name: "",
        symbol: ""
      },
      approvalForm: {
        tokenSupply: 0
      },
      auctionDetailsForm: {
        startDate: "",
        endDate: "",
        paymentType: "eth",
        paymentCurrency: "",
        paymentToken: {
          address: '',
          name: '',
          symbol: '',
          invalid: false,
          loading: false,
        },
        startPrice: '',
        minimumPrice: '',
        fundWallet: "",
      },
      approvalModal: false,
      approvalTransaction: {
        failed: false,
        rejected: false,
        txHash: null,
        confirmed: false
      },
      auctionDepoymentTransaction: {
        failed: false,
        rejected: false,
        txHash: null,
        confirmed: false
      },
      account: {
        allowance: 0,
        tokenBalance: 0
      },
      result: {
        auctionContract: null
      },
      minimumDeploymentFee: 0,
      waitingForConfirmation: false,
      txSigned: false,
      nextBtnLoading: false,
    };
  },
  computed: {
    ...mapGetters({
      coinbase: "ethereum/coinbase",
      tokens: "tokens/list",
    }),
    parseStartToNumber() {
      const arrayStart = this.auctionDetailsForm.startPrice.split('.');
      if(arrayStart[arrayStart.length - 1] !== '0') {
        this.auctionDetailsForm.startPrice = Number(this.auctionDetailsForm.startPrice);
      }
    },
    parseMinToNumber() {
      const arrayMin = this.auctionDetailsForm.minimumPrice.split('.');
      if (arrayMin[arrayMin.length - 1] !== '0') {
        this.auctionDetailsForm.minimumPrice = Number(this.auctionDetailsForm.minimumPrice);
      }
    },
    approvalFormCom() {
      this.showNextPartTwo = false;
      clearInterval(this.timer);
      console.log(+this.approvalForm.tokenSupply <= +fromWei(this.account.tokenBalance) && +this.approvalForm.tokenSupply > 0);
      console.log(+this.approvalForm.tokenSupply, '1')
      console.log(+fromWei(this.account.tokenBalance), '2')
      console.log(+this.approvalForm.tokenSupply, '3')
       // <= +fromWei(this.account.tokenBalance) && +this.approvalForm.tokenSupply > 0
      if (+this.approvalForm.tokenSupply <= +fromWei(this.account.tokenBalance) && +this.approvalForm.tokenSupply > 0) {
        this.timer = setInterval(() => {
          this.approve();
          clearInterval(this.timer);
        }, 1500)
      }
    },
    durationMin: {
      get() {
        return this.auctionDetailsForm.durationMin;
      },
      set(endMin) {
        this.auctionDetailsForm.durationMin = endMin;
      }
    },
    durationHr: {
      get() {
        return this.auctionDetailsForm.durationHr;
      },
      set(endHr) {
        this.auctionDetailsForm.durationMin = endHr;
      }
    },
    durationDays: {
      get() {
        return this.auctionDetailsForm.durationDays;
      },
      set(endDay) {
        this.auctionDetailsForm.durationDays = endDay;
      }
    },
    maxRaise() {
      return this.auctionDetailsForm.maxRaisePrice = this.auctionDetailsForm.startPrice * this.approvalForm.tokenSupply;
    },
    minRaise() {
      return this.auctionDetailsForm.minRaisePrice = this.auctionDetailsForm.minimumPrice * this.approvalForm.tokenSupply;
    },
    prevBtnDisabled() {
      return this.activeStep === 0 || this.activeStep === 4;
    },
    hasToken() {
      return this.account.tokenBalance > 0;
    },
    isMainNet() {
      return this.networkId === 1;
    },
    paymentType() {
      this.auctionDetailsForm.paymentType;
    },
    formatedTokenBalance() {
      return this.account.tokenBalance;
    },
    formatedAllowance() {
      // console.log('wei', fromWei(this.account.tokenBalance));
      console.log('what to conwert', this.account.tokenBalance);
      return this.account.allowance;
    },
    approveBtnText() {
      if (
          parseFloat(this.approvalForm.tokenSupply) === 0 ||
          parseFloat(this.approvalForm.tokenSupply) <=
          parseFloat(this.formatedAllowance)
      ) {
        return "Next";
      } else {
        return "Approve";
      }
    },
    modalTitle() {
      if (this.approvalTransaction.rejected) {
        return "Rejected";
      } else if (this.approvalTransaction.failed) {
        return "Transaction Failed";
      } else if (this.approvalTransaction.confirmed) {
        return "Transaction confirmed";
      }
      return "Approving tokens";
    },
    txLink() {
      return `${this.explorer.root}${this.explorer.tx}${this.approvalTransaction.txHash}`;
    },
    paymentCurrencySymbol() {
      const auctionDetailsForm = this.auctionDetailsForm;
      if (auctionDetailsForm.paymentType === "eth") {
        return "ETH";
      } else if (auctionDetailsForm.paymentType === "token") {
        return auctionDetailsForm.paymentToken.symbol;
      }
      return "DAI"
    },
    stableCoinRadioText() {
      if (this.isMainNet) {
        return "Stable Coin (DAI)"
      } else {
        return "Stable Coin (DAI) - works only on mainnet"
      }
    },
    paymentTokenIcon() {
      const paymentToken = this.auctionDetailsForm.paymentToken;
      if (paymentToken.loading) {
        return "fa fa-spinner fa-pulse fa-1x fa-fw";
      } else if (paymentToken.invalid) {
        return "fa fa-times fa-1x fa-fw text-danger"
      } else if (paymentToken.name) {
        return "fa fa-check-circle fa-1x fa-fw text-success"
      } else {
        return ""
      }
    }
  },
  methods: {
    ...mapActions({
      setTokens: "tokens/setTokens"
    }),
    setEndDate() {
      let exp = moment(this.auctionDetailsForm.startDate, 'YYYY-MM-DD HH:mm')
          .add({
            minute: this.durationMin,
            hour: this.durationHr,
            days: this.durationDays
          });

      this.auctionDetailsForm.endDate = moment(exp).format('YYYY-MM-DD HH:mm');
    },

    async fetchTokens() {
      if (!this.tokensLoading) {
        if (this.suggestions.length > 0) {
          return;
        }
        this.tokensLoading = true;
        if (this.tokens.length === 0) {
          await this.setTokens();
        }
        this.suggestions = this.tokens;
        this.tokensLoading = false;
      }
    },
    async changeStepToApproveTokens() {
      this.nextBtnLoading = true;
      const isEthConnectionOk = this.checkEthConnection();
      if (isEthConnectionOk) {
        if (this.tokenAddress === this.token.address || !this.token.name) {
          const { name, symbol } = await isErc20Token(this.token.address);
          if (name) {
            this.token.name = name;
            this.token.symbol = symbol;
          } else {
            const title = "There is no such ERC-20 token on " + this.networkName;
            const text = this.token.address + " is not an ERC-20 token!";
            this.openSwalModal("error", title, text);
            this.nextBtnLoading = false;
            return;
          }
        } const methods = [
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

        if (this.token.name) {
          // this.changeStep();
          this.showNextPartOne = true;
          this.showNextPartTwo = false;
        }
      }
      this.nextBtnLoading = false;
    },
    async approve() {
      this.nextBtnLoading = true;
      if (
          parseFloat(this.approvalForm.tokenSupply) >
          parseFloat(this.formatedAllowance)
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
    async handlePaymentTokenInput(value) {
      const valid = isAddress(value);
      const paymentToken = this.auctionDetailsForm.paymentToken;
      if (valid) {
        paymentToken.loading = true;
        const { name, symbol } = await isErc20Token(value);
        if (name) {
          paymentToken.name = name;
          paymentToken.symbol = symbol;
          paymentToken.invalid = false;
        } else {
          if (paymentToken.name) {
            paymentToken.name = '';
            paymentToken.symbol = '';
          }
          paymentToken.invalid = true;
        }
        paymentToken.loading = false;
      } else {
        if (paymentToken.name) {
          paymentToken.name = '';
          paymentToken.symbol = '';
        }
        if (paymentToken.invalid) {
          paymentToken.invalid = false;
        }
      }
    },
    async deployAuction() {
      this.nextBtnLoading = true;
      const isEthConnectionOk = this.checkEthConnection();
      if (isEthConnectionOk) {
        this.waitingForConfirmation = true;
        const startDate =
            new Date(this.auctionDetailsForm.startDate).getTime() / 1000;
        const endDate =
            new Date(this.auctionDetailsForm.endDate).getTime() / 1000;
        let paymentCurrency;
        if (this.auctionDetailsForm.paymentType === "eth") {
          paymentCurrency = "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE";
        } else if (this.auctionDetailsForm.paymentType === "token") {
          paymentCurrency = this.auctionDetailsForm.paymentToken.address;
        } else {
          paymentCurrency = dai.address;
        }

        const dataParams = [
          this.coinbase,
          this.token.address,
          toWei(this.approvalForm.tokenSupply),
          startDate,
          endDate,
          paymentCurrency,
          this.auctionDetailsForm.startPrice,
          this.auctionDetailsForm.minimumPrice,
          this.auctionDetailsForm.fundWallet
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

        // const receipt = await deployDutchAuctionAndWait(
        //     this.token.address,
        //     toWei(this.approvalForm.tokenSupply),
        //     startDate,
        //     endDate,
        //     paymentCurrency,
        //     toWei(this.auctionDetailsForm.startPrice),
        //     toWei(this.auctionDetailsForm.minimumPrice),
        //     this.auctionDetailsForm.fundWallet,
        //     this.coinbase,
        //     txHash => {
        //       if (txHash) {
        //         this.auctionDepoymentTransaction.txHash = txHash;
        //         this.changeStep();
        //       } else {
        //         this.auctionDepoymentTransaction.rejected = true;
        //       }
        //     }
        // );
        // if (receipt) {
        //   if (receipt.status) {
        //     this.auctionDepoymentTransaction.confirmed = true;
        //     this.result.auctionContract =
        //         receipt.events.DutchAuctionDeployed.returnValues.addr;
        //   } else {
        //     this.auctionDepoymentTransaction.failed = true;
        //   }
        // }
        this.nextBtnLoading = false;
      }
    },
    redirect(url) {
      this.$router.push(url);
    },
    changeStep() {
      if (this.activeStep === 2) {
        this.resetState();
      } else {
        this.activeStep++;
      }
    },
    prev() {
      if (this.activeStep === 1) {
        this.token.name = '';
        this.token.symbol = '';
      }
      if (this.activeStep !== 0) this.activeStep--;
    },
    handleTokenComplete(token) {
      this.token = {
        address: token.addr,
        name: token.name,
        symbol: token.symbol
      };
      console.log(this.token, 'this.token');
      this.changeStepToApproveTokens();
    },
    closeApprovalModal() {
      this.approvalModal = false;
      this.approvalTransaction = {
        failed: false,
        rejected: false,
        txHash: null,
        confirmed: false
      };
    },
    changePaymentType() {
      if (this.auctionDetailsForm.paymentToken.address) {
        this.auctionDetailsForm.paymentToken = {
          address: '',
          name: '',
          symbol: '',
          invalid: false,
          loading: false,
        };
      }
      this.$refs.auctionDetails.reset();
    },
    selectCurrentAccount() {
      this.auctionDetailsForm.fundWallet = this.coinbase;
    },
    resetState() {
      this.activeStep = 0;
      this.suggestions = [];
      this.tokensLoading = false;
      this.token = {
        address: "",
        name: "",
        symbol: ""
      };
      this.approvalForm = {
        tokenSupply: 0
      };
      this.auctionDetailsForm = {
        startDate: "",
        endDate: "",
        paymentType: "eth",
        paymentCurrency: "",
        paymentToken: {
          address: '',
          name: '',
          symbol: '',
          invalid: false,
          loading: false,
        },
        startPrice: "",
        minimumPrice: "",
        fundWallet: "",
      };
      this.approvalModal = false;
      this.approvalTransaction = {
        failed: false,
        rejected: false,
        txHash: null,
        confirmed: false
      };
      this.auctionDepoymentTransaction = {
        failed: false,
        rejected: false,
        txHash: null,
        confirmed: false
      };
      this.account = {
        allowance: 0,
        tokenBalance: 0
      };
      this.result = {
        auctionContract: null
      };
      this.minimumDeploymentFee = 0;
      this.waitingForConfirmation = false;
      this.txSigned = false;
      this.nextBtnLoading = false;
    }
  },
  watch: {
    coinbase() {
      this.resetState();
    }
  }
};

</script>

<style scoped>

</style>
