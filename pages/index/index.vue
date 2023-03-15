<template>
	<view class="content">
		<view class="swiper">
			<view class="u-demo-block">
			       <u-swiper
			               :list="list3"
			               previousMargin="76"
			               nextMargin="92"
			               circular
			               :autoplay="false"
			               radius="5"
			               bgColor="#ffffff"
			       ></u-swiper>
			   </view>
		</view>
		<view class="adopt">
			<view class="u-demo-block__content">
			    <u-row
			        justify="space-between"
			        gutter="10"
			    >
			        <u-col span="2">
			            aa
			        </u-col>
			        <u-col span="4">
			            bb
			        </u-col>
			        <u-col span="6" class="test">
						<u--text text="cc"  align="right"></u--text>
			        </u-col>
			    </u-row>
			</view>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				 list3: [
				                    'https://cdn.uviewui.com/uview/swiper/swiper3.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper2.png',
				                    'https://cdn.uviewui.com/uview/swiper/swiper1.png',
				                ],
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content{
		margin-top:65px;
		margin-left: 12px;
		margin-right: 14px;
	}
	.adopt{
		margin-top: 4rem;
	}
	.test{
		position: relative;
	}
	.end{
		  position: absolute;
		  right: 0;
	}
</style>
