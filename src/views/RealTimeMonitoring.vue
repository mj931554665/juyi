<template>
  <div class="RealTimeMonitoring">
    <div class="module1">
      <div class="controls">
        <div>
          <span class="iconfont al-icona-7Ayifenping"></span>
          <span class="iconfont al-icona-7Dsifenping"></span>
          <span class="iconfont al-icona-7Iyijiawufenping"></span>
          <span class="iconfont al-icona-7Jyijiaqifenping"></span>
        </div>
        <p>
          <i class="el-icon-location-outline"></i>
          山东省青岛市黄岛区薛家岛街道连江路288号
        </p>
      </div>
      <div class="video">
        <video :src="videosrc"></video>
      </div>
      <div class="videoBottomBox">
        <div style="float: left; padding-left: 1em">
          通道1
          <div class="el-dropdown" style="cursor: pointer">
            <span>
              <i title="选择像素" class="el-icon-setting"></i>
            </span>
          </div>
          225Kbps
        </div>
        <div style="margin: 0 30px 0 0">
          <i title="录像" class="el-icon-video-camera-solid"></i>
          <i title="截图" class="el-icon-camera-solid"></i>
          <i title="全屏" class="el-icon-full-screen"></i>
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
          <p>
            设备编号：&nbsp;{{
              vehicleCodes
                ? vehicleCodes
                : "--"
            }}
          </p>
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
          <div class="channel-content">
            <div>
              <div title="通道1" class="channel-item active">
                <p :class="VideoChannelState[0] ? 'dot' : ''"></p>
                <div>通道1</div>
              </div>
            </div>
            <div>
              <div title="通道2" class="channel-item active">
                <p :class="VideoChannelState[1] ? 'dot' : ''"></p>
                <div>通道2</div>
              </div>
            </div>
            <div>
              <div title="通道3" class="channel-item active">
                <p :class="VideoChannelState[2] ? 'dot' : ''"></p>
                <div>通道3</div>
              </div>
            </div>
            <div>
              <div title="通道4" class="channel-item active">
                <p :class="VideoChannelState[3] ? 'dot' : ''"></p>
                <div>通道4</div>
              </div>
            </div>
            <div>
              <div title="通道5" class="channel-item active">
                <p :class="VideoChannelState[4] ? 'dot' : ''"></p>
                <div>通道5</div>
              </div>
            </div>
            <div>
              <div title="通道6" class="channel-item active">
                <p :class="VideoChannelState[5] ? 'dot' : ''"></p>
                <div>通道6</div>
              </div>
            </div>
            <div>
              <div title="通道7" class="channel-item active">
                <p :class="VideoChannelState[6] ? 'dot' : ''"></p>
                <div>通道7</div>
              </div>
            </div>
            <div>
              <div title="通道8" class="channel-item active">
                <p :class="VideoChannelState[7] ? 'dot' : ''"></p>
                <div>通道8</div>
              </div>
            </div>
          </div>
          <el-button plain>全部播放</el-button>
        </div>
      </FloatCard>
    </div>
  </div>
</template>
<script>
import FloatCard from "@/components/FloatCard.vue";
export default {
  components: {
    FloatCard,
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
      videosrc:''
    };
  },
  methods: {
    initVideo() {
      let vehicleCodes = this.vehicleCodes;
      this.$api.getVehicleCode(vehicleCodes).then((val) => {
        let data = val.data.data[0];
        // 赋值获取到的数据
        this.VideoCarByVehicleCode = data;
        // console.log("VideoCarByVehicleCode", data);
        this.$api.getVideoChannelState(data.terminalId).then((val) => {
          // 把通道信息分割成数组
          let data = val.data.data[0].split(",").map(Number);
          // 通道信息赋值给data数据在页面显示状态
          this.VideoChannelState = data;
          // console.log('State',data);
        });
      });
      this.$api.getvideoPlay(vehicleCodes).then((val)=>{
        let data = val.data.data.split("|");
        this.videosrc = data[1]
        console.log(data);
      })
    },
  },
  created() {
    this.initVideo();
  },
};
</script>

<style lang="less" scoped>
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

      div {
        span {
          font-size: 24px;
          margin: 0 5px;
        }
      }
    }

    .video {
      height: 467px;
      // background: url("@/assets/test/ssjk.png") no-repeat;
      // background-size: contain;
    }

    .videoBottomBox {
      display: flex;
      justify-content: space-between;
      padding: 10px 0px 10px 20px;
      margin-right: 30px;
      background: gainsboro;
      i {
        margin: 0 5px 0 0;
        cursor: pointer;
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

        .channel-item {
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
          >p{
            position: absolute;
            top: 8px;
            left: 4px;
            margin: 2.4px;
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: #13ca40;
          }
          .dot {
            background-color: #d8d8d8;
          }

          div {
            margin-left: 8px;
            margin-right: 5px;
            text-overflow: ellipsis;
            text-align: center;
            line-height: normal;
          }
        }
        .channel-item:hover{
          border-color: #f2ce91;
        }
      }

      .el-button {
        width: 100%;
      }
      .el-button:hover{
        border-color: #f2ce91;
        color: #f2ce91;
      }
      .el-button:focus{
        border-color:#f2ce91;
        color: #f2ce91;
      }
    }
  }
}
</style>