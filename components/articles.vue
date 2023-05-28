<template>
	<view class="articles">
		<u-row justify="space-between" gutter="10">
			<u-col span="1">
				<img class="icon" :src="src" alt="" srcset="" >
			</u-col>
			<u-col span="12">
				<view class="blod">
					推荐文章
				</view>
			</u-col>

		</u-row>

		<!-- <u-list lowerThreshold="0" @scrolltolower="scrolltolower">
			<u-list-item v-for="(item,index) in articlelist" :key="item.id">
				<view class="">
					<view class="">
						————{{item.articleTitle}}
					</view>
					<view class="">
						{{item.articleContent}}
					</view>
				</view>
			</u-list-item>
			<u-loadmore :status="status" />
		</u-list> -->

		<view class="">
			<view>
				<u-row class="articleItem" v-for="(item,index) in articlelist" :key="index" @click="gotoDetail(item)">
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
			</view>
			<u-loadmore :status="status" />
		</view>
		
	</view>
</template>

<script>
	
	import myhttp from '../api/myhttp.js'
	export default {
		props: {
			currentPage: {
				type: Number,
				default: 0,
			},
			pages: {
				type: Number,
				default: 0,
			},
			status: {
				type: String,
				default: 0,
			},
			totalCount: {
				type: Number,
				default: 0,
			},
			pageSize: {
				type: Number,
				default: 4,
			},
			articlelist: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				
				src: "../static/icon/index/book.png"
			}
		},
		onLoad() {
			
		},
		onShow() {

		},

		methods: {
			
			gotoDetail(item) {
				uni.navigateTo({
				
				// url: `../article/articlesDetail?articlesUrl=${articlesUrl}`
				url: '../article/articlesDetail?item=' + encodeURIComponent(JSON.stringify(item))
				// url:'/pages/article/articlesDetail'
				
				})
			// 	// #ifdef APP-PLUS
			// 	plus.runtime.openURL(url)
			
			// 	console.log(1)
			// 	// #endif
			// 	// #ifdef H5
			// 	window.open(url)
			// 	console.log(2)
			// 	// #endif
			},
		},
	}
</script>

<style lang="scss" scoped>
	.articleItem {
		border-radius: 10px;
		box-shadow: 0px 0px 1px 0px #e1e1e1;
		padding: 1vh 3vw;
		.title{
			margin-bottom: 1.5vh;
			font-size: 0.8rem;
		}
		margin-bottom: 12px;
	}

	.articleImg {
		width: 30vw;
		height:10vh;
		border-radius: 10px;
		
		img {
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}

	.image-1 {
		flex-shrink: 0;
		margin-right: 10px;
		width: 125px;
		height: 75px;
		border-radius: 6px;
		overflow: hidden;
		border: 1px #f5f5f5 solid;
	}

	.icon {
		width: 32px;
		height: 32px;
	}
</style>
