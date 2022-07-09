<template>
  <div>
    <el-container style="height: 100%;">
      <el-aside style="width: auto;min-height: 100vh;">
        <NavbarVue />
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>

import NavbarVue from "../components/Sidebar.vue";

export default {
components: {
    NavbarVue
  }
}
</script>

<style>
/* 消除element布局自带内边距 */
.el-card__body, .el-main{
  padding: 0 !important;
}
</style>