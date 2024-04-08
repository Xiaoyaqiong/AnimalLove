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
		    <u-button  v-if="showTakeOrderBtn" @click="TakeOrderTip()" class="take-order-btn">接单</u-button>
		  </view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import myhttp from '../../../api/myhttp.js';
	export default{
		data() {
		    return {
				showTakeOrderBtn:false,
		      order: {
		        
		      },
			  orderId:null
		    }
		  },
		   computed: {
		        orderItems() {
		          return [
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
				let orderId={
					"id":this.orderId
				}
				myhttp.post('/petOrder/orders/receiveOrder',orderId).then(res=>{
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
				console.log('myorder',this.orderId)
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
		onLoad(options) {
			if (options.source === 'pageA') {
							this.showTakeOrderBtn = true;
						} else if (options.source === 'pageB') {
							this.showTakeOrderBtn = false;}
			this.orderId = options.orderId; 
			myhttp.get('/petOrder/orders/getOrders').then(res=>{
				console.log('2355',res.data[this.orderId])
				this.order=res.data[this.orderId]
				this.order.createTime = new Date(this.order.createTime).toISOString().split("T")[0];
			})
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