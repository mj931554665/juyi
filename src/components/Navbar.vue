<template>
  <div id="Navbar">
    <!-- loge预留区域 -->
    <router-link style="margin-right: 40px;" to="/"><div class="logo"></div></router-link>
    <el-menu
      :default-active="activeIndex2"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#2c2b30"
      active-background-color="#000"
      text-color="#f5f5f7"
      active-text-color="#f2ce91"
      :router="true"
    >
      <el-menu-item index="1" active route="/">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">设备列表</template>
        <el-menu-item index="2-1" route="/deviceDetails">设备详情</el-menu-item>
        <el-menu-item index="2-2" route="/realTimeMonitoring"
          >实时监控</el-menu-item
        >
        <!-- <el-menu-item index="2-3">视频回放</el-menu-item> -->
        <el-menu-item index="2-4" route="/historicalTrack"
          >历史轨迹</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="3" route="/electricFence">电子围栏</el-menu-item>
      <el-menu-item index="4" route="/equipmentCondition"
        >设备工况</el-menu-item
      >
      <el-menu-item index="5" route="/riskAlert">风险报警</el-menu-item>
      <el-menu-item @click="screenRule">数字化大屏</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isCollapse: true,
    };
  },
  methods: {
    screenRule() {
      let routeLink = this.$router.resolve({
        path: "/screen",
      });
      window.open(routeLink.href, "_blank");
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    sideChange() {
      this.isCollapse = !this.isCollapse;
      console.log(this.isCollapse);
      localStorage.setItem("isCollapse", this.isCollapse);
      console.log(this.isCollapse);
      console.log(111);
      // localStorage.setItems('isCollapse',this.isCollapse)
    },
  },
  created() {
    if (localStorage.getItem("isCollapse") == "true") {
      this.isCollapse = true;
    } else if (localStorage.getItem("isCollapse") == "false") {
      this.isCollapse = false;
    }
  },
};
</script>
<style lang="less">
#Navbar {
  z-index: 99;
  height: 100%;
  background-color: #ff0000;
  font-weight: bold;
  display: flex;
  background: #2c2b30;
  // border-bottom: solid 10px #f2ce90;
  .logo{
    width: 170px;
    height: 60px;
    background: url("@/assets/images/s-juyilogo.png") no-repeat;
    background-size: contain;
    background-position-y: center;
    margin: 0 20px;
    cursor: pointer;
  }
  .el-menu.el-menu--horizontal{
    border-bottom:none ;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover,
  .el-submenu__title:hover i {
    background-color: #2c2b30 !important;
    color: #f2ce91 !important;
  }
}
/* 因为导航一般来说只存在一个，所以没用id限制 */
.el-menu-item-group__title {
  padding: 0 !important;
}
.el-menu-item:hover {
  background-color: #2c2b30 !important;
  color: #f2ce91 !important;
}
.el-menu.el-menu--popup.el-menu--popup-bottom-start{
  min-width: 116px !important;
}
</style>