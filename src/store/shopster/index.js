import { reqshopstre, reqDelete, reqChecked } from '@/api'

const state = {
    getstate: []
}
const mutations = {
    GETSHOPSTRE(state, getstate) {
        state.getstate = getstate
    }
}
const actions = {
    //获取购物车列表数据
    async getshopstre({ commit }) {
        let result = await reqshopstre()
        // console.log(result.data[0].cartInfoList[0]);
        if (result.code == 200) {
            commit("GETSHOPSTRE", result.data)
        }
    },
    //删除购物车的一条数据
    async deleteshopId({ commit }, skuId) {
        let result = await reqDelete(skuId)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    //修改购物车状态
    async getChecked({ commit }, { skuId, isChecked }) {
        let result = await reqChecked(skuId, isChecked)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('fail'))
        }
    },
    deleteAll({dispatch,getters}) {
        //获取购物车内的数据
        let PromiseAll = []
        getters.getList.cartInfoList.forEach(item => {
            let result = item.isChecked == 1 ? dispatch("deleteshopId", item.skuId) : ''
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
    }
}
const getters = {
    getList() {
        return state.getstate[0] || []
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}