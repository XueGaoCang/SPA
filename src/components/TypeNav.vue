<template>
  <div class="type-nav">
    <div class="container">
      <div @mouseenter="entershow" @mouseleave="changeleave">
        <h2 class="all">全部商品分类</h2>

        <transition name="show">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.catgoryId"
                :class="{ cur: churrIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-cater1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-cater2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-cater3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",

  data() {
    return {
      churrIndex: -1,
      show: true,
    };
  },
  mounted() {
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      categoryList: (state) => {
        return state.home.catgoryList;
      },
    }),
  },
  methods: {
    changeIndex: throttle(function (index) {
      this.churrIndex = index; //将鼠标经过的a标签id给到data中的churrIndex中来控制选中的为哪个a标签
    }, 80),
    changeleave() {
      this.churrIndex = -1;
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
    goSearch(e) {
      //商品分类跳到search路由组件中
      let elemt = e.target; //获取点击的标签属性，筛选出商品分类a标签

      let { categoryname, cater1id, cater2id, cater3id } = elemt.dataset;
      //categoryname：商品分类的名字
      //cater1id：一级标签
      //cater2id：二级标签
      //cater3id：三级标签

      if (categoryname) {
        //用来区分是否选中的为商品分类a标签
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (cater1id) {
          //判断是1级分类还是2级分类还是三级分类
          query.category1Id = cater1id; //将选中的商品分类标签id给到query中的category1Id中
        } else if (cater2id) {
          query.category2Id = cater2id;
        } else {
          query.category3Id = cater3id;
        }

        location.params = this.$route.params; //将route中的params参数一并给到location中传递给search组件
        location.query = query;
        this.$router.push(location);
      }
    },
    entershow() {
      this.show = true;
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }
        // .item:hover{
        //     background: skyblue;
        // }
        .cur {
          background-color: skyblue;
        }
      }
    }
    .show-enter {
      height: 0px;
    }
    .show-enter-to {
      height: 461px;
    }
    .show-enter-active {
      transition: all 0.5s linear;
    }

    .show-leave {
      height: 461px;
    }
    .show-leave-to {
      height: 0px;
    }
    .show-leave-active {
      transition: all 0.1s linear;
    }
  }
}
</style>