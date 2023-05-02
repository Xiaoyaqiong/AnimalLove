<template>
		<!-- 个人信息 -->
		<view class="personal" @click="NavToDetail">
			<view class="personal-main">
				<!-- 用户头像 -->
				<image  class="u-avatar" :src="$store.state.user.UserInfo.userAvatar" ></image>
				<view class="personal-info">
					<view class="username">{{$store.state.user.UserInfo.userName}}</view>
					<view class="steamNum">
						<span>少年代码学号：</span>
						{{$store.state.user.UserInfo.userId}}</view>
				</view>
		
			</view>
			<u-image  :width="iconWidth" :height="iconWidth" src="@/static/icon/personage/right.png"></u-image>
			
		</view>

</template> 

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:{
			iconWidth:Number	
		},
		methods:{
			// 点击头像跳转个人信息
			NavToDetail() {
				// let url = '/pages/personage/SecondPages/UserDetail'
				// uni.navigateTo({
				// 	url: url,
				// 	animationType: 'slide-in-right',
				// 	animationDuration: 100,
				// })
			}
		}
	}
</script>

<style lang="scss" scoped>
	$Basewidth : 1080;
	$Basehigth : 2340; 
	.personal {
		// height: calc( 175 / 2340 * 100vh);
		// outline: 1px solid;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: calc(80 / #{$Basehigth} * 100vh) ;
		padding-top: 4.5vh;
	}
	
	.personal-main {
		display: flex;
		align-items: center;
		.personal-info {
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			height: 8vh;
			.steamNum{
				height: 2.5vh;	// 54*2=108
				line-height: 2.5vh;
				border-radius: 20px;
				background:#e2e2e2;
				font-size: 22rpx;
				color: #a3a3a3 ;
				padding:0 15rpx;
				
				// outline: 1px solid;
			}
			.username{
				font-size: 36rpx; 
				// margin-bottom: calc( 20 / #{$Basehigth} * 100vh);
			}
		}
		
		
		.u-avatar{
			margin-right: 36rpx;
			border-radius: 50%;
			width: 110rpx;
			height: 110rpx;
		}
	}
</style>