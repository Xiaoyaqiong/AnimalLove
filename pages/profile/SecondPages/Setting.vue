<template>
	<view>
		<Mynav CenterSlot="设置" MyColor="#eee" :backInfo="backInfo"></Mynav>
 
		<view class="Account">
			<u-cell-group :border="false" title="账号" :customStyle="{'fontSize':'8px'}">
				<u-cell class="whitebox" :border="false" title="账户与安全" isLink size="large"
					url="/pages/personage/ThirdPage/AccountSetting"></u-cell>
			</u-cell-group>
		</view>
		<view class="About">
			<u-cell-group :border="false" title="关于" :customStyle="titleStyle">
				<u-cell :border="false" class="whitebox" title="版本更新" :label="Version" @click="UpdateVersion">
				</u-cell>
				<u-cell class="whitebox" :border="false" title="用户协议" isLink url="/pages/Profile/ThirdPage/"></u-cell>
				<u-cell class="whitebox" :border="false" title="隐私协议" isLink url="/pages/Profile/ThirdPage/"></u-cell>
			</u-cell-group>
		</view>
		<!-- 确认按钮 -->
		<view class="LogOutBtn">
			<u-button :customStyle="{'color':'#000','height':'3rem'}" color="#E3E3E3" shape="circle" text="退出登录"
				@click="Logout">
			</u-button>
		</view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	export default {
		data() {
			return {
				titleStyle: {
					fontSize: '10px'
				},
				Version: '4.0.0',
			}
		},

		methods: {
			backInfo() {
				uni.switchTab({
					url: '/pages/personage/personage'
				})
			},
			// 更新版本
			UpdateVersion() {

				let url = this.$baseUrl + '/users/checkForUpdates'
				uni.request({
					url: url,
					header: {
						'token': uni.getStorageSync('token')
					},
					success(res) {
						console.log(res)
						uni.showToast({
							title: '更新完成',
							icon: 'success',
							duration: 3000
						})
					}
				})

			},
			Logout() {
				uni.removeStorageSync('token')
				uni.removeStorageSync('userId')
				uni.request({
					url: this.$baseUrl + '/api/user/logout',
					method: 'DELETE',
					success(res) {
						console.log(res)
						if (res.code == 200) {
							uni.showToast({
								title: res.message
							})
						}
					}
				})
				uni.reLaunch({		// 必须把页面栈清空
					url: '/pages/splash/agreement/agreement'
				})
				
				setTimeout(() => {
					this.$router.go(0)
				}, 500)
			}

		},
		components: {
			Mynav
		}

	}
</script>
<style>
	page {
		font-family: SimHei, '黑体';
		background: #eeeeee;
	}
</style>
<style lang="scss">
	// button单独处理
	uni-button:after {
		border: none;
	}

	// 真机测试有效
	.u-cell-group__title__text span {
		font-size: 14px;
		color: #797979;
	}

	.whitebox {
		background: white;
	}

	.About {
		margin-bottom: calc(90 / 2340 * 100vh);
	}

	.LogOutBtn {
		width: 90%;
		margin: 0 auto;
	}
</style>