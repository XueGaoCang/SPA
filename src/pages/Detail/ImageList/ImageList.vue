<template>
  <div class="swiper-container" ref="skuImageList">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(p, index) in skuImageList" :key="p.id">
        <img
          :src="p.imgUrl"
          :class="{ active: skid == index }"
          @click="chkclass(index)"
        />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
//引入swiper
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      skid: 0,
    };
  },
  props: ["skuImageList"],
  //监听skuImageList如果数据发送变化且v-for也循环完毕后,为其添加轮播效果
  watch: {
    skuImageList() {
      //延迟触发，在v-for循环完毕后触发
      this.$nextTick(() => {
        new Swiper(this.$refs.skuImageList, {
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          slidesPerView: 2,
        });
      });
    },
  },
  methods: {
    chkclass(index) {
      this.skid = index;
      //使用全局事件总线将索引值传递给兄弟组件zoom来使得上下图片联动起来
      this.$bus.$emit('getindex',index)
    },
  },
};
</script>
<!-- 
  点击图片为其添加样式边框
1.首先在data中固定起始值为0，因为从0下标开始为默认为其添加边框
2.为图片添加 :class="{active:skid == index}"  这里的skid为规定的起始值  index为数组的第0下标
3.为默认图片添加完样式后   为其添加鼠标点击事件并将index传递给methods中的事件函数   
4.事件函数内书写  this.skid = index   鼠标点击后将点击的id给到skid实现点击哪里哪里添加 

 -->
<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;
    margin-left: 33px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>