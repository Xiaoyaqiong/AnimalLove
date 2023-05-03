<template>
	<view class="">

		<MyBar></MyBar>
		<!-- <view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view> -->
		<!-- 三个按钮组 -->
		<view class="btnGroup">
			<view class="btn" v-for="(item,index) in btnGroup">
					<u-icon top="2vh" size="2rem" labelPos="bottom" 
					name="red-packet"></u-icon>
					<span class="btnContent">{{item}}</span>
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
		
		<view class="Mapicon">
			<u-icon style="display: inline-block" name="/static/icon/SameCity/fujin.png" size="2rem"></u-icon>
			<span style="font-weight: bold;">附近</span>
		</view>
		</view>

	
	<!-- 附近商家列表 -->
	<view class="NearList">
		<view class="Nearitem" v-for="(item,index) in NearList">
			
			<view class="shopImg">
				<u--image mode="scaleToFill" width="25vw" height="8vh" radius="10px" :src="item.shopImg"></u--image>
			</view>
			<!-- 商家简介 -->
			<view class="mid">
				<span>{{item.shopName}}</span>
				<u-rate :value="item.rate" readonly active-color="#FF6900"></u-rate>
				<view class="content">
					<span class="address">{{item.address}}</span>
					<span class="distance">{{item.distance}}</span>
				</view>
				
			</view>
			
			<view class="shopList">
				<view class="shopItem" v-for="(good,index) in item.setMeal">
					<span class="cost">&yen;  {{good.cost}}</span>
					<span class="mealName">{{good.mealName}}</span>
					

				</view>
				<view class="">
					
				</view>
			</view>
			
		</view>
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
				],
				// 附近商家列表
				NearList:[
					{
						shopImg:'https://cdn.uviewui.com/uview/album/1.jpg',
						shopName:'喵呜阿旺宠物医院（24小时）',
						rate:5.0,
						address:'胜桥东路',
						distance:'1.2km',
						setMeal:[
							{
								cost:'288',
								mealName:'公猫呼吸麻醉微创绝育手术'
							},
							{
								cost:'188',
								mealName:'洗牙套餐'
							}
						]
					}
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