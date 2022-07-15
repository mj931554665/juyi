<template>
  <div id="Sidebar">
    <!-- loge预留区域 -->
    <!-- <div><router-link style="height: 30px;width: 100%;display: inline-block;" to="/">
    </router-link></div> -->

    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#409EFF"
      text-color="rgba(255,255,255,.7)"
      active-text-color="rgba(255,255,255,1)"
      :router="true"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" route="/">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>设备管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1" route="/deviceList">设备列表</el-menu-item>
          <el-menu-item index="2-2" route="/electricFence"
            >电子围栏</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-s-data"></i>
          <span>数据报表</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1" route="/equipmentCondition"
            >设备工况</el-menu-item
          >
          <el-menu-item index="3-2" route="/deviceAlarm">设备报警</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="4" route="/deviceDetails">
        <i class="el-icon-tickets"></i>
        <span slot="title">设备详情</span>
      </el-menu-item>

      <el-menu-item index="5" route="/realTimeMonitoring">
        <i class="el-icon-monitor"></i>
        <span slot="title">实时监控</span>
      </el-menu-item>

      <el-menu-item index="6" route="/historicalTrack">
        <i class="el-icon-place"></i>
        <span slot="title">历史轨迹</span>
      </el-menu-item>

      <el-menu-item index="7" route="/riskAlert">
        <i class="el-icon-warning-outline"></i>
        <span slot="title">风险报警</span>
      </el-menu-item>

      <el-menu-item index="8" route="/login">
        <i class="el-icon-tickets"></i>
        <span slot="title">登录页</span>
      </el-menu-item>
    </el-menu>

    <div class="sidebarControl" @click="sideChange">
      <i style="color:#fff" :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
    </div>
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
#Sidebar {
  // position: fixed;
  z-index: 99;
  height: 100%;
  background-color: #409eff;

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .sidebarControl {
    position: absolute;
    left: 20px;
    bottom: 20px;
    font-size: 28px;
  }
  .el-menu {
    border: none;
  }
  .el-menu-item i,.el-submenu i{
    color: rgba(255, 255, 255,.9);
  }
}
/* 因为导航一般来说只存在一个，所以没用id限制 */
.el-menu-item-group__title {
  padding: 0 !important;
}
</style>