<template>
	<base-nav
		v-model="showMenu"
		class="navbar-absolute top-navbar"
		:class="[
			slideBar ? 'inactive-bar' : 'active-bar',
			!darkMode ? 'nav_bg' : 'divider',
		]"
		:transparent="true"
	>
		<div slot="brand" class="navbar-wrapper">
			<div
				class="navbar-toggle d-inline"
				:class="{ toggled: $sidebar.showSidebar }"
				@click="showSideBar = !showSideBar"
			>
				<button type="button" class="navbar-toggler" @click="toggleSidebar">
					<span class="navbar-toggler-bar bar1"></span>
					<span class="navbar-toggler-bar bar2"></span>
					<span class="navbar-toggler-bar bar3"></span>
				</button>
			</div>
			<span
				v-if="darkMode && !notDesktopSize"
				class="text-white"
				:class="[slideBar ? 'pl-4 ml-1' : 'pl-2']"
			>
				InstantMISO v1.0.0.3
			</span>
		</div>
		<div
			v-if="notDesktopSize"
			slot="logo"
			class="d-flex justify-content-center"
		>
			<zoom-x-transition :duration="500">
				<svg-icon
					v-show="!showSideBar"
					icon="miso"
					:height="logoHeight"
					width="150"
					color="#ffffff"
				/>
			</zoom-x-transition>
		</div>
		<ul class="navbar-nav ml-auto">
			<div class="d-flex justify-content-center">
				<div class="d-flex align-items-center pr-2">
					<svg-icon
						class="mr-2"
						icon="sun"
						height="20"
						width="20"
						color="#ffffff"
						:fill="false"
					/>
					<base-switch
						v-model="darkMode"
						class="mb-0"
						@input="toggleMode"
					></base-switch>
					<svg-icon
						class="ml-2"
						icon="moon"
						height="20"
						width="20"
						color="#ffffff"
						:fill="false"
					/>
				</div>
			</div>
			<client-only>
				<div
					class="d-inline-flex align-items-center justify-content-center px-4 my-3 my-lg-0 py-lg-0"
					:class="{ 'py-4': !notDesktopSize }"
				>
					<span v-if="!coinbase" class="text-white">Wallet not detected</span>
				</div>
				<div class="d-flex justify-content-center pb-5 mb-0 pb-lg-0">
					<button
						v-if="!coinbase"
						class="text-uppercase rounded-pill connect-btn text-white"
						:class="{ 'connect-btn_white': !darkMode }"
						@click="connectAccount()"
					>
						CONNECT
					</button>
					<base-button
						v-else
						:class="{ 'connect-btn_white': !darkMode }"
						class="text-uppercase rounded-pill connect-btn text-white"
					>
						<span class="mr-2">{{ coinbase | truncate }}</span>
						<div class="avatar-group primary">
							<span class="avatar avatar-sm rounded-circle">
								<eth-image
									:opts="{
										seed: coinbase,
										size: 10,
										scale: 5,
									}"
								/>
							</span>
						</div>
					</base-button>
				</div>
			</client-only>
		</ul>
	</base-nav>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex"
import { BaseNav, BaseSwitch } from "@/components"
import { ZoomXTransition } from "vue2-transitions"
import EthImage from "@/components/Miso/EthIdentication/EthImage.vue"
// import WalletConnectionBadge from "@/components/web3-core/inform/WalletConnectionBadge";

export default {
	components: {
		BaseNav,
		BaseSwitch,
		EthImage,
		ZoomXTransition,
	},
	props: {
		slideBar: {
			type: Boolean,
			required: false,
			discriptioin: "navbar side with slidebar min/max condition",
		},
	},
	data() {
		return {
			activeNotifications: false,
			showMenu: false,
			searchModalVisible: false,
			searchQuery: "",
			darkMode: true,
			breackpoint: null,
			showSideBar: false,
		}
	},
	computed: {
		...mapGetters({
			coinbase: "ethereum/coinbase",
		}),
		// routeName() {
		// 	const { path } = this.$route
		// 	let parts = path.split("/")
		// 	return parts.map((p) => this.capitalizeFirstLetter(p)).join(" ")
		// },
		isRTL() {
			return this.$rtl.isRTL
		},
		notDesktopSize() {
			if (
				this.breackpoint === "md" ||
				this.breackpoint === "sm" ||
				this.breackpoint === "xs"
			) {
				return true
			}
			return false
		},
		logoHeight() {
			if (this.breackpoint === "xs") {
				return "10"
			}
			return "15"
		},
	},

	watch: {
		darkMode(type) {
			const docClasses = document.body.classList
			this.SET_THEME(type)
			if (type) {
				docClasses.remove("white-content")
			} else {
				docClasses.add("white-content")
			}
		},
		"$screen.breakpoint"(val) {
			this.breackpoint = val
		},
	},
	mounted() {
		if (process.browser) {
			const pageThem = JSON.parse(localStorage.getItem("miso-theme"))
			if (pageThem !== null) {
				this.SET_THEME(pageThem)
				this.darkMode = pageThem
			}
		}
		this.breackpoint = this.$screen.breakpoint
	},
	methods: {
		...mapActions({
			enableAccount: "ethereum/enableAccount",
		}),
		...mapMutations("theme", ["SET_THEME"]),
		async connectAccount() {
			const connected = await this.enableAccount()
			if (!connected) {
				this.$swal.fire({
					icon: "warning",
					title: `WALLET NOT DETECTED!`,
					html: `<p>Wallet is not detected in your browser, to continue please install Metamask extension for your browser</p> <a v-bind: href="https://metamask.io/" target="_blank">Get MetaMask</a>`,
					buttonsStyling: false,
					showCancelButton: false,
					confirmButtonClass: "btn btn-primary btn-fill",
					confirmButtonText: `Close`,
				})
			}
		},
		toggleMode(type) {
			this.$emit("darkMode", type)
			const docClasses = document.body.classList
			if (type) {
				docClasses.remove("white-content")
			} else {
				docClasses.add("white-content")
			}
		},
		capitalizeFirstLetter(string) {
			if (!string || typeof string !== "string") {
				return ""
			}
			return string.charAt(0).toUpperCase() + string.slice(1)
		},
		closeDropDown() {
			this.activeNotifications = false
		},
		toggleSidebar() {
			this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
		},
		toggleMenu() {
			this.showMenu = !this.showMenu
		},
	},
}
</script>
<style lang="scss" scoped>
.top-navbar {
	top: 0px;
	height: 5.2rem;
	background: transparent !important;
	&.divider {
		&::after {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			height: 1px;
			width: 100%;
			background: rgba(255, 255, 255, 0.1);
		}
	}
}
.navbar-wrapper {
	margin-left: -15px;
}
.navbar-toggle {
	.navbar-toggler-bar {
		height: 3px;
		&.bar1 {
			top: 11px;
			width: 12px;
			margin-left: auto;
		}
		&.bar2 {
			margin-top: 4px;
			width: 18px;
			margin-left: auto;
		}
		&.bar3 {
			margin-top: 4px;
			width: 22px;
			margin-left: auto;
		}
	}
	&.toggled {
		.bar1 {
			width: 22px;
			margin-left: auto;
			top: 8px;
		}
		.bar3 {
			margin-top: 7px;
			width: 22px;
			margin-left: auto;
		}
	}
}

.connect-btn {
	padding: 12px 40px;
	background: rgb(240, 74, 39);
	background: linear-gradient(
		90deg,
		rgba(240, 74, 39, 1) 0%,
		rgba(246, 116, 64, 1) 50%,
		rgba(236, 68, 34, 1) 100%
	);
	box-shadow: none;
	border-width: 1px;
	border: none;
	&_white {
		border: 1px solid #ffffff;
	}
}
.nav_bg {
	background: url("/s3/img/backgrounds/nav_bg-2.png") no-repeat left bottom !important;
	background-size: cover !important;
}

@media screen and (min-width: 1200px) {
	.active-bar {
		width: calc(100% - 264px) !important;
	}
	.inactive-bar {
		width: calc(100% - 80px) !important;
	}
}
</style>

<style lang="scss">
@media screen and (max-width: 991.98px) {
	.navbar-collapse {
		background: #000a35;
		width: 100%;
		position: absolute;
		left: 0;
		top: 5.2rem;
		width: 100%;
		ul {
			padding: 0 40px;
			margin-top: 50px;
		}
	}
}
</style>
