<template>
	<view class="articles">
		<u-row justify="space-between" gutter="10">
			<u-col span="1">
				<img class="icon" :src="src" alt="" srcset="" @click="test()">
			</u-col>
			<u-col span="12">
				<view class="title">
					推荐文章
				</view>
			</u-col>

		</u-row>
		<uni-list>
			<!-- title、note设置标题和小文字 -->
			<uni-list-item direction="row" v-for="item in info" :key="item.id" :title="item.title"
				:note="item.user_name + ' '+item.last_modify_date">
				<!-- 通过v-slot:header插槽定义列表左侧的图片显示，其他内容通过List组件内置属性实现-->
				<template v-slot:footer>
					<!-- 当前判断长度只为简单判断类型，实际业务中，根据逻辑直接渲染即可 -->
					<image class="image-1" :src="item.avatar" mode="aspectFill"></image>
				</template>
			</uni-list-item>
		</uni-list>
		<u-loadmore :status="status" @loadmore="test2()" />
	</view>
</template>

<script>
	export default {
		data() {
			return {

				status: 'loadmore',
				list: [],
				page: 1, //第几页
				suo: true,
				info: [{
						"user_name": "未来汽车日报",
						"title": "为什么自动驾驶诉讼不断？",
						"avatar": "https://img.36krcdn.com/20200410/v2_9c3331af67e64994aa97a27fffb1a380_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center",
						"last_modify_date": "2020-04-11 17:11:09",
					},
					{
						"user_name": "36氪深度服务",
						"title": "2020数字中国创新大赛-数字政府赛道21强出炉，四大赛题紧贴政府数字化发展需求",
						"avatar": "https://img.36krcdn.com/20200411/v2_16417a06088947debe0450950f8fc813_img_png",
						"last_modify_date": "2020-04-11 17:03:18",
					}, {
						"user_name": "未来汽车日报",
						"title": "地方政府救市哪家强？广州补贴上万元，广深杭新增指标超5万",
						"avatar": "https://img.36krcdn.com/20200410/v2_6905947498bc4ec0af228afed409f771_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center",
						"last_modify_date": "2020-04-11 16:11:11",
					},
					{
						"user_name": "未来汽车日报",
						"title": "为什么自动驾驶诉讼不断？",
						"avatar": "https://img.36krcdn.com/20200410/v2_9c3331af67e64994aa97a27fffb1a380_img_png?x-oss-process=image/resize,m_mfit,w_520,h_300/crop,w_520,h_300,g_center",
						"last_modify_date": "2020-04-11 17:11:09",
					},
				],
				src: "../static/icon/index/book.png"
			}
		},
		onLoad() {
			// this.requestnotice()
			// this.test()
		},
		onShow() {
			// this.requestnotice()
			// this.test()
		},
mounted(){
	this.requestnotice()
},
		methods: {
			test2(){
				console.log('');
			},
			// test() {
			// 	this.requestnotice()
			// },
			// 第一次请求全部通知列表
			requestnotice() {
				uni.request({

					url: 'https://www.fastmock.site/mock/2f01a1768165cca2e530abf1c65d5ec1/api/articles', //仅为示例，并非真实接口地址。
					method: "GET",
					data: {
						page: 1,
						limit: 10
					},
					success: (res) => {
						console.log("初始请求通知列表", res.data);
						this.list.push()
						
					}
				});
			},
			loadnotice() {
				uni.request({
					url: 'https://www.fastmock.site/mock/2f01a1768165cca2e530abf1c65d5ec1/api/articles', //仅为示例，并非真实接口地址。
					method: "GET",
					data: {

						page: this.page,
						limit: 10
					},
					success: (res) => {
						console.log("上拉请求通知列表", res.data);
						this.list = this.list.concat(res.data.data)
						//在这里要进行一个判断，当后端传给我的数据小于每页的数据时就显示没有更多了
						if (res.data.data.length == '') {
							this.status = 'nomore';
							this.suo = false
						} else if (res.data.data.length < 10) {
							this.status = 'nomore';
							this.suo = false
						} else if (res.data.data.length = 10) {
							this.status = 'loadmore';
							this.suo = true
						}
					}
				});
			},

		},
		// computed() {
		// 	this.requestnotice()
		// },
		onReachBottom() {
							console.log("上拉加载更多")
							// 显示加载中
							this.statusLoadMore = "loading"
							var that = this

							setTimeout(function() {	
								// 显示没有更多数据了
								that.statusLoadMore = "nomore"
							}, 2000)
			// if (this.suo) { //定义个小锁，当没有数据时锁住suo
			// 	this.status = 'loading';
			// 	this.page = ++this.page;
			// 	setTimeout(() => {
			// 		this.loadnotice()
			// 	}, 1000)
			// }
		},

	}
</script>

<style>
	/* .content {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
		} */

	.image-1 {
		flex-shrink: 0;
		margin-right: 10px;
		width: 125px;
		height: 75px;
		border-radius: 6px;
		overflow: hidden;
		border: 1px #f5f5f5 solid;
	}

	.icon {
		width: 32px;
		height: 32px;
	}
</style>
