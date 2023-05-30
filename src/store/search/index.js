//搜索小仓库
//引入数据
import { reqPostSearch } from '@/api'

const state = {
    searchList: {}
}
const mutations = {
    SEARCHLIST(state, getsearchList) {
        state.searchList = getsearchList
        // console.log(searchList);
    }
}
const actions = {
    async searchList({ commit }, params = {}) {
        let result = await reqPostSearch(params)

        if (result.code == 200) {
            commit('SEARCHLIST', result.data)
        }
    }
}
const getters = {
    //通过getters来简化search组件获取state仓库的数据代码
    //加入没有网需要传递一个空数组
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }

}

export default {
    state,
    actions,
    mutations,
    getters
}