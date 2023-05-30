一切的开始搭建vue脚手架

```
yarn global add @vue/cli  //安装vue命令台

vue creat new_vue //创建你的vue项目目录

vue2/vue3 //看你项目用哪个


cd new_vue   //进入你的项目目录

yarn serve  //开启本地热更新
```



### 项目配置

1.在启动项目时，浏览器自动打开

```
--package.json
    --scripts":{
        "serve": "vue-cli-service serve --open",}
```

### 2.关闭Eslint自动校验

```
--vue.config.js
    --module.exports = defineConfig({
        transpileDependencies: true,
        lintOnSave: false //加上这句话
        })
```



### 3.项目路由的分析

vue-router@3  

当前项目的路由组件和非路由组件
路由组件:
Home首页路由,login,登录路由，Search商品列表路由，Refister注册路由
非路由组件：
Header【首页，搜索页and登录，注册】都存在
Footer【首页，搜索页】，但是在登录|注册页面没有

### 路由组件和非路由组件的区别

1.路由组件一般存放到pages|views文件夹中而非路由组件存放在components文件夹内
2.路由组件一般在router文件夹内的index.js文件中注册

```
注册前需要引入vue，vue-router等  并注册vue-router插件 
引入需要注册的路由组件  
并使用new VueRouter({
    routers:[
        {
        path:'',
        component:路由组件
        }
    ]
})注册
```

3.所有的路由组件注册完成后--还需要在main.js文件中引入并注册router才可以使用 注册完后不管是路由组件还是非路由组件身上都会有route和router属性

$route:一般为获取路由信息【路径，query，params数据等】
$router:一般进行编程式导航进行路由跳转

### 设置默认打开的路由组件

```
在router注册路由文件内的路由中书写
path:'*',
redirect:Home  //设置默认打开的路由组件
```

### 路由原信息的使用

```
使用route是身上的原方法来完成组件的显示和隐藏
meta:{show:true/false}
为路由组件添加以上代码可以为其的meta属性添加值
v-show为隐藏或显示某个标签
搭配meta属性可以实现对某个组件的隐藏和显示
v-show:$route.meta.show
```

### 编写路由组件的管理者route

```
import Vue from 'vue'
import xx from 'xxx'  //引入路由组件
import VueRouter from 'vue-router' //引入vue-router插件
Vue.use(VueRouter)

//为Home,Search添加meta:{show:false}  为登录和注册路由组件添加meta:{show:true}
//在App组件的footer组件标签中添加 v-show:"$router.meta.show"来使footer组件在登录和注册页面隐藏起来
export default new VueRouter({
    routes:[
        {
            path:'',
            component:,
            meta:{show:true/false},
            children:[
                {
                    name:'search'
                    path:'/search/:keyword',
                    component:Search,
                    children:[
                        {},
                    ]
                },
                {}
            ]
        },
        {},
	]
})
```

### 路由的两种跳转方式

1.声明式路由:使用router-link标签进行路由跳转，router-link是转化为a标签来使用
2.编程时路由导航：在注册路由时使用,router-link可以做到的编程式也可以做到
但是编程式可以做到更多比如要进行路由跳转的是一个按钮时就需要用到编程式路由导航了

## 路由传递参数：使用Params传参

#### 1.获取用户输入的信息并通过Params传递出去

`v-model获取用户输入的信息存储到keyword内`

#### 2.给搜索框绑定点击事件，在点击搜索后把数据传递出去

```
@click="goSearch"
method:{
    goSearch(){
        this.$router.push({
            name:'search',
            params:this.keyword  //将数据通过params的形式传递给了search路由组件
        })
    }
}
```

#### 3.在注册路由中为要传递参数的路由添加

```
path:'Search/:keyword'   //keyword为传递参数的那个一个路由组件所接收到的参数

接收params参数

$route.params.keyword
```

4.重写push和replace方法

```
Search组件内用  $router.params.keyword  就可以拿到这个数据因为所有params的数据都存放在了router内部
重写push和replace方法解决NavigationDuplicated警告

NavigationDuplicated警告为当用户多次点击搜索按钮会导致页面丢失

1.先将push和replace进行备份
//push方法和replace方法均都在vuerouter的原型对象上面
let BackupsPush = VueRouter.prototype.push
let BackupsReplace = VueRouter.prototype.replace
//location往哪里跳转，传递什么参数
//resolve:成功的回调
//reject:失败的回调
VueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
       BackupsPush.call(this,location,resolve,reject) 
    }else{
        BackupsPush.call(this,location,()=>{},()=>{})
    }
}
```

#### 注册全局组件

```
1.在main.js内引入组件
import xxx from 'xxx'
2.使用Vue.component(xxx.name,xxx) 
参数1：组件名.name   参数2：组件内部中name内所写的名字
```

#### 对axios进行二次封装，书写拦截器

```
此文件代码存放在src/api/requests.js内

1.下载axios引入axios

2.//配置axios
  //使用axios身上的create方法去创建一个axios实例并配置一下内部属性
  //此时的requests就是axios
let requests = axios.create({
    baseURL:'/api',   //在发生请求时为路径添加上/api
    timeout:5000,     //请求超时的时间
})
3.请求拦截器 [一定不要忘记.use]
requests.interceptors.request.use((config)=>{
    return config
})
  请求后拦截器
requests.interceptors.response.use((res)=>{
    return res.data
},
(error)=>{
    return Promise.reject(new Error('faile'))
}
)

//4.将requests暴露出去

export default requests
```

#### 对Api的统一管理比如添加一个herder请求头

1.引入先前编写的axios文件

```
import requests from './requests.js'
```

2.编写并暴露出去

```
export const reqCategoryList = ()=> requests({url:'/product/getBaseCategoryList',method: 'GET'})
```

nprogress进度条插件
```
1.yarn add nprogress
2.在拦截器文件内引入
import nprogress from 'nprogress'
3.在请求拦截器添加：nprogress.start()
4.在响应拦截器的成功回调函数中添加：nprogress.done()
```
Vuex模块化开发：适用于组件较多，数据较多的情况
将一个大的store仓库，分成多个小仓库分别管理每个组件的数据，灵活度更高，代码也更清晰

1.首先创建大仓库文件夹store和大仓库的index.js用来管理手下的小仓库们

```
store>index.js
--引入vue和vuex并注册vuex
import Vue from 'vue'
import Vuex from 'vuex'
Vue.ues(Vuex)
//引入创建的小仓库在store内进行统一的管理
import store from '所在路径'
import home from '所在路径'
//暴露Vuex创建的Store实例
export default new Vuex.Storse({
    modules:{ //用来装载小仓库
		store，
		home
    }
})
```
创建store小仓库
```
1.home模块仓库
创建state，mutations，getters，actions模块
home>index.js
const state = {}
const mutations = {}
const actions = {}
const getters = {}
```
2.暴露所有创建好的模块
```
export default {
    state,
    mutations,
    actions,
    getters
}
```

3.在入口文件中引入并注册store
```
import store from './store'

new Vue({
    store 
})
```

async/await的理解和用法
`async/await 是ES2017(ES8)提出的基于Promise的解决异步的最终方案。`

```
async是一个加在函数前的修饰符，被async定义的函数会默认返回一个Promise对象resolve的值。因此对async函数可以直接then，返回值就是then方法传入的函数。

await 也是一个修饰符，只能放在async定义的函数内。可以理解为等待
await 修饰的如果是Promise对象：可以获取Promise中返回的内容（resolve或reject的参数），且取到值后语句才会往下执行
如果不是Promise对象：把这个非promise的东西当做await表达式的结果

用法:
async catgoryList() {    //catgoryList get请求获取数据
        let reulst = await reqCategoryList()  //reqCategoryList()为获取Promise值
        console.log(reulst);
    }
```
渲染数据到三级列表
1.TypeNav组件获取并传递数据

```
TypeNav.vue三级列表组件内js代码

//引入mapState
import {mapState} from 'vuex'

1.找到三级列表组件
2.使用计算属性

computed:{
    //使用mapState来获取数据
    ...mapState({
        categoryList:(state)=>{retuen state.home.catgoryList}
    })
}
//往home小仓库内传递数据
mounted(){
    this.$store.dispatch('catgoryList')
}

```
2.在vuex的home小仓库内对数据进行操作
```
1.引入api下的补充请求头文件，需要获取Promise对象
import {reqCategoryList} from '@api'

state数据仓库内创建原数据存储点
catgoryList:[]  //这里根据服务器返回的数据类型来创先当对应的数据类型

actions管理用户的数据
//使用async和await来处理Promise对象
async catgoryList({commit}){
    1.将传递过来的Promise对象保存起来
    let result = await reqCategoryList()
    2.当reqCategoryList内的code为200时就是数据传递成功，将数据给到mutations中去
    if(result.code == 200){
        commit('CATEGORYLIST',result.data)
    }
}

mutations中对state数据仓库内的数据进行替换
    CATEGORYLIST(state,catgorylist){
        state.catgorylist = catgorylist
    }
```
3.将三级列表的html结构中的数据使用v-for来进行渲染
```
找到每一级列表的关键标签为其添加v-for属性来进行渲染
<div class="all-sort-list2">
    //为关键标签用来渲染出h3标题
    <div class="item" v-for="(c1,index) in categoryList" :key="c1.catgoryId">
        <h3>
            <a href="">{{ c1.categoryName }}</a>
        </h3>
        <div class="item-list clearfix">
        //为关键标签用来渲染出dt中的a标签
            <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                <dl class="fore">
                    <dt>
                        <a href="">{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                        //为关键标签用来渲染em中的a标签
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                            <a href="">{{ c3.categoryName }}</a>
                        </em>        
                    </dd>
                    </dl>
            </div>
        </div>
    </div>
</div>
```

在鼠标经过时为三级列表添加背景颜色
```
1.css样式解决(工作时常用比较简单，占用资源少)
找到三级列表的第一层列表中的样式，为其添加鼠标经过后改变背景颜色

2.方法二：使用JS来为选中的标签添加样式
    1.为包含一级a链接的h3标签绑定鼠标经过事件,并将经过后标签的index给传递过去
   <h3 @mouseenter="changeIndex(index)">
    2.添加data属性并添加值churrIndex为-1
    data(){
        return {
            churrIndex:-1  //设置-1的原因为0-15是一级标签，设置0-15的话会在鼠标经过时默认选中设置的标签index为其添加样式
        }
    }
    3.将鼠标经过后的index给到data中的churrIndex并为其设置节流
    changeIndex:throttle(function(index){
        this.churrIndex = index
    },80)  //设置节流时间：80
    4.在为包含一级a链接的h3标签绑定鼠标离开事件,每当鼠标离开后将-1重新赋给churrIndex
    <h3 @mouseenter="changeIndex(index)" @mouseleave="changeleave">
    changeleave(){
        this.churrIndex = -1
    }
```
防抖和节流
防抖：在用户输入完毕后在执行ajax请求，无数次请求只会执行最后一次
节流：在规定时间内请求无效，在规定时间后才会开始请求

简单写法：使用lodash内的封装好的防抖和节流来实现

防抖：
```
1.先安装和引入lodash
<script src = '存放的路径'></script>

2.使用防抖方法
_.debounce(func,[wait = 0],[options =])

例子：
_.debounce(function(){},1000,{
    leading = false,
    maxWait = 5000,
    trailing = true 
})

func:要进行防抖的函数
wait：防抖的时间
options：防抖方法的内部配置
[options.leading=false] (boolean): 指定在延迟开始前调用。
[options.maxWait] (number): 设置 func 允许被延迟的最大值。
[options.trailing=true] (boolean): 指定在延迟结束后调用。
```
节流：
```
1.先安装和引入lodash
<script src = '存放的路径'></script>

2.使用节流方法
_.throttle(func,[wait = 0],[options = ])

_.throttle(function(){},1000,{
    leading = true,
    trailing = true
})

func:要进行节流的函数
wait：节流延迟时间
options：节流方法的内部配置
[options.leading=true] (boolean): 指定调用在节流开始前。
[options.trailing=true] (boolean): 指定调用在节流结束后。

```
解决为一级分类添加样式时由于用户操作过快而产生的卡顿
```
使用lodash里的节流方法在为选中一级标签时添加响应时间
1.先引入lodash内的节流方法
import throttle from 'lodash/throttle';

changeIndex:throttle(function(index){
    this.churrIndex = index
},80)

throttle为节流方法

```

完成三级路由跳转和传递参数业务
```
如何完成路由跳转
1.声明式路由：<router-link></router-link>
2.编程式路由导航:this.$router.push({name:'search',query:'xxx'})

当前业务使用编程式路由导航+事件委托更为方便和节省性能
1.事件委托的应用：为三级导航(item)的父亲节点添加点击事件
<div class="all-sort-list2" @click = 'goSearch'>

2.解决事件委托带来的问题
    2.1父亲节点内包含了很多标签需要知道点击的为a标签
    解决方案：使用自定义属性，为一级，二级，三级的a标签添加自定义属性
    <a :data-categoryName = "c1.categoryName">{{ c1.categoryName }}</a>
    <a :data-categoryName = "c2.categoryName">{{ c1.categoryName }}</a>
    <a :data-categoryName = "c3.categoryName">{{ c1.categoryName }}</a>
    2.2解决点击的是一级还是二级还是三级的问题
    在为一级二级三级添加自定义属性
    <a :data-categoryName = "c1.categoryName" :data-cater1Id = "c1.categoryId">{{ c1.categoryName }}</a>
    <a :data-categoryName = "c1.categoryName" :data-cater2Id = "c1.categoryId">{{ c2.categoryName }}</a>
    <a :data-categoryName = "c1.categoryName" :data-cater3Id = "c1.categoryId">{{ c3.categoryName }}</a>


3.编写鼠标点击函数
goSearch(e){ //e，event为 事件对象
    3.1 //使用事件对象来获取鼠标点击后的标签
    let elemt = e.target 
    3.2//通过dataset这个自定义属性，它是一个对象内包含了自定以属性值，解析出点击的为a标签的categoryName和categoryId
    let {categoryname,cater1id,cater2id,cater3id} = elemt.dataset 
    3.3使用编程式导航来进行路由的跳转
    if(categoryname){
        let location = {name:'search'}
        let query = {categoryName = categoryname}
        if(cater1id){
            query.category1Id = cater1id
        }else if(cater2id){
            query.category2Id = cater2id
        }else{
            query.category2Id = cater2id
        }
        location.query = query
        this.$router.push(location)
    }
}

```

实现search中商品分类的隐藏和显示并为其添加过渡动画
```
1.因TypeNav为全局组件不需要引入就可以使用
<TypeNav/>

2.data中添加show属性值为true，并为商品分类(sort)添加v-show = "show"


3.实现商品分类的显示与隐藏
    3.1在mounted生命周期已挂载时使search中的商品分类隐藏
    mounted(){
        if(this.$router.path!='/home'){
            this.show = false
        }
    }

在TypeNav组件内书写相关代码
    3.2为全部商品分类和商品分类的父亲节点添加鼠标经过和鼠标离开事件
    @mouseenter = "entershow"鼠标经过事件
    entershow(){
        this.show = true
    }
    @mouseleave = "changeleave"鼠标离开事件
    changeleave(){
        if(this.$route.path!='/home'){  //只有当不是首页路由时才将商品分类隐藏
            this.show = false
        }
    }


    为鼠标经过和离开的商品分类添加过渡动画
    1.为商品分类添加父级节点
    <tranisition name = "show">
    <div class = 'sort' v-show = "show">
    ....
    </div>
    </tranisition>

    2.在样式sort的下面书写过渡动画样式
    .show-enter { //开始的起点
      height: 0px;
    }
    .show-enter-to {//开始的终点
      height: 461px;
    }
    .show-enter-active {//开始时的过程
      transition: all 0.5s linear;
    }

    .show-leave {//结束时的起点
      height: 461px;
    }
    .show-leave-to { //结束时的终点
      height: 0px;
    }
    .show-leave-active { //结束时的过程
      transition: all 0.1s linear;
    }
    
```

typenav商品列表获取数据时对性能的优化
1.首先需要知道app中的mounted生命周期钩子只能执行一次且app组件是所有组件中最优先执行的
2. 基于以上观点所以我们把typenav的mounted中的this.$route.dispatch("catgoryList")放到app的mounted当中
  这样就不会在路由跳转时因路由不断的销毁和挂载而去多次请求服务器数据，对性能进行一定的优化

  合并参数

```
将商品分类中用户点击给search传递的参数和用户输入完毕点击搜索按钮传递给search的参数合并起来

两种场景
1.用户先点击的商品分类后点击的搜索按钮,两者的参数要一起带给search
2.先点击的搜索后点击的商品分类，两者参数也要一起给search

首先配置商品分类TypeNav中路由跳转传参时
将路由中的params也给到传递的location函数内一并传递过去
location.params = this.$route.params
this.$router.push(location)

传递参数用route   路由跳转用router

搜索按钮路由跳转同理
let location = {name:'/search',params:{keyWord:this.keyWord || undefined}}

location.query = this.$route.query

this.$router.push(location)
```

给商品分类路由跳转和传递参数时增加一个params一起传递过去
给搜索的路由跳转和传递参数时增加一个query参数一起传递过去 

下载swiper
在listcontainer中引入swiper包
在main.js中引入样式，因为home主页中不止一处使用到轮播图
完成new swiper实例

使用watch + nextTick来完成轮播图效果

1.下载并在listContainer中引入swiper(哪里使用了swiper就在哪里引入)
2.在main.js中引入swiper样式    import 'swiper/css/swiper.css'
3.使用数据监视watch来监视getbannerList这个数据的内数据的变化，
并在数据发生改变后并页面渲染成功时来调用this.$nextTick(()=>{})
```
//nextTick:运用在下次DOM更新完毕并循环结束时延迟调用，并且在数据发生改变后，使用该方法，获取更新后的DOM
watch:{
    getbannerList:{
        handler(){
            this.$nextTick(()=>{
                  new Swiper(document.querySelector(".swiper-container"), {
            loop: true,
            pagination: {
              el: ".swiper-pagination",
              clickable: true, //可以点击轮播图的下方小点点来进行图片的切换
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
            })
        }
    }
}
```


## 书写search模块的静态组件
属性栏，商品展示栏一共两个静态组件
```
2.完成search模块页面的数据动态展示
    1.b 通过axios来获取search中服务器的数据
    //当前请求为post请求，因此会携带参数去从服务器中寻找相对应数据
    export let searchList = (text)=>requests({url:'/list',method:'post',data:text})
3.vuex三件套
    1.引入searchList
    import {searchList} from '@/api'
    2.分别配置actions，mutations，state
    let actions={
        
        async getsearchList({commit},params={}){
            //将服务器获取来的数据保存起来并在成功的时候将数据给到mutations中去
            let result = await searchList
            if(result.code === 200){
                commit("GEYSEARCHLIST",result.data)
            }
        }
    },
    let mutations={
        GEYSEARCHLIST(state,searchList){
            state.searchList = searchList
        }
    },
   let state={
        //这里的数据格式是根据服务器传递过来的数据来定义的  数组为:[] 对象为:{}
        searchList:{}
    },
    //为简化数据获取因此需要配置getters
   let getters={
        goodsList(state){//state为存放searchList仓库数据的对象
            return state.searchList.goodsList || [] //返回仓库中存储的对象数据且当没有数据返回时返回一个[]数组
        },
        attrsList(state) {
            return state.searchList.attrsList || []
        },
        trademarkList(state) {
            return state.searchList.trademarkList || []
        }
    }


4.search模块通过dispatch来向仓库传递服务器的数据并通过vuex进行数据处理完毕后在用...mapGetters来获取仓库中已经处理好的数据

    因为search模块需要多次请求服务器发多级ajax请求所以把dispatch封装成一个函数需要时就调用
    getSearch(){
        this.$store.dispatch('getsearchList',this.search)
    }
    在mounted(){
        //组件挂载周期时调用一次函数
        this.getSearch()
    }

    使用计算属性computed:{
        ...mapGetters(['goodsList']) //用数组来接收仓库中getters中的数据
    }

    //当用户用搜索框输入数据页面根据用户的输入展示相对应内容
    在mouted生命周期之前把用户输入的数据传递给服务器并筛选出来返回给search
    data(){
        return {
           search:{
            //一级分类id
            category1Id: "",
            //二级分类id
            category2Id: "",
            //三级分类id
            category3Id: "",
            //商品名字
            categoryName: "",
            //用户输入的数据
            keyword: "",
            //排序
            order: "",
            //默认的页码
            pageNo: 1,
            //页面展示几条数据
            pageSize: 5,

            props: [],
            trademark: "",
            }
        }
    }
    使用beforeMount(){
        //这里的数据是从data中获取来的 
        //使用object.assign方法来将data中的格式和route中query和params参数合并并一起传递给vuex仓库
        object.assign(this.search,this.$route.query,this.$route.params)
    }
5,监听路由当路由中query和params参数发生变化时就调用函数getSearch()
watch:{
    $route(){
        //路由发生改变时将合并好的数据传递过去并调用getSearch函数，在把search中的1，2，3级id给置空
        object.assign(this.search,this.$route.query,this.$route.params)
        this.getSearch()
        this.search.category1Id = undefined
        this.search.category2Id = undefined
        this.search.category3Id = undefined
    }
}
```
## 面包屑的处理
```
1.点击三级分类时全部结果那里会呈现出选中的内容标签
找到面包屑标签，为其添加v-if并在点击x后为search.categoryName置空
<li v-if="search.categoryName">{{search.categoryName}} </li>
<li @click="removecategoryName">x</li>  
//面包屑关键字
<li v-if="search.keyword">{{search.keyword}} </li>
<li @click="removekeyword">x</li>  


methods:{
    removecategoryName(){
        this.search.categoryName = undefined;
        //并将三级分类的id也一起undefined
        this.search.category1Id = undefined
        this.search.category2Id = undefined
        this.search.category3Id = undefined
        //在完成置空后进行路由跳转，跳到默认页面
        this.getSearch()
        //在完成路由跳转后将地址栏的query参数清空,留下params参数
        if(this.$route.params){
            this.$router.push({name:"search",params:this/$route.params})
        }

    },
    removekeyword(){
        //这里只需要将keyword给清空，没有id无需清空
        this.search.categoryName = undefined;
        //清空完毕之后跳转路由
        this.getSearch()
        //在跳转路由后需要将搜索框内的数据清空，因搜索框为header组件的
        因此需要使用全局事件总线来清空数据
        this.$bus.$emit("clear") //使用$bus身上的$emit来向heaher组件传递
        //完成后，清空地址栏的params参数保留query参数
        if(this.$route.query){
            this.$router.push(name:'search',quert:this.$route.query)
        }
    }
}

header组件内

mounted(){
    this.$bus.$on("clear",() => {
        this.keyword = ''
    })
}

在main.js中注册全局事件总线

beforeCreate(){
    Vue.prototype.$bus = this //这里的this指的是vm
}
  
```
## 品牌面包屑
```
<li v-if="search.trademark">{{search.trademark.split(":")[1]}} </li>
<li @click="clickstrademark">x</li>  

品牌面包屑的值在子组件SearchSelector中

使用自定义事件将子组件的品牌信息传递给父组件，父组件在使用服务器的数据进行渲染页面

自定义事件的使用
子组件内通过点击事件将数据传递给父组件的自定义事件中

@click = "trademarkinfor(trademark)"
methods:{
    trademarkinfor(trademark){
        this.$emit("trademarkinfroe",trademark)
    }
}

父组件:为子组件标签添加自定义事件
<SearchSelector @trademarkinfroe="trademarkinfroe"/>
//SearchSelector:为子组件标签
methods:{
    trademarkinfroe(trademark){//接收子组件传递来的数据
    //将传递过来的数据按照格式进行拼接传递给searchparams
    this.searchparams.trademark = trademark.tmId + ":" + trademark.tmName;
    //传递后在调用getSearch()
    this.getSearch()
    },
    //为面包屑的x添加点击事件
    clickstrademark(){
        this.searchparams.trademark = undefined;
        //清空后再次调用getSearch()
        this.getSearch()
    }
}
```

## 属性面包屑

```
//因为props为数组所以需要v-for来遍历数组
<li v-for="(Att,index) in search.props" :key="index">{{Att.split(":")[1]}} </li>
<li @click="removeatt(index)">x</li> 


和品牌面包屑一样使用自定义事件
//这里需要传递两个数据过去完成数据拼接
//参数1为商品属性的全部参数  参数2：商品属性的属性值
@click = "removeatters(attrs, atters)"
methods:{
    removeatters(attrs, atters){
        this.$emit("removeattrs",attrs, atters)
    }
}
父组件:为子组件标签添加自定义事件
<SearchSelector @trademarkinfroe="trademarkinfroe" @removeattrs="removeattrs" />

methods:{
    removeattrs(trademark){//接收子组件传递来的数据
    //将传递过来的数据按照格式进行拼接传递给searchparams
    let props = `${attrs.attrId}:${atters}:${attrs.attrName}`;
    //因为props为数组所以需要进行数组去重
    if(this.searchparams.props.indexOf(props) === -1){
        this.searchparams.props.push(props);
    }
    //传递后在调用getSearch()
    this.getSearch()
    },
    //为属性面包屑的x添加点击事件
    //因为props为数组所以需要根据用户点击的面包屑标签的索引值来进行对应的删除
    removeatt(index){
        //删除指定索引值的数组元素
        this.searchparams.props.splice(index,1)
        //清空后再次调用getSearch()
        this.getSearch()
    }
}

```
## 排序的几大问题
```
1.类名问题,根据order中的数据来为其标签添加类名
//动态类名根据searchparams.order.includes('1')判断的结果来为其添加
.includes('1'):当order中包含1时为true
<li :class={active:inforone} :click="inforasc(1)">
    <a>综合</a>
    <span v-if="inforone" class="iconfont" :class="
    'icon-arrowtopdot': inforAsc,
    'icon-dianzan-down-xian': inforDesc,"></span>
</li>

<li :class="{ actie:infortwo}" :click="inforasc(2)">
    <a>价格</a>
    <span v-if="inforone" class="iconfont" :class="
    'icon-arrowtopdot': inforAsc,
    'icon-dianzan-down-xian': inforDesc,"></span>
    v-if来控制显示和隐藏
    class:字体样式
    :class:控制当前显示的是哪个图标
</li>

methods:{
    inforasc(flage){
    //1.获取order并将其分割为1和desc
    let chanFlage = this.searchparams.order.split(":")[0]
    let chanDA = this.searchparams.order.split(":")[1]
    //2.创建一个新字符串存放之后拼接的新字符
    let newOrder = ''
    //3.判断用户点击的为1还是2
    if(flage == chanFlage){
        newOder = `${chanFlage}:${chanDA == "desc"?"asc":"desc"}`
    }else{
        newOder = `${flage}:${chanDA == "desc"?"asc":"desc"}`
    }
    //判断完成后拼接将字符串传递给order并再次发请求
    this.searchparams.order = newOder
    this.getSearch()
    }
   
}
compunted:{
    inforone(){
        return this.searchparams.order.includes('1')
    },
    infortwo(){
        return this.searchparams.order.includes('2')
    },
    inforDesc(){
        return this.searchparams.order.includes('desc')
    },
    inforAsc(){
        return this.searchparams.order.includes('asc')
    }
}
```

## 分页器
    //分页器的好处：每一页固定展示数据，减少同时加载数据，消除因同时加载数据过多的卡顿现象
    自定义分页器之前的四个重要数据
    1.当前页码  pageNo
    2.总的数据条数 pageNo
    3.每页的展示数据的个数 pageSize
    4.分页连续页码个数 continues  连续页码数通常为5/7  因为奇数左右对称比较美观
    
    开发分页器的起始阶段使用假数据进行调试，直到调试完美就可以使用服务器的数据
    
    实现分页器
    1.分页器静态组件的搭建（全局组件，分页器不止一个地方会用到）
    2.先使用props来向子组件传递假数据，完成分页器的基本操作  :pageNo = "1" :pageSize = "5" :total = "91" :continues = "5"
    3.分页器接收数据 props:["pageNo","pageSize","pageNo","continues"]
    4.根据总数据来分析出一共多少页并渲染到页面 算出总页数(totalpage)
    5.使用v-for来遍历出中间连续页码区域 v-for="(page,index) in startNum.end" :key = "index" v-if="page>=startNum.start"  
        5.1 首先将起始页(start)和结束页(end)用两个变量存储起来
        5.2 在分析可能出现的情况
            情况1:总的页数<continues
            startNum:{
                //数据解构
                const {pageNo, continues, totalpage} = this
                let start = 0,
                let end = 0
                if(continues>totalpage){
                start = 1;
                end = totalpage; //如果continues>totalpage 结束的页码就为总页码数
                }else{ //正常情况下
                    
                    //起始页码为当前页码-2 这里的2为用continues/2取整的来 
                    start = pageNo - parseInt(continues / 2)
                    //结束页码为当前页码+2 这里的2为用continues/2取整的来
                    end = pageNo + parseInt(continues / 2)
                    情况2：会出现负数的情况  当pageNo为1的时候  会是-1 0 1 2 3
                    if(start <= 0){
                        start = 1;
                        end = continues
        
                    }
                    情况3：end值大于总页码的时候 当end为30时  28 29 30 31 32 但是总页码是31
                    if(end > totalpage ){
                        end = totalpage
                        //起始值就默认为27  总页码数-连续页码数+1
                        start = totalpage-continues+1
                    }
                }
                return { start, end };
            }
### 分页器组件分为上中下三部分
    //上
    <button>上一页</button>
    <button v-if = "startNum.start>1" >1</button>
    <button v-if = "startNum.start>2" >···</button>
    
    //中    
    <button 
    v-for="(page,index) in startNum.end" 
    :key = "index" 
    v-if="page>=startNum.start">
    {{ page }}
    </button>        
    
    //下
    <button v-if = "startNum.end < totalpage-1">···</button>
    <button v-if = "startNum.end < totalpage">{{totalpage}}</button>
    <button>上一页</button>

### 将假数据替换成真实数据
    将props的假数据改为真实数据,传递给子组件,完成分页器的基本操作  
    :pageNo="searchparams.pageNo"
    :pageSize="searchparams.pageSize"
    //total需要使用mapStart来获取vuex中的真实数据
    :total="total"
    :continues="5"
    
    //在计算属性中书写
    ...mapStart({
      total:(state) => {
        //取出服务器中对应数据的总条数
        return state.search.searchList.total;
      },
    })

### 使用自定义事件，把用户点击的那个button给传递给父组件
    @pageTime="pageTime"
    需要传递的地方有五个
    页码为1的 @click="$emit('pageTime',1)" 
    v-for处 @click="$emit('pageTime',page)" 
    总页码处  @click="$emit('pageTime',totalpage)" 
    
    上一页  disabled为可否使用 true为不能用 false为可以使用
    :disabled="pageNo == 1" @click="$emit('pageTime', pageNo - 1)">
    
    下一页
    :disabled="pageNo == totalpage" @click="$emit('pageTime', pageNo + 1)"
    
    为当前点击的页码添加背景颜色
    :class = "{active:page == pageNo}"




### 书写了detail静态组件
    
    2.将detail注册为路由组件
    path:'/detail/:linkid',
    component:Detail,
    meta:{show:true}
    3.将图片外面的a标签换为router-link
    4.设置router-link的to    router-link :to="`/detail/${good.id}`" 将用户点击的图片id一并传递过去
    5.设置路由跳转后滚动条在顶部
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
    

### 点击图片为其添加样式边框
    
    1.首先在data中固定起始值为0，因为从0下标开始为默认为其添加边框
    2.为图片添加 :class="{active:skid == index}"  这里的skid为规定的起始值  index为数组的第0下标
    3.为默认图片添加完样式后   为其添加鼠标点击事件并将index传递给methods中的事件函数   
    4.事件函数内书写  this.skid = index   鼠标点击后将点击的id给到skid实现点击哪里哪里添加 
    
    
    
    放大镜和下方展示栏图片实现联动效果
    1.使用全局事件总线将展示栏的图片index传递给放大镜
    this.$bus.$emit('getindex',index) //这里的index为用户点击图片后图片所处的下标
    this.$bus.$on('getindex',(index)=>{
        this.skin = index  //这里的skin为zoom组件中data内定义的参数
    })
    2.计算属性处
    sku() {
      return this.skuImageList[···this.skin···].imgUrl;  这里需要更改
    },
    
    
    实现放大镜效果
    
    1.为左边盒子的图片添加鼠标经过事件
    2.并持续获取mask和big两个盒子，这里需要手动获取dom，需要借助ref
    <div class="spec-preview">
        <img :src="sku" />
        <div class="event" @mousemove="handler"></div>
        <div class="big" >
            <img :src="sku" ref="big"/>
        </div>
        <div class="mask" ref="mask"></div>
    </div>
    
    let mask = this.$refs.mask 
    let big = this.$refs.big
    
    //并在获取dom后将鼠标移动的距离计算出来
    let left  = event.offsetX-mask.offsetWidth  //鼠标距离盒子最左侧的距离
    let top = event.offsetY-mask.offsetHeight  //鼠标距离盒子最顶部的距离
    
    //到这里已经实现了遮罩层的移动,但是此时遮罩层是没有被限制移动距离，所以会出现负值并盒子会跑出去，需要限制移动范围
    if(left<=0) left = 0 //当盒子移动的距离小于0了，就将left设置为0
    if(left>=mask.offsetWidth) left = mask.offsetWidth  //当盒子移动的距离大于遮罩层的宽度了，就将left设置为遮罩层的宽度
    
    顶部同理
    if(top<=0) top = 0 //当盒子移动的距离小于0了，就将top设置为0
    if(top>=mask.offsetHeight) left = mask.offsetHeight  //当盒子移动的距离大于遮罩层的高度了，就将top设置为遮罩层的高度
    
    mask.style.left = left + 'px'
    mask.style.top = top + 'px'
    
    //右侧盒子内图片的移动
    big.style.left = -2 * left + 'px'
    big.style.top = -2 * top + 'px'
    
    
    //  因没有用户，所以需要创建一个游客，方可从服务器读取到购物车数据
    1.使用uuid来常见游客id
    2.新建一个uuid模块用来将随机生成的id进行本地存储，使其永久生效
    引入uuid
    普通暴露一个箭头函数
    先查询本地存储内是否存在数据
