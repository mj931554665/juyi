<template>
  <div class="RealTimeMonitoring">
    <div class="module1">
      <div class="controls">
        <div class="splitScreen">
          <span
            class="iconfont al-icona-7Ayifenping"
            title="一分屏"
            @click="splitScreen = 1"
            :class="splitScreen==1?'active':''"
          ></span>
          <span
            class="iconfont al-icona-7Dsifenping"
            title="四分屏"
            @click="splitScreen = 4"
            :class="splitScreen==4?'active':''"
          ></span>
          <span
            class="iconfont al-icona-7Iyijiawufenping"
            title="六分屏"
            @click="splitScreen = 6"
            :class="splitScreen==6?'active':''"
          ></span>
          <span
            class="iconfont al-icona-7Jyijiaqifenping"
            title="八分屏"
            @click="splitScreen = 8"
            :class="splitScreen==8?'active':''"
          ></span>
        </div>
        <p>
          <i class="el-icon-location-outline"></i>
          山东省青岛市黄岛区薛家岛街道连江路288号
        </p>
      </div>
      <div class="content">
        <div class="oneScreen" v-show="splitScreen == 1">
          <VideoArea></VideoArea>
        </div>
        <div class="fourScreen" v-show="splitScreen == 4">
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
        </div>
        <div class="sixScreen" v-show="splitScreen == 6">
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
        </div>
        <div class="eightScreen" v-show="splitScreen == 8">
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
          <VideoArea></VideoArea>
        </div>
      </div>
    </div>
    <div class="module2">
      <FloatCard :more="true">
        <span slot="header">设备信息</span>
        <div slot="content" class="detail">
          <p>设备名称：&nbsp;{{ deviceDetails.baseInfo.name }}</p>
          <p>
            设备类型：&nbsp;{{
              deviceDetails.baseInfo.typeLabel
                ? deviceDetails.baseInfo.typeLabel
                : "--"
            }}
          </p>
          <p>设备编号：&nbsp;{{ vehicleCodes ? vehicleCodes : "--" }}</p>
          <p>
            设备型号：&nbsp;{{
              deviceDetails.baseInfo.modelLabel
                ? deviceDetails.baseInfo.modelLabel
                : "--"
            }}
          </p>
          <p>
            动力类型：&nbsp;{{
              deviceDetails.baseInfo.powerTypeLable
                ? deviceDetails.baseInfo.powerTypeLable
                : "--"
            }}
          </p>
          <p>
            定位状态：&nbsp;{{
              deviceDetails.baseInfo.locationState ? "已定位" : "未定位"
            }}
          </p>
        </div>
      </FloatCard>
      <FloatCard :more="true">
        <span slot="header">视频通道</span>
        <div slot="content" class="block">
          <el-checkbox-group v-model="channelInfo" class="channel-content">
            <el-checkbox-button
              v-for="(aisle,index) in VideoChannelState.slice(0, 8)"
              :label="index+1"
              :key="index"
            >
              <p class="dot" :style="'background:'+(aisle=='0'?'#13ca40':'#d8d8d8') "></p>
              通道{{ index+1 }}
            </el-checkbox-button>
          </el-checkbox-group>
          <el-button plain>全部播放</el-button>
        </div>
      </FloatCard>
    </div>
  </div>
</template>
<script>
import FloatCard from "@/components/FloatCard.vue";
import VideoArea from "@/components/VideoArea.vue";
import mixin from './mixin'
export default {
  mixins:[mixin],
  components: {
    FloatCard,
    VideoArea,
  },
  data() {
    return {
      // 设备工况数据详情
      deviceDetails: JSON.parse(
        localStorage.getItem("DeviceDetails_deviceDetails")
      ),
      // 传入的设备编号
      vehicleCodes: "CC0260CC0285",
      // 车辆视频通道信息，包括terminalId
      VideoCarByVehicleCode: {},
      // 通道状态【0，0，0，1，0，0，0，0】
      VideoChannelState: [],
      // 视频地址
      videosrc: [],
      // 分屏数据
      splitScreen: 1,
      channelInfo: [1],
    };
  },
  methods: {
    initVideo() {
      let vehicleCodes = this.vehicleCodes;
      // 2.5-视频通道信息（新天眼）
      this.$api.getVehicleCode(vehicleCodes).then((val) => {
        let data = val.data.data[0];
        // 赋值获取到的数据
        this.VideoCarByVehicleCode = data;
        // console.log("VideoCarByVehicleCode", data);
        // 2.6-视频各通道状态（新天眼）
        this.$api.getVideoChannelState(data.terminalId).then((val) => {
          // 把通道信息分割成数组
          let data = val.data.data[0].split(",").map(Number);
          // 通道信息赋值给data数据在页面显示状态
          this.VideoChannelState = data;
          // console.log('State',data);
        });
      });
      this.$api.getvideoPlay(vehicleCodes,2).then((val) => {
        let data = val.data.data.split("|");
        this.videosrc[0] = data[1];
        console.log(data);
      });
    },
  },
  created() {
    this.initVideo();
    this.test()
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
        .active{
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