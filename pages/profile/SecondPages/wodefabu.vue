<template>
	<view class="">
		
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="我的发布" MyColor="#eee"  autoback></Mynav>
		
					<view class="main1 " v-if="this.list.length == 0">
						<view class="justify-center align-center  padding text-center">
							<view style="color: #0f1418;font-size: 1.26rem;margin-bottom: 1rem;">你还没上过课</view>
							<view style="color: #5b7083;font-size: 0.9rem;">在这里，你将有机会学习到最新的少年代码技术和理念。</view>
						</view>
					</view>
		
		<view class="BOX" v-else v-for="(item,index) in list" :key="index" style="margin-top: 30rpx;" @tap="ClickToDetail(item.courseId)">
	
					<view class="content">
						<p class="content-title">{{item.courseName}}</p>
						<view class="word">
							<p class="address">{{item.coursePosition}}</p>	
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
					
					</view>
						
						
					</view>
			
			</view>
			
		</view>
		
		
		
	</view>
	
	
	
	
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	export default {
		data() {

			return {
				list:[
					
				],
				
				
				Listcount:20,	// 一页显示多少个

			}
		},
		components:{
			Mynav
		},
		methods: {

			// 跳转课程
			ClickToDetail(courseId) {
				// console.log(Cid)
				uni.navigateTo({
					url: '/pages/discover/SecondPages/CourseDetail?' + 'courseId=' + courseId
				})
			},
			// 获取所有历史课程
			InitList(){
				
			},
		
		},
		computed:{


		},
		onLoad(data) {
			// 加载选课历史列表
			let that = this
			let url = this.$baseUrl + '/users/getMyCourses'
			uni.request({
				url:url,
				method:'GET',
				header:{
					'token':uni.getStorageSync('token')
				},
				success(res) {
					console.log(res.data.data)
					that.list = res.data.data
					
				}
			})
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "wodefabu.scss";
</style>
