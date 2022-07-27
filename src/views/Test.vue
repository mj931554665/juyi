<template>
  <div class="RealTimeMonitoring">
    <div class="module1">
      <div class="controls">
        <div class="splitScreen">
          <span
            class="iconfont al-icona-7Ayifenping"
            title="一分屏"
            @click="splitScreen = 1"
            :class="splitScreen == 1 ? 'active' : ''"
          ></span>
          <span
            class="iconfont al-icona-7Dsifenping"
            title="四分屏"
            @click="splitScreen = 4"
            :class="splitScreen == 4 ? 'active' : ''"
          ></span>
          <span
            class="iconfont al-icona-7Iyijiawufenping"
            title="六分屏"
            @click="splitScreen = 6"
            :class="splitScreen == 6 ? 'active' : ''"
          ></span>
          <span
            class="iconfont al-icona-7Jyijiaqifenping"
            title="八分屏"
            @click="splitScreen = 8"
            :class="splitScreen == 8 ? 'active' : ''"
          ></span>
        </div>
        <p>
          <i class="el-icon-location-outline"></i>
          山东省青岛市黄岛区薛家岛街道连江路288号
        </p>
      </div>
      <div class="content">
        <div class="oneScreen" v-if="splitScreen == 1">
          <CstorLivePlayer :src="videoSrc" />
        </div>
        <div class="fourScreen" v-if="splitScreen == 4">
          <CstorLivePlayer slot="video" :src="videoSrc[0]" />

          <CstorLivePlayer slot="video" :src="videoSrc[1]" />

          <CstorLivePlayer slot="video" :src="videoSrc[2]" />

          <CstorLivePlayer slot="video" :src="videoSrc[3]" />
        </div>
        <div class="sixScreen" v-if="splitScreen == 6">
          <CstorLivePlayer slot="video" :src="videoSrc[0]" />

          <CstorLivePlayer slot="video" :src="videoSrc[1]" />

          <CstorLivePlayer slot="video" :src="videoSrc[2]" />

          <CstorLivePlayer slot="video" :src="videoSrc[3]" />

          <CstorLivePlayer slot="video" :src="videoSrc[4]" />

          <CstorLivePlayer slot="video" :src="videoSrc[5]" />
        </div>
        <div class="eightScreen" v-if="splitScreen == 8">
          <CstorLivePlayer slot="video" :src="videoSrc[0]" />

          <CstorLivePlayer slot="video" :src="videoSrc[1]" />

          <CstorLivePlayer slot="video" :src="videoSrc[2]" />

          <CstorLivePlayer slot="video" :src="videoSrc[3]" />

          <CstorLivePlayer slot="video" :src="videoSrc[4]" />

          <CstorLivePlayer slot="video" :src="videoSrc[5]" />

          <CstorLivePlayer slot="video" :src="videoSrc[6]" />

          <CstorLivePlayer slot="video" :src="videoSrc[7]" />
        </div>
      </div>
    </div>
    <div class="module2">
      <FloatCard :more="true">
        <span slot="header">设备信息</span>
        <div slot="content" class="detail">
          <!-- <p>设备名称：&nbsp;{{ deviceDetails.baseInfo.name }}</p>
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
          </p> -->
        </div>
      </FloatCard>
      <FloatCard :more="true">
        <span slot="header">视频通道</span>
        <div slot="content" class="block">
          <el-checkbox-group v-model="channel" class="channel-content">
            <el-checkbox-button
              @change="change(index)"
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
          <el-button plain>全部播放</el-button>
        </div>
      </FloatCard>
    </div>
  </div>
</template>
<script>
import FloatCard from "@/components/FloatCard.vue";
// 引入在线视频播放组件
import CstorLivePlayer from "cstor-live-player";
import "cstor-live-player/dist/cstor-live-player.css";
import mixin from "./mixin";
export default {
  mixins: [mixin],
  components: { FloatCard, CstorLivePlayer },
  data() {
    return {
      // 传入的设备编号
      vehicleCodes: "CC0260CC0277",
      // 车辆视频通道信息，包括terminalId
      VideoCarByVehicleCode: {},
      // 通道状态【0，0，0，1，0，0，0，0】
      VideoChannelState: [],
      // 分屏数据
      splitScreen: 1,
      // 开启的通道数
      channel: [1],
      // 视频地址数组
      videoSrc: "",
    };
  },
  methods: {
    /* changeChannel(chanel) {
      // this.initVideoSrc([chanel + 1]);
      this.change()
      if (this.splitScreen == 1 && this.channel.length !== 1) {
        this.videoSrc = [];
        this.channel.splice(0, this.channel.length - 1);
      }
    },
    initChannel() {
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
    },
    initVideoSrc(changeChannel) {
      let channel = changeChannel == undefined ? this.channel : changeChannel;
      this.$api.getvideoPlay(this.vehicleCodes, channel, 1).then((val) => {
        let data = val.data.data.split("|");
        this.videoSrc = data[1];
      });
    },
    change() {
      this.$api.getvideoPlay("CC0260CC0277", 2, 0).then((val) => {
        let data = val.data.data.split("|");
        this.videoSrc = data[1];
        // this.setHeartBeat(data[2]);
        console.log(data);
      });
    }, */

    change() {
      this.$api.getvideoPlay(this.vehicleCodes, 2, 0).then((val) => {
        let data = val.data.data.split("|");
        this.videoSrc = data[1];
        this.setHeartBeat(data[2]);
        console.log(data);
      });
    },
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
      this.$api.getvideoPlay(vehicleCodes, this.channel, 1).then((val) => {
        let data = val.data.data.split("|");
        this.videoSrc = data[1];
        this.setHeartBeat(data[2]);
        console.log(data);
      });
    },
    setHeartBeat(heartBeat) {
      let that = this;
      let t = null;
      t = setTimeout(time, 3000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        that.$api.getflashHeartBeat(heartBeat).then((val) => {
          // alert("21312312");
          console.log("发送心跳id了噢！！！！！！！！！！！！！！！！");
          t = setTimeout(time, 5000); //设定定时器，循环运行
        });
      }
    },
  },
  created() {
    this.initVideo();
  },
};
</script>