import Vue from 'vue'
import Vuex from 'vuex' 
import user from './user.js'
import adopt from './adopt.js'

Vue.use(Vuex)

 const store = new Vuex.Store(
{
	state:{},
	mutations:{},
	getters:{},
	actions:{},
	modules:{
		user,
		adopt
	}
}
)

export default store