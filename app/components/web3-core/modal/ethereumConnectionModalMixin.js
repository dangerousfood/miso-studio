import { mapGetters } from "vuex"
import networkConfig from "@/config/networkConfig"

export default {
	computed: {
		...mapGetters({
			isOk: "ethereum/isOk",
			walletFound: "ethereum/walletFound",
			walletInitialized: "ethereum/initialized",
			networkId: "ethereum/networkId",
			rightNetworks: "ethereum/rightNetworks",
			defaultNetworkId: "ethereum/defaultNetworkId",
			isRightNetwork: "ethereum/isRightNetwork",
			currentProvidersNetworkId: "ethereum/currentProvidersNetworkId",
			explorer: "ethereum/explorer",
		}),
		networkName() {
			return networkConfig[this.networkId].name
		},
	},
	methods: {
		checkEthConnection() {
			if (!this.isOk) {
				this.$swal.fire({
					icon: "warning",
					title: this.getConnectionTitle(),
					html: this.getConnectionBody(),
					buttonsStyling: false,
					showCancelButton: false,
					confirmButtonText: "CLOSE",
					confirmButtonClass: "btn btn-primary btn-fill",
				})
				return false
			} else {
				return true
			}
		},
		openTransactionInfoModal(tx) {
			this.$swal.fire({
				icon: "success",
				title: "Your transaction has been sent...",
				html:
					"See on etherscan: " +
					`<a href="${this.explorer.root}${this.explorer.tx}${tx}" target="_blank">here</a>.`,
				buttonsStyling: false,
				showCancelButton: false,
				confirmButtonText: "Close",
				confirmButtonClass: "btn btn-primary btn-fill",
			})
		},
		getConnectionTitle() {
			if (this.isOk) {
				return networkConfig[this.currentProvidersNetworkId].name
			} else if (!this.walletFound) {
				return "WALLET NOT DETECTED!"
			} else if (!this.isRightNetwork && this.networkId === 1) {
				return "Testnet only, Mainnet upgrade"
			} else if (!this.isRightNetwork) {
				return "Wrong network"
			} else {
				return "Account is not connected"
			}
		},
		openSwalModal(icon, title, text) {
			this.$swal.fire({
				icon,
				title,
				text,
				buttonsStyling: false,
				showCancelButton: false,
				confirmButtonText: "Close",
				confirmButtonClass: "btn btn-primary btn-fill",
			})
		},
		getConnectionBody() {
			// const networkId = this.networkId
			try {
				if (!this.walletFound) {
					return `<p>Wallet is not detected in your browser, to continue please install Metamask extension for your browser</p> <a v-bind: href="https://metamask.io/" target="_blank">Get MetaMask</a>`
				} else if (!this.isRightNetwork) {
					return `You are on ${
						this.networkName
					} . Please change your network to ${
						networkConfig[this.defaultNetworkId].name
					}.`
				} else {
					return `Please connect to Ethereum wallet to be able to proceed...`
				}
			} catch (error) {
				return "An unexpected error occurred. Please try loading the page"
			}
		},
	},
}
