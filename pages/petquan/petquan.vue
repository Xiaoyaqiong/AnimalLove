<template>
	<view class="content3">
		<!-- 匹配手机端，腾出手机状态栏的高度，防止手机状态栏遮拦内容 -->
		<view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view>
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
				<view class="xingge">
					<view class="title1 blod">
						描述您的宠物性格吧~
					</view>
					<!-- <view class="existing_label">
						<view class="u-page__tag-item" v-for="(item, index) in allTags" :key="index">
							<u-tag shape="circle" :text="item.name" :plain="!item.checked" :name="index" @click="TagClick"
								borderColor='#fff' color='black' @close="closelabelTag">
							</u-tag>
						</view>
					</view> -->
					<view class="">
						<u-row justify="space-between" gutter="10" v-for="(rowitem,rowindex) in allTags" :key="rowindex" customStyle="margin-bottom: 10px">
							<u-col v-for="(tagitem,tagindex) in rowitem" :span="tagitem.span" @click="topicDetail(tagitem)">
								<view class="demo-layout" :style="{'background-color': tagitem.color}">{{tagitem.name}}</view>
							</u-col>
					
						</u-row>
						<!-- <u-row justify="space-between">
							<u-col v-for="(rowitem,rowindex) in allTopic" span="4" key="rowindex" @click="topicDetail(rowitem.id)">
								<view class="demo-layout">{{rowitem.name}}</view>
							</u-col>
						
						</u-row> -->
					</view>
				</view>
				
				<!-- <view class="title blod" @tap="dianji()">
					动态
				</view> -->
				<adopt id="filterBox"></adopt>
			</view>
			<view class="" v-else="act==1">
				<view>
					<u-grid :border="false" col="4">
						<u-grid-item v-for="(listItem,listIndex) in typelist" :key="listIndex" @click="gotofilter(listItem.id)">
							<img class="sortImg radius" :src="listItem.src" alt="">
							<text class="grid-text">{{listItem.title}}</text>
						</u-grid-item>
					</u-grid>
					<u-toast ref="uToast" />
				</view>
				<articles :articlelist="articlelist" :currentPage="currentPage"
				:pages="pages" :totalCount="totalCount" :status="status" :pageSize="pageSize"
				></articles>
			</view>
		</view>

	</view>
</template>

<script>
	import articles from '../../components/articles.vue'
	import myhttp from '../../api/myhttp'
	import MyBar from '@/components/MyNavbar.vue'
	import adopt from 'pages/zadopt/adopt.vue'
	export default {
		components: {
			articles,
			MyBar,
			adopt
		},
		data() {
			return {
				currentPage: 1, //当前页码
				pages: 0, //总页数
				totalCount: 0, //总条数
				status: '',
				pageSize: 5, //一个个数
				articlelist: [],
				isNeedRefresh:true,//是否需要刷新文章列表
				articleTag:null,
				typelist: [{
						id:1,
						name: 'miaomiao',
						title: '喵喵',
						src:'../../static/icon/index/xiaomaochushou.png'
					},
					{
						id:2,
						name: 'wanwan',
						title: '汪汪',
						src:'../../static/icon/index/dogicon.png'
				 },
					{
						id:3,
						name: 'tutu',
						title: '兔兔',
						src:'../../static/icon/index/rabbiticon.png'
					},
					{
						id:4,
						name: 'yaya',
						title: '鸭鸭',
						src:'../../static/icon/index/duckicon.png'
					},
					
				],
				
				allTags: {
					row1: [{
						name: '#热情讨好',
						span: 3,
						id:0,
						color:"#F5DCA6",
						
					}, {
						name: '#胆小内向',
						span: 4,
						id:1,
						color:"#FCF4E0",
						
					}, {
						name: '#外强中干',
						span: 5,
						id:2,
						color:"#F5DCA6",
						
					}],
					row2:[{
						name: '#霸道妒忌',
						span: 4,
						id:3,
						color:"#E5EEE5",
						
					}, {
						name: '#好动热血',
						span: 5,
						id:4,
						color:"#ECE7E3",
						
					}, {
						name: '#温暖贴心',
						span: 3,
						id:5,
						color:"#FCF4E0",

					}]
				},
				act: 0,

				list: [{
						id: 0,
						name: '动态'
					},
					{
						id: 1,
						name: '百科'
					}

				],
				content: '',
				allTopic:[]
			}
		},
		// mounted:function(){
			
		// 	this.getTopicList()
		// },
		
		methods: {
			
			// 获取文章列表
			loadarticles: function() {
				// let params=this.articleTag
				myhttp.get('/articles/list/' + this.currentPage + '/' + this.pageSize,{'tagId':this.articleTag}).then(res => {
					console.log(res.data.total, 'res.data.records');
					if (res.resultCode == 200) {
						// this.articlelist=[]
						res.data.records.forEach(e => {
							this.articlelist.push(e)
						})
						// this.articlelist = res.data.records;
						this.pages = res.data.pages
						this.currentPage = res.data.current
						this.totalCount = res.data.total
						
					} else if (res.resultCode == 401) {
						uni.navigateTo({
							url: "../login/login"
						})
			
					} else {
						uni.showToast({
							title: "加载错误",
							icon: "none",
						})
					}
				})
			 this.isNeedRefresh = true; 
			},
			
			// 点击话题详情
			topicDetail(item){
				console.log('点击话题',item);
				    uni.navigateTo({
				    	url: '/pages/zadopt/setup?item='+encodeURIComponent(JSON.stringify(item))
				    	// ?item=' + encodeURIComponent(JSON.stringify(item))
				    })
			},
			// 据分类筛选文章
			gotofilter(item){
				  
				  this.articlelist = [];  // 清空原有文章列表 
				  this.currentPage = 0;   // 重置当前页码为0
				  this.pages=0;
				  this.status=''
				  this.articleTag = item;   // 将当前标签值设置为传入的tag值
				   this.loadarticles(); // 加载新类型文章列表数据
				
			},
			click(name) {
				this.$refs.uToast.success(`点击了第${name}个`)
			},
			// // 删除单个标签触发的时间
			// closelabelTag(e) {
			// 	console.log(e)
			// 	console.log(list)
			// 	let list = []
			// 	list = uni.getStorageSync('userLabel')
			// 	list.splice(e, 1)
			// 	uni.setStorage({
			// 		key: 'userLabel',
			// 		data: list
			// 	})
			// 	this.getlocalTags()
			// },
			// // 删除标签弹窗
			// tagDelete() {
			// 	this.tagClosable = true
			// },
			// tagDeleteBack() {
			// 	this.tagClosable = false
			// },

			changeAct(item) {

				// 激活样式是当前点击的对应下标--list中对应id
				this.act = item.id;

				// // 可以根据点击事件改变内容
				// this.content = item
			},
			thisAsyncIncrement() {
				this.$store.state.adopt.adoptList=[]
				this.$store.dispatch('getArticles')
			},
		},
		onShow() {
		  if (this.isNeedRefresh) {
			  this.articlelist = [];
			  this.currentPage = 0;
		    this.loadarticles();
		    this.isNeedRefresh = false;
		  }
		},
		onLoad() {
			 this.isNeedRefresh = true;
			this.$store.state.adopt.filterList={}
			this.thisAsyncIncrement()
		},
		// mounted:function(){
		// 	this.loadarticles()
		// },
		onReachBottom() {
			if (this.currentPage >= this.pages) return;
			console.log('进入');
			this.status = 'loading';
			this.currentPage = ++this.currentPage;
			setTimeout(() => {
				this.loadarticles()
				if (this.currentPage >= this.pages) {
					this.status = 'nomore'
				} else {
			
					this.status = 'loading'
				}
			}, 1000)
		}

	}
</script>

<style lang="scss" scoped>
	.xingge{
		padding: 16rpx;
		background-color: #bcc0c8;
		border-radius: 20rpx;
	}
	.title1{
		font-style: italic;
		text-shadow: 1px 1px 2px wheat;
		color: #e2deda;
		margin: 16rpx 0rpx;
		font-size: 1.2rem;
	}
	.detail{
		.title{
			margin-bottom: 11px;
		}
	}
	.sortImg {
		width: 8vw;
		height:5vh;
		border-radius: 10px;
		
		img {
			width: 100%;
			height: 100%;
			border-radius: 10px;
		}
	}
	.userinfo{
		justify-content: space-between;
		.username{
			margin-left: 7px;
		}
	}
	.demo-layout {
		text-align: center;
		line-height: 25px;
		font-size: 1.6vh;
		color: #AF8982;
		height: 25px;
		border-radius: 4px;
		
	}

	.grid-text {
		font-size: 14px;
		color: #909399;
		padding: 10rpx 0 20rpx 0rpx;
		/* #ifndef APP-PLUS */
		box-sizing: border-box;
		/* #endif */
	}

	
	.content3 {
		margin-top: 7vh;
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
		background-color: #FFB600;
		margin: 0px auto;
	}
</style>
