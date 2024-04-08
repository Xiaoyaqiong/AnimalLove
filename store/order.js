import  myhttp  from '@/api/myhttp.js'
export default{
	state:{
		orderDetail:{},
		index:0
	},
	mutations:{
		updateIndex(state,payload){
			state.index = payload.index
		},
		getOrderDtetail(){
			myhttp.get('/petOrder/orders/getOrders').then(res=>{
				
			})
		}
	}
}