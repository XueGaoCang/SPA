//首页小仓库
import { reqGategoryList, reqGatebannerList, reqGatfloor } from '@/api'
const state = {
    //state中的默认的数据不可随便写，
    //服务器返回的是一个对象则state中的默认数据就是一个对象
    //服务器返回的是一个数组则state中的默认数据就是一个数组
    catgoryList: [],
    getBannerList: [],
    getfloors: []
}
const mutations = {
    CATEGORYLIST(state, catgoryList) {  //这里的state为数据仓库state内的数据  catgoryList为result.data即为服务器获取过来的数据
        state.catgoryList = catgoryList
    },
    GATEBANNERLIST(state, getBannerList) {
        state.getBannerList = getBannerList
    },
    GETFLOORS(state, getfloors) {
        state.getfloors = getfloors
    }
}
const actions = {
    async catgoryList({ commit }) {
        let result = await reqGategoryList()
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data)
        }
    },

    //获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result = await reqGatebannerList()
        if (result.code == 200) {
            commit("GATEBANNERLIST", result.data)
        }
    },
    //获取floor的数据
    async getFloors({ commit }) {
        let result = await reqGatfloor()
        if (result.code == 200) {
            commit("GETFLOORS", result.data)
        }
    }
}
const getters = {}

export default {
    state,
    actions,
    mutations,
    getters
}