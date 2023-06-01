<template>
	<view>
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="我的订单" MyColor="#eee" ></Mynav>
			
			<u-list :showScrollbar="false" @scrolltolower="scrolltolower"  lowerThreshold="50">
			<!-- 盒子列表 -->
			<u-list-item>
				<view style="opacity: 0;">
					gap
				</view>
			</u-list-item>
			
				<u-list-item v-for="(item,index) in NearlyList" :key="index">
				<!-- 课程盒子 -->
				<view class="content">
					<p class="content-title">{{item.courseName}} </p>
					<view class="word">
						<p class="address">
							<view class="badge">{{item.distance}}</view>{{item.coursePosition}}
						</p>
						<p class="Date">{{item.courseStartTime}}</p>
					</view>
					
					<!-- 老师信息盒子 -->
					<view style="display: flex;gap: 20rpx;">
								<view class="teachers" v-for="teachers in item.teachers">
								<u-avatar style="margin-right: 23rpx;" :src="teachers.userAvatar"></u-avatar>
								<view class="teacherDetail">
									<p class="t1">授课老师</p>
									<p class="Tname">{{teachers.userName}}</p>
								</view>
							</view>
							<span class="yen">
								&yen;{{item.coursePrice}}
							</span>
					</view>
		
				
				</view>
			</u-list-item>
			
			
			
			</u-list>
			<view class="book">
				<span>
					<span class="yen">&yen;</span>
					<span class="yennum">{{totalPrice}}</span>
				</span>
				<view class="bookbtn">
					<u-button shape="circle" text="全部预约" color="linear-gradient(to right, #FD88DD, #549BFF)" @click="CommitBook"></u-button>
				</view>
			</view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
import myhttp from '../../../api/myhttp'
	export default{
		data(){
			return{
				
				NearlyList: [
				],
			
			MoreList:[]
			}
		},
		computed:{
			totalPrice(){
				let sum = 0
				this.NearlyList.forEach(item=>{
					sum+=item.coursePrice
				})
				return sum
			}
		},
		components:{
			Mynav
		},
		methods:{
			// 预约成功后
			CommitBook(){
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
				myhttp.get("/users/orders/list").then(res=>{
					console.log(res)
					// that.NearlyList = res.datas
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
	@import "MyOrder.scss";
</style>