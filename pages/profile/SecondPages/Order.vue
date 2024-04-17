<template>
	<view class="">
		<Mynav CenterSlot="我的订单" MyColor="#FFA500"></Mynav>
		<u-tabs :list="list1" @click="handleClick"></u-tabs>
		<view class="order-list">
		      <view v-for="(order, index) in OrderList" :key="index" class="order-item" @click="ClickOrder(index,flag)">
		        <view class="order-header">订单标题:{{ order.title }}</view>
		        <view class="order-contact">联系方式: {{ order.phone }}</view>
		        <view class="order-fee">费用: {{ order.price }} 元</view>
		        <view class="order-time">创建时间: {{order.createTime}}</view>
		      </view>
		    </view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import myhttp from '../../../api/myhttp.js'
	export default{
		data(){
			return{
				list1:[{name:'发布的单子'},{name:'接受的单子'}],
				OrderList:[],
				flag:0
			}
		},
		components: {
			Mynav
		},
		methods: {
		    handleClick(item) {
		      this.flag = item.index;
		      console.log(item.index);
		      this.getOrder(this.flag+1); // 调用getOrder方法更新当前显示的订单列表
		    },
		    getOrder(type) {
		      myhttp.get('/petOrder/orders/getOrders?type=' + type).then((res) => {
		        this.OrderList = res.data.map(item => {
			        const createTime = new Date(item.createTime).toISOString().split("T")[0];
			        return { ...item, createTime };
			      });;
		      });
		    },
			// 订单信息
			ClickOrder(index,flag){
				flag=this.flag
				const order = this.OrderList[index]
				const orderId = order.id
				uni.navigateTo({
					url:'/pages/sameCity/SecondPages/OrderDetail?orderId='+orderId+'&source=pageB'
				})
			},
		  },
		  mounted() {
		    this.getOrder(this.flag+1); // 组件加载时获取默认类型的订单列表
		  },
		
	}
</script>

<style>
	.order-list {
	  /* margin-top: 10px; */
	   background-color: #f5f5f5;
	  padding: 15px;
	}
	
	.order-item {
	  border-radius: 5px;
	  background-color: #fff;
	  margin-bottom: 10px;
	  padding: 10px;
	  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.10);
	}
	
	.order-header {
	  font-weight: bold;
	  margin-bottom: 10px;
	  font-size: 16px;
	  color: #333;
	}
	
	.order-contact,
	.order-fee,
	.order-time {
	  margin-bottom: 5px;
	  font-size: 14px;
	  color: #555;
	}
	
</style>
