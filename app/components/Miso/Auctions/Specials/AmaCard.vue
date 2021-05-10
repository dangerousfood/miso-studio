<template>
	<div v-if="!loading" class="p-2 card-hight">
		<img :src="require(`@/assets/images/${headerimage}`)" class="ama-header" />
		<div class="ama-card-description pl-4">
			<a :href="linkurl" target="_blank">
				<img src="@/assets/images/playbutton.png" class="ama-play" />
			</a>
			<p v-if="youtubeflag" class="ama-watch pt-4 pb-3">Watch On Youtube</p>
			<p v-if="!youtubeflag" class="ama-watch pt-4 pb-3">Read On Medium</p>
			<p class="ama-title pb-5" v-html="title"></p>
			<p class="ama-watch pb-4" v-html="pubdate"></p>
		</div>
	</div>
</template>

<script>
import { theme } from "@/mixins/theme"

export default {
	components: {},
	mixins: [theme],
	props: {
		headerimage: String,
		youtubeflag: Boolean,
		title: String,
		pubdate: String,
		linkurl: String,
	},
	data() {
		return {
			loading: true,
		}
	},
	computed: {},
	mounted() {
		this.loading = false
	},
	beforeDestroy() {},
	methods: {},
}
</script>

<style lang="scss" scoped>
.card-hight {
	min-height: 300px;
}
.counter-line {
	font-size: 33px;
	max-width: 288px;
}

.ama-card-description {
	background: #161522;
	border-radius: 0 0 12px 12px;
	text-align: left;
	position: relative;
}

.ama-title {
	color: #e3e3e3;
	font-size: 14px;
}

.ama-watch {
	color: #7f7f7f;
	font-size: 12px;
}

.ama-header {
	border-radius: 0px !important;
	width: 100%;
}

.ama-play {
	font-size: 4.5rem;
	color: white;
	position: absolute;
	transform: translateY(-50%) scale(1);
	right: 15px;
	width: 60px;
	&:hover {
		transition: all 0.4s ease-in-out;
		transform: translateY(-50%) scale(1.1);
		cursor: pointer;
	}
}
</style>
