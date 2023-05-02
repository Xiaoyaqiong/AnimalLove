<template>
	<view class="">

		<MyBar></MyBar>
		<!-- <view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view> -->
		<!-- 三个按钮组 -->
		<view class="btnGroup">
			<view class="btn" v-for="(item,index) in btnGroup">
				<u-icon top="2vh" size="2rem" labelPos="bottom" space="5.6vh" labelSize=".8rem" :label="item"
					name="red-packet"></u-icon>
			</view>

		</view>

		<!-- 邀请进群 -->
		<view class="QQQun">
			<u-avatar-group :urls="urls" size="2rem" gap="0.4"></u-avatar-group>

			<p>邀请您加入附近的宠圈交流群~</p>
			<view class="joinInbtn">
				<u-button color="#FF6900" shape="circle" text="立即加入"></u-button>
			</view>
		</view>


		<!-- 中间轮播图 -->
		<view class="Middleswiper">
			<u-swiper :list="swiperList" indicator indicatorMode="dot" circular></u-swiper>
		</view>


	</view>
</template>

<script>
	import MyBar from '@/components/MyNavbar.vue'
	export default {
		data() {
			return {
				btnGroup: ['商家', '救助/寻宠', '领养'],
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',


				],
				swiperList: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
				]
			}
		},
		components: {
			MyBar
		}
	}
</script>

<style lang="scss">
	@import 'sameCity.scss';
</style>