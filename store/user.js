import baseUrl from '@/api/config.js'
import  myhttp  from '@/api/myhttp.js'
export default{
	state:{
		username:'小黄',
		age:'1岁以内',
		level:'3级铲屎官',
		avatar:''
		
	},
	mutations:{
		// 获取用户信息
		getUserInfo(state,payload)
		{
			console.log(payload.avatar)
			state.username = payload.userName
			state.avatar = payload.avatar
			state.level = payload.level + '级铲屎官'
			
		}
	}
}