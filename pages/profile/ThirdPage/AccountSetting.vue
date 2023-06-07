<template>


	<view class="">
		<!-- 自定义导航栏 -->
		<Mynav CenterSlot="账号与安全" MyColor="#eee"></Mynav>

		<view class="container">
			<u-cell-group :border="false">
				<u-cell :border="false" :titleStyle="{'padding': '7px 2px','font-size': '1.05rem'}" title="用户名"
					:rightIconStyle="{'transform':'scale(1.5)'}">
					<view class="cellValue" slot="value"> {{$store.state.user.username}}</view>
				</u-cell>
				<u-cell :border="false" :titleStyle="{'padding': '7px 2px','font-size': '1.05rem'}" title="密码"
					:rightIconStyle="{'transform':'scale(1.5)'}" value="更改" isLink @click="show=true"></u-cell>
				<u-cell :border="false" :titleStyle="{'padding': '7px 2px','font-size': '1.05rem'}" title="邮箱"
					:rightIconStyle="{'transform':'scale(1.5)'}" :value="$store.state.user.email"></u-cell>
			</u-cell-group>
		</view>

		<!-- 修改密码模态框 -->
		<u-popup :show="show" @close="close" @open="open" :round="10" mode="center">
			<view>
				<u--input  type="password" placeholder="请输入新密码" border="bottom" :maxlength="8"     v-model="password"></u--input>
				<u-button text="确认修改" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="changePwd"></u-button>
			</view>
		</u-popup>




	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import myhttp from '../../../api/myhttp'
	export default {
		data() {
			return {
				password:'',
				show: false,
				UserInfo: {

				}
			}
		},
		components: {
			Mynav
		},
		methods: {
			// 退出登录
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
			},
			changePwd() {
				myhttp.post('/users/changePassword/' + this.password).then(res => {
						console.log(res);
						this.close()
						uni.showToast({
							title:res.msg+',请重新登陆!'
						})
						setTimeout(()=>{
							this.Logout()
						},900)
						
				})
			},


			open() {
				// console.log('open');
			},
			close() {
				this.show = false
				// console.log('close');
			}

		},
		onLoad() {
			this.$store.commit('getUserInfo', null)

		}
	}
</script>

<style>
	page{
		background: #eee;
	}
	.cellValue {
		font-size: 1.05rem;
		margin-right: 0.5rem;
	}

	.container {
		margin-top: 1.2vh;
		background: #fff;

	}
</style>