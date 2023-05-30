//1.引入moke
import Mock from 'mockjs'
//2.引入moke模拟的数据仓库
import banner from './banner.json'
import floor from './floor.json'
//.moke为一个方法它有两个参数  参数1：地址   参数2：数据
Mock.mock("/mock/banner", { code: '200', data: banner })
Mock.mock("/mock/floor", { code: '200', data: floor })