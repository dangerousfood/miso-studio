<template>
	<div
        class="col-lg-12 col-12 m-auto d-flex flex-sm-row flex-column justify-content-between"
    >
        <div
            v-for="option in auctionTypes"
            :key="option.id"
            class="col-lg-4"
        >
            <div
                class="d-flex flex-column align-items-center justify-content-around"
            >
                <svg-icon
                    :icon="option.icon"
                    width="60"
                    height="60"
                    class="mr-3"
                />
                <base-radio
                    :name="option.id"
                    v-model="chosenAuctionType"
                    class="mb-3 text-capitalize bottom-45"
                >
                    {{ option.title }}
                </base-radio>
                <span class="fs-3 text-secondary white-txt">
                    {{ option.content }}
                </span>
                <br>
                <i class="fs-3 text-secondary white-txt">
                    {{ option.description }}
                </i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	components: {
		
	},
	data() {
		return {
			items: {
				auctionType: false,
                tokenAddress: false,
                tokenAllowance: false,
                tokenAmount: false,
                payment_currency: false,
				walletAddress: false,
				dutchSettings: false,
				startend: false
			},
            chosenAuctionType: 1,
		}
	},
	props: {
		auctionTypes: {
			type: Array,
			required: () => [],
		},
	},
	
	computed: {
		
	},
    watch: {
        chosenAuctionType(){
            this.items['auctionType'] = true
            this.$emit("active-focus", this.items, this.chosenAuctionType)
        }
    },
	methods: {
		
	},
}
</script>

<style lang="scss">
    
</style>