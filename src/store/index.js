//管理小仓库的大仓库
//引入vue和vuex
import Vue from 'vue';
import Vuex from 'vuex';
//注册插件Vuex
Vue.use(Vuex)
import home from './home'
import search from './search'
import detail from './detail';
import shopster from './shopster'
import phone from './phone'
export default new Vuex.Store({
    modules: {
        home,
        search,
        detail,
        shopster,
        phone
    }
})