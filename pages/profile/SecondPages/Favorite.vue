<template>
	<view>
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="收藏" MyColor="#eee" RightIcon=""></Mynav>
		<!-- <view class="main1 " v-if="NearlyList.length == 0">
			<view class="justify-center align-center  padding text-center">
				<view style="color: #0f1418;font-size: 1.26rem;margin-bottom: 1rem;">你还没有收藏</view>
				<view style="color: #5b7083;font-size: 0.9rem;">可以将你最喜欢的文章收藏起来。</view>
			</view>
		</view> -->

		<!-- <u-list v-else :showScrollbar="false" @scrolltolower="scrolltolower" lowerThreshold="50"> -->
			<u-list>
			<!-- 盒子列表 -->
			<u-list-item>
				<view style="opacity: 0;">
					这里是间隔
				</view>
			</u-list-item>

			<u-list-item v-for="(item,index) in articlelist" :key="index">

				<!-- 课程盒子 -->
				<!-- <view class="content" @tap="ClickToDetail(item.courseId)">
					<p class="content-title">python </p>
					<view class="word">
						<p class="address">
							<view class="badge">天河</view>时尚
						</p>
						<p class="Date">2000.11.11</p>
					</view>
					<view style="display: flex;gap: 20rpx;">
						<view class="teachers" v-for="teachers in 2">
							<u-avatar class="tAvatar" size="2rem" :src="urls"></u-avatar>
							<view class="teacherDetail">
								<p class="t1">授课老师</p>
								<p class="Tname">Tim</p>
							</view>
						</view>
						<span class="yen">
							&yen;88
						</span>
					</view>

				</view> -->
				<u-row class="articleItem"  @click="gotoDetail(item)">
					<u-col span="8">
						<view class="title">
							{{item.articleTitle}}
						</view>
						<view class="secondtitle">
							{{item.articleTitle}}
						</view>
				
					</u-col>
					<u-col span="4">
						<view class="articleImg">
							<img :src="item.coverUrl" alt="">
						</view>
					</u-col>
				</u-row>
			</u-list-item>
		</u-list>

	</view>
</template>

<script>
	import Mynav from '../../../components/Mynav.vue'
	import myhttp from '../../../api/myhttp.js'
	export default {
		data() {
			return {
				NearlyList: [

				],
				urls: [
					'https://cdn.uviewui.com/uview/album/1.jpg',
					'https://cdn.uviewui.com/uview/album/2.jpg',
					'https://cdn.uviewui.com/uview/album/3.jpg',
				],
				articlelist:[]
				
			}
		},
		components: {
			Mynav
		},
		methods: {
			// 跳转文章详情
			gotoDetail(item){
				uni.navigateTo({
					url: '../../article/articlesDetail?item=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 跳转课程
			ClickToDetail(courseId) {
				// console.log(Cid)
				uni.navigateTo({
					// url: '/pages/discover/SecondPages/CourseDetail?' + 'courseId=' + courseId
				})
			},
			scrolltolower() {
				this.loadmore()
			},
			// 加载更多 目前想法是根据morelist是否空置判断是否还有需要加载
			loadmore() {
				this.status = 'loading'
				if (this.MoreList.length == 0) {
					this.status = 'nomore'
				} else {
					setTimeout(() => {
						// TODO: 接口
						// this.NearlyList.push(...this.MoreList)
						// this.MoreList = []

					}, 1000)

				}

				console.log(this.NearlyList)
			}
		},
		onShow() {
			// let that = this
			// uni.request({
			// 	// url: this.$baseUrl + '/users/getCollectList',
			// 	success(res) {
			// 		// console.log(res.data.data)
			// 		// that.NearlyList = res.data.data
			// 	}
			// })
			myhttp.get('/articles/collectList').then(res=>{
				this.articlelist=res
			})
		}
	}
</script>

<style lang="scss">
	@import "Favorite.scss";
</style>
