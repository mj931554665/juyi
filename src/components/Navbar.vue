<template>
  <div id="Navbar">
    <!-- loge预留区域 -->
    <router-link to="/"><div class="logo"></div></router-link>
    <el-menu
      :default-active="activeIndex"
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
        <template slot="title">
          <span @click="deviceAdmin('list')">设备管理</span>
        </template>
        <el-menu-item index="2-1" @click="deviceAdmin('list')"
          >设备列表</el-menu-item
        >
        <!-- <el-menu-item index="2-2" @click="deviceAdmin('detail')"
          >设备详情</el-menu-item
        >
        <el-menu-item index="2-3" @click="deviceAdmin('real')"
          >实时监控</el-menu-item
        > -->
        <el-menu-item index="2-4" @click="deviceAdmin('history')"
          >历史轨迹</el-menu-item
        >
        <el-menu-item index="2-5" @click="deviceAdmin('alarm')"
          >设备报警</el-menu-item
        >
      </el-submenu>
      <el-menu-item index="3" route="/electricFence">电子围栏</el-menu-item>
      <el-menu-item index="4" route="/equipmentCondition"
        >设备工况</el-menu-item
      >
      <!-- <el-menu-item index="5" route="/riskAlert">风险报警</el-menu-item> -->
      <el-menu-item @click="screenRule">钜亿安全监控大屏</el-menu-item>
    </el-menu>
    <!-- 用户操作按钮 -->
    <div class="user">
      <i class="el-icon-s-custom"></i>
      <div class="username">
        {{
          name ? name : "noUserName"
        }}
      </div>
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      isCollapse: true,
      activeIndex: "1",
      // 用户名
      // userInfo: JSON.parse(localStorage.getItem("Login_userInfo")),
    };
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    "$route.name": function (newVal) {
      // console.log("newVal", newVal);
      // alert(newVal)
      // 为了防止和原有的高亮更新操作冲突，这里只更新自己需要的路由
      if (
        newVal == "deviceList" ||
        newVal == "deviceDetails" ||
        newVal == "realTimeMonitoring" ||
        newVal == "deviceManage"
      ) {
        console.log("2-1");
        // 为 :default-active 绑定的值 activepath 重新赋值，从而实现菜单栏的高亮更新
        this.activeIndex = "2-1";
      } else if (newVal == "historicalTrack") {
        console.log("2-4");
        this.activeIndex = "2-4";
      } else if (newVal == "deviceAlarm") {
        console.log("2-5");
        this.activeIndex = "2-5";
      }
    },
  },
  methods: {
    deviceAdmin(info) {
      this.$router.push({
        path: "/deviceManage",
        query: {
          where: info,
        },
      });
    },
    screenRule() {
      let routeLink = this.$router.resolve({
        path: "/screen",
      });
      window.open(routeLink.href, "_blank");
    },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
    sideChange() {
      this.isCollapse = !this.isCollapse;
      localStorage.setItem("isCollapse", this.isCollapse);
      // localStorage.setItems('isCollapse',this.isCollapse)
    },
  },
  created() {
    if (localStorage.getItem("isCollapse") == "true") {
      this.isCollapse = true;
    } else if (localStorage.getItem("isCollapse") == "false") {
      this.isCollapse = false;
    }
    // setInterval(() => {
    //   console.log('this.activeIndex',this.activeIndex)
    // }, 1000);
  },
};
</script>
<style lang="less">
#Navbar {
  position: relative;
  z-index: 99;
  height: 100%;
  background-color: #ff0000;
  font-weight: bold;
  display: flex;
  background: #2c2b30;
  min-width: 1200px;
  overflow: hidden;
  // border-bottom: solid 10px #f2ce90;
  .logo {
    width: 170px;
    height: 70px;
    background: url("@/assets/images/logo.png") no-repeat;
    background-size: contain;
    background-position-y: center;
    margin: 0 25px 0 35px;
    cursor: pointer;
  }
  .el-menu-item,
  .el-submenu__title {
    height: 70px;
    line-height: 70px;
  }
  .el-menu.el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu-item:hover,
  .el-submenu__title:hover,
  .el-submenu__title:hover i {
    background-color: #2c2b30 !important;
    color: #f2ce91 !important;
  }
  .user {
    position: absolute;
    display: flex;
    right: 100px;
    top: 50%;
    transform: translateY(-50%);
    color: rgb(245, 245, 247);
    font-size: 14px;
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
.el-menu.el-menu--popup.el-menu--popup-bottom-start {
  min-width: 116px !important;
  font-weight: bold !important;
}
</style>
