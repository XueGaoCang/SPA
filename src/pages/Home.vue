<template>
  <div>
    <!-- 三级联动组件：三级联动已经注册为全局组件，所以不需要在script中在引入了 -->
    <TypeNav />
    <ListContainer />
    <Recommend />
    <Rank />
    <Like />
    <Floors v-for="floor in getfloors" :key="floor.id" :floor="floor" />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer.vue";
import Recommend from "./Recommend.vue";
import Rank from "./Rank.vue";
import Like from "./Like.vue";
import Floors from "./Floors.vue";
import Brand from "./Brand.vue";
import { mapState } from "vuex";
export default {
  name: "Home",
  components: { ListContainer, Recommend, Rank, Like, Floors, Brand },
  mounted() {
    this.$store.dispatch("getFloors");
  },
  computed: {
    ...mapState({
      getfloors: (state) => state.home.getfloors,
    }),
  },
};
</script>

<style>
</style>