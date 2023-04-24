<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<view class="toolBar">
			<view class="scanner">
				<u-image :width="iconWidth" :height="iconWidth" src="../../static/logo.png"></u-image>
			</view>
			<view class="night">
				<u-image :width="iconWidth" :height="iconWidth" src="../../static/logo.png"></u-image>
			</view>

		</view>

		
		<!-- 我的宠物档案 -->
		<view class="WhiteBox box1">
			

		</view>

		<!-- 功能菜单 -->
		<view class="WhiteBox box1">
			<view class="SettingItem" v-for="(item,index) in list1" :key="index" @click="onClick(item)">
				<view> 
					<view class="p-left">
						<u-image :width="iconWidth" :height="iconWidth" :src="item.path"></u-image>
					</view>
				</view>

				<!-- 右边描述 -->
				<view class="p-right">
					<view class="p-right-main">
						<view class="p-right-main-name">{{item.name}}</view>
					</view>


				</view>

			</view>

		</view>




	</view>



</template>

<script>
	export default {
		computed:{
			
		},
		data() {
			return {
				screenHeight: 0, // 移动端屏幕高度
				screenWidth: 0, // 移动端屏幕宽度
				iconWidth: 43, // 控制icon大小
				// 工具栏
				toolbar: [{
						name: '扫码',
						id: 'scanner',
						path: '',
					},
					{
						name: '夜晚模式',
						id: 'nightmode',
						path: '../../static/logo.png',
					}
				],
				// 功能菜单1
				list1: [
					{
					name: '我的发布',
					id: 'UserDetail',
					path: '../../static/logo.png',
				},
				{
					name: '我的收藏',
					id: 'Favorite',
					path: '../../static/logo.png',
				
				},
				{
					name: '我的聊天',
					id: 'coupon',
					path: '../../static/logo.png',
				
				},
				{
					name: '我的订单',
					id: 'coupon',
					path: '../../static/logo.png',
				
				},
				{
					name: '设置',
					id: 'coupon',
					path: '../../static/logo.png',
				
				}
				],

			
			}
		},
		methods: {

			// 点击跳转功能
			onClick(item) {
				let that = this
				let url = '/pages/personage/SecondPages/' + item.id
				if (item.id == 'Nice') {
					that.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: "此功能正在开发哦",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
					})
				}
				else if (item.id == 'UserDetail') { 		// 判断是否填写资料
						let flag = that.$store.state.student.IsComplete
						console.log(flag)
						if(flag){
							 url = '/pages/personage/SecondPages/UserDetail'
						}else{

							 url = '/pages/personage/SecondPages/EditInfo'
						}
						
						
				}
				
				
				
				setTimeout(()=>{
					uni.navigateTo({
						url: url,
						animationType: 'slide-in-right',
						animationDuration: 100,
						success() {
							// console.log('成功打开页面',item.name)
						}
					})
				},100)
				

				// TODO: 退出软件  判断:安卓【ios]
				// // #ifdef APP-PLUS
				// if (plus.os.name.toLowerCase() === 'android') {
				// 	plus.runtime.quit();
				// } else {
				// 	const threadClass = plus.ios.importClass("NSThread");
				// 	const mainThread = plus.ios.invoke(threadClass, "mainThread");
				// 	plus.ios.invoke(mainThread, "exit");
				// 	// plus.ios.import('UIApplication').sharedApplication().performSelector('exit');
				// }
				// // #endif


			},



		},

		onShow() {
			
		},
		onLoad() {
		
			
		}

	}
</script>

<style lang="scss" scoped>
	$Basewidth : 1080;
	$Basehigth : 2340;
	@import 'personage.scss';
</style>

