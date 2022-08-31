<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>
<script>
export default {
  created() {},
};
</script>
<style lang="less">
.amap-logo {
  display: none !important;
  opacity: 0 !important;
}
.amap-copyright {
  display: none !important;
  opacity: 0 !important;
}
</style>
