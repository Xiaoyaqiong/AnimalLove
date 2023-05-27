import myhttp from '@/api/myhttp.js'
import moment from 'moment';
export default {
	namespaced: true,
	state: {
		adoptList: [],
		faBureturn: false,
		filterList:{}
	},
	mutations: {
		changereturn(state) {
			state.faBureturn = !state.faBureturn
		},
		changeFilterList(state,newfilterList){
			state.filterList={}
			state.filterList=newfilterList
		},
		getadoptList(state){
			let momentFlag
			myhttp.get('/users/pets/Adopt/AdoptListSift').then(res => {
				state.adoptList = res.data
				state.adoptList.forEach((item) => {
					item.image = 'http://10.23.83.140:8080' + item.image;
					momentFlag = moment(item.registrationTime, 'YYYYMMDDTHH:mm:ss.SSS+Z ZZ').fromNow()
					if (momentFlag.charAt(0) == 'a') {
						momentFlag = momentFlag.replace('a', 1)
					} 
					if (momentFlag.match(
							/hour/)) {
						item.registrationTime=momentFlag.replace(/[^0-9]/g, "") + "小时前"
					}else if(momentFlag.match(
							/day/)){
						item.registrationTime=momentFlag.replace(/[^0-9]/g, "") + "天前"
					}else if(momentFlag.match(
							/minute/)){
						item.registrationTime=momentFlag.replace(/[^0-9]/g, "") + "分钟前"
					}else{
						item.registrationTime=momentFlag.replace(/[^0-9]/g, "") + "秒前"
					}
				})
				
			})
			
		}
	},
	getters:{
		
	},
	 action:{
		 async adoptListasync({state,commit}) {
		 	await commit("getadoptList")
		 }
	 }
}
