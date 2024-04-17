<template>
	<view class="container">
		<Mynav CenterSlot="发布订单" MyColor="#FFB600"></Mynav>
		<view  class="form-wrapper">
			<u-form :model="OrderModel">
				<u-form-item label="订单标题:" prop="OrderModel.title" >
				<u-input v-model="OrderModel.title" border="bottom" placeholder="请输入订单标题"></u-input>
				</u-form-item>
				<u-form-item label="订单描述:" prop="OrderModel.reson" >
				<u-input v-model="OrderModel.reson" border="bottom" placeholder="添加订单描述"></u-input>
				</u-form-item>
				<u-form-item label="订单地址:" prop="OrderModel.address">
				<u-input v-model="OrderModel.address" border="bottom" placeholder="填写订单地址"></u-input>
				</u-form-item>
				<u-form-item label="联系方式:" prop="OrderModel.phone">
				<u-input v-model="OrderModel.phone" border="bottom" placeholder="填写联系方式(电话号码)"></u-input>
				</u-form-item>
				<u-form-item label="价格:" prop="OrderModel.price">
				<u-input v-model="OrderModel.price" border="bottom" placeholder="请输入预期能支付的金额(元)"></u-input>
				</u-form-item>
				<u-form-item>
					<u-button @tap="showModal">提交</u-button>
				</u-form-item>
			</u-form>
		</view>
	</view>
</template>

<script>
	import Mynav from '@/components/Mynav.vue'
	import myhttp from '../../../api/myhttp.js';
	export default {
		data(){
			return{
				OrderModel: {
								title:'',
								reson:'',
								address:'',
								phone:'',
								price:''
							},
			}
		},
		methods:{
			// submitOrder:function(e){
			// 	setTimeout(()=>{
					
			// 	},1000)
			// 	setTimeout(()=>{
			// 		this.goBackToorder()
			// 	},2000)
			// },
			submitOrder(){
				let orderobject={
					"title":this.OrderModel.title,
					 "reason":this.OrderModel.reson,
					 "address":this.OrderModel.address,
					 "phone":this.OrderModel.phone,
					"price":this.OrderModel.price
				}
				myhttp.post('/petOrder/orders/createOrder',orderobject).then(res=>{
					uni.showToast({
						title:res.msg
					})
				})
			},
			goBackToorder() {
				
				uni.navigateBack({
					delta: 1
				})
			},
			// 弹出是否发布框
			showModal() {
			        uni.showModal({
			          title: '提示',
			          content: '是否确认提交?',
			          success: (res) => {
			            if (res.confirm) {
							this.submitOrder()
							setTimeout(()=>{
								this.goBackToorder();
							},2000)
			            } else if (res.cancel) {
			              console.log('用户点击取消');
			            }
			          }
			        });
					}
		},
		
		components: {
			Mynav
		},
	}
</script>

<style>
	.cu-bar {
			/* min-height: 50px; */
			/* margin-top: 20px; */
			// background-color: #FFB600;
			padding: 10rpx 20rpx;
		}
	        .container {
	                    display: flex;
	                    flex-direction: column;
	                    align-items: center;
	                    padding: 20px;
	                }
	        
	                .form-wrapper {
	                    background-color: #ffffff;
	                    border-radius: 10px;
	                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	                    padding: 20px;
	                    width: 100%;
	                    max-width: 480px;
	                }
	        
	                .u-form-item {
	                    margin-bottom: 15px;
	                }
	        
	                .u-form-item label {
	                    display: block;
	                    font-weight: 700;
	                    font-size: 14px;
	                    margin-bottom: 5px;
	                }
	        
	                .u-input {
	                    font-size: 16px;
	                    padding: 8px;
	                    border-top: none;
	                    border-left: none;
	                    border-right: none;
	                    border-bottom: 2px solid #ccc;
	                    outline: none;
	                    transition: border-color 0.3s ease-in-out;
	                }
	        
	                .u-input:focus {
	                    border-color: #FFB600;
	                }
	        
	                .u-button {
	                    background-color: #FFB600;
	                    color: #ffffff;
	                    font-size: 18px;
	                    padding: 12px 24px;
	                    border-radius: 4px;
	                    cursor: pointer;
	                    transition: background-color 0.3s ease-in-out;
	                }
	        
	                .u-button:hover {
	                    background-color: #FFB600;
	                }

</style>