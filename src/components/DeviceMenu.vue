<template>
  <div class="deviceMenu">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      :default-active="active"
      :style="`width:${menuWidth}px;min-width:140px;`"
    >
      <el-menu-item
        v-for="(item, index) of routerInfo"
        v-if="item.show"
        :key="index"
        :index="item.index"
        :route="item.url"
      >
        <span><i :class="item.icon" />{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "DeviceMenu",
  data() {
    return {
      menuWidth: window.innerWidth * 0.09,
      active: "list",
      routerInfo: {
        list: {
          index: "list",
          url: "/deviceManage/deviceList",
          icon: "el-icon-tickets",
          name: "设备列表",
          show: true,
        },
        detail: {
          index: "detail",
          url: "/deviceManage/deviceDetails",
          icon: "el-icon-more-outline",
          name: "设备详情",
          show: false,
        },
        real: {
          index: "real",
          url: "/deviceManage/realTimeMonitoring",
          icon: "el-icon-video-camera",
          name: "设备监控",
          show: false,
        },
        history: {
          index: "history",
          url: "/deviceManage/historicalTrack",
          icon: "el-icon-film",
          name: "历史轨迹",
          show: true,
        },
        alarm: {
          index: "alarm",
          url: "/deviceManage/deviceAlarm",
          icon: "el-icon-aim",
          name: "设备报警",
          show: true,
        },
      },
    };
  },
  watch: {
    "$route.query.where": {
      handler(newVal, oldVal) {
        if (newVal !== undefined) {
          this.active = this.$route.query.where;
          // console.log('this.$route.query.where',this.$route.query.where)
          this.$router.push({
            path: this.routerInfo[this.active].url,
          });
        }
      },
      deep: true,
    },
  },
  created() {
    if (this.$route.query.where) {
      this.active = this.$route.query.where;
    }
    let deviceInfo = this.$route.query.deviceInfo;
    this.$router.push({
      path: this.routerInfo[this.active].url,
      query: {
        deviceInfo: deviceInfo,
      },
    });
  },
};
</script>

<style lang="less">
.deviceMenu {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    height: calc(100vh - 70px);
    overflow-y: auto;
    text-align: center;
  }
  .el-menu-vertical-demo i {
    color: white;
  }
  .el-menu-vertical-demo .is-active i {
    color: #f2ce91 !important;
  }
  .el-menu-item:hover i {
    color: #f2ce91 !important;
  }
}
</style>
