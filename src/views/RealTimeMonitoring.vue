<template>
  <div class="RealTimeMonitoring">
    <div class="module1">
      <div class="controls">
        <div class="splitScreen">
          <span class="iconfont al-icona-7Ayifenping" title="一分屏" @click="splitScreenChange(1)"
            :class="splitScreen === 1 ? 'active' : ''"></span>
          <span class="iconfont al-icona-7Dsifenping" title="四分屏" @click="splitScreenChange(4)"
            :class="splitScreen === 4 ? 'active' : ''"></span>
          <span class="iconfont al-icona-7Iyijiawufenping" title="六分屏" @click="splitScreenChange(6)"
            :class="splitScreen === 6 ? 'active' : ''"></span>
          <span class="iconfont al-icona-7Jyijiaqifenping" title="八分屏" @click="splitScreenChange(8)"
            :class="splitScreen === 8 ? 'active' : ''"></span>
        </div>
        <p>
          <i class="el-icon-location-outline"></i>
          {{
              Object.keys(this.deviceDetails).length ? deviceDetails.baseInfo.address : "--"
          }}
        </p>
      </div>
      <div class="content">
        <div :class="screenClass">
          <VideoArea v-for="(item, index) in 8" :key="item">
            <CstorLivePlayer :ref="'screen' + index" slot="video" />
          </VideoArea>
        </div>
        <!--<div class="oneScreen" v-if="splitScreen===1">
          <VideoArea v-for="(item, index) in 1" :key="item">
            <CstorLivePlayer :ref="'screen'+index" slot="video"/>
          </VideoArea>
        </div>
        <div class="fourScreen" v-if="splitScreen===4">
          <VideoArea v-for="(item, index) in 4" :key="item">
            <CstorLivePlayer :ref="'screen'+index" slot="video"/>
          </VideoArea>
        </div>
        <div class="sixScreen" v-if="splitScreen===6">
          <VideoArea v-for="(item, index) in 6" :key="item">
            <CstorLivePlayer :ref="'screen'+index" slot="video"/>
          </VideoArea>
        </div>
        <div class="eightScreen" v-if="splitScreen===8">
          <VideoArea v-for="(item, index) in 8" :key="item">
            <CstorLivePlayer :ref="'screen'+index" slot="video"/>
          </VideoArea>
        </div>-->
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
            <el-checkbox-button @change="changeChannel($event, index + 1)"
              v-for="(aisle, index) in VideoChannelState.slice(0, 8)" :label="index + 1" :key="index">
              <p v-if="false" class="dot" :style="'background:' + (aisle === '0' ? '#13ca40' : '#d8d8d8')"></p>
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
import mixin from "../utils/mixin";
import {detailWithWorkConditionData,vehicleCode,videoChannelState,videoPlay} from "@/api/zqData";

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
      let equipmentNo
      if(this.$route.params.equipmentNo){
        equipmentNo=this.$route.params.equipmentNo
        sessionStorage.setItem('equipmentNo', JSON.stringify(this.$route.params.equipmentNo))
      }else{
        equipmentNo=JSON.parse(sessionStorage.getItem('equipmentNo'))
      }
      return equipmentNo ? equipmentNo : "CC0260CB5362";
    },
    // 设备工况数据详情
    equipmentId() {
      let equipmentId
      if(this.$route.params.id){
        equipmentId=this.$route.params.id
        sessionStorage.setItem('equipmentId', JSON.stringify(this.$route.params.id))
      }else{
        equipmentId=JSON.parse(sessionStorage.getItem('equipmentId'))
      }
      return equipmentId ? equipmentId : "c1e221866ab84ae28aeb89f975a667c4";
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
      screenClass: 'oneScreen',
      deviceDetails: '' //设备详情信息
    };
  },
  watch: {
    splitScreen(v) {
      if (v === 1) {
        this.screenClass = 'oneScreen'
      } else if (v === 4) {
        this.screenClass = 'fourScreen'
      } else if (v === 6) {
        this.screenClass = 'sixScreen'
      } else if (v === 8) {
        this.screenClass = 'eightScreen'
      }
    }
  },
  destroyed() { //页面关闭
    for (let index of this.channel) {
      this.stopHeartBeat(index)
      --index
      let refInfo = this.$refs['screen' + index]
      // alert(index)
      // if (refInfo[0]) {
      //   alert(index)
      //   refInfo[0].stop() //视频终止
      // }
    }
  },
  created() {
    this.initChannel();
    this.initVideoSrc(1);
    this.initEquipmentDetail(this.equipmentId);
    // console.log(Object.keys(this.deviceDetails).length ? "1" : "2");
  },
  methods: {
    splitScreenChange(index) {
      this.splitScreen = index
      let length = this.channel.length
      if (length > index) {
        let k = this.channel.splice(index, length)
        for (let i of k) {
          this.stopHeartBeat(i)
        }
      }
    },
    selectAll() {
      this.splitScreen = 8;
      this.channel = [1, 2, 3, 4, 5, 6, 7, 8];
      for(let index of this.channel){
        this.initVideoSrc(index);
      }
    },
    /**
     * 切换通道
     * */
    changeChannel(v, index) {
      let maxChannel = Math.max.apply(null, this.channel)
      if (maxChannel <= 1) {
        this.splitScreen = 1
      } else if (maxChannel > 1 && maxChannel < 5) {
        this.splitScreen = 4
      } else if (maxChannel >= 5 && maxChannel < 7) {
        this.splitScreen = 6
      } else {
        this.splitScreen = 8
      }
      if (v) { //选中的
        this.initVideoSrc(index)
      } else {
        this.stopHeartBeat(index)

        --index
        let refInfo = this.$refs['screen' + index]
        if (refInfo[0]) {
          refInfo[0].stop() //视频终止
        }
      }
    },
    /**
     * 视频通道信息初始化
     * */
    initChannel() {
      let vehicleCodes = this.vehicleCodes;
      vehicleCode({vehicleCodes:vehicleCodes}).then(res => {
        if(res.code===200){
          let data = res.data[0];
          // 赋值获取到的数据
          this.VideoCarByVehicleCode = data;

          videoChannelState({terminalId:data.terminalId}).then((val) => {
            // 把通道信息分割成数组
            // 通道信息赋值给data数据在页面显示状态
            this.VideoChannelState = val.data[0].split(",").map(Number);
            // console.log('State',data);
          });
        }
      });
    },
    initEquipmentDetail(equipmentId){
      detailWithWorkConditionData(equipmentId).then(res => {
        if(res.code===200){
          // 赋值设备实时工况数据
          this.deviceDetails = res.data
        }
      })
    },
    /**
     * 连接对应的视频通道
     * */
    initVideoSrc(index) {
      let params={
        // 整车编号
        vehicleCode: this.vehicleCodes,
        // 终端类型 1上车 2下车
        videoTerType: 1,
        // 通道号
        channel: index,
        // 视频地址类型0 rtmp 1http-flv
        videoAddrType: 1,
        // 视频清晰度 0高清 1流畅
        streamType: 0,
      }
      videoPlay(params).then((val) => {
        let data = val.data.split("|");
        this.setHeartBeat(data[2], index);

        --index
        let refInfo = this.$refs['screen' + index]
        if (refInfo[0]) {
          refInfo[0].play(data[1]) //视频启动开始
        }
      });
    },
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

  .FloatCard-item-header>span:before {
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

      >div {
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