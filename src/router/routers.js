//引入组件
import Home from '../pages/Home.vue'
import Login from '@/pages/Login/index.vue'
import Register from '../pages/Register.vue'
import Search from '@/pages/search'
import Detail from '@/pages/Detail/index.vue'
import AddCartSuccess from '@/pages/AddCartSuccess'
import Shop from '@/pages/ShopCart'

//注册为路由组件
export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true }
    },
    {
        // 登录组件
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        //注册组件
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:skuId',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addCartSuccess',
        name: 'addCartSuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        path: '/shop',
        component: Shop,
        meta: { show: true }
    },
    {
        path: '*',
        redirect: "/home"
    }
]