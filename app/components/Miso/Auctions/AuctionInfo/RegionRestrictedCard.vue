<template>
	<div class="restricted-card">
		<div class="restricted-card-title">TRANSFER RESTRICTION</div>
		<div>
			<div
				:class="
					isShortText || showFullText
						? 'restricted-card-content-full'
						: 'restricted-card-content'
				"
			>
				{{ warningContent }}
			</div>
			<div v-if="!isShortText && !showFullText" class="restricted-card-showdiv">
				<div>...</div>
				<div class="restricted-card-showtext" @click="toggleText()">Show Message</div>
			</div>
			<div
				v-if="!isShortText && showFullText"
				class="restricted-card-hidetext"
				@click="toggleText()"
			>
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
	props: {
		warningContent: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			showFullText: false,
		}
	},
	computed: {
		isShortText() {
			return this.warningContent.length < 150
		},
	},
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
	background-color: #fee9e4;
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
	background-color: #fee9e4;
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
