<template>
	<footer
		class="footer ml-auto"
		:class="[!slideBar ? 'active-footer' : 'inactive-footer']"
	>
		<div
			class="container-fluid d-flex justify-content-between align-items-center"
		>
			<div class="footer-link">
				<a href="https://medium.com/instantmiso" target="_blank" rel="noopener">
					Medium Articles
				</a>
			</div>
			<div class="footer-image">
				<img src="s3/img/misoBowl.png" class="img-fluid" alt="miso" />
			</div>
			<div class="copyright">
				MISO &copy; {{ year }}, made with

				<a href="https://sushiswap.fi" rel="noopener" target="_blank">
					SushiSwap
				</a>
			</div>
		</div>
	</footer>
</template>
<script>
export default {
	props: {
		slideBar: {
			type: Boolean,
			required: true,
		},
	},
	data() {
		return {
			year: new Date().getFullYear(),
		}
	},
}
</script>
<style lang="scss" scoped>
.footer {
	&-image {
		height: 40px;
		width: 90px;
	}
	&-link a {
		color: white;
	}
}
@media screen and (min-width: 1200px) {
	.active-footer {
		width: calc(100% - 264px) !important;
	}
	.inactive-footer {
		width: 100% !important;
	}
}
</style>
