import baseUrl from '@/api/config.js'
import  myhttp  from '@/api/myhttp.js'
export default{
	state:{
		username:'小黄',
		age:'1岁以内',
		level:'3级铲屎官',
		avatar:'',
		email:'',
		phone:'未设置'
		
	},
	mutations:{
		// 获取用户信息
		getUserInfo(state,payload)
		{
			if(payload==null){
				myhttp.get('/users/getUser').then(res=>{
					console.log(res)
					state.username = res.userName
					state.avatar = res.avatar
					state.level = res.level + '级铲屎官'
					state.email = res.email
				})
			}else{
				state.username = payload.userName
				state.avatar = payload.avatar
				state.level = payload.level + '级铲屎官'
			}
			
		
			
			
		}
	}
}