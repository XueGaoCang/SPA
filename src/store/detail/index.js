import { reqDetail } from "@/api"
import { reqShop } from "@/api"
import { getUUID } from "@/uutal/index"

const state = {
    //这里的数据格式是根据服务器返回的data数据格式
    detail: {},
    //将随机生成的uuid给保存到仓库中去
    uuID: getUUID()
}
//获取数据后发给mutatuions来修改state中的数据
const mutations = {
    GETDETAIL(state, detail) {
        state.detail = detail
    }
}
//先派发actions给服务器获取数据
const actions = {
    async getdetail({ commit }, skuId) {
        let result = await reqDetail(skuId)
        if (result.code == 200) {
            commit('GETDETAIL', result.data)
        }
    },
    async postShop({ commit }, { skuId, skuNum }) {
        let result = await reqShop(skuId, skuNum)
        if (result.code == 200) {
            return "ok"
        } else {
            return Promise.reject(new Error("fail"))
        }
    }
}

const getters = {
    categoryView() {
        return state.detail.categoryView || {}
    },
    skuInfo() {
        return state.detail.skuInfo || {}
    },
    skuSaleAttrValueList() {
        return state.detail.skuInfo.skuSaleAttrValueList || []
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}