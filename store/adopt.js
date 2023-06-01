import myhttp from '@/api/myhttp.js'
import moment from 'moment';
import qs from 'qs'
export default {
	// namespaced: true,
	state: {
		adoptList: [],
		// faBureturn: false,
		filterList: {
			petAge:[],
			petGender:[],
			petVariety:[]
		}
	},
	mutations: {
		// changereturn(state) {
		// 	state.faBureturn = !state.faBureturn
		// },
		changeFilterList(state, newfilterList) {
			state.filterList = {}
			state.filterList = newfilterList
		},

		updateadoptList(state, updateAdoptList) {
			state.adoptList = updateAdoptList
		},
		// updateFilter(state, { key, value }) {
		//   state.filterList[key] = value
		// },
		getadoptList(state) {


		}
	},
	getters: {

	},
	actions: {
		// async adoptListasync({state,commit}) {
		// 	await commit("getadoptList")
		// }
		async getArticles({
			state,
			commit
		}) {
			// const filters = {...state.filterList} // 将当前过滤器克隆为对象进行运算
			// state.filterList
			// let petAge = []
			// let petGender = []
			// let petVariety = []
			let momentFlag
			//  for (var key in state.filterList) {
			// 	state.filterList['petAge'] = petAge
			// 	state.filterList['petGender'] = petGender
			// 	state.filterList['petVariety'] = petVariety
			// }
			
			// let params={
			// 	petAge:[],
			// 	petGender:[],
			// 	petVariety:[]
			// }

			let params=state.filterList
			console.log(params,'new');
			// http: //10.23.83.140:8080/users/pets/Adopt/AdoptListSift?petAge=&petGender=1&petVariety=%22%E5%96%B5%E5%96%B5%22
				await myhttp.get(`/users/pets/Adopt/AdoptListSift`,params ).then(res => {
					state.adoptList = res.data
					state.adoptList.forEach((item) => {
						item.image = 'http://10.23.83.140:8080' + item.image;
						momentFlag = moment(item.registrationTime, 'YYYYMMDDTHH:mm:ss.SSS+Z ZZ')
							.fromNow()
						if (momentFlag.charAt(0) == 'a') {
			 			momentFlag = momentFlag.replace('a', 1)
						}
						if (momentFlag.match(
								/hour/)) {
							item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "小时前"
						} else if (momentFlag.match(
								/day/)) {
							item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "天前"
						} else if (momentFlag.match(
								/minute/)) {
							item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "分钟前"
						} else {
							item.registrationTime = momentFlag.replace(/[^0-9]/g, "") + "秒前"
						}
					})
					commit('updateadoptList', state.adoptList)
				})

		},
	}
}
