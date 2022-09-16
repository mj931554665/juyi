<template>
  <div class="table-info" v-if="isshow">
    <!-- 右侧 -->
    <div class="data_display">
      <!-- 上面的功能按钮 -->
      <div class="show_action">
        <div class="header">
          <div class="bg">
            <!-- 收起卡片按钮 -->
            <div @click="showContent = !showContent">
              <div class="shadow btn">
                <i
                  :style="
                    showContent
                      ? 'transform: rotate(90deg)'
                      : 'transform: rotate(270deg)'
                  "
                  class="el-icon-d-arrow-left"
                  slot="content"
                ></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 下面的展示数据模块 -->
      <div class="content" v-show="showContent">
        <FloatCard>
          <span slot="header">设备在线统计</span>
          <div slot="content" class="onlineStatus">
            <div style="display: flex; justify-content: space-between">
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
              <h4>{{ totalDevicesNum }}</h4>
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
                <div class="data">{{ workTime[6] ? workTime[6] : 0 }}</div>
                <div class="data">{{ workTime[5] ? workTime[5] : 0 }}</div>
                <div class="data">{{ workTime[4] ? workTime[4] : 0 }}</div>
                <div class="data">{{ workTime[3] ? workTime[3] : 0 }}</div>
                <div class="data">{{ workTime[2] ? workTime[2] : 0 }}</div>
                <div class="data">{{ workTime[1] ? workTime[1] : 0 }}</div>
                <div class="data">{{ workTime[0] ? workTime[0] : 0 }}</div>
              </div>
              <!-- <span>h</span> -->
            </div>
            <div class="row">
              <div class="icon">
                <i class="el-icon-news" style="color: #fca491"></i>
                <P>吨位总数</P>
              </div>
              <div class="datarow">
                <div class="data">{{ totalTonnage[6] ? totalTonnage[6] : 0 }}</div>
                <div class="data">{{ totalTonnage[5] ? totalTonnage[5] : 0 }}</div>
                <div class="data">{{ totalTonnage[4] ? totalTonnage[4] : 0 }}</div>
                <div class="data">{{ totalTonnage[3] ? totalTonnage[3] : 0 }}</div>
                <div class="data">{{ totalTonnage[2] ? totalTonnage[2] : 0 }}</div>
                <div class="data">{{ totalTonnage[1] ? totalTonnage[1] : 0 }}</div>
                <div class="data">{{ totalTonnage[0] ? totalTonnage[0] : 0 }}</div>
              </div>
              <!-- <span>T</span> -->
            </div>
            <!-- <div class="row">
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
            </div> -->
          </div>
        </FloatCard>
        <!-- <FloatCard>
          <span slot="header">设备类型统计</span>
          <div slot="content" class="deviceType">

          </div>
        </FloatCard> -->
      </div>
    </div>
  </div>
</template>
<script>
import FloatCard from "@/components/FloatCard.vue";
import {mapGetters} from 'vuex'
import {onLineStatus,equipmentAmountByType,equipmentAmountByLocated,queryEquipmentsByPage,selectList} from "@/api/zqData";

export default {
  name: "TableInfo",
  components: {
    FloatCard,
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      // 整个页面是否显示（未获取到数据就暂时不显示
      isshow: false,
      // 卡片折叠功能
      showContent: true,
      // 设备在线状态
      onlineStatus: [],
      // 用户名
      // userInfo: JSON.parse(localStorage.getItem("Login_userInfo")),
      // 设备总数
      totalDevicesNum: 0,
      // 定位设备的数量
      locationStateNum: [],
      // 有监控终端的数量
      hasVideoNum: 0,
      // 开工设备数量
      carStatusNum: 0,
      // 有定位的设备列表
      deviceList: {},
      // 所有设备工作时长总数
      workTime: 0,
      // 所有设备吨位总数
      totalTonnage: 0,
    };
  },
  methods: {
    // 获取设备列表数据
    getQueryEquipmentsByPage() {
      // 获取已定位的设备总数显示在地图上
      let param={
        pageNum:0,
        pageSize:9999
      }
      queryEquipmentsByPage(param).then((val) => {
        this.deviceList = val.data;
        this.initData();
      });
      let params={
        equipmentNo: '',
        name: '',
        plateNo: '',
        types: [],
        pageNum: 1,
        pageSize: 9999
      }
      // 获取所有设备的累计工作时间
      selectList(params).then((res) => {
        res.data.rows.forEach((item) => {
          // 去除吨位的多余文字或者单位（获取设备吨位总数
          let tonnage = item.modelLabel ? item.modelLabel : 0;
          this.totalTonnage += parseInt(tonnage.replace(/[^\d]/g, ""));
          // 获取所有设备的工作时长
          this.workTime += parseInt(item.workTime ? item.workTime : 0);
        });
        // 反转字符串
        this.workTime = this.workTime.toString().split("").reverse().join("");
        this.totalTonnage = this.totalTonnage.toString().split("").reverse().join("");
        // console.log('this.Tonnage',this.Tonnage)
      });
    },
    // 获取设备上线，风险，定位数据 函数
    getOnLineStatus() {
      onLineStatus().then((val) => {
        this.onlineStatus = val.data;
        this.isshow = true
      });
    },
    // 获取设备总数
    getTotalDevicesNum() {
      equipmentAmountByType().then(val=>{
        val.data.forEach((item) => {
          this.totalDevicesNum += item.amount;
        });
      })
    },
    // 获取设备定位数
    getEquipmentAmountByLocated() {
      equipmentAmountByLocated().then(val=>{
        this.locationStateNum = val.data;
        // console.log('this.locationStateNum',this.locationStateNum)
      })
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
    },
  },
  created() {
    // 获取设备列表信息
    this.getQueryEquipmentsByPage();
    // 获取设备上线，风险，故障，定位数据
    this.getOnLineStatus();
    // 获取设备总数
    this.getTotalDevicesNum();
    // 获取定位设备数
    this.getEquipmentAmountByLocated();
  },
};
</script>
<style lang="less" scoped>
.table-info {
  font-size: 1.6em;
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
          justify-content: space-between;

          .btn {
            height: 36px;
            padding: 0px 10px;
            border-radius: 8px;
            background-color: #efefef;
            border: 1px solid #abaeb8;
            color: rgb(0, 0, 0);
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }
          .shadow {
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27),
              0 0 40px rgba(0, 0, 0, 0.06);
          }
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
            }
          }
        }
      }
    }
  }
}
</style>
