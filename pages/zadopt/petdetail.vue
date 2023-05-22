<template>
	<view>
		<!-- 匹配手机端，腾出手机状态栏的高度，防止手机状态栏遮拦内容 -->
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view>
		<view class="cu-bar">
			<view class="flex">
				<view class="flex" @click="goBackadopt()">
					<u-icon class="align-center" name="arrow-left" size="1.2rem" ></u-icon>
				</view>
				<view class="tu">
					<u-avatar :src="src" shape="circle"></u-avatar>
				</view>
				<view class="signed">
					<view>
						<text class="title1">不可思议</text>
					</view>
					<view><text class="title2">宠物博主，爱宠人士</text></view>
				</view>
			</view>
			
			<view class="release align-end">
				<u-icon name="star"></u-icon>
			</view>
		</view>
		
		<view>
			<view class="swiper-top">
				<swiper class="swiper" :indicator-dots='true' indicator-color="rgba(0, 0, 0, .3)"
					indicator-active-color="#013BD4" :autoplay="false">
					<block v-for="(item,index) in 6" :key="index">
						<swiper-item>
							<view class="swiper-item">
								<image :src="tu1url" mode="aspectFill"></image>
							</view>
						</swiper-item>
					</block>
				</swiper>
			</view>
		</view>
		<view class="content"><text>当然要拍照记录啊~
				希望我的宝宝每天都开开心心哒~
			</text></view>
		<view class="time ">
			<text>发布于</text>
			<text class="time1">05-21</text>
		</view>
		<view class="solid"></view>
		<view class="comment">
			<text>6</text>
			<text class="num">条评论</text>
		</view>
		<view v-for="(item,index) in 6">
			<view class="tu2">
				<image class="tu3" :src="tuurl"></image>
			</view>
			<view class="signed1">
				<view>
					<text class="title3">小音箱</text>
				</view>
				<view><text class="title4">毛茸茸的，我好想亲秃它啊哈哈哈哈</text></view>
			</view>
			<view class="time2"><text>05-21</text></view>
			<view class="apprecy flex  align-center justify-end"><text class="cuIcon-appreciate"></text>
				<text class="appnum">88</text>
			</view>

		</view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<view class="send  flex  padding align-center justify-center text-left">
				<input :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" placeholder="说点什么"
					@focus="InputFocus" @blur="InputBlur">
				</input>
			</view>
			<view class="all ">
				<view class="apprecy1 "><text class="cuIcon-appreciate"></text></view>
				<text class="appnum3">88</text>
			</view>
			<view class="fav">
			<view class="apprecy1 "><text class="cuIcon-favor"></text></view>
			<text class="appnum3">127</text>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tuurl: '/static//chat/头像.png',
				tu1url: '/static//order/宠物.png',
				InputBottom: 0,
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			}
		},
		methods: {
			goBackadopt(){
				uni.navigateBack({
					delta: 1
				});
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			
		},
		//生命周期
		created() {

		},
	}
</script>

<style scoped>
	page {
		padding-bottom: 126upx;
	}

	.cu-bar {
		/* min-height: 50px; */
		/* margin-top: 20px; */
		background-color: #FFB600;
		padding: 10rpx 20rpx;
	}

	.cuIcon-back:before {
		font-size: 26px;
		color: #333333;
	}

	.release {
		font-family: 黑体;
		color: #013BD4;
	}

	.add {
		font-size: 48rpx;
		margin-right: 6px;
	}

	.attention {
		font-size: 36rpx;
		margin-right: 20px;
	}

	.tu {
		margin-left: 18rpx;
	}

	.signed {
		margin-top: 0px;
		margin-left: 18rpx;
		line-height: 18px;
	}

	.title1 {
		font-family: 黑体;
		color: #333333;
		font-size: 30rpx;

	}

	.title2 {
		font-family: 黑体;
		color: #9D9D9D;
		font-size: 26rpx;
	}

	.swiper-top {
		width: 100%;
		height: 350upx;
		position: relative;
	}

	.swiper {
		height: 350upx !important;
		overflow: hidden;
	}

	.swiper-item image {
		width: 100%;
		height: 350upx !important;

	}

	.active {
		background-color: #ffffff !important;
	}

	.content {
		margin-top: 20px;
		margin-left: 16px;
		line-height: 1.5rem;
		font-size: 34rpx;
		color: #333333;
		font-family: 黑体;
	}

	.time {
		margin-top: 20px;
		margin-left: 16px;
		line-height: 1.5rem;
		font-size: 30rpx;
		color: #999999;
		font-family: 黑体;
	}

	.time1 {
		margin-left: 8px;
	}

	.solid {
		border-bottom: 0.5px solid #CDCDCD;
		margin-top: 16px;
		margin-left: 16px;
		margin-right: 16px;
	}

	.comment {
		margin-top: 16px;
		margin-left: 16px;
		line-height: 1.5rem;
		font-size: 32rpx;
		color: #333333;
		font-family: 黑体;
	}

	.num {
		margin-left: 6px;
	}

	.tu2 {
		margin-left: 16px;
		margin-top: 20px;
	}

	.tu3 {
		border-radius: 50%;
		height: 40px;
		width: 40px;
	}


	.signed1 {
		margin-top: -42px;
		margin-left: 70px;
		line-height: 24px;
	}

	.title3 {
		font-family: 黑体;
		color: #333333;
		font-size: 30rpx;

	}

	.title4 {
		font-family: 黑体;
		color: #333333;
		font-size: 30rpx;
	}

	.time2 {
		margin-top: 10px;
		margin-left: 70px;
		font-family: 黑体;
		color: #999999;
		font-size: 28rpx;
	}

	.apprecy {
		margin-top: -20px;
		margin-right: 20px;
		font-family: 黑体;
		color: #333333;
	}

	.cuIcon-appreciate {
		font-size: 40rpx;
	}

	.appnum {
		margin-left: 6px;
		font-size: 28rpx;
	}

	.cu-bar.input {
		padding-right: 10px;
		background-color: #ffffff;

	}

	.send {
		height: 36px;
		border-radius: 50px;
		background-color: #F6F6F6;
		width: 72%;
		margin-left: 10px;
	}

	.all {
		line-height: 1rem;
		text-align: center;
	}
	.cuIcon-favor{
		font-size: 40rpx;
	}
	.fav{
		line-height: 1rem;
		text-align: center;
		margin-right: 10px;
		font-family: 黑体;
		color: #333333;
	}
	.appnum3{
			font-size: 26rpx;
	}
</style>
