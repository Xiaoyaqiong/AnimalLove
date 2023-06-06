<template>
	<view class="content">
		<!-- 匹配手机端，腾出手机状态栏的高度，防止手机状态栏遮拦内容 -->
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view>
		<!-- 头部登录文字 -->
		<view class="header">
			<span style="font-weight: bolder;font-size: 50rpx;">登录</span>
			<view style="color: #A9A9A9;margin-top: 20rpx;">若该邮箱未注册，我们将自动为您注册</view>
		</view>

		<!-- 切换登录类型-->
		<view class="login-type">
			<view v-for="(item,index) in loginTypeList" :key="index" @click="loginType = index"
				:class="{act: loginType === index}" class="login-type-btn">{{item}}</view>
		</view>

		<!-- 邮箱验证码登录  -->
		<view class="input-group" v-if="loginType === 0">
			<view class="input-row border">
				<!-- <text class="title">邮箱：</text> -->
				<!-- <input class="input" type="text" clearable focus v-model="email" placeholder="请输入邮箱"></input> -->
				<u--input placeholder="请输入邮箱" border="surround" focus="" v-model="email"></u--input>
				
			</view>


			<view class="u-demo-block__content" style="margin-top: 15px;">
				<!-- 注意：由于兼容性差异，如果需要使用前后插槽，nvue下需使用u--input，非nvue下需使用u-input -->
				<!-- #ifndef APP-NVUE -->
				<u-input placeholder="请输入验证码" v-model="code">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<u--input placeholder="请输入验证码" v-model="code">
						<!-- #endif -->
						<template slot="suffix">
							<u-code uniqueKey="Page-a" :keepRunning="true" :seconds="seconds" ref="uCode"
								@change="codeChange"></u-code>
							<u-button  @tap="getCode" :text="tips" type="success" size="mini">
							</u-button>
						</template>
						<!-- #ifndef APP-NVUE -->
				</u-input>
				<!-- #endif -->
				<!-- #ifdef APP-NVUE -->
				</u--input>
				<!-- #endif -->
			</view>
		</view>




		<!-- 邮箱密码登录 -->
		<view class="input-group" v-else>
			<view class="input-row border">
				<!-- <text class="title">邮箱：</text> -->
				<u--input placeholder="请输入邮箱" border="surround" focus v-model="email"></u--input>
			</view>


			<view class="input-row border">
				<u--input placeholder="请输入密码" password border="surround" v-model="password"></u--input>
			</view>

		</view>
		<view class="btn-row">
			<button class="loginbtn" type="primary" :loading="loginBtnLoading" @click="bindLogin">登录</button>
		</view>
<u-notify ref="uNotify" message="Hi uView"></u-notify>
	</view>
</template>

<script>
import store from '../../store';
	export default {
		data() {
			return {
				tips: '',
				// refCode: null,
				seconds: 30,
				loginType: 0,
				loginTypeList: ['验证码登录', '密码登录'], // 0 1
				email: '',
				code: '',
				password: '',
				positionTop: 0,
				loginBtnLoading: false,
			}
		},
		computed: {
			// 验证邮箱是否正确
			CheckEmail(e) {
				let email_reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
				if (email_reg.test(e.email)) {
					this.email = e.email
					return true

				} else {
					return false
				}
				return false
			}
		},

		methods: {
			codeChange(text) {		// uView内部传递参数 text:重新获取验证码||点击获取验证码
				this.tips = text;
			},
			// 获取验证码
			getCode() {
				let that = this
				if (!this.CheckEmail) {
					this.$refs.uNotify.show({
						top: '20vh',
						type: 'error',
						message: '邮箱格式有误',
						duration: 2000,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}else{
					// 检查无误后开始请求验证码
					if (this.$refs.uCode.canGetCode) { // 注意：用户可能在倒计时的过程中点击获取验证码的按钮，组件内部提供了通过ref获取的canGetCode变量
						let path = "/api/getVerifyCode/" + that.email
						// 请求验证码
						that.$myhttp.get(path).then(res=>{
							
							console.log(res)
						})
					
						uni.showLoading({
							title: '正在获取验证码'
						})
						setTimeout(() => {
							uni.hideLoading();
							// 这里此提示会被this.start()方法中的提示覆盖
							uni.$u.toast('验证码已发送');
							// 通知验证码组件内部开始倒计时
							this.$refs.uCode.start();
						}, 1500);
					} else {
						uni.$u.toast('请等待倒计时结束后再点击');
					}
				}



			},
			bindLogin() {
				if (!this.CheckEmail) {
					this.$refs.uNotify.show({
						top: '6vh',
						type: 'error',
						message: '邮箱格式有误',
						duration: 2000,
						fontSize: 12,
						safeAreaInsetTop: true
					})
				}
				else{
					switch (this.loginType) {
						case 0:
							this.loginByEmail()
							break;
						case 1:
							this.loginByPwd()
							break;
						default:
							break;
					}
				}

			},
			// 邮箱登陆
			loginByEmail() {
				let that = this
				// console.log(that.code)
				that.$myhttp.post('/api/user/login',
					   {
						email: that.email,
						verifyCode:that.code
						// email: "826697618@qq.com",
						// verifyCode:"221916"
						},
						
					).then(res=>{
						// console.log(res)
						// 保存用户token
						
						uni.setStorageSync('token', res.data.token); 
						this.$store.commit('getUserInfo',res.data)
						
						// 保存用户信息
						// uni.setStorageSync('userInfo', res.data.data.user); 
						
						
						uni.switchTab({
							url:'/pages/profile/profile',
						})
						
					})
					
					
				
			},
			// 密码登陆
			loginByPwd() {
				let that = this
				let url =that.$baseUrl + "/api/user/login/password"
				that.$myhttp.post('/api/user/login/password',{
					email: that.email,
					password:that.password
				}).then(res=>{
					uni.setStorageSync('token', res.data.token);
					this.$store.commit('getUserInfo',res.data)
					
					// 保存用户信息
					// uni.setStorageSync('userInfo', res.data.data.user); 
					
					
					uni.switchTab({
						url:'/pages/profile/profile',
					})

				})

			}
		},
		onLoad() {
				
		}
	}
</script>

<style>
	@import url('login.css');
</style>
