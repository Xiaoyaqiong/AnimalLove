<template>
	<view class="content">
		
		<MyBar></MyBar>
	
		<!-- 轮播 -->
		<view class="swiper">
			<view class="u-demo-block">
				<u-swiper :list="list3" keyName="image" showTitle previousMargin="76" nextMargin="92" circular
					:autoplay="false" radius="5" bgColor="#ffffff"></u-swiper>
			</view>
		</view>
		<!-- 宠物领养bar -->
		<view class="titleBar">
			<u-row justify="space-between" gutter="">
				<u-col span="1">
					<!-- <img class="icon" :src="src" alt="" srcset=""> -->
					<u-image width="30" height="30" src="../../static/icon/index/xiaomaochushou.png"></u-image>
				</u-col>
				<u-col span="9">
					<view class="title">
						动态
					</view>
				</u-col>
				<u-col span="3">
					<view data-control="control" @click="goPage" class="action">
						<text class="more">更多</text>
						<u-icon name="arrow-right" color="#8B8B8B" size="1.5rem"></u-icon>
					</view>
				</u-col>
			</u-row>
		</view>
<!-- 宠物领养前两条内容 -->
		<view class="adopt-content">
			<u-row justify="space-between" gutter="10">
				<u-col span="6" v-for="(item,index) in adoptData" :key="index">
					<view class="animal-card">
						<view class="ani-img">
							<img class="info-img"
								:src=item.image
								alt="">
						</view>
						<view class="ani-info">
							<view class="info1">
								<text>萌宠</text>
								<u-icon :name="item.sex?'man':'woman'" :color="item.sex?'#11A1F8':'#ffaaff'" size="1.5rem"></u-icon>
							</view>
							<view>{{item.petVariety}}</view>
							<view>{{item.ageYear}}</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<!-- 问医生 -->
		<!-- <title-bar :page="page2" :title="title1" :src="src2"></title-bar>
		<view class="doctor-content">
			<u-row justify="space-between" gutter="10">
				<u-col span="4" v-for="(item,index) in 3" :key="index">
					<view class="doctor-card">
						<view class="doctor-img">
							<u-avatar :src="src3"></u-avatar>
						</view>
						<view class="doctor-name">
							<img class="icon" :src="src3" alt="" srcset="">
							<text class="docName">张三</text>
						</view>
						<view class="doctor-skill">
							<text>猫病|</text>
							<text>从业3年</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view> -->

		<!-- 常见问题 -->
		<!-- <view class="question">
			<view class="title">
				<text>常见问题</text>
			</view>
			<u-row gutter="10">
				<u-col span="6">
					<view class="tag-info">
						<u-tag class="tag" text="标签" shape="circle" v-for="(item,index) in 6" :key="index"></u-tag>
					</view>
				</u-col>
				<u-col span="6">
					<view class="ask-button">
						<u-button type="primary" icon="map" text="问答"></u-button>
					</view>
				</u-col>
			</u-row>
		</view> -->
		<!-- 推荐文章 -->
		<articles :articlelist="articlelist" :currentPage="currentPage" 
		:pages="pages" :totalCount="totalCount" :status="status" :pageSize="pageSize"
		></articles>
		<!-- <title-bar :title="title2" :name="name2" :control="false"></title-bar>
		<view class="passage">
			<view class="passage-content" v-for="(item,index) in 3" :key="index">
				<view class="psg-word">
					<view class="psg-title">聚合报告：如果添加在线程组下面是单个线程的报告结果如上图</view>
					<view class="psg-detail">下面是添加在线程组外面的聚合报告，现实两个线程组饿报告结果</view>
				</view>
				<view class="psg-image">
					<img class="psgimage" src="https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500" alt="">
				</view>
			</view>
		</view> -->
		<!-- <!-- <button @click="openURL">阿牛</button> -->
		<!-- <web-view src="https://www.chongshe.cn/arc26367"></web-view> -->
	</view> 

</template>

<script>
	// import { log } from 'console'
	import MyBar from '@/components/MyNavbar.vue'
	import articles from '../../components/articles.vue'
import myhttp from '../../api/myhttp'
// import titleBar from '../../components/titleBar.vue'
	// import MyNav from '../../uni_modules/uview-ui/components/u-navbar/MyNavBar.vue'
	export default {
		components: {
			// titleBar,
			articles,
			MyBar
			// MyNav
		},
		data() {
			return {
				currentPage: 1, //当前页码
				pages: 0, //总页数
				totalCount: 0, //总条数
				status: '',
				pageSize: 4, //一个个数
				articlelist: [],
				// src:"../static/icon/index/xiaomaochushou.png",
				// src2:"../static/icon/index/wenzhen.png",
				// src3:"../static/icon/index/renzhen.png",
				keyword:'',
				list3: [{
					image: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201705%2F04%2F20170504162516_rMfES.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1688777125&t=7b8005fe497451a3b16e17ccbad0e6d4',
					title: '您的爱宠经常翻家吗',
				}, {
					image: 'https://petweb1-1253856731.cos.ap-beijing.myqcloud.com/uploads/20210318/9ffc1f2a46e16015d87c164fe0205adb.cdn.sohucs.com_images_20171213_171def574b114c7e97f3dae63377002d.jpeg&refer=http___5b0988e595225.cdn.sohucs.jpg',
					title: '如何为爱宠平衡营养，'
				}, {
					image: 'https://img.zcool.cn/community/01299f5541b018000001e78c01448b.jpg@3000w_1l_0o_100sh.jpg',
					title: '狗狗心情不好？'
				}],
				title1: "问医生",
				
				title2:"推荐文章",
				
				page1:1,
				page2:2,
				adoptData:[]
			}
		},
		onLoad() {
			
		},
		onShow(){
			// document.body.style.overflow = "auto";
		},
		methods: {
			goPage(){
				
					uni.navigateTo({
						url:'/pages/zadopt/adoptpage'
					})
				
				
			},
			// 获取文章列表
			loadarticles: function() {
				myhttp.get('/articles/list/' + this.currentPage + '/' + this.pageSize).then(res => {
					console.log(res.data.total, 'res.data.records');
					if (res.resultCode == 200) {
						res.data.records.forEach(e => {
							this.articlelist.push(e)
						})
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
			
			},
			// 跳转URL
			// openURL() {
			// 	// id 1      url:''      image
			// 	// #ifdef APP-PLUS
			// 	plus.runtime.openURL('https://baijiahao.baidu.com/s?id=1763635443424664321&wfr=spider&for=pc')
			
			// 	console.log(1)
			// 	// #endif
			// 	// #ifdef H5
			// 	window.open('https://baijiahao.baidu.com/s?id=1763635443424664321&wfr=spider&for=pc')
			// 	console.log(2)
			// 	// #endif
			// },
			getadoptCenter(){
				myhttp.get('/users/pets/Adopt/AdoptListSift').then(({data})=>{
					
					this.adoptData=data.slice(0, 2)
					this.adoptData.forEach((item) => {
						item.image = 'http://10.23.83.140:8080' + item.image;})
					console.log(this.adoptData,'adoptData');
				})
			}
		},
		mounted:function(){
			this.getadoptCenter(),
			this.loadarticles()
		},
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
			}, 3000)
		}
	}
</script>

<style scoped lang="scss">
@import 'index.scss';
</style>
