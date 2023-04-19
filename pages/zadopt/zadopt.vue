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
			<!-- <slFilter :menuList="menuList" @result="result"></slFilter> -->
			<u-tabs bg-color="#fafafa" :bold="true" :active-color="{ color: '#303133' }" :list="list" @change="change"
				:current="current" :scrollable="false"></u-tabs>
			<view class="father" v-for="(detailitem,index) in menuList">
				<view :key="index" :style="maskview" class="maskview">
					<view class="select-city">
						<text>选择城市</text>
						<view class="current-city">
							<text>当前定位:{{city}}</text>
							<u-icon name="map" size="1.5rem"></u-icon>
						</view>
					</view>
					<view class="tag-info">
						<view v-for="(item,index) in menudetail" :key="index" @click="selectItem(item)" class="tag">
							{{item.title}}

						</view>

					</view>
				</view>

			</view>


			<view class="test">
				<view class="" v-for="(item,index) in selectContent" :key="index">
					<text>{{item.name}}</text>
					<text>{{item.age}}</text>
					<text>{{item.addr}}</text>
				</view>
			</view>

<slFilter :menuList="menuList" @result="result"></slFilter>




		</view>
	</view>
</template>

<script>
	import slFilter from '../../components/songlazy-sl-filter/sl-filter/sl-filter.vue';
	export default {
		data() {
			return {
				pagedata: 0,
				maskview: {
					'z-index': 1
				},
				control: false,
				animal: [{
						name: "小美",
						age: 1,
						addr: "汕头市"
					},
					{
						name: "小白",
						age: 1,
						addr: "汕头市"
					},
					{
						name: "小绿",
						age: 2,
						addr: "广州市"
					},
					{
						name: "小白",
						age: 2,
						addr: "广州市"
					}
				],
				filterResult: '',
				selectList: {
					name: [],
					age: [],
					addr: []
				},
				menuList: [{
						'title': '菜单1',
						'value': 0,
						'isShow': true,
						'key': 'key_1',
						'detailList': [{
								'title': '小美',
								'value': '',
								'isSelect': false
							},
							{
								'title': '小白',
								'value': 'val_1_1',
								'isSelect': false
							},
							{
								'title': '小绿',
								'value': 'val_1_2',
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
								'value': '',
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
								'value': 'val_3_2',
								'isSelect': false
							},
							{
								'title': '汕头市',
								'value': 'val_3_3',
								'isSelect': false
							}
						]
					}
				],
				list: [],
				//默认展开第几项
				current: 0,
				show: false, //是否显示
				city: "太原市",

			};
		},
		components: {
			slFilter
		},
		onLoad() {
			this.loadingList()
			console.log(this.menudetail);
			console.log(this.selectContent);

		},
		methods: {
			selectItem(item) {
				item.isSelect = !item.isSelect
				if (this.current == 0) {
					this.selectList.name.push(item.title)
				} else if (this.current == 1) {
					this.selectList.age.push(item.title)
				} else {
					this.selectList.addr.push(item.title)
				}


			},
			loadingList() {
				for (let i = 0; i < this.menuList.length; i++) {
					this.list.push({
						name: this.menuList[i].title
					})
				}

			},
			change(index) {
				// let currentshow;
				// for(var i=0;i<this.menuList.length;i++){
				// 	currentshow=this.menuList[1].isShow
				// }
				// console.log(currentshow);
				this.current = index.index
				this.pagedata = this.current
				console.log(this.current);

				// if (this.current == 0) {

				// } else {
				// 	// this.show = false;
				// }

				for (var i = 0; i < this.menuList.length; i++) {
					// if(this.current!=0){
					// 	this.menuList[i].isShow=!this.menuList[i].isShow

					// }else{
					// 	this.menuList[i].isShow=!this.menuList[i].isShow
					// }
				}
			},
			result(val) {
				console.log('filter_result:' + JSON.stringify(val));
				// this.filterResult = JSON.stringify(val, null, 2)
				JSON.stringify()
			}
		},
		computed: {
			menudetail() {
				for (var i = 0; i < this.menuList.length; i++) {
					if (this.pagedata == i) {
						return this.menuList[i].detailList;
					}
				}
			},
			selectContent() {
				let animalcopy = this.animal
				let setanimal
				let newsetanimal
				// for(var i=0;i<this.animal.length;i++){
				// 	for(var key in i){
				// 		console.log('key'+i[key]);
				// 		// setanimal.push(animalcopy[key]) 
				// 	}
				// }
				// setanimal=this.animal.map(item=>{
				//         let curKey = Object.keys(item) //Object.keys可以提取出对象中的key值,注意取出的key是数组
				//         return item[curKey[0]]
				//     })
				// console.log('我是computed');
				function unique(arr) {
					for (let i = 0; i < arr.length; i++) {
						for (let j = i + 1; j < arr.length; j++) {
							if (arr[i] == arr[j]) {
								arr.splice(j, 1);
								j--;
							}
						}
					}
					return arr;
				}
				for (var key in this.selectList) {
					
					for (var i = 0; i < this.selectList[key].length; i++) {
						
						unique(this.selectList[key])
						setanimal= animalcopy.filter((item) => {
							return item.name == this.selectList[key][i]
						})
						
					}
					
					// setanimal.push(setanimal,'SET')
				}
				// for(var j=0;j<this.selectList.length;j++){
				// 	// console.log('我是computed');
				// 	setanimal=animalcopy.filter((item)=>{
				// 		return item.name==this.selectList[0]
				// 				&&item.age==this.selectList[1]

				// 	})
				// }
				console.log(newsetanimal,'set');
				// console.log('setanimal'+setanimal);
				return newsetanimal
			}

		}

	}
</script>

<style>
	.test {
		margin-top: 200px;
	}

	.maskview2 {
		position: absolute;
		width: 100%;
		height: auto;
		padding: 0.5rem;
		background: pink;
		/* opacity: 1; */
		/* overflow-x: hidden; */
		z-index: 0;
	}

	.tag {
		/* margin: 0.9rem; */
		width: 100px;
		height: 34px;
		background: #f0f0f0;
		border-radius: 21px;
		font-size: 14px;
		text-align: CENTER;
		color: #333333;
		line-height: 34px;
	}

	/* .tag-info {
		display: flex;
		flex-wrap: wrap;
	} */
	.tag-info {
		display: flex;
		margin: 1.3rem;
		flex-wrap: wrap;
	}

	.select-city {
		display: flex;
		margin: 1.25rem 0 0 0.625rem;
	}

	.current-city {
		display: flex;
		margin-left: 2.8rem;
	}

	.down-part {
		margin-top: 50px;
	}

	.father {
		position: relative;
	}

	.maskview {
		position: absolute;
		width: 100%;
		height: auto;
		padding: 0.5rem;
		background: gray;
		/* opacity: 1; */
		/* overflow-x: hidden; */
		/* z-index: 1; */
	}

	.maskview-item {}
</style>
