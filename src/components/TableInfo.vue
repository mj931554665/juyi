<template>
  <div class="table-info">
    <!-- 右侧 -->
    <div class="data_display">
      <!-- 上面的功能按钮 -->
      <div class="show_action">
        <div class="header">
          <div class="bg">
            <!-- 收起卡片按钮 -->
            <div @click="showContent = !showContent">
              <FuncBtn :isShadow="true">
                <i
                  :style="
                    showContent
                      ? 'transform: rotate(90deg)'
                      : 'transform: rotate(270deg)'
                  "
                  class="el-icon-d-arrow-left"
                  slot="content"
                ></i>
              </FuncBtn>
            </div>
            <!-- 网页全屏按钮 -->
            <FuncBtn :isScreen="true" :isShadow="true"></FuncBtn>
            <!-- 跳转数字大屏 -->
            <FuncBtn :isShadow="true">
              <span slot="content" @click="screenRule">数字大屏</span>
            </FuncBtn>
            <!-- 退出登录，或者用户操作按钮 -->
            <div @click="LoginOut">
              <FuncBtn :isShadow="true">
                <div slot="content" style="display: flex">
                  <i class="el-icon-s-custom"></i>
                  <div style="margin-left: 5px" class="username">
                    {{
                      userInfo.user.userName
                        ? userInfo.user.userName
                        : "noUserName"
                    }}
                  </div>
                  <!-- <i style="margin-left: 10px" class="el-icon-arrow-down"></i> -->
                </div>
              </FuncBtn>
            </div>
          </div>
        </div>
      </div>
      <!-- 下面的展示数据模块 -->
      <div class="content" v-show="showContent">
        <FloatCard>
          <span slot="header">设备在线统计</span>
          <div slot="content" class="onlineStatus">
            <div style="display: flex;justify-content: space-between;">
              <div>
              <i class="el-icon-success" style="color: #00d893"></i>
              <span
                >在线设备：<span>{{ onlineStatus[1].amount }}</span></span
              >
            </div>
            <div>
              <i class="el-icon-remove" style="color: gray"></i>
              <span
                >离线设备：<span>{{ onlineStatus[0].amount }}</span></span
              >
            </div>
            </div>
            <br />
            <br />
            <div class="warning">
              <div>
                <i class="el-icon-warning" style="color: #ff4620"></i>
                <span
                  >{{ onlineStatus[2].typeLabel }}:
                  <span>{{ onlineStatus[2].amount }}</span></span
                >
              </div>
              <div>
                <i class="el-icon-warning" style="color: #ff9a00"></i>
                <span
                  >{{ onlineStatus[3].typeLabel }}:
                  <span>{{ onlineStatus[3].amount }}</span></span
                >
              </div>
              <div>
                <i class="el-icon-warning" style="color: #fbc800"></i>
                <span
                  >{{ onlineStatus[4].typeLabel }}:
                  <span>{{ onlineStatus[4].amount }}</span></span
                >
              </div>
            </div>
          </div>
        </FloatCard>
        <FloatCard>
          <span slot="header"> 数据监控 </span>
          <div slot="content" class="dataMonitoring">
            <div class="showData">
              <i style="color: #7f70f6" class="el-icon-s-unfold"></i>
              <p>设备总数</p>
              <h4>{{ totalDevicesNum[0].amount }}</h4>
            </div>
            <div class="showData">
              <i style="color: #3ad4ff" class="el-icon-s-platform"></i>
              <p>监控设备</p>
              <h4>{{ hasVideoNum }}</h4>
            </div>
            <div class="showData">
              <i style="color: #fd6d4c" class="el-icon-location"></i>
              <p>定位设备</p>
              <h4>{{ locationStateNum[0].amount }}</h4>
            </div>
            <div class="showData">
              <i style="color: #fecc51" class="el-icon-s-claim"></i>
              <p>今日开工</p>
              <h4>{{ carStatusNum }}</h4>
            </div>
          </div>
        </FloatCard>
        <FloatCard>
          <span slot="header">设备数据总计</span>
          <div slot="content" class="totalData">
            <div class="row">
              <div class="icon">
                <i class="el-icon-time" style="color: #89e5ff"></i>
                <P>累计工时</P>
              </div>
              <div class="datarow">
                <div class="data">0</div>
                <div class="data">8</div>
                <div class="data">1</div>
                <div class="data">7</div>
                <div class="data">6</div>
                <div class="data">5</div>
                <div class="data">0</div>
              </div>
              <!-- <span>h</span> -->
            </div>
            <div class="row">
              <div class="icon">
                <i class="el-icon-news" style="color: #fca491"></i>
                <P>起重总量</P>
              </div>
              <div class="datarow">
                <div class="data">0</div>
                <div class="data">0</div>
                <div class="data">3</div>
                <div class="data">0</div>
                <div class="data">5</div>
                <div class="data">6</div>
                <div class="data">5</div>
              </div>
              <!-- <span>T</span> -->
            </div>
            <div class="row">
              <div class="icon">
                <i class="el-icon-stopwatch" style="color: #8ff9d0"></i>
                <P>起重力矩</P>
              </div>
              <div class="datarow">
                <div class="data">0</div>
                <div class="data">1</div>
                <div class="data">9</div>
                <div class="data">2</div>
                <div class="data">2</div>
                <div class="data">3</div>
                <div class="data">3</div>
              </div>
              <!-- <span style="font-size: 12px;">T*<br />M</span> -->
            </div>
          </div>
        </FloatCard>
      </div>
    </div>
  </div>
</template>
<script>
import FloatCard from "@/components/FloatCard.vue";
import FuncBtn from "@/components/FuncBtn.vue";
export default {
  name: "TableInfo",
  components: {
    FloatCard,
    FuncBtn,
  },
  data() {
    return {
      showContent: true,
      totalDevicesNum: JSON.parse(localStorage.getItem("Home_totalDevicesNum")),
      userInfo: JSON.parse(localStorage.getItem("Login_userInfo")),
      locationStateNum: JSON.parse(
        localStorage.getItem("Home_locationStateNum")
      ),
      hasVideoNum: 0,
      carStatusNum: 0,
    };
  },
  props: {
    onlineStatus: Array,
    deviceList: Object,
  },
  methods: {
    screenRule() {
      let routeLink = this.$router.resolve({
        path: "/screen",
      });
      window.open(routeLink.href, "_blank");
    },
    LoginOut() {
      this.$confirm("是否退出登录?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已退出登录!",
          });
          this.$router.replace({ path: "/login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "退出登录失败！",
          });
        });
    },
    // 初始化第二张卡片的数据
    initData() {
      let deviceList = this.deviceList.rows;
      let hasVideoNum = 0,
        carStatusNum = 0;
      deviceList.forEach((item, key) => {
        if (item.hasVideo) {
          hasVideoNum++;
        }
        if (item.carStatus == 8) {
          carStatusNum++;
        }
      });
      this.hasVideoNum = hasVideoNum;
      this.carStatusNum = carStatusNum;
      // console.log(carStatusNum);
    },
  },
  created() {
    this.initData();
  },
};
</script>
<style lang="less" scoped>
.data_display {
  width: 324px;
  height: calc(100vh - 60px);
  position: fixed;
  top: 65px;
  right: 10px;
  .show_action {
    // padding: 0 10px;
    min-height: 56px;
    // overflow: hidden;
    position: relative;
    margin-top: 12px;
    .header {
      width: 300px;
      height: 36px;
      display: flex;
      justify-content: space-around;
      .bg {
        width: 100%;
        display: flex;
        justify-content: space-around;
        .el-icon-arrow-down {
          font-size: 16px;
        }
        .el-icon-s-custom {
          font-size: 20px;
        }
      }
    }
  }
  .content {
    max-height: calc(100vh - 100px);
    width: 300px;
    .FloatCard-module {
      border-radius: 5px;
      box-shadow: 0 1px 4px rgb(0 0 0 / 27%), 0 0 40px rgb(0 0 0 / 6%);
    }
    .onlineStatus {
      .warning {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        div {
          margin-bottom: 5px;
        }
      }
    }
    .dataMonitoring {
      display: flex;
      text-align: center;
      justify-content: space-between;
      .showData {
        i {
          font-size: 44px;
          opacity: 0.6;
        }
        p {
          font-size: 12px;
          font-weight: 400;
          line-height: 18px;
        }
        h4 {
          font-size: 18px;
          font-weight: 600;
          line-height: 25px;
        }
      }
    }
    .totalData {
      display: flex;
      flex-direction: column;
      .row {
        display: flex;
        margin-bottom: 4px;
        align-items: center;
        .icon {
          width: 50px;
          height: 44px;
          margin-right: 10px;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          i {
            font-size: 22px;
          }
          P {
            font-size: 12px;
            margin: 5px 0;
          }
        }
        .datarow {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-right: 10px;
          border-radius: 6px;
          background-color: #efefef;
          border: 2px solid gray;
          // box-shadow: 2px 2px 5px 1px #000000;
          overflow: hidden;
          .data {
            width: 26px;
            height: 40px;
            color: #000;
            font-size: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            // outline: #d8d8d8 1px solid;
            // background: #000
            // url(data:image/png;base64,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);
            // background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>
