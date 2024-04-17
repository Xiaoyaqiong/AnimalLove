<template>
	<view class="">
		<Mynav CenterSlot="订单详情" MyColor="#FFB600"></Mynav>
		<view class="order-details">
		    <view class="order-info">
		      <view class="order-item" v-for="(item, index) in orderItems" :key="index">
		        <text class="label">{{ item.label }}：</text>
		        <text>{{ item.value }}</text>
		      </view>
		    </view>
		    <u-button @click="TakeOrderTip()" :disabled="isDisabled" class="take-order-btn">{{statusText}}</u-button>
		  </view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import myhttp from '../../../api/myhttp.js';
	export default{
		data() {
		    return {
		      order: {
		        
		      },
			  orderId:null,
			  orderUser:null,
			  statusText:'待接单中',
			  isDisabled:false,
			  takeOrderId:null,
			  orderList:[],
			  orderItem:{},
			  status:null
		    }
		  },
		   computed: {
		        orderItems() {
		          return [
					{ label: '订单标题', value: this.order.title },
		            { label: '订单描述', value: this.order.reason },
		            { label: '地址', value: this.order.address },
		            { label: '联系方式', value: this.order.phone },
		            { label: '价格', value: this.order.price+'元' },
		            { label: '发单人创建时间', value: this.order.createTime }
		          ];
		        }
		      },
		methods:{
			TakeOrder(){
				let takeOrderId={
					"id":this.takeOrderId
				}
				myhttp.post('/petOrder/orders/receiveOrder',takeOrderId).then(res=>{
					if (res.message === '宠物订单不存在') {
					  uni.showToast({
					    title: '这是自发的单子不能自接哦',
					    icon: 'none'
					  });
					} else {
					  uni.showToast({
					    title: '接单成功，可在个人中心查看详情哦',
					    icon: 'success'
					  });
					  setTimeout(() => {
					                  uni.navigateBack({
					                      delta: 1
					                  });
						}, 2000); 
					}
				})
			},
			TakeOrderTip(){
				console.log('myorder',this.takeOrderId)
				uni.showModal({
				      title: '提示',
				      content: '是否确认接单?',
				      success: (res) => {
				        if (res.confirm) {
				          // 模拟获取服务器返回的数据，实际应用中需要根据实际情况获取
						  this.TakeOrder()
				        } else if (res.cancel) {
				          console.log('用户点击取消');
				        }
				      }
				    });
			},
		},
		async created() {
			try{
				const res1=await myhttp.get('/petOrder/orders/getOrders');
				this.orderList = res1.data;
				let orderItem={}
				// this.status=null
				for (orderItem of this.orderList) {
				  if (orderItem.id == this.orderId) {
				    this.order=orderItem
					this.order.createTime = new Date(this.order.createTime).toISOString().split("T")[0];
					this.status=this.order.status
					this.takeOrderId=this.order.id
					this.orderUser=this.order.userId
				  }
				  console.log('1146',this.order);
				}
				// this.order=res1.data[this.orderId]
				
				// this.order.createTime = new Date(this.order.createTime).toISOString().split("T")[0];
				// for (const orderItem of orderList) {
				//   if (orderItem.id === this.orderId) {
				//     this.order=orderItem
				// 	this.order.createTime = new Date(this.order.createTime).toISOString().split("T")[0];
				//   }
				// }
				// console.log('127',order);
				// const status=this.order.status
				// this.takeOrderId=this.order.id
				// this.orderUser=this.order.userId
				// this.order.createTime = new Date(this.order.createTime).toISOString().split("T")[0];
				
				
				
				const res2=await myhttp.get('/users/getUser');
				if(this.status==1){
					if(res2.id==this.orderUser){
						console.log('isDisabled',this.isDisabled);
						this.statusText='待接单中...'
						this.isDisabled=true
					}else{
						console.log('isDisabled2',this.isDisabled);
						this.statusText='接单'
						this.isDisabled=false
					}
				}else if(this.status==2){
					this.statusText='已被接单'
					this.isDisabled=true
				}
			}catch(error){
				console.error(error);
			}
		  
		},
		onLoad(options) {
			if (options.source === 'pageA') {
							// this.showTakeOrderBtn = true;
						} else if (options.source === 'pageB') {
							// this.showTakeOrderBtn = false;
							}
			this.orderId = options.orderId; 
			// console.log('1129',this.orderId);
			// // const orderList=[]
			// // myhttp.get('/petOrder/orders/getOrders').then(res=>{orderList=res.data})
			// myhttp.get('/petOrder/orders/getOrders').then(res => {
			// 	this.orderList=res.data
			// 	console.log('0049',this.orderList.length);
			// 	let orderItem={}
			// 	for (orderItem of this.orderList) {
			// 	  if (orderItem.id == this.orderId) {
			// 	    this.order=orderItem
			// 		this.order.createTime = new Date(this.order.createTime).toISOString().split("T")[0];
			// 	  }
			// 	  console.log('1146',this.order.id);
			// 	}
			// });
			
			// const orderList = res.data;
			
			
			// console.log('127',orderItem);
			// const status=this.order.status
			// this.takeOrderId=this.order.id
			// this.orderUser=this.order.userId
		},
		components: {
			Mynav
		},
	}
</script>

<style>
	page {
	  background-color: #f5f5f5;
	}
	
	.order-details {
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  padding: 15px;
	  width: 90%; /* 限制宽度，避免在小屏幕上过于拥挤 */
	  max-width: 600px; /* 设定最大宽度 */
	}
	
	.order-info {
	  display: flex;
	  flex-direction: column;
	  width: 100%;
	  background-color: #fff;
	  margin-bottom: 20px;
	  border-radius: 10px;
	  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
	  padding: 15px; /* 为信息容器添加内边距 */
	}
	
	.order-item {
	  display: flex;
	  justify-content: space-between;
	  padding: 10px 0; /* 顶部和底部的内边距 */
	  border-bottom: 1px solid #eee;
	}
	
	.order-item:last-child {
	  border-bottom: none;
	}
	
	.label {
	  font-weight: bold;
	  font-size: 16px;
	  color: #333;
	  flex: 1; /* 让标签占据更多空间 */
	  white-space: nowrap; /* 防止换行 */
	  overflow: hidden; /* 隐藏溢出的内容 */
	  text-overflow: ellipsis; /* 显示省略号 */
	}
	
	.value {
	  font-size: 16px;
	  color: #666;
	  flex: 2; /* 让内容占据更多空间 */
	}
	
	.take-order-btn {
	  width: 100%;
	  height: 40px;
	  line-height: 40px;
	  background-color: #FFB600; /* 按钮颜色与导航栏一致 */
	  color: #fff;
	  border-radius: 20px;
	  font-size: 16px;
	  margin-top: 15px; /* 与订单信息间隔开 */
	}
	
	/* 响应式设计 */
	@media (max-width: 768px) {
	  .order-details {
	    width: 95%; /* 在小屏幕上进一步增加宽度 */
	  }
	
	  .order-info {
	    border-radius: 8px;
	  }
	
	  .order-item {
	    flex-direction: column; /* 在小屏幕上将标签和内容堆叠显示 */
	    align-items: flex-start; /* 左对齐 */
	  }
	
	  .label {
	    margin-bottom: 5px; /* 标签与内容的间距 */
	  }
	}
</style>