<template>
  <div>
    <el-container style="overflow: hidden;">
      <el-header height="100" style="padding: 0">
        <NavbarVue />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import NavbarVue from "../components/Navbar.vue";

export default {
  components: {
    NavbarVue,
  },
};
</script>

<style>
/* 消除element布局自带内边距 */
.el-card__body,
.el-main {
  padding: 0 !important;
}
</style>
