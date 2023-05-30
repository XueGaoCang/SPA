//登录与注册共用模块
import { reqGetCode, reqreg, reqlogin } from '@/api'
const state = {
    phone: ""
}
const mutations = {
    GETPHONE(state, phone) {
        state.phone = phone.data
    }
}
const actions = {
    //以下为业务正常开发时所需要书写的代码
    // async getphone() {
    //     let result = await reqsendCode(phone)
    //     if (result.code == 200) {
    //         return 'ok'
    //     } else {
    //         Promise.reject(new Error('flie'))
    //     }
    // }
    //但是此项目的接口会将验证码直接返回
    async getphone({ commit }, phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit("GETPHONE", result)
            return "ok"
        } else {
            return Promise.reject(new Error("flile"))
        }
    },
    async getreg({ commit }, user) {
        let result = await reqreg(user)
        console.log(result);
        // if (result.code == 200) {
        //     return 'ok'
        // } else {
        //     return Promise.reject(new Error("flile"))
        // }
    },
    async getlogin({ commit }, data) {
        let result = await reqlogin(data)
        console.log(result);
        
    }
}
const getters = {

}
export default {
    state,
    mutations,
    actions,
    getters
}