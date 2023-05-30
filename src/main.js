//引入vue
import Vue from 'vue'
//引入App组件
import App from './App.vue'
//引入路由
import router from '@/router/index'
Vue.config.productionTip = false

//引入要注册的全局组件
import TypeNav from './components/TypeNav.vue'
import Pagination from './components/Pagination.vue'
//参数1：全局组件的名字  参数2：哪个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Pagination.name, Pagination)

//引入moke数据
import './mock/mokeServe'

//引入swiper样式
import 'swiper/css/swiper.css'
//引入Vuex
import store from './store/index'


new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this; //注册全局事件总线
    
  }
}).$mount('#app')
