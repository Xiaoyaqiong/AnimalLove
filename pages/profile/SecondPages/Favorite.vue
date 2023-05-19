<template>
	<view>
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="收藏" MyColor="#eee" RightIcon="/static/icon/personage/edit.png"></Mynav>
			
			
			
			<view class="main1 " v-if="NearlyList.length == 0">
				<view class="justify-center align-center  padding text-center">
					<view style="color: #0f1418;font-size: 1.26rem;margin-bottom: 1rem;">你还没有收藏</view>
					<view style="color: #5b7083;font-size: 0.9rem;">小宠物那么可爱，可以将你最喜欢的店铺收藏起来。</view>
				</view>
			</view>
			
			<u-list v-else :showScrollbar="false" @scrolltolower="scrolltolower"  lowerThreshold="50">
			<!-- 盒子列表 -->
			<u-list-item>
				<view style="opacity: 0;">
					这里是间隔
				</view>
			</u-list-item>
			
				<u-list-item v-for="(item,index) in NearlyList" :key="index"  >

				<!-- 课程盒子 -->
				<view class="content" @tap="ClickToDetail(item.courseId)">
					<p class="content-title">{{item.courseName}} </p>
					<view class="word">
						<p class="address">
							<view class="badge">{{item.distance}}</view>{{item.coursePosition}}
						</p>
						<p class="Date">{{item.courseStartTime}}</p>
					</view>
							<view style="display: flex;gap: 20rpx;">
								<view class="teachers" v-for="teachers in item.teachers">
								<u-avatar class="tAvatar" size="2rem" :src="teachers.userAvatar"></u-avatar>
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
		
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	export default{
		data(){
			return{
				NearlyList:[
					
				],
			}
		},
		components:{
			Mynav
		},
		methods:{
			// 跳转课程
			ClickToDetail(courseId) {
				// console.log(Cid)
				uni.navigateTo({
					url: '/pages/discover/SecondPages/CourseDetail?' + 'courseId=' + courseId
				})
			},
		},
		onShow() {
			let that = this
			
		}
	}
</script>

<style lang="scss">
	@import "Favorite.scss";
</style>