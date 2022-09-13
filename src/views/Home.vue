<template>
  <div class="home">
    <BaiduMap />
    <TableInfo></TableInfo>
  </div>
</template>

<script>
// 引入地图组件
import BaiduMap from "@/components/BaiduMap.vue";
// 引入右侧悬浮卡片组件
import TableInfo from "@/components/TableInfo.vue";
export default {
  name: "HomeView",
  components: {
    BaiduMap,
    TableInfo,
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.home {
  height: calc(100vh - 70px);
}
</style>
