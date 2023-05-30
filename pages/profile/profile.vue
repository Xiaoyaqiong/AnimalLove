<template>
	<view>
		<u-toast ref="uToast"></u-toast>
		<!-- 添加宠物模态框 -->
		<u-popup zIndex="998" class="popup" :show="showAddPet" :round="10" @close="close" @open="open" closeable>
			<view style="padding: 5%;margin: 10% 0;margin-bottom: 6vh;">
				<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
				<u-form labelPosition="left" :model="PetModal" :rules="rules" errorType="message" ref="form1">

					<u-form-item label="类型" :border-bottom="true">
						<view class="flex u-flex-around btn-group">
							<button :style="PetModal.petType==1? 'border:1px solid #11A1F8':''" text="喵喵" shape="circle"
								style="color: #000;" color="#e8efff" @click="setPet('petType',1)">喵喵</button>
							<button :style="PetModal.petType==2? 'border:1px solid #11A1F8':''" text="汪汪" shape="circle"
								style="color: #000;" color="#e8efff" @click="setPet('petType',2)">汪汪</button>
							<button :style="PetModal.petType==3? 'border:1px solid #11A1F8':''" text="其他" shape="circle"
								style="color: #000;" color="#e8efff" @click="setPet('petType',3)">其他</button>
						</view>


					</u-form-item>

					<u-form-item label="性别" :border-bottom="true">
						<view class="flex btn3">
							<button :style="PetModal.gender=='man'? 'border:1px solid #11A1F8':''" icon="man"
								shape="circle" iconColor="#11A1F8" color="#e8efff"
								@click="setPet('gender','man')">男</button>
							<button :style="PetModal.gender=='woman'? 'border:1px solid #E793CF':''" icon="woman"
								shape="circle" iconColor="#E793CF" color="#e8efff"
								@click="setPet('gender','woman')">女</button>
						</view>
					</u-form-item>




					<u-form-item label="年龄" :border-bottom="true">
						<view class="flex btn3">
							<button :style="PetModal.petAge=='0~3个月'? 'border:1px solid #11A1F8':''" shape="circle"
								color="#e8efff" @click="setPet('petAge','0~3个月')"> 0~3个月</button>
							<button :style="PetModal.petAge=='0~1岁'? 'border:1px solid #11A1F8':''" shape="circle"
								color="#e8efff" @click="setPet('petAge','0~1岁')"> 0~1岁</button>
							<button :style="PetModal.petAge=='1~3岁'? 'border:1px solid #11A1F8':''" shape="circle"
								color="#e8efff" @click="setPet('petAge','1~3岁')"> 1~3岁</button>
							<button :style="PetModal.petAge=='3岁以上'? 'border:1px solid #11A1F8':''" shape="circle"
								color="#e8efff" @click="setPet('petAge','3岁以上')"> 3岁以上</button>
						</view>
					</u-form-item>


					<u-form-item label="昵称" prop="PetModal.nickName" :border-bottom="true">
						<u-input v-model="PetModal.nickName" placeholder="请输入您的爱宠昵称"></u-input>
					</u-form-item>


					<u-form-item label="是否绝育" prop="PetModal.sterilizationStatus">
						<u-switch :value="PetModal.sterilizationStatus" @change="change" activeValue="已绝育" inactiveValue="未绝育"></u-switch>
					</u-form-item>


				</u-form>
				<u-button class="u-margin-center-auto" style="width: 80%;margin-top: 2vh;" @click="addPet"
					color="#F4AE3E" text="保存"></u-button>
			</view>
		</u-popup>
		<view class="ProfileCard">
			<view class="content">
				<u-avatar style="display: inline-block;" size="5.5rem" :src="$store.state.user.avatar"></u-avatar>
				<view class="username">{{$store.state.user.username}}</view>
				<view class="level">
					<u-icon style="display: inline-block;" name="../../static/icon/user/xunzhang.png"></u-icon>
					{{$store.state.user.level}}
				</view>
			</view>


		</view>


		<!-- 我的宠物档案 -->
		<view class="prof">
			<view class="t1">
				<view class="line">
					<image src="../../static/icon/user/chongwu1.png" mode="scaleToFill"></image>
					<span class="t1-1">我的宠物档案</span>
				</view>

				<span class="t1-2" @tap="showAddPet = true">管理宠物</span>
			</view>

		</view>

		<!-- 个人宠物信息 -->
		<view class="pet-profile WhiteBox">
			<view class="nickName">
				<span>{{Firstpet.nickName}} </span>
				<image style="width: 30rpx;height: 30rpx;" src="../../static/icon/user/bianji.png"></image>
				<u-icon style="display: inline-block;" :name="Firstpet.gender"
					:color="Firstpet.gender=='man'?'#11A1F8':'#ffaaff'"></u-icon>

			</view>

			<view class="tags1">
				<u-badge class="tag1" v-for="tag in Firstpet.tags" bgColor="#F5DCA6" color="#AF8982"
					:value="tag"></u-badge>

			</view>

			<view class="PetAvatar">
				<u--image shape="circle" radius="50%" :src="Firstpet.avatar" height="10vh"
					width="10vh" :lazy-load="true" :fade="true" duration="450"></u--image>
			</view>

		</view>

		<!-- 功能菜单 -->
		<view class="WhiteBox">
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
	import myhttp from '../../api/myhttp';
	export default {
		data() {
			return {
				// 宠物模型
				PetModal: {
					petType: 0,
					petAge: '',
					gender: '',
					nickName: '',
					sterilizationStatus: '未绝育'
				},
				// 宠物表单规则
				rules: {
					'PetModal.nickName': [{
						type: 'string',
						required: true,
						message: '请填写昵称',
						trigger: ['change']
					}, {
						// 自定义验证函数
						validator: (rule, value, callback) => {
							
							return uni.$u.test.chinese(value);
						},
						message: '昵称为2-8个汉字',
						// 触发器可以同时用blur和change
						trigger: ['change', 'blur'],
					}]

				},
				showAddPet: false,
				screenHeight: 0, // 移动端屏幕高度
				screenWidth: 0, // 移动端屏幕宽度
				iconWidth: 43, // 控制icon大小
				Firstpet: {
					id:0,
					nickName: '小黄',
					gender: 'man',
					tags: [
						'1岁以内',
						'未绝育'
					]
				},

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
				list1: [{
						name: '我的发布',
						id: 'UserDetail',
						path: '../../static/icon/user/wodefabu.png',
					},
					{
						name: '我的收藏',
						id: 'Favorite',
						path: '../../static/icon/user/shoucang.png',

					},
					{
						name: '我的聊天',
						id: 'chat',
						path: '../../static/icon/user/xinxi.png',

					},
					{
						name: '我的订单',
						id: 'coupon',
						path: '../../static/icon/user/qianbao.png',

					},
					{
						name: '设置',
						id: 'Setting',
						path: '../../static/icon/user/shezhi.png',

					}
				],


			}
		},
		methods: {
			// 是否绝育改变
			change(value) {
				this.PetModal.sterilizationStatus = value
			},


			// 增加宠物
			addPet() {
				// 1 喵喵  2汪汪  3其他
				let petdata = {
					"id": this.Firstpet.id,
					"avatar": 'http://img.touxiangkong.com/uploads/allimg/20203301301/2020/3/YvMJri.jpg',
					"birthday": "2023-05-22T13:27:48.462Z",
					"gender": this.PetModal.gender,
					"insectRepellentStatus": 0,
					"nickName": this.PetModal.nickName,
					"petVarietyId": this.PetModal.petType,
					"sterilizationStatus": this.PetModal.sterilizationStatus,
					"ageYear":this.PetModal.petAge,
					"vaccineStatus": 0
				}


				myhttp.post('/users/pets/updatePet', petdata).then(res => {
					uni.showToast({
						title: res.msg + '!'
					})
					

				})
				// #ifdef H5
						location.reload()
				// #endif
				
					
				
				//  uni.redirectTok({
				// 	url:'pages/profile/profile'
				// })
				
				
			},
			// 设置宠物信息
			setPet(type, value) {
				if (type == 'petType') {
					this.PetModal.petType = value
				} else if (type == 'gender') {
					this.PetModal.gender = value
				} else if (type == 'petAge') {
					this.PetModal.petAge = value
				}
			},
			// 开关模态框
			open() {

			},
			close() {
				this.showAddPet = false
				// console.log('close');
			},
			// 点击跳转功能
			onClick(item) {
				console.log(item)
				let that = this
				let url = '/pages/profile/SecondPages/' + item.id
				if (item.id == 'chat') {
					that.$refs.uToast.show({
						type: 'default',
						title: '默认主题',
						message: "此功能正在开发哦~",
						iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
					})
				}




				setTimeout(() => {
					uni.navigateTo({
						url: url,
						animationType: 'slide-in-right',
						animationDuration: 100,
						success() {
							// console.log('成功打开页面',item.name)
						}
					})
				}, 100)


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
		// 初始化页面
		
		// 请求宠物数据
		myhttp.get('/users/pets/list').then(res => {
			this.Firstpet = res.data[res.data.length-1]
			this.Firstpet.tags = [this.Firstpet.ageYear,this.Firstpet.sterilizationStatus]
			
			
		})

		}

	}
</script>

<style>
	uni-button:after {
		border: none;
	}
</style>

<style lang="scss" scoped>
	$Basewidth : 1080;
	$Basehigth : 2340;
	@import 'personage.scss';

	uni-view {
		box-sizing: content-box;
	}

	/deep/ .u-transition.u-fade-enter-to.u-fade-enter-active {
		z-index: 997 !important;
	}

	/* // 添加宠物 模态框 */
	.u-form-item {

		uni-button {
			text-align: center;
			background: transparent;
		}

		.btn-group {

			width: 100%;

			button {

				font-size: 0.9rem;
				width: 25vw;
			}
		}

		.btn3 {
			// outline: 1px solid;
			width: 100%;

			button {
				font-size: 0.9rem;
				padding: 0;
			}

		}
	}
</style>