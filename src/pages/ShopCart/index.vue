<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(p, index) in cartInfoList" :key="p.skuId">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="p.isChecked"
              @click="checked(p, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="p.imgUrl" />
            <div class="item-msg">{{ p.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ p.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="add(-1, p, 'arr')"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="p.skuNum"
              minnum="1"
              class="itxt"
              @click="add($event.target.value * 1, p, 'met')"
            />
            <a href="javascript:void(0)" class="plus" @click="add(1, p, 'add')"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ p.skuPrice * p.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="Delete(p)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isCheckedAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ total }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.$store.dispatch("getshopstre");
  },
  computed: {
    ...mapGetters(["getList"]),
    cartInfoList() {
      return this.getList.cartInfoList || [];
    },
    total() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        // sum = item.
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    isCheckedAll() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
  methods: {
    //
    getData() {
      this.$store.dispatch("getshopstre");
    },
    add(disNum, id, name) {
      console.log(id);
      // this.$store.dispatch("postShop", { skuId: id, skuNum});
      switch (name) {
        case "add":
          disNum = 1;
          break;
        case "arr":
          disNum = id.skuNum > 1 ? -1 : 0;
          break;
        case "met":
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            disNum = parseInt(disNum) - id.skuNum;
          }
          break;
      }
      try {
        //成功后向服务器传递数据
        this.$store.dispatch("postShop", { skuId: id.skuId, skuNum: disNum });
        //并在传递后在此调用捞取服务器最新的数据
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //若点击后的操作需要向服务器传递参数并重现渲染页面，就要使用async  await发送promise对象
    async Delete(id) {
      try {
        await this.$store.dispatch("deleteshopId", id.skuId);
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
    async checked(p, event) {
      try {
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("getChecked", {
          skuId: p.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },

    async deleteAll() {
      try {
        await this.$store.dispatch("deleteAll");
        this.getData();
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 31px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>