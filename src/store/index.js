//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)

//准备actions——用于响应组件中的动作
const actions = {

}

const getters = {
	navigationBar: state => {
		if (state.sortInfo !== null && state.sortInfo.length !== 0) {
			return state.sortInfo;
		} else {
			return [];
		}
	}
}

//准备mutations——用于操作数据（state）
const mutations = {
	changeToolbarStatus(state, toolbarState) {
		state.toolbar = toolbarState;
		localStorage.setItem("toolbar", JSON.stringify(toolbarState));
	},
	//保存 分类 的信息
	loadSortInfo(state, sortInfo) {
		if (sortInfo !== null && sortInfo.length !== 0) {
			//state.sortInfo = sortInfo.sort((s1, s2) => s1.priority - s2.priority);
			//localStorage.setItem("sortInfo", JSON.stringify(sortInfo.sort((s1, s2) => s1.priority - s2.priority)));
			state.sortInfo = sortInfo
			localStorage.setItem("sortInfo", JSON.stringify(sortInfo));
		}
	},
	loadTotal(state, length) {
		state.total = length
	}
}
//准备state——用于存储数据
const state = {
	toolbar: JSON.parse(localStorage.getItem("toolbar") || '{"visible": false, "enter": true}'),
	sortInfo: JSON.parse(localStorage.getItem("sortInfo") || '[]'),
	total: 0
	//sortInfo: JSON.parse('[]'),
}

//创建并暴露store
export default new Vuex.Store({
	actions,
	mutations,
	state,
	getters,


})