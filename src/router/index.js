//配置路由区域
//引入Vue
import Vue from 'vue'
//引入vue-router
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import routes from './routers'
//引入路由组件

//重写push/replace方法
//首先保存一份VueRouter原型对象上的push
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //call和apply的区别
        //相同点：都可以调用一次函数且都可以篡改函数的上下文一次
        //不同点：call与apply的传值，call传递参数用逗号隔开，apply传递参数需要使用数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        //重写push和replace方法
        //第一个参数：告诉原来的push方法，你往哪里跳转传递什么参数
        //第二个参数：成功回调
        //第三个参数：失败回调
        //call和apply的区别
        //相同点：都可以调用一次函数且都可以篡改函数的上下文一次
        //不同点：call与apply的传值，call传递参数用逗号隔开，apply传递参数需要使用数组
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
export default new VueRouter({
    routes, //触发简写形式，当key：value名字相同时可以省略value
    //在跳转页面后使得导航栏回到最顶部
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
})