<template>
	<view class="content">
		<view class="u-demo-block">
		        <text class="u-demo-block__title">卡片式</text>
		        <u-swiper
		                :list="list3"
		                previousMargin="30"
		                nextMargin="30"
		                circular
		                :autoplay="false"
		                radius="5"
		                bgColor="#ffffff"
		        ></u-swiper>
		    </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list3: [
				                    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				                ],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>


</style>
