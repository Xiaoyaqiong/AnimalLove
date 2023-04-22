<template>
	<view>
		<view>
			<u-navbar title="个人中心" :safeAreaInsetTop="true" :is-fixed="true">
				<view class="u-nav-slot" slot="left">
					<u-icon name="arrow-left" size="19"></u-icon>
				</view>
			</u-navbar>
		</view>
		<view class="down-part">
			<slFilter :menuList="menuList" @result="result" :currentCity="currentCity"></slFilter>
			<view class="test">
				<view class="" v-for="(item,index) in selectContent" :key="index">
					<text>{{item.name}}</text>
					<text>{{item.age}}</text>
					<text>{{item.addr}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	export default {
		data() {
			return {
				currentCity:'广州市',
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
		components: {
			slFilter
		},
		onLoad() {
			

		},
		methods: {		
			result(val) {
				this.filterResult = JSON.stringify(val, null, 2)
				    this.filterResult = JSON.parse(this.filterResult);
				    console.log(this.filterResult,'json');
			}
		},
		computed: {
			selectContent() {
				let filterResultArr = [] 
				let filterResultCopy=this.filterResult
				let animalCopy=this.animal
				
					// 最终过滤结果
					let NameFilter = [] // 桥梁名称过滤结果
					let numberFilter = [] // 桥梁类型过滤结果
					let addrFilter = [] // 桥梁分类过滤结果

					if (animalCopy.length > 0) { // 项目下桥梁列表不为空
						filterResultArr = animalCopy
						for (var key in filterResultCopy) {
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

					// 返回最终过滤结果
					return filterResultArr
				
				
			}

		}

	}
</script>

<style>
	.test {
		margin-top: 200px;
	}
	.down-part {
		margin-top: 50px;
	}
</style>
