<template>
	<div>
		<div class="">
			<validation-observer ref="observer">
				<form
					v-if="activeStep === 0"
					class="needs-validation"
					@submit.prevent="handleSubmit(deployPointsList)"
				>
					<div class="form-row justify-content-center mb-4">
						<div class="col-md-12">
							<base-input
								v-model="model.listOwner"
								label="List Owner"
								name="List Owner"
								placeholder="List Owner Address"
								type="text"
								rules="required|isAddress"
								@focus="focusInput('listOwnerAddress')"
							></base-input>

							<p class="font-weight-bold" @click="selectCurrentAccount">
								Use my account
							</p>
						</div>
					</div>

					<div class="form-row justify-content-center">
						<div
							v-for="(point, index) in model.points"
							:key="index"
							class="col-12 d-flex justify-content-center"
						>
							<div class="col-md-5">
								<base-input
									v-model="point.account"
									:label="`Account ${index + 1}`"
									name="Account"
									placeholder="Account Address"
									type="text"
									rules="required|isAddress"
								></base-input>
							</div>
							<div class="col-md-5">
								<base-input
									v-model="point.amount"
									:label="`Amount ${index + 1}`"
									name="Amount"
									placeholder="Amount"
									type="number"
									step="0.00001"
									min="0"
									rules="required|min_value:0"
								></base-input>
							</div>
							<div class="col-md-1 mt-4">
								<base-button
									type="primary"
									:min-width="50"
									@click.prevent="removePoint(index)"
								>
									-
								</base-button>
							</div>
						</div>
						<base-button
							class="mt-4"
							type="primary"
							:round="true"
							@click.prevent="addPoint"
						>
							Add to List
						</base-button>

						<div class="justify-content-center mt-4 pl-3">
							<div class="input-file-container">
								<input
									id="importCSV"
									type="file"
									class="mt-4 input-file"
									@change="onFileChange"
								/>
								<label
									tabindex="0"
									for="my-file"
									class="input-file-trigger is-rounded"
								>
									Import the CSV
								</label>
							</div>
						</div>
					</div>
					<hr />
					<base-button
						v-if="!hideNextBtn"
						:loading="waitingForConfirmation"
						class="float-right"
						type="primary"
						:round="true"
						native-type="submit"
					>
						Deploy
					</base-button>
				</form>
			</validation-observer>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex'
import { Steps, Step } from 'element-ui'
import {
	subscribeToPointListDeployedEvent,
	getContractInstance,
} from '@/services/web3/listFactory'
import { sendTransaction, toWei } from '@/services/web3/base'
import { BaseButton } from '~/components'

export default {
	components: {
		[Steps.name]: Steps,
		[Step.name]: Step,
		BaseButton,
	},
	props: {
		initModel: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			activeStep: 0,
			wizardModel: null,
			prevBtnDisabled: true,
			waitingForConfirmation: false,
			transactionHash: null,
			pointListAddress: null,
			pointListDeployedEventSubscribtion: null,
			fileinput: '',
		}
	},
	computed: {
		...mapGetters({
			coinbase: 'ethereum/coinbase',
			explorer: 'ethereum/explorer',
		}),
		nextBtnText() {
			let text = ''
			switch (this.activeStep) {
				case 0:
					text = 'Deploy'
					break
				case 2:
					text = 'Start Over'
					break
			}
			return text
		},
		hideNextBtn() {
			return this.activeStep === 1
		},
		model() {
			return this.initModel
		},
	},
	watch: {
		fileinput() {
			const arr = this.fileinput.split('\r\n')
			const points = arr
				.filter((elm) => elm !== '')
				.map((elm) => {
					const childArray = elm.split(',')
					return {
						account: childArray[0],
						amount: childArray[childArray.length - 1],
					}
				})
			this.pointsListModel.points = points
		},
	},
	mounted() {
		this.subscribeToPointListDeployedEvent()
		this.listFactoryContract = getContractInstance()
	},
	beforeDestroy() {
		this.unsubscribeFromPointListDeployedEvent()
	},
	methods: {
		validateStep(ref) {
			return this.$refs[ref].validate()
		},
		onStepValidated(validated) {
			this.wizardModel = validated
			this.nextTab()
		},
		changeStep() {
			if (this.activeStep === 2) {
				this.pointsListModel = {
					listOwner: '',
					points: [
						{
							account: '',
							amount: 0,
						},
					],
				}
				this.activeStep = 0
			} else {
				this.activeStep++
			}
		},
		selectCurrentAccount() {
			this.pointsListModel.listOwner = this.coinbase
		},
		addPoint() {
			this.pointsListModel.points.push({ account: '', amount: 0 })
		},
		onFileChange(e) {
			const files = e.target.files || e.dataTransfer.files
			if (!files.length) return
			this.createInput(files[0])
		},
		createInput(file) {
			const reader = new FileReader()
			const vm = this
			reader.onload = (e) => {
				vm.fileinput = reader.result
			}
			reader.readAsText(file)
		},
		removePoint(index) {
			this.pointsListModel.points.splice(index, 1)
		},
		async deployPointsList() {
			// Validation
			const isValid = await this.$refs.observer.validate()
			if (!isValid) return

			// Deploy PointsList
			const methodToSend = this.listFactoryContract.methods.deployPointList(
				this.pointsListModel.listOwner,
				this.pointsListModel.points.map((point) => point.account),
				this.pointsListModel.points.map((point) => toWei(point.amount))
			)

			const txHash = await sendTransaction(methodToSend, {
				from: this.coinbase,
			})

			if (txHash) {
				this.transactionHash = txHash
				this.changeStep()
			}
			this.waitingForConfirmation = false
		},
		subscribeToPointListDeployedEvent() {
			this.pointListDeployedEventSubscribtion = subscribeToPointListDeployedEvent()
				.on('data', (event) => {
					if (this.transactionHash) {
						if (this.transactionHash.toLowerCase() === event.transactionHash) {
							this.pointListAddress = event.returnValues.pointList
							this.changeStep()
						}
					}
				})
				.on('error', (error) => {
					console.log('event error:', error)
				})
		},
		unsubscribeFromPointListDeployedEvent() {
			if (this.pointListDeployedEventSubscribtion) {
				this.pointListDeployedEventSubscribtion.unsubscribe()
			}
		},
		redirect(url) {
			this.$router.push(url)
		},
		validate() {
			return this.$refs.observer.validate().then((res) => {
				this.$emit('on-validated', res, this.model)
				return res
			})
		},
		focusInput(val) {
			for (const key in this.items) {
				if (val === key) {
					this.items[key] = true
				} else {
					this.items[key] = false
				}
			}
			this.$emit('active-focus', this.items)
		},
	},
}
</script>

<style lang="scss">
.input-file-container {
	position: relative;
}
.input-file-trigger {
	display: block;
	padding: 14px 45px;
	background: #f46e41;
	background-image: linear-gradient(to bottom left, #f46e41, #ba54f5, #f46e41);
	background-size: 210% 210%;
	background-position: top right;
	background-color: #f46e41;
	transition: all 0.15s ease;
	box-shadow: none;
	color: #ffffff;
	font-size: 1rem !important;
	font-weight: bolder;
	cursor: pointer;
}
.input-file {
	position: absolute;
	top: 0;
	left: 0;
	width: 225px;
	opacity: 0;
	padding: 14px 0;
	cursor: pointer;
}
.input-file:hover + .input-file-trigger,
.input-file:focus + .input-file-trigger,
.input-file-trigger:hover,
.input-file-trigger:focus {
	background: #f46e41;
	background-image: linear-gradient(to bottom left, #f46e41, #ba54f5, #f46e41);
	background-size: 210% 210%;
	background-position: top right;
	background-color: #f46e41;
	transition: all 0.15s ease;
	box-shadow: none;
	color: #ffffff;
}
</style>
