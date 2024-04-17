<template>
	<view class="">

		<MyBar></MyBar>
		<!-- <view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view> -->
		<!-- 三个按钮组 -->
		<!-- <view class="btnGroup">
			<view class="btn" v-for="(item,index) in btnGroup">
					<u-icon top="2vh" size="2rem" labelPos="bottom" 
					name="red-packet"></u-icon>
					<span class="btnContent">{{item}}</span>
			</view>
			
		</view> -->

		<!-- 邀请进群 -->
		<view class="QQQun">
			<u-avatar-group :urls="urls" size="2rem" gap="0.4"></u-avatar-group>
			<p>邀请您加入附近的宠圈交流群~</p>
			<view class="joinInbtn">
				<u-button color="#FF6900" shape="circle" text="立即加入" @click=""></u-button>
			</view>
		</view>


		<!-- 中间轮播图 -->
		<view class="Middleswiper">
			<u-swiper :list="swiperList" indicator indicatorMode="dot" circular></u-swiper>
		
		<view class="Mapicon">
			<u-icon style="display: inline-block" name="/static/icon/SameCity/fujin.png" size="2rem"></u-icon>
			<span style="font-weight: bold;">订单</span>
			<u-icon class="add" name="plus" @click="addOrder()"></u-icon>
		</view>
		</view>

	
	<!-- 附近商家列表 -->
	<view class="NearList">
		<view class="Nearitem" v-for="(item,index) in OrderList" @click="ClickOrder(index)">
			
		
			<!-- 商家简介 -->
			
			<view class="mid">
				<!-- <view class="shopImg" >
					<u--image mode="scaleToFill" width="25vw" height="8vh" radius="10px" :src="item.shopImg"></u--image>
				</view>
				 -->
				<view class="aa">
					<span class="title">订单标题：{{item.title}}</span>
					<!-- <u-rate gutter="3" :value="item.rate" readonly active-color="#FF6900"></u-rate> -->
					<view class="content">
						<span class="address">费用:{{item.price}}元</span>
						<span class="distance">联系方式:{{item.phone}}</span>
					</view>
					<view class="time">
						<span>{{item.createTime}}</span>
					</view>
				</view>
				
			</view>
			
			<!-- <view class="shopList">
				<view class="shopItem" v-for="(good,index) in item.goods" @click="clickGood(good)">
					<span class="cost">&yen;  {{good.cost}}</span>
					<span class="mealName">{{good.mealName}}</span>
					

				</view>

			</view> -->
			
		</view>
	</view>

	</view>
</template>

<script>
	import MyBar from '@/components/MyNavbar.vue'
import myhttp from '../../api/myhttp'
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
					// 'https://cdn.uviewui.com/uview/album/1.jpg',
					// 'https://cdn.uviewui.com/uview/album/2.jpg',
					// 'https://cdn.uviewui.com/uview/album/3.jpg',
				],
				// 附近商家列表
				NearList:[
				// 	{
				// 		shopImg:'https://cdn.uviewui.com/uview/album/1.jpg',
				// 		shopName:'喵呜阿旺宠物医院（24小时）',
				// 		rate:5.0,
				// 		address:'胜桥东路',
				// 		distance:'1.2km',
				// 		goods:[
				// 			{
				// 				cost:'288',
				// 				mealName:'公猫呼吸麻醉微创绝育手术'
				// 			},
				// 			{
				// 				cost:'188',
				// 				mealName:'洗牙套餐'
				// 			}
				// 		]
				// 	},
				// 	{
				// 		shopImg:'https://cdn.uviewui.com/uview/album/1.jpg',
				// 		shopName:'喵呜阿旺宠物医院（24小时）',
				// 		rate:5.0,
				// 		address:'胜桥东路',
				// 		distance:'1.2km',
				// 		goods:[
				// 			{
				// 				cost:'288',
				// 				mealName:'公猫呼吸麻醉微创绝育手术'
				// 			},
				// 			{
				// 				cost:'188',
				// 				mealName:'洗牙套餐'
				// 			}
				// 		]
				// 	},
				// 	{
				// 		shopImg:'https://cdn.uviewui.com/uview/album/1.jpg',
				// 		shopName:'喵呜阿旺宠物医院（24小时）',
				// 		rate:5.0,
				// 		address:'胜桥东路',
				// 		distance:'1.2km',
				// 		goods:[
				// 			{
				// 				cost:'288',
				// 				mealName:'公猫呼吸麻醉微创绝育手术'
				// 			},
				// 			{
				// 				cost:'188',
				// 				mealName:'洗牙套餐'
				// 			}
				// 		]
				// 	}
				
				],
				OrderList:[],
				orderId: null
			}
		},
		components: {
			MyBar
		},
		methods:{
			// 添加单子
			addOrder(){
				uni.navigateTo({
					url:'/pages/sameCity/SecondPages/AddOrder'
				})
			},
			// 商品信息
			clickGood(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/sameCity/SecondPages/ShopDetail?goodId='+item.goodId
				})
			},
			// 订单信息
			ClickOrder(index){
				const order = this.OrderList[index]
				const orderId = order.id
				uni.navigateTo({
					url:'/pages/sameCity/SecondPages/OrderDetail?orderId='+orderId+'&source=pageA'
				})
				
				// uni.navigateTo({
				// 	url:'/pages/sameCity/SecondPages/OrderDetail?orderId='+index+'&source=pageA'
				// })
			},
			// 获取全部的托运单子信息
			getOrders() {
			  myhttp.get('/petOrder/orders/getOrders').then(res => {
				  // console.log('d单子全部测试',res.data);
			    this.OrderList = res.data
			      .filter(item => item.status == 1) // 过滤 status 等于 2 的订单
			      .map(item => {
			        const createTime = new Date(item.createTime).toISOString().split("T")[0];
			        return { ...item, createTime};
			      });
			  });
			}
		},
		onShow() {
			this.getOrders()
		},
		onLoad() {
			// 初始化附近商家数据
			myhttp.get('/users/goods/list').then(res=>{
				this.NearList = res
				// console.log(this.NearList);	
			})
			// 初始化未接单信息
			this.getOrders(),
			// 轮播图
			myhttp.get('/users/getImage').then(res=>{
				
				res.data.forEach(item=>{
					this.swiperList.push(item.imageUrl)
				})
			})
			
		}
	}
</script>

<style lang="scss">
	page{
		background: #eee;
	}
	@import 'sameCity.scss';
</style>