<template>
	<view class="">
		<view class="">
			<!-- <view class="status_bar" style="height: var(--status-bar-height); width: 100%;"></view>
			<Mynav CenterSlot="领养中心" :MyColor="$topicColor" :backInfo="goBackIndex"></Mynav> -->
			<slFilter :menuList="menuList" @result="result" :currentCity="currentCity"></slFilter>
			<button @click="thisAsyncIncrement"  class="choose">点击筛选您喜欢的小可爱哟~</button>
			<pp-waterfall-flow :value="$store.state.adopt.adoptList" :gap="20" :columns="2" :padding="30" :itemBR="12" imageBR="10rpx"></pp-waterfall-flow>
			        <!-- <uni-load-more :status="status"></uni-load-more> -->
			<uni-fab @fabClick="add()" :popMenu="false" horizontal="right"></uni-fab>
		</view>
	</view>
</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	import myhttp from '../../api/myhttp.js'
	import moment from 'moment'
	import Mynav from '@/components/Mynav.vue'
	export default {
		data() {
			return {
				currentCity: '广州市',
				filterResult: '',
				//未选中筛选条件
				menuList: [
					{
						'title': '种类',
						'value': 0,
						'isShow': true,
						'key': 'petVariety',
						'detailList': [
						    {
							  "title":"喵喵",
						      "value": 1,
							  'isSelect': false
						    },
						    {
						      "title":"汪汪",
						      "value": 2,
						      'isSelect': false
						    },
						    {
						      "title":"其他",
						      "value": 3,
						      'isSelect': false
						    }
						  ],
					},
					{
						'title': '性别',
						'value': 1,
						'key': 'petGender',
						'isShow': false,
						"detailList":[
						    {
						      "title":"男",
						      "value": 0,
						      'isSelect': false
						    },
						    {
						     "title":"女",
						     "value": 1,
						     'isSelect': false
						    }
						  ],
					},
					{
						'title': '年龄',
						'value': 2,
						'key': "petAge" ,
						'isShow': false,
						"detailList": [
						    {
						     "title":"0~3个月",
						     "value": "0~3个月",
						     'isSelect': false
						    },
						    {
						      "title":"0~1岁",
						      "value": "0~1岁",
						      'isSelect': false
						    },
						    {
						      "title":"1~3岁",
						      "value": "1~3岁",
						      'isSelect': false
						    },
							{
							  "title":"3岁以上",
							  "value": "3岁以上",
							  'isSelect': false
							},
						  ]
					}
				],
				
				adoptList:[]
			}
		},
		components: {
			slFilter,
				Mynav
		},
		onLoad() {
			this.$store.state.adopt.filterList={}
			this.thisAsyncIncrement()
		},
		methods: {
			// goBackIndex() {
			// 	uni.switchTab({
			// 		url: "/pages/index/index"
			// 	})
			// },
			add(){
				let flag=false
				uni.navigateTo({
					url: '/pages/zadopt/setup?flag='+encodeURI(flag)
				})
			},
			thisAsyncIncrement() {
				this.$store.state.adopt.adoptList=[]
				this.$store.dispatch('getArticles')
			},
			result(val) {
				this.filterResult = JSON.stringify(val, null, 2)
				this.filterResult = JSON.parse(this.filterResult);
				// console.log(this.filterResult, 'json');
				this.$store.commit("changeFilterList",this.filterResult)
				console.log(this.$store.state.adopt.filterList,'filterList');
			}
		}

	}
</script>
<style>
	.choose{
		background-color:rgb(255, 240, 209);
		color:gray;
		font-size: 0.8rem;
	}
</style>