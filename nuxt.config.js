const { ENV } = require("./configs/env")

const routerConfig = {}
if (ENV.BASE_URL) {
	routerConfig.base = ENV.BASE_URL
}

const generate = {}
if (ENV.GENERATE_ERROR_PAGE) {
	generate.routes = ["/403", "/404", "/500"]
}

module.exports = {
	telemetry: false,
	target: "static",
	ssr: false,
	head: {
		title: "MISO | Minimal Initial SushiSwap Offering",
		meta: [
			{ charset: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{
				name: "og:title",
				content: "MISO | Minimal Initial SushiSwap Offering",
			},
			{ name: "og:image", content: "/s3/img/brand/miso-social.jpg" },
			{ name: "robots", content: "noindex" },
			{
				hid: "description",
				name: "description",
				content: "MISO: Minimal Initial SushiSwap Offering",
			},
		],
		link: [
			{ rel: "icon", type: "image/x-icon", href: "/s3/miso.ico" },
			{
				rel: "stylesheet",
				href:
					"https://fonts.googleapis.com/css?family=Poppins:200,300,400,600,700,800",
			},
			{
				rel: "stylesheet",
				href:
					"https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.2/css/all.min.css",
			},
		],
		bodyAttrs: {
			class: "", // delete the class to have the sidebar expanded by default. Add `white-content` class here to enable "white" mode.
		},
	},
	router: {
		base: "/",
		// linkExactActiveClass: "active",
	},
	render: {
		etag: false,
		compressor: { threshold: 6 },
	},

	srcDir: "./app",
	/*
	 ** Customize the progress-bar color
	 */
	loading: true,
	/*
	 ** Global CSS
	 */
	css: [
		"assets/css/demo.css",
		"assets/css/nucleo-icons.css",
		"assets/sass/black-dashboard-pro.scss",
	],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		`~/plugins/dashboard-plugin.js`,
		"~/plugins/vee-validate",
		"~/plugins/filters.js",
		{ src: "~/plugins/vue-slider-component.js", ssr: false },
		{ src: "~/plugins/web3", ssr: false },
		{ src: "~/plugins/sweetalert.js", ssr: false },
		{ src: "~/plugins/full-calendar.js", ssr: false },
		{ src: "~/plugins/svg-icons.js", ssr: true },
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// https://go.nuxtjs.dev/eslint
		"@nuxtjs/eslint-module",
	],
	/*
	 ** Nuxt.js modules
	 */
	modules: ["@nuxtjs/pwa", "vue-screen/nuxt"],
	screen: {
		extend: "bootstrap",
	},
	// server: {
	// 	port: 8080,
	// },
	/*
	 ** Build configuration
	 */
	build: {
		transpile: ["vee-validate/dist/rules", /^element-ui/],
		analyze: false,
		standalone: true,

		extend(config, ctx) {},
		babel: {
			plugins: [
				[
					"component",
					{
						libraryName: "element-ui",
						styleLibraryName: "theme-chalk",
					},
				],
			],
		},
	},
}
