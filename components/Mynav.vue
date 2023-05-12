<template>
	<!-- 自定义导航组件 -->
	<view class="Mynav">
		<u-navbar :fixed="true" :placeholder="true" :bgColor="MyColor"  :leftClick="backInfo"
			:autoBack="autoback">
			<view class="u-nav-slot" slot="center">
				{{CenterSlot}}
			</view>
			<view class="u-nav-slot flex" slot="right">
				<u-icon style="width: 54rpx;height: 54rpx;" :name="RightIcon1"></u-icon>
				<u-icon style="width: 54rpx;height: 54rpx;" :name="RightIcon2"></u-icon>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	export default {
		props: {
			"CenterSlot": {
				type: String,
				require: true
			},
			"backInfo": {
				type: Function,
			},
			"MyColor": {
				type: String,
				default: '#fff'
			},
			"autoback": {
				type: Boolean,
				default: true

			},
			"RightSlot": {
				type: String,
				require: false
			},
			"RightIcon1": {
				type: String,
				require: false
			},
			"RightIcon2": {
				type: String,
				require: false
			}
		},
		methods: {
			// backInfo() {
			// 	// TODO
			// 	console.log('back')
			// 	let url ='pages/personage/personage'
			// 	uni.switchTab({
			// 		url:url
			// 	})
			// },
		}
	}
</script>

<style>
	/* 标题字号 */
	.u-nav-slot {
		font-size: 1.08rem;
	}
</style>
