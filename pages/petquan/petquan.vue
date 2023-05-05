<template>
	<view class="content">
		<MyBar></MyBar>
		<view class="nav">
			<view class="nav-list" v-for="(item,index) in list" :key="item.id" @tap="changeAct(item)">
				<!-- 激活样式名字是红色 判断act==index 和act==item.id都行-->
				<view :class="[act==index?'name':'unname']">
					{{item.name}}
				</view>
				<!-- 名字下面的横线 -->
				<view :class="[act==index?'line':'']">
				</view>
			</view>
		</view>

		<!-- 内容的改变 -->
		<view class="detail">
			<view class="" v-if="act==0">
				<view class="">
					话题
				</view>
				<view class="existing_label">
					<view class="u-page__tag-item" v-for="(item, index) in allTags" :key="index">
						<u-tag shape="circle" :text="item.name" :plain="!item.checked" :name="index" @click="TagClick"
							borderColor='#fff' color='black' @close="closelabelTag">
						</u-tag>
					</view>
				</view>
				<view class="">
					动态
				</view>
				<custom-waterfalls-flow :value="Donglist">
				
					<!-- #ifndef MP-WEIXIN -->
					<template v-slot:default="item">
						<view class="item">
							<view class="title">{{item.title}}</view>
							<view class="desc">
								<text>{{item.type}}|{{item.age}}个月</text>
								<text>{{item.time}}天前</text>
							</view>
						</view>
					</template>
					<!-- #endif -->
				</custom-waterfalls-flow>
			</view>
			<view class="" v-else="act==1">
				 <view>
				        <u-grid
				                :border="false"
				                col="4"
				        >
				            <u-grid-item
				                    v-for="(listItem,listIndex) in typelist"
				                    :key="listIndex"
				            >
				                <u-icon
				                        :customStyle="{paddingTop:20+'rpx'}"
				                        :name="listItem.name"
				                        :size="22"
				                ></u-icon>
				                <text class="grid-text">{{listItem.title}}</text>
				            </u-grid-item>
				        </u-grid>
				        <u-toast ref="uToast" />
				    </view>
			<articles></articles>
			</view>
		</view>

	</view>
</template>

<script>
	import articles from '../../components/articles.vue'
	import MyBar from '@/components/MyNavbar.vue'
	export default {
		components:{
			articles,
			MyBar
		},
		data() {
			return {
				typelist: [{
				                    name: 'photo',
				                    title: '图片'
				                    },
				                    {
				                        name: 'lock',
				                        title: '锁头'
				                    },
				                    {
				                        name: 'star',
				                        title: '星星'
				                    },
				                    {
				                        name: 'hourglass',
				                        title: '沙漏'
				                    },
				                    {
				                        name: 'home',
				                        title: '首页'
				                    },
				                    {
				                        name: 'star',
				                        title: '音量'
				                    },
				                ],
				Donglist: [{
							image: 'https://via.placeholder.com/200x500.png/ff0000',
							title: '德文卷毛，求领养~',
							type: '德文卷毛',
							age: '2',
							time: '3'
				
						},
						{
							image: 'https://via.placeholder.com/200x500.png/ff0000',
							title: '德文卷毛，求领养德文卷毛，求领养~~',
							type: '德文卷毛',
							age: '2',
							time: '3'
				
						},
						{
							image: 'https://via.placeholder.com/200x200.png/2878ff',
							title: '德文卷毛，求领养~',
							type: '德文卷毛',
							age: '2',
							time: '3'
				
						},
						{
							image: 'https://via.placeholder.com/200x500.png/ff0000',
							title: '德文卷毛，求领养~',
							type: '德文卷毛',
							age: '2',
							time: '3'
				
						},
						{
							image: 'https://via.placeholder.com/200x200.png/2878ff',
							title: '德文卷毛，求领养~',
							type: '德文卷毛',
							age: '2',
							time: '3'
				
						},
					]
				,
				allTags:[{name:'#我的萌宠'},{name:'#小奶猫'},{name:'#德文卷毛'},{name:'#小短腿'},{name:'#狗狗日常'},{name:'#守宫'},
				],
				act: 0,

				list: [{
						id: 0,
						name: '吃饭'
					},
					{
						id: 1,
						name: '学习'
					}

				],
				content: ''

			}
		},
		methods: {
			 click(name) {
			                this.$refs.uToast.success(`点击了第${name}个`)
			            },
			// 删除单个标签触发的时间
						closelabelTag(e){
							console.log(e)
							console.log(list)
							let list = []
							list = uni.getStorageSync('userLabel')
							list.splice(e, 1)
							uni.setStorage({
								key:'userLabel',
								data:list
							})
							this.getlocalTags()
						},
						// 删除标签弹窗
						tagDelete(){
							this.tagClosable = true
						},
						tagDeleteBack() {
							this.tagClosable = false
						},
			
			changeAct(item) {

				// 激活样式是当前点击的对应下标--list中对应id
				this.act = item.id;

				// // 可以根据点击事件改变内容
				// this.content = item
			}
		},
		onShow() {
			// 页面默认显示的是list列表中第一条数据
			// this.content = this.list[0]
		}

	}
</script>

<style lang="scss"  scoped>
	 .grid-text {
	        font-size: 14px;
	        color: #909399;
	        padding: 10rpx 0 20rpx 0rpx;
	        /* #ifndef APP-PLUS */
	        box-sizing: border-box;
	        /* #endif */
	    }
	.existing_label {
				width: 100%;
				margin-top: 10px;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				// align-content: space-between;
				flex-wrap: wrap;
				.u-page__tag-item {
					margin-top: 15px;
					// background: rgba(41, 41, 69, 0.05);
					margin-right: 10px;
				}
				// .u-page__tag-item:nth-child(3n){
				// 	margin-right: 0;
				// }
				.u-tag u-tag--circle u-tag--primary--plain u-tag--medium{
					// margin-right: 0px!important;
				}
				/deep/{
					.u-tag--primary{
						border-radius: 10px;
						background-color:rgba(41, 41, 69, 0.05);
						border-color: #3285E4!important;
						// border-image:linear-gradient(to right,rgba(93, 164, 247, 1), rgba(50, 133, 228, 1))1!important;
					}
					.u-tag-wrapper {
						// background:  rgba(41, 41, 69, 0.05);
						border-radius: 10px;
					}
					.u-tag u-tag--circle u-tag--primary u-tag--medium {
						background-color:rgba(41, 41, 69, 0.05);
					}
					.u-tag--medium{
						padding: 0 15px;
						background:  rgba(41, 41, 69, 0.05);
					}
					.u-tag__close--medium{
						border: 1px solid rgba(122, 122, 140, 1);
						background:  #FFFFFF !important;
					}
					.u-tag__close{
						// background-color: #FFFFFF!important;
						top:12px;
						right: 18px;
					}
					.u-icon__icon{
						color:rgba(122, 122, 140, 1)!important;
					}
					// .u-tag u-tag--circle u-tag--primary--plain u-tag--medium {
					// 	background: red;
					// }
	}}
	.content {
		margin-top: 8.5vh;
		margin-left: 12px;
		margin-right: 14px;
	}



	.nav {
		width: 270px;
		height: 30px;
		margin: 0px auto;
		display: flex;
		align-items: center;
		justify-content: space-around;
		/* background-color: rgba(0, 0, 0, .8); */
		font-size: 30rpx;
		color: orange;
		letter-spacing: 2.14rpx;
	}

	.nav-list {
		width: 135px;
		height: 30px;
		opacity: .9;
	}

	.nav-list .name {
		color: #FFB600;
		text-align: center;
	}

	.nav-list .unname {
		color: black;
		text-align: center;
	}

	.nav-list .line {
		margin-top: 10rpx;
		width: 65rpx;
		height: 4rpx;
		background-color: red;
		margin: 0px auto;
	}
</style>
