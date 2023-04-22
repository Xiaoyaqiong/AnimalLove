<template>
	<view class="content">
		
		
		<!-- <view class="NAVBAR">
			<MyNav 
					>
					<view
					    class="u-nav-slot"
					    slot="center"
					>
					  <u-search   placeholder="请输入关键字..."  :showAction="false" v-model="keyword"></u-search>
					</view>

					<view
					    class="u-nav-slot"
					    slot="right"
					>
					<u-icon name="chat"></u-icon>
					</view>
					</MyNav>

			</view> -->
		
		<!-- 轮播 -->
		<view class="swiper">
			<view class="u-demo-block">
				<u-swiper :list="list3" keyName="image" showTitle previousMargin="76" nextMargin="92" circular
					:autoplay="false" radius="5" bgColor="#ffffff"></u-swiper>
			</view>
		</view>
		<!-- 宠物领养 -->
		<title-bar :page="page1"></title-bar>

		<view class="adopt-content">
			<u-row justify="space-between" gutter="10">
				<u-col span="6" v-for="(item,index) in adoptData" :key="index">
					<view class="animal-card">
						<view class="ani-img">
							<img class="info-img"
								src="https://img2.baidu.com/it/u=3202947311,1179654885&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500"
								alt="">
						</view>
						<view class="ani-info">
							<view class="info1">
								<text>{{item.name}}</text>
								<u-icon :name="item.sex?'man':'woman'" size="1.5rem"></u-icon>
							</view>
							<view>{{item.breed}}</view>
							<view>{{item.ageyear}}年{{item.agemonth}}月</view>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>
		<!-- 问医生 -->
		<title-bar :page="page2" :title="title1" :name="name1"></title-bar>
		<view class="doctor-content">
			<u-row justify="space-between" gutter="10">
				<u-col span="4" v-for="(item,index) in 3" :key="index">
					<view class="doctor-card">
						<view class="doctor-img">
							<u-avatar :src="src"></u-avatar>
						</view>
						<view class="doctor-name">
							<u-icon name="man" size="1.5rem"></u-icon>
							<text>张三</text>
						</view>
						<view class="doctor-skill">
							<text>猫病|</text>
							<text>从业3年</text>
						</view>
					</view>
				</u-col>
			</u-row>
		</view>

		<!-- 常见问题 -->
		<view class="question">
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
		</view>
	
		<!-- 推荐文章 -->
		<title-bar :title="title2" :name="name2" :control="false"></title-bar>
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
		</view>
		<button @click="openURL">阿牛</button>
		<!-- <web-view src="https://www.chongshe.cn/arc26367"></web-view> -->
	</view>

</template>

<script>
	// import { log } from 'console'
import myhttp from '../../api/myhttp'
import titleBar from '../../components/titleBar.vue'
	// import MyNav from '../../uni_modules/uview-ui/components/u-navbar/MyNavBar.vue'
	export default {
		components: {
			titleBar,
			// MyNav
		},
		data() {
			return {
				src:"",
				keyword:'',
				list3: [{
					image: 'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					title: '昨夜星辰昨夜风，',
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					title: '身无彩凤双飞翼，'
				}, {
					image: 'https://cdn.uviewui.com/uview/swiper/swiper3.png',
					title: '谁念西风独自凉，'
				}],
				title1: "问医生",
				name1: "photo",
				title2:"推荐文章",
				name2:"photo",
				page1:1,
				page2:2,
				adoptData:[]
			}
		},
		onLoad() {

		},
		methods: {
			// 跳转URL
			openURL() {
				// id 1      url:''      image
				// #ifdef APP-PLUS
				plus.runtime.openURL('https://baijiahao.baidu.com/s?id=1763635443424664321&wfr=spider&for=pc')
			
				console.log(1)
				// #endif
				// #ifdef H5
				window.open('https://baijiahao.baidu.com/s?id=1763635443424664321&wfr=spider&for=pc')
				console.log(2)
				// #endif
			},
			getadoptCenter(){
				myhttp.get('/adoptCenter').then(({data})=>{
					this.adoptData=data
					console.log(this.adoptData,'adoptData');
				})
			}
		},
		mounted:function(){
			this.getadoptCenter()
		}
	}
</script>

<style scoped>
	.passage-content{
		display: flex;
		width: 350px;
		height: 103px;
		background: #ffffff;
		border-radius: 12px;
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Normal;
		font-weight: normal;
		text-align: CENTER;
		color: #af8982;
		line-height: 20px;
		box-shadow: 0px 0px 1px 0px #e1e1e1; 
	}
	.psg-word{
		width: 11rem;
		margin: 0.6rem;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		
	}
	.psg-title,.psg-detail{
		overflow:hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.psg-image {
		width: 7.4rem;
		height: 4.9rem;
		border-radius: 8px;
		margin: 0.75rem 0.5rem 0.75rem 1rem;
	}
	
	.psgimage {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
	
	.title{
		font-weight: bold;
		padding: 0.5rem;
	}
	.tag{
		margin: 0.15rem;
	}
	.tag-info{
		display: flex;
		flex-wrap: wrap;
	}
	.question {
		margin: 0.75rem 0 0.75rem 0;
		/* width: 23.5rem;
		height: 6.4rem;
		background: #ffffff;
		border-radius: 12px;
		box-shadow: 0px 0px 1px 0px #e1e1e1; */
	}

	.doctor-card {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 10px 0 10px 0;
		width: 108px;
		height: 137px;
		background: #ffffff;
		border-radius: 12px;
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Normal;
		font-weight: normal;
		text-align: center;
		color: #333333;
		line-height: 20px;
		box-shadow: 0px 0px 1px 0px #e1e1e1;
	}

	.content {
		margin-top: 65px;
		margin-left: 12px;
		margin-right: 14px;
	}
	.animal-card {
		display: flex;
		width: 11.3rem;
		height: 5.8rem;
		background: #ffffff;
		border-radius: 12px;
		font-size: 14px;
		font-family: Microsoft YaHei, Microsoft YaHei-Normal;
		font-weight: normal;
		text-align: CENTER;
		color: #333333;
		line-height: 20px;
		box-shadow: 0px 0px 1px 0px #e1e1e1;
	}

	.ani-img {
		width: 5.6rem;
		height: 4.7rem;
		border-radius: 8px;
		margin: 0.5rem;
	}

	.info-img {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}

	.info1 {
		display: flex;
	}

	.ani-info {
		margin: 0.5rem 0 0.5rem 0;
		text-align: left;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.doctor-name {
		display: flex;
	}
</style>
