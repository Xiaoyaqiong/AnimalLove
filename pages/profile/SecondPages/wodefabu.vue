<template>
	<view class="">
		
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="我的发布" MyColor="#eee"  ></Mynav>
		
					<view class="main1 " v-if="fabulist.length == 0">
						<view class="justify-center align-center  padding text-center">
							<view style="color: #0f1418;font-size: 1.26rem;margin-bottom: 1rem;">你还没发布过内容</view>
							<view style="color: #5b7083;font-size: 0.9rem;">在这里，你将和数千万宠物主交流养宠心得。</view>
						</view>
					</view>
		
		<pp-waterfall-flow :value="fabulist" :gap="20" :columns="2" :padding="30" :itemBR="12" imageBR="10rpx"></pp-waterfall-flow>
		<!-- <view class="BOX" v-else v-for="(item,index) in fabulist" :key="index" style="margin-top: 30rpx;" @tap="ClickToDetail(item.courseId)">
	
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
			
		</view> -->
		
		
		
	</view>
	
	
	
	
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
import myhttp from '../../../api/myhttp'
import moment from 'moment';
	export default {
		data() {

			return {
				fabulist:[
					
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
			// 加载我的发布列表
			let that = this
			let momentFlag
			 myhttp.get('/users/pets/AdoptByUser').then(res => {
				that.fabulist = res.data
				that.fabulist.forEach((item) => {
					item.image = 'http://127.0.0.1:8888' + item.image;
					momentFlag = moment(item.registrationTime, 'YYYYMMDDTHH:mm:ss.SSS+Z ZZ')
						.fromNow()
					if (momentFlag.charAt(0) == 'a') {
					momentFlag = momentFlag.replace('a', 1)
					}
					if (momentFlag.match(
							/hour/)) {
						item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "小时前"
					} else if (momentFlag.match(
							/day/)) {
						item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "天前"
					} else if (momentFlag.match(
							/minute/)) {
						item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "分钟前"
					} else {
						item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "秒前"
					}
				})
				
			})
			
			
			
		}
	}
</script>

<style lang="scss" scoped>
	@import "wodefabu.scss";
</style>
