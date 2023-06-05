<template>
	<view>
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="我的订单" MyColor="#eee"></Mynav>

		<view class="main1 " v-if="NearlyList.length == 0">
			<view class="justify-center align-center  padding text-center">
				<view style="color: #0f1418;font-size: 1.26rem;margin-bottom: 1rem;">你还没购买过商品</view>
				<view style="color: #5b7083;font-size: 0.9rem;">在这里，你可以为自己的爱宠照顾衣食住行。</view>
			</view>
		</view>

		<u-list :showScrollbar="false" @scrolltolower="scrolltolower" lowerThreshold="50">
			<!-- 盒子列表 -->
			<u-list-item>
				<view style="opacity: 0;">
					gap
				</view>
			</u-list-item>

			<u-list-item v-for="(item,index) in NearlyList" :key="index">

				<u-swipe-action>
					<u-swipe-action-item :options="options1" @click="deleteOrder(index,item.id)" :key="index">
						<view class=" " @click="ClickDetail(item)">
							<!-- 课程盒子 -->
							<view class="content">
								<p class="content-title">{{item.title}} </p>
								<view class="word">
									<p class="address">
										<view class="badge">{{item.distance}}</view>{{item.address}}
									</p>
									<p class="Date">{{item.courseStartTime}}</p>
								</view>

								<!-- 信息盒子 -->
								<view style="display: flex;gap: 20rpx;">
									<view class="teachers">
										<u-avatar style="margin-right: 23rpx;" :src="item.image"></u-avatar>
										<view class="teacherDetail">
											<p class="t1">商品名称</p>
											<p class="Tname">{{item.merchantName}}</p>
										</view>
									</view>
									<span class="yen">
										&yen;{{item.totalFee}}
									</span>
								</view>


							</view>

						</view>
					</u-swipe-action-item>
				</u-swipe-action>



			</u-list-item>



		</u-list>
		<view class="book">
			<span>
				<span class="yen">&yen;</span>
				<span class="yennum">{{totaltotalFee}}</span>
			</span>
			<view class="bookbtn">
				<u-button v-if="totaltotalFee!=0" shape="circle" text="结算" color="linear-gradient(to right, #FD88DD, #549BFF)"
					@click="CommitBook"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import myhttp from '../../../api/myhttp'
	export default {
		data() {
			return {
				options1: [{
					text: '删除',
					style: {
						background: '#ff2684',
						
					}
				}],
				NearlyList: [],

				MoreList: []
			}
		},
		computed: {
			totaltotalFee() {
				let sum = 0
				this.NearlyList.forEach(item => {
					sum += item.totalFee
				})
				return sum
			}
		},
		components: {
			Mynav
		},
		methods: {
			
			ClickDetail(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/sameCity/SecondPages/ShopDetail?goodsId='+item.goodsId
				})
			},
			// 删除订单
			deleteOrder(index,id){
				console.log(id);
				this.NearlyList.splice(index,1)
				myhttp.delete(`/users/orders/deleteById/`+id).then(res=>{
					uni.showToast({
						title:res.msg
					})
				})
				
			},
			
			// 预约成功后
			CommitBook() {
				// console.log('预约成功')
				// uni.navigateTo({
				// 	url:'/pages/discover/SecondPages/BuyCourse'
				// })
			},
			scrolltolower() {
				this.loadmore()
			},

			loadmore() {
				this.status = 'loading'
				let that = this
				myhttp.get("/users/orders/list").then(res => {
					console.log(res)
					that.NearlyList = res.data
					// that.NearlyList.forEach((item)=>{
					// 	item.courseStartTime = uni.$u.timeFormat(item.courseStartTime,'yyyy年mm月dd日 hh点')
					// })
					this.status = 'nomore'
				})


				// console.log(this.NearlyList)
			}



		},
		onShow() {
			// TODO: 接口
			this.loadmore()
		}
	}
</script>

<style lang="scss">
	page{
		background: #eee;
	}
	 .u-page {
	        padding: 0;
	    }
	@import "MyOrder.scss";
</style>