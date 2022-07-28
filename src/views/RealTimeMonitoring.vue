<template>
  <div class="RealTimeMonitoring">
    <div class="module1">
      <div class="controls">
        <div class="splitScreen">
          <span
            class="iconfont al-icona-7Ayifenping"
            title="一分屏"
            @click="splitScreen = 1"
            :class="splitScreen === 1 ? 'active' : ''"
          ></span>
          <span
            class="iconfont al-icona-7Dsifenping"
            title="四分屏"
            @click="splitScreen = 4"
            :class="splitScreen === 4 ? 'active' : ''"
          ></span>
          <span
            class="iconfont al-icona-7Iyijiawufenping"
            title="六分屏"
            @click="splitScreen = 6"
            :class="splitScreen === 6 ? 'active' : ''"
          ></span>
          <span
            class="iconfont al-icona-7Jyijiaqifenping"
            title="八分屏"
            @click="splitScreen = 8"
            :class="splitScreen === 8 ? 'active' : ''"
          ></span>
        </div>
        <p>
          <i class="el-icon-location-outline"></i>
          {{
              Object.keys(this.deviceDetails).length ? deviceDetails.baseInfo.address : "--"
            }}
        </p>
      </div>
      <div class="content">
        <div class="oneScreen" v-if="splitScreen === 1">
          <VideoArea>
            <CstorLivePlayer slot="video" :src="videoSrc[0]" />
          </VideoArea>
        </div>
        <div class="fourScreen" v-if="splitScreen === 4">
          <VideoArea v-for="(item, index) in 4" :key="item">
            <CstorLivePlayer slot="video" :src="videoSrc[index]" />
          </VideoArea>
        </div>
        <div class="sixScreen" v-if="splitScreen === 6">
          <VideoArea v-for="(item, index) in 6" :key="item">
            <CstorLivePlayer slot="video" :src="videoSrc[index]" />
          </VideoArea>
        </div>
        <div class="eightScreen" v-if="splitScreen === 8">
          <VideoArea v-for="(item, index) in 8" :key="item">
            <CstorLivePlayer slot="video" :src="videoSrc[index]" />
          </VideoArea>
        </div>
      </div>
    </div>
    <div class="module2">
      <FloatCard :more="true">
        <span slot="header">设备信息</span>
        <div slot="content" class="detail">
          <p>
            设备名称：&nbsp;{{
              Object.keys(this.deviceDetails).length ? deviceDetails.baseInfo.name : "--"
            }}
          </p>
          <p>
            设备类型：&nbsp;{{
              Object.keys(this.deviceDetails).length ? deviceDetails.baseInfo.typeLabel : "--"
            }}
          </p>
          <p>设备编号：&nbsp;{{ vehicleCodes ? vehicleCodes : "--" }}</p>
          <p>
            设备型号：&nbsp;{{
              Object.keys(this.deviceDetails).length ? deviceDetails.baseInfo.modelLabel : "--"
            }}
          </p>
          <p>
            动力类型：&nbsp;{{
              Object.keys(this.deviceDetails).length
                ? deviceDetails.baseInfo.powerTypeLable
                : "--"
            }}
          </p>
          <p>
            定位状态：&nbsp;{{
              Object.keys(this.deviceDetails).length
                ? deviceDetails.baseInfo.locationState
                  ? "已定位"
                  : "未定位"
                : "--"
            }}
          </p>
        </div>
      </FloatCard>
      <FloatCard :more="true">
        <span slot="header">视频通道</span>
        <div slot="content" class="block">
          <el-checkbox-group v-model="channel" class="channel-content">
            <el-checkbox-button
              @change="changeChannel(index)"
              v-for="(aisle, index) in VideoChannelState.slice(0, 8)"
              :label="index + 1"
              :key="index"
            >
              <p
                class="dot"
                :style="'background:' + (aisle == '0' ? '#13ca40' : '#d8d8d8')"
              ></p>
              通道{{ index + 1 }}
            </el-checkbox-button>
          </el-checkbox-group>
          <el-button plain @click="selectAll">全部播放</el-button>
        </div>
      </FloatCard>
    </div>
  </div>
</template>
<script>
import FloatCard from "@/components/FloatCard.vue";
import VideoArea from "@/components/VideoArea.vue";
// 引入在线视频播放组件
import CstorLivePlayer from "cstor-live-player";
import "cstor-live-player/dist/cstor-live-player.css";
import mixin from "./mixin";
export default {
  mixins: [mixin],
  components: {
    FloatCard,
    VideoArea,
    CstorLivePlayer,
  },
  computed: {
    // 传入的设备编号
    vehicleCodes() {
      return this.$route.params.equipmentNo
        ? this.$route.params.equipmentNo
        : "CC0400CC0007";
    },
      // 设备工况数据详情
    deviceDetails(){
      return this.$route.params.deviceDetails
        ? this.$route.params.deviceDetails
        : {};
    }
  },
  data() {
    return {
      // 车辆视频通道信息，包括terminalId
      VideoCarByVehicleCode: {},
      // 通道状态【0，0，0，1，0，0，0，0】
      VideoChannelState: [],
      // 分屏数据
      splitScreen: 1,
      // 开启的通道数
      channel: [1],
      // 视频地址数组
      videoSrc: [],
    };
  },
  methods: {
    selectAll() {
      this.splitScreen = 8;
      this.channel = [1, 2, 3, 4, 5, 6, 7, 8];
      this.initVideoSrc();
    },
    changeChannel() {
      // this.videoSrc=[]
      this.initVideoSrc();
    },
    initChannel() {
      let vehicleCodes = this.vehicleCodes;
      this.$api.getVehicleCode(vehicleCodes).then(val => {
        let data = val.data.data[0];
        // 赋值获取到的数据
        this.VideoCarByVehicleCode = data;
        // console.log("VideoCarByVehicleCode", data);
        this.$api.getVideoChannelState(data.terminalId).then(val => {
          // 把通道信息分割成数组
          let data = val.data.data[0].split(",").map(Number);
          // 通道信息赋值给data数据在页面显示状态
          this.VideoChannelState = data;
          // console.log('State',data);
        });
      });
    },
    initVideoSrc() {
      // let videoArr = [];
      if (this.splitScreen === 1 && this.channel.length !== 1) {
        this.channel.splice(0, this.channel.length - 1);
      }
      this.channel.forEach(val => {
        this.$api.getvideoPlay(this.vehicleCodes, val, 0).then(val => {
          let data = val.data.data.split("|");
          if (this.videoSrc.indexOf(data[1]) > -1) {
          } else {
            switch (this.splitScreen) {
              case 1:
                this.videoSrc.push(data[1]);
                this.videoSrc = this.videoSrc.slice(0, 1);
                break;
              case 4:
                this.videoSrc.push(data[1]);
                this.videoSrc = this.videoSrc.slice(0, 4);
                break;
              case 6:
                this.videoSrc.push(data[1]);
                this.videoSrc = this.videoSrc.slice(0, 6);
                break;
              case 8:
                this.videoSrc.push(data[1]);
                this.videoSrc = this.videoSrc.slice(0, 8);
                break;

              default:
                this.videoSrc.push(data[1]);
                break;
            }
          }
        });
      });
      // this.videoSrc = videoArr;
    },
  },
  created() {
    this.initChannel();
    this.initVideoSrc();
    console.log(Object.keys(this.deviceDetails).length ? "1" : "2");
  },
};
</script>

<style lang="less">
@import "@/assets/test/font/iconfont.css";

.RealTimeMonitoring {
  box-sizing: border-box;
  min-height: calc(100vh - 70px);
  display: flex;
  padding: 40px;
  .FloatCard-item-header > span:before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 12px;
    margin-right: 10px;
    background: #f2ce91;
    border-radius: 1px;
  }

  .module1 {
    position: relative;
    flex: 7;
    margin: 0px 10px 0 0px;
    background-color: #fff;
    padding: 10px;

    .controls {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 5px;
      border-bottom: 1px gray dashed;

      .splitScreen {
        span {
          font-size: 24px;
          margin: 0 5px;
          cursor: pointer;
        }
        .active {
          color: #fbb134;
        }
      }
    }
    .content {
      height: calc(100% - 30px);
      > div {
        height: 100%;
        .VideoArea {
          outline: #13ca40 solid 1px;
          .panel.idle {
            background-size: contain;
          }
        }
      }
      .oneScreen {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
      }
      .fourScreen {
        display: grid;
        grid-template-rows: 1fr 1fr;
        grid-template-columns: 1fr 1fr;
      }
      .sixScreen {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr;
        .VideoArea:nth-child(1) {
          grid-row-end: span 2;
          grid-column-end: span 2;
        }
      }
      .eightScreen {
        display: grid;
        grid-template-rows: 1fr 1fr 1fr 1fr;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        .VideoArea:nth-child(1) {
          grid-row-end: span 3;
          grid-column-end: span 3;
        }
      }
    }
  }

  .module2 {
    flex: 3;
    .FloatCard-module {
      height: calc(50% - 5px);
    }
    .detail {
      height: 100%;
      padding: 0 0 0 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .block {
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;

      .channel-content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .el-checkbox-button {
          .el-checkbox-button__inner {
            position: relative;
            width: 76px;
            height: 25px;
            margin: 10px 10px;
            line-height: 25.6px;
            color: #999;
            background: #fff;
            border: 1px solid #d8d8d8;
            border-radius: 3.2px;
            cursor: pointer;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 0;
            box-shadow: none;

            .dot {
              position: absolute;
              top: 50%;
              left: 8px;
              transform: translateY(-55%);
              width: 5px;
              height: 5px;
              border-radius: 50%;
              background: #13ca40;
            }
          }
        }
        .is-checked {
          .el-checkbox-button__inner {
            background: rgba(242, 206, 145, 0.2);
            color: #fbb134;
          }
        }
      }

      .el-button {
        width: 100%;
      }
      .el-button:hover {
        border-color: #f2ce91;
        color: #f2ce91;
      }
      .el-button:focus {
        border-color: #f2ce91;
        color: #f2ce91;
      }
    }
  }
}
</style>