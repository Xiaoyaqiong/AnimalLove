<template>
	<view class="titleBar">
		<u-row justify="space-between" gutter="10">
			<u-col span="1">
				<u-icon :name="name" size="1.5rem"></u-icon>
			</u-col>
			<u-col span="9">
				<view class="title">
					{{title}}
				</view>
			</u-col>
			<u-col span="3">
				<view data-control="control" :data-page="page" @click="goPage($event)" :class="control?'action':'none'">
					<text class="more">更多</text>
					<u-icon name="arrow-right" color="#2979ff" size="1.5rem"></u-icon>
				</view>
			</u-col>
		</u-row>
	</view>
	
</template>

<script>
	export default {
		data(){
			return{
				// page:"哈哈哈"
			}
		},
		props: {
			title: {
				type: String, //定义属性类型
				default: "宠物领养", //属性的默认值
			},
			name: {
				type: String, //定义属性类型
				default: "level", //属性的默认值
			},
			control: {
				type: Boolean,
				default: true
			},
			page:{
				typeof:Number,
				default: 0,
			}
		},
		methods:{
			goPage(e){
				let page=e.currentTarget.dataset.page
				if(page==1){
					console.log(page);
					uni.navigateTo({
						url:'/pages/zadopt/zadopt'
					})
				}else{
					console.log(page);
					uni.navigateTo({
						url:'/pages/askdoc/askdoc'
					})
				}
				
			}
		},
		
	}
</script>

<style>
	.titleBar{
		margin-top: 1.25rem;
	}
	.title {
		font-size: 1rem;
		font-weight: bold;
	}

	.action {
		display: flex;
	}

	.none {
		display: none;
	}

	.more {
		font-size: 0.875rem;
	}
</style>
