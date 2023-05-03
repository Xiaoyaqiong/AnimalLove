<template>
	<view>
		<view>
			<u-navbar title="领养中心" titleStyle="color:#FFFFFF" :safeAreaInsetTop="true" :bgColor="$topicColor" :is-fixed="true">
				<view class="u-nav-slot" slot="left" >
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
			<view class="adoptList">
				<custom-waterfalls-flow :value="data.list">

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
			<uni-fab @fabClick="fabClick" :popMenu="false" horizontal="right"></uni-fab>
			<!-- <button @click="test">按钮</button> -->
		</view>
	</view>
</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	export default {
		data() {
			return {
				data: {
					list: [{
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
				},
				currentCity: '广州市',
				//待筛序列
				animal: [{
						name: "小美",
						age: 'val_2_1',
						addr: "汕头市"
					},
					{
						name: "小白",
						age: 'val_2_1',
						addr: "汕头市"
					},
					{
						name: "小绿",
						age: 'val_2_2',
						addr: "广州市"
					},
					{
						name: "小白",
						age: 'val_2_2',
						addr: "广州市"
					}
				],
				//选中筛选条件
				filterResult: '',
				//未选中筛选条件
				menuList: [{
						'title': '菜单1',
						'value': 0,
						'isShow': true,
						'key': 'key_1',
						'detailList': [{
								'title': '小美',
								'value': '小美',
								'isSelect': false
							},
							{
								'title': '小美2',
								'value': '小美',
								'isSelect': false
							},
							{
								'title': '小美3',
								'value': '小美',
								'isSelect': false
							},
							{
								'title': '小美4',
								'value': '小美',
								'isSelect': false
							},
							{
								'title': '小白',
								'value': '小白',
								'isSelect': false
							},
							{
								'title': '小绿',
								'value': '小绿',
								'isSelect': false
							}
						]
					},
					{
						'title': '菜单2',
						'value': 1,
						'key': 'key_2',
						'isShow': false,
						'detailList': [{
								'title': '我是菜单2的',
								'value': '222',
								'isSelect': false
							},
							{
								'title': 1,
								'value': 'val_2_1',
								'isSelect': false
							},
							{
								'title': 2,
								'value': 'val_2_2',
								'isSelect': false
							}
						]
					},
					{
						'title': '菜单2',
						'value': 1,
						'key': 'key_2',
						'isShow': false,
						'detailList': [{
								'title': '我是菜单2的',
								'value': '222',
								'isSelect': false
							},
							{
								'title': 1,
								'value': 'val_2_1',
								'isSelect': false
							},
							{
								'title': 2,
								'value': 'val_2_2',
								'isSelect': false
							}
						]
					},
					{
						'title': '菜单3',
						'value': 2,
						'key': 'key_3',
						'isShow': false,
						'detailList': [{
								'title': '我是菜单3的',
								'value': 'val_3_1',
								'isSelect': false
							},
							{
								'title': '广州市',
								'value': '广州市',
								'isSelect': false
							},
							{
								'title': '汕头市',
								'value': '汕头市',
								'isSelect': false
							}
						]
					}
				],

			};
		},
		reset() {
			this.data.list = [{
				image: 'https://via.placeholder.com/200x500.png/ff0000',
				title: '我是标题1',
				desc: '描述描述描述描述描述描述描述描述1'
			}]
			this.$refs.waterfallsFlowRef.refresh();
		},
		components: {
			slFilter
		},
		onLoad() {
			// this.stop()
		},
		methods: {
			goBackIndex(){
				uni.switchTab({
					url:"/pages/index/index"
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
				console.log(this.filterResult, 'json');
			}
		},
		computed: {
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
