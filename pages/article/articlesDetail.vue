<template>
	
	<view class="page-container">
		
		<u-navbar :fixed="true" :placeholder="true" :safeAreaInsetTop="true" @leftClick="backIndex()">
			<view class="u-nav-slot" slot="center">
				文章详情
			</view>
			<view class="u-nav-slot flex" slot="right">
				<u-icon style="width: 54rpx;height: 54rpx;" :name="collectFlag?'star-fill':'star'" @click="collect()"></u-icon>
				<u-icon style="width: 54rpx;height: 54rpx;" :name="RightIcon2" @click="share"></u-icon>
			</view>
		</u-navbar>
		<!-- 外部链接 -->
		<view class="webview-wrapper">

			<web-view :src="articlesUrl" webview-styles="height: calc(100vh - 100rpx);margin-top: 60rpx;"></web-view>

		</view>
			
			<!-- 底部喜欢 -->
			<u-tabbar
				:fixed="true"
				:placeholder="true"
				:safeAreaInsetBottom="true"
				:zIndex="99999"
				inactiveColor="#ff0000"
				
			>
				<u-tabbar-item :fixed="true" :placeholder="false" :text="'喜欢'+likecount" :icon="likeFlag?'heart-fill':'heart'" @click="like(likeFlag)"></u-tabbar-item>
			</u-tabbar>
			
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import webview from '../article/webview.vue'
	import myhttp from '../../api/myhttp.js'
	export default{
		data(){
			return{
				RightIcon1:"star",
				RightIcon2:"share",
				collectFlag:0,
				collectCount:0,
				likeFlag:0,
				likecount:0,
				articleId:0,
				src:''
			}
		},
		props:{
			
		},
		onLoad(option) {
			const item = JSON.parse(decodeURIComponent(option.item))
			console.log(item,'item')
			this.articlesUrl=item.articleUrl
			// this.articlesUrl1=item.articleUrl
			this.src=this.articlesUrl
			this.articleId=item.id
			var pages = getCurrentPages();
			console.log(pages,'getCurrentPages');
			
		},
		
		components: {
			Mynav,
			webview
		},
		methods:{
			// 喜欢状态
			likeState(){
				myhttp.get(`/articles/likeCollectCount/?articleId=${this.articleId}`).then(res=>{
					this.likeFlag=res.likeState;
					console.log(res.likeState,'likeState');
				})
			},
			
			// 点击/取消喜欢
			like(){
				if(!this.likeFlag){
					myhttp.post(`/articles//likeAdd/?articleId=${this.articleId}`).then(res=>{
						console.log('点赞成功');
						this.likecount++
					})
					this.likeFlag=!this.likeFlag
				}else{
					myhttp.post(`/articles/likeDelete/?articleId=${this.articleId}`).then(res=>{
						console.log('取消点赞成功');
						this.likecount--
					})
					this.likeFlag=!this.likeFlag
				}
			},
			// 点赞总数
			likeCount(){
				myhttp.get(`/articles/likeCollectCount/?articleId=${this.articleId}`).then(res=>{
					this.likecount=res.likeCount;
					// console.log(res.collectState,'collectFlag');
				})
			},
			// 收藏状态
			collectState(){
				myhttp.get(`/articles/likeCollectCount/?articleId=${this.articleId}`).then(res=>{
					this.collectFlag=res.collectState;
					console.log(res.collectState,'collectFlag');
				})
			},
			// 点击/取消收藏
			collect(){
				if(!this.collectFlag){
					myhttp.post(`/articles/collectAdd/?articleId=${this.articleId}`).then(res=>{
						console.log('收藏成功');
					})
					this.collectFlag=!this.collectFlag
				}else{
					myhttp.post(`/articles/collectDelete/?articleId=${this.articleId}`).then(res=>{
						console.log('取消收藏成功');
					})
					this.collectFlag=!this.collectFlag
				}
			},
			// 返回上一级
			backIndex(){
				uni.navigateBack({
					delta: 1
				});
			}
		},
		mounted:function(){
			this.collectState()
			this.likeState()
			this.likeCount()
		},
	}
	
</script>

<style>
	.page-container{
		/* height: 100%; */
	}
	.webview-wrapper{
		/* height: calc(100vh - 100rpx); */
		/* 调整Webview的高度，减去导航栏的高度 */
		/* margin-top: 60rpx; */
	}
</style>
