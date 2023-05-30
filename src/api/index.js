//当前这个模块：对API进行统一管理   
import requests from './request'
import mokeRequest from './mock'

//三级联动接口
///product/getBaseCategoryList   get  参数
//发请求：axios发请求返回结构为Promise对象
//添加上一个header请求头
export const reqGategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' })

//书写一个获取banner数据的请求代码

export const reqGatebannerList = () => mokeRequest.get('/banner')

//1.先获取moke模拟仓库中的数据
export const reqGatfloor = () => mokeRequest.get('/floor')

//获取search数据

export const reqPostSearch = (params) => requests({ url: '/list', method: 'post', data: params })

//获取商品详情
export const reqDetail = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })

//向服务器存储用户点击加入购物车的数据
export const reqShop = (skuId, skuNum) => requests({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: "post" })

//获取购物车数据
export const reqshopstre = () => requests({ url: '/cart/cartList', method: "get" })

//向服务器存储要删除的购物车的id
export const reqDelete = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })

//修改产品状态
export const reqChecked = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: "get" })

//获取验证码/api/user/passport/sendCode/{phone}
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: "get" })

//注册用户接口
export const reqreg = (data) => requests({ url: '/user/passport/register', data, method: "post" })

//登录接口
export const reqlogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })