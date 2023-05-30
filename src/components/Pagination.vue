<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNo == 1" @click="$emit('pageTime', pageNo - 1)">
      上一页
    </button>
    <button v-if="startNum.start > 1" @click="$emit('pageTime', 1)">1</button>
    <button v-if="startNum.start > 2">...</button>
    <!-- 中 -->
    <button
      v-for="(page, index) in startNum.end"
      v-if="page >= startNum.start"
      :key="index"
      @click="$emit('pageTime', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <!-- 下 -->
    <button v-if="startNum.end < totalpage - 1">···</button>
    <button
      v-if="startNum.end < totalpage"
      @click="$emit('pageTime', totalpage)"
    >
      {{ totalpage }}
    </button>
    <button
      :disabled="pageNo == totalpage"
      @click="$emit('pageTime', pageNo + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
<script>
export default {
  name: "Pagination",
  props: ["pageNo", "pageSize", "total", "continues"],
  computed: {
    totalpage() {
      //Math.ceil为向上取整   取得总的页数
      return Math.ceil(this.total / this.pageSize);
    },
    startNum() {
      const { pageNo, continues, totalpage } = this;
      let start = 0;
      let end = 0;
      if (continues > totalpage) {
        start = 1;
        end = totalpage;
      } else {
        //正常现象，总的页码数大于5
        start = pageNo - parseInt(continues / 2); //起始的页码
        end = pageNo + parseInt(continues / 2); //结束的页码
        //特殊情况如果出现负数
        if (start <= 0) {
          start = 1; //如果起始页码出现小于等于0的情况下就给start赋值1
          end = continues; //结束页码为continues
        }
        if (end > totalpage) {
          end = totalpage;
          //
          start = totalpage - continues + 1;
        }
      }
      return { start, end };
    },
  },
};
</script>
  
<style lang="less" scoped>
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 35px;
    line-height: 35px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>