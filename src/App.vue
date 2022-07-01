<template>
  <div id="app">
    <el-container style="height: 100%;">
      <el-aside style="width: auto;height: 100vh;">
        <NavbarVue />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <!-- style="margin-left:64px"  -->

  </div>
</template>
<script>
import NavbarVue from "./components/Sidebar.vue";
export default {
  components: {
    NavbarVue
  }
}

</script>
<style lang="less">
.el-card__body, .el-main{
  padding: 0 !important;
}
</style>
