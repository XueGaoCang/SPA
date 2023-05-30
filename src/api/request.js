//对axios进行二次封装

//引入axios
import axios from 'axios'
//引入vuex大仓库拿到uuid
import store from '@/store/index'
//引入nprogress来实现加载时出现进度条
import nprogress from 'nprogress'
//引入进度条样式
import "nprogress/nprogress.css"

//1.利用axios对象的方法create，去创建一个axios实例
//2.request就是axios，只是配置一下内部的属性
//axios.create为创建一个axios用来方便自定义配置
const requests = axios.create({
    baseURL: '/api',  //发生请求时，路径上默认会出现api，不需要在手动输入，解决接口文档内的api重复输入
    timeout: 5000,   //请求超时的时间5秒
})
//请求拦截器
requests.interceptors.request.use((config) => {
    //config:配置对象，在对象里面有一个属性很重要，headers
    nprogress.start()
    //添加uuid请求头
    if (store.state.detail.uuID) {
        config.headers.userTempId = store.state.detail.uuID
    }
    return config
})
//响应拦截器
requests.interceptors.response.use((res) => {
    //响应成功的回调
    nprogress.done()
    return res.data
}, (error) => {
    //响应失败的回调
    return Promise.reject(new Error('faile'))
})


//对外暴露
export default requests;