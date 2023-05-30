<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
  mounted() {
    this.$store.dispatch("catgoryList"); //typeNav中向vuex传递服务器数据
  },
};
</script>

<style>
</style>