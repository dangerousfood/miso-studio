<template>
	<div class="restricted-card">
		<div class="restricted-card-title">TRANSFER RESTRICTION</div>
		<div>
			<div
				:class="
					showFullText ? 'restricted-card-content-full' : 'restricted-card-content'
				"
			>
				{{ content }}
			</div>
			<div v-if="!showFullText" class="restricted-card-showdiv">
				<div>...</div>
				<div class="restricted-card-showtext" @click="toggleText()">Show Message</div>
			</div>
			<div v-else class="restricted-card-hidetext" @click="toggleText()">
				Hide Message
			</div>
		</div>
	</div>
</template>
<script>
import { theme } from '@/mixins/theme'

export default {
	components: {},
	mixins: [theme],
	props: {},
	data() {
		return {
			content: `The content contained in this website does not constitute an offer or sale of
				securities in or into the United States, or to or for the account or benefit of
				U.S. persons, or in any other jurisdictions where it is unlawful to do so.
				Transfer of BIT tokens may be subject to legal restrictions under applicable
				laws. Under no circumstances shall BIT tokens be reoffered, resold or
				transferred within the United States or to, or for the account or benefit of,
				U.S. persons, except pursuant to an exemption from, or in a transaction not
				subject to, the registration requirements of the U.S. Securities Act of 1933, as
				amended.`,
			showFullText: false,
		}
	},
	computed: {},
	mounted() {},
	methods: {
		toggleText() {
			this.showFullText = !this.showFullText
		},
	},
}
</script>

<style lang="scss" scoped>
.restricted-card {
	background-color: #f6664525;
	padding: 20px;
}
.restricted-card-title {
	color: #f73e15;
	font-weight: bold;
}
.restricted-card-content {
	color: #495573e0;
	overflow: hidden;
	height: 42px;
	text-align: justify;
}
.restricted-card-showdiv {
	position: absolute;
	bottom: 20px;
	right: 20px;
	background-color: rgb(254, 233, 228);
	div {
		display: inline;
	}
}
.restricted-card-showtext {
	margin-left: 10px;
	font-weight: bold;
	color: red;
	cursor: pointer;
}
.restricted-card-content-full {
	color: #495573e0;
	display: inline;
}

.restricted-card-hidetext {
	display: inline;
	margin-left: 10px;
	font-weight: bold;
	color: red;
	cursor: pointer;
}
</style>
