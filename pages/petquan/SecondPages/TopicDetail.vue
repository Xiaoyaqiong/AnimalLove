<template>
	<view>
		<Mynav CenterSlot="话题详情" MyColor="#eee" :backPet="backPet" :RightIcon1="RightIcon1" :RightIcon2="RightIcon2"></Mynav>
		<view class="test">
			{{topicdata}}
		</view>
		<!-- 话题信息 -->
		<view class="topic-info">
			<view class="info-top flex">
				<view class="left">
					<img :src="src" alt="">
				</view>
				<view class="right flex">
					<view class="topic-title">
						#你家狗狗拆家吗
					</view>
					<view class="center">
						<text style="padding-right: 18px;">阅读量 3000</text>
						<text>参与量 3000</text>
					</view>
					<view class="bottom">
						<text>发起人 萌萌</text>
					</view>
				</view>
			</view>
			<view class="topic-intro">
				<text>话题简介话题简介话题简介话题简介话题简介话题简介话题简介话题简介</text>
			</view>
		</view>
		<view class="topic-reply">
			<!-- 参与标题栏-->
			<view class="join flex">
				<view class="icon">
				</view>
				<view>
					参与
				</view>
			</view>
			<view class="replylist">
				
			</view>
		</view>
		
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	export default {
		data() {
			return {
				src:"https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fsafe-img.xhscdn.com%2Fbw1%2F634a181d-2867-48c5-9030-27206d11e7ad%3FimageView2%2F2%2Fw%2F1080%2Fformat%2Fjpg&refer=http%3A%2F%2Fsafe-img.xhscdn.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1683166098&t=aa32bad7ec10b74b829b311d053c2f26",
				RightIcon1:"star",
				RightIcon2:"share",
				topicdata:''
				// id: '' //话题页面参数
			}
		},
		onLoad(option) {
			// this.id = option.id
		},
		components: {
			Mynav
		},
		methods:{
			backPet(){
				uni.switchTab({
					url: '/pages/petquan/petquan'
				})
			}
			// getTopicDetail(id){
			// 	myhttp.get('/user/article/Topic').then(({data})=>{
			// 		this.topicdata=data
			// 		console.log(this.topicdata,'topicdata');
			// 	})
			// }
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #F0F0F0;
	}
	*{
		background-color: white;
	}
	.topic-reply{
		margin: 25px 17px;
	}
	.join{
		.icon{
			width: 7px;
			height: 22px;
			background-color: #FFB600;
			margin-right: 8px;
		}
		padding-bottom: 17px;
	}
	
	.info-top{
		.right{
			flex-direction: column;
			justify-content: space-between;
			margin-left: 13px;
			.center{
				font-size: 13px;
			}
		}
		.bottom{
			font-size: 13px;
			margin-bottom: 3px;
		}
	}
	.info-top {
		margin:26px 24px 0 24px; 
	}
	.topic-intro{
		margin:16px 24px 0 24px; 
	}
	.topic-info{
		// width: 100%;
		font-size: 13px
	}
	.left{
		width: 146px;
		height: 104px;
		border-radius: 8px;
		img{
			width: 100%;
			height: 100%;
			border-radius: 8px;
		}
	}
	
	.u-nav-slot{
		display: flex;
	}
	.topic-title{
		font-size: 18px;
		font-weight:bold;
	}
</style>
