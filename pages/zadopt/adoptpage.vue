<template>
	<view>
		<!-- <view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view> -->
		<Mynav CenterSlot="动态" :MyColor="$topicColor" :backInfo="goBackIndex"></Mynav>
	
	
		<adopt></adopt>
	</view>
</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	import myhttp from '../../api/myhttp.js'
	import moment from 'moment'
	import Mynav from '@/components/Mynav.vue'
	import adopt from 'pages/zadopt/adopt.vue'
	export default {

		components: {
			adopt,
			slFilter,
			Mynav
		},
		onLoad() {
			this.$store.state.adopt.filterList = {}
			this.thisAsyncIncrement()
		},
		methods: {
			goBackIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			thisAsyncIncrement() {
				this.$store.state.adopt.adoptList=[]
				this.$store.dispatch('getArticles')
			},
		}

	}
</script>
<style>
	.choose {
		background-color: rgb(255, 240, 209);
		color: gray;
		font-size: 0.8rem;
	}
</style>