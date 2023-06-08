<template>
	<view>
		<view>
			<u-navbar title="动态" titleStyle="color:#FFFFFF" :safeAreaInsetTop="true" :bgColor="$topicColor"
				:is-fixed="true">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" size="19" color="#FFFFFF" @click="goBackIndex"></u-icon>
				</view>
			</u-navbar>
		</view>
		<view class="down-part">
			<slFilter :menuList="menuList" @result="result" :currentCity="currentCity"></slFilter>
			<!-- <view class="test">
				<view class="" v-for="(item,index) in selectContent" :key="index">
					<text>{{item.name}}</text>
					<text>{{item.age}}</text>
					<text>{{item.addr}}</text>
				</view>
			</view> -->
			<button @click="thisAsyncIncrement" >按钮adoptlist</button>

			<view class="adoptList">
				<custom-waterfalls-flow ref="waterfallsFlowRef" :value="Obj" @imageClick="gotoDetail()">

					<!-- #ifndef MP-WEIXIN -->
					<template v-slot:default="item">
						<view class="item">
							<view class="title">{{item.title}}</view>
							<view class="desc">
								<text>{{item.petVariety}}|{{item.ageYear}}</text>
								<text>{{item.registrationTime}}</text>
							</view>
						</view>
					</template>
					<!-- #endif -->
				</custom-waterfalls-flow>
			</view>
			<uni-fab @fabClick="fabClick" :popMenu="false" horizontal="right"></uni-fab>
			<!-- <button @click="test">按钮</button> -->
		</view>
	</view>
</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	import myhttp from '../../api/myhttp.js'
	import moment from 'moment';
import { combine } from 'qs/lib/utils';
	export default {
		data() {
			return {
				adoptList1: [],
				currentCity: '广州市',
				//选中筛选条件
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
				
				
			};
		},
		reset() {
			
		},
		components: {
			slFilter
		},
		onMounted(){
			// this.adoptList()
			
		},
		
		onLoad() {
			// this.stop()
			// this.adoptList()
			this.thisAsyncIncrement()
		},
		onShow() {
			// console.log(this.$store.state.adopt.adoptList,'store');
		},
		watch: {
		    Obj(newVal,oldVal){
				this.$store.state.adopt.adoptList=newVal
				console.log(newVal,'newVAL');
				return newVal
			}
		},
		methods: {
			thisAsyncIncrement() {
				this.$store.dispatch('getArticles')
				this.$refs.waterfallsFlowRef
			},
			// 跳转领养详情
			gotoDetail() {
				uni.navigateTo({
					url: '/pages/zadopt/petdetail'
				})
			},
			// 领养信息
			// adoptList(){
			// 	this.$store.dispatch('getArticles')
			// },
			
			// 2023-05-23T08:34:18.000+00:00
			
			// adoptList() {
			// 	this.$store.getters.getadoptList
			// 	// let that = this
			// 	// myhttp.get('/users/pets/Adopt/AdoptListSift').then(res => {
			// 	// 	that.adoptList1 = res.data
			// 	// 	that.adoptList1.forEach((item) => {
			// 	// 		item.image = 'http://10.23.83.140:8080' + item.image;
			// 	// 		if (moment(item.registrationTime, 'YYYYMMDDTHH:mm:ss.SSS+Z ZZ').fromNow().match(
			// 	// 				/hour/) == null) {
			// 	// 			item.registrationTime = moment(item.registrationTime,
			// 	// 				'YYYYMMDDTHH:mm:ss.SSS+Z ZZ').fromNow().replace(/[^0-9]/g, "") + "天前"
			// 	// 		} else {
			// 	// 			item.registrationTime = moment(item.registrationTime,
			// 	// 				'YYYYMMDDTHH:mm:ss.SSS+Z ZZ').fromNow().replace(/[^0-9]/g, "") + "小时前"
			// 	// 		}

			// 	// 	})
			// 	// })
			// 	// console.log(that.adoptList1, 'res');
			// },
			gotoDetail() {
				uni.navigateTo({
					url: '/pages/zadopt/petdetail'
				})
			},
			goBackIndex() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			fabClick() {
				console.log('fan');
				uni.navigateTo({

					url: 'setup'
				})
			},
			test() {
				console.log(this.selectContent);
			},
			result(val) {
				this.filterResult = JSON.stringify(val, null, 2)
				this.filterResult = JSON.parse(this.filterResult);
				// console.log(this.filterResult, 'json');
				this.$store.commit("changeFilterList",this.filterResult)
				console.log(this.$store.state.adopt.filterList,'filterList');
			}
		},
		computed: {
			Obj(){
				console.log(this.$store.state.adopt.adoptList,'obj');
				return this.$store.state.adopt.adoptList
			},
			// adoptList(){
			// 	this.$store.getters.getadoptList
			// },

			selectContent() {
				let filterResultArr = [] // 最终过滤结果
				let filterResultCopy = this.filterResult
				let animalCopy = this.animal
				let NameFilter = [] // 桥梁名称过滤结果
				let numberFilter = [] // 桥梁类型过滤结果
				let addrFilter = [] // 桥梁分类过滤结果

				if (animalCopy.length > 0) { // 项目下桥梁列表不为空
					filterResultArr = animalCopy
					for (var key in filterResultCopy) {
						if (filterResultCopy["key_1"].length == 0 &&
							filterResultCopy["key_2"].length == 0 &&
							filterResultCopy["key_3"].length == 0) {
							filterResultArr = animalCopy
						} else {
							if (filterResultCopy["key_1"]) { // 桥梁名称有值
								NameFilter = filterResultArr.filter(item => {
									return filterResultCopy["key_1"].some(ele => ele == item.name)
								})
								filterResultArr = NameFilter
							}
							if (filterResultArr.length > 0 && filterResultCopy["key_2"].length > 0) { // 桥梁类型有值
								numberFilter = filterResultArr.filter(item => {
									return filterResultCopy["key_2"].some(ele => ele == item.age)

								})
								filterResultArr = numberFilter
							}
							if (filterResultArr.length > 0 && filterResultCopy["key_3"].length > 0) { // 桥梁分类有值
								addrFilter = filterResultArr.filter(item => {
									return filterResultCopy["key_3"].some(ele => ele == item.addr)
								})
								filterResultArr = addrFilter
							}
						}

					}
				}

				// 返回最终过滤结果
				return filterResultArr


			}

		}

	}
</script>

<style lang="scss">
	.adoptList {
		margin: 0px 22px;
	}

	.title {

		font-size: 16px;

		margin-top: 8px;

	}

	.desc {
		margin: 8px 0px;
		font-size: 14px;
		display: flex;
		justify-content: space-between;
		color: #8B8B8B;
	}

	.test {
		margin-top: 200px;
	}

	.down-part {
		margin-top: 50px;
	}
</style>
