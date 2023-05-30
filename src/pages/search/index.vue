<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread :面包屑组件-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchparams.categoryName">
              {{ searchparams.categoryName }}<i @click="clicks">×</i>
            </li>
            <li class="with-x" v-if="searchparams.keyword">
              {{ searchparams.keyword }}<i @click="clickskeyword">×</i>
            </li>
            <li class="with-x" v-if="searchparams.trademark">
              {{ searchparams.trademark.split(":")[1]
              }}<i @click="clickstrademark">×</i>
            </li>
            <li
              class="with-x"
              v-for="(Att, index) in searchparams.props"
              :key="index"
            >
              {{ Att.split(":")[1] }}<i @click="removeatt(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector
          @trademarkinfroe="trademarkinfroe"
          @removeattrs="removeattrs"
        />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{ active: inforOne }" @click="inforasc(1)">
                  <a
                    >综合
                    <span
                      v-if="inforOne"
                      class="iconfont"
                      :class="{
                        'icon-arrowtopdot': inforAsc,
                        'icon-dianzan-down-xian': inforDesc,
                      }"
                    >
                    </span>
                  </a>
                </li>
                <li :class="{ active: inforTowe }" @click="inforasc(2)">
                  <a
                    >价格
                    <span
                      v-if="inforTowe"
                      class="iconfont"
                      :class="{
                        'icon-arrowtopdot': inforAsc,
                        'icon-dianzan-down-xian': inforDesc,
                      }"
                    >
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 商品展示区 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                    >
                      {{ good.title }}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 传递进入假数据 -->
          <!-- 
            这传递的四个属性分别为
            当前页码，每页展示的数据条数，总的数据条数，连续的页码数
           -->
          <!-- total为服务器中的数据需要通过mapstart来捞取到 -->
          <Pagination
            :pageNo="searchparams.pageNo"
            :pageSize="searchparams.pageSize"
            :total="total"
            :continues="5"
            @pageTime="pageTime"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";
export default {
  name: "Search",
  data() {
    return {
      //post数据传参，一共可以传递十个参数
      //searchparams:为响应式数据
      searchparams: {
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
        order: "1:desc", //1：为综合  desc：为降序  asc:升序
        //默认的页码
        pageNo: 1,
        //页面展示几条数据
        pageSize: 5,
        props: [],
        trademark: "",
      },
    };
  },
  //在服务器发送数据之前，替换发送的数据来筛选出需要的数据并展示
  beforeMount() {
    //使用ES6数据拼接来将数据合并起来
    //将参二和参三的数据合并到参一当中去
    Object.assign(this.searchparams, this.$route.query, this.$route.params);
  },
  //生命周期钩子
  mounted() {
    this.getSearch();
  },
  //注册组件
  components: {
    SearchSelector,
  },
  //计算属性
  computed: {
    ...mapGetters(["goodsList"]),
    ...mapState({
      total: (state) => {
        //取出服务器中对应数据的总条数
        return state.search.searchList.total;
      },
    }),
    inforOne() {
      return this.searchparams.order.includes("1");
    },
    inforTowe() {
      return this.searchparams.order.includes("2");
    },
    inforAsc() {
      return this.searchparams.order.includes("asc");
    },
    inforDesc() {
      return this.searchparams.order.includes("desc");
    },
  },
  //将dispatch封装成一个函数，并且在需要的时候进行调用
  //dispatch的第二个参数为，data中的对象
  methods: {
    getSearch() {
      this.$store.dispatch("searchList", this.searchparams);
      // console.log(this.searchparams);
    },
    //面包屑
    clicks() {
      //带给服务器的参数如果没有数据， 赋值undefined可以减少服务器携带的参数，降低响应事件
      this.searchparams.categoryName = undefined;
      this.searchparams.category1Id = undefined;
      this.searchparams.category2Id = undefined;
      this.searchparams.category3Id = undefined;
      this.getSearch();
      if (this.$route.params) {
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    //面包屑关键字
    clickskeyword() {
      this.searchparams.keyword = undefined;
      this.getSearch();
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    //品牌面包屑
    trademarkinfroe(trademark) {
      this.searchparams.trademark = trademark.tmId + ":" + trademark.tmName;
      this.getSearch();
    },
    clickstrademark() {
      this.searchparams.trademark = undefined;
      // this.$router.push({ name: "search" });
      this.getSearch();
    },
    //属性面包屑
    removeattrs(attrs, atters) {
      let props = `${attrs.attrId}:${atters}:${attrs.attrName}`;
      //数组去重
      if (this.searchparams.props.indexOf(props) === -1) {
        this.searchparams.props.push(props);
      }
      this.getSearch();
    },
    removeatt(index) {
      //
      this.searchparams.props.splice(index, 1);
      this.getSearch();
    },
    //排序操作
    inforasc(flage) {
      //order的1/2
      let chanFlage = this.searchparams.order.split(":")[0];
      //order的desc/asc
      let chanDA = this.searchparams.order.split(":")[1];
      //空字符串用于存放新拼接的order
      let newOrfer = "";
      //判断用户点击的是不是综合 是则拼接综合字段  Z
      if (flage == chanFlage) {
        newOrfer = `${chanFlage}:${chanDA == "desc" ? "asc" : "desc"}`;
      } else {
        newOrfer = `${flage}:${chanDA == "desc" ? "asc" : "desc"}`; //
      }
      this.searchparams.order = newOrfer;
      this.getSearch();
    },
    //排序的自定义事件
    pageTime(age) {
      this.searchparams.pageNo = age;
      this.getSearch();
    },
  },
  //监听路由的信息是否发生变化，如果发生变化，再次发起请求
  watch: {
    $route(newValue, oldValue) {
      //再次发请求之前整理带给服务器的参数
      Object.assign(this.searchparams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getSearch();
      //每一次请求完毕，把响应的1，2，3级分类的id置空，让他接受下一次的传递过来的1，2，3级分类id
      this.searchparams.category1Id = "";
      this.searchparams.category2Id = "";
      this.searchparams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 200px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: 3px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>