<template>
  <div class="app2">
    <CstorLivePlayer style="height: 100vh" :src="videosrc" />
  </div>
</template>
<script>
import CstorLivePlayer from "cstor-live-player";
import "cstor-live-player/dist/cstor-live-player.css";
export default {
  components: { CstorLivePlayer },
  data() {
    return {
      // 传入的设备编号
      vehicleCodes: "20CC03208224",
      // 车辆视频通道信息，包括terminalId
      VideoCarByVehicleCode: {},
      // 通道状态【0，0，0，1，0，0，0，0】
      VideoChannelState: [],
      // 视频地址
      videosrc: "",
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
      this.$api.getvideoPlay(vehicleCodes).then((val) => {
        let data = val.data.data.split("|");
        this.videosrc = data[1];
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
          t = setTimeout(time, 3000); //设定定时器，循环运行
        });
      }
    },
  },
  created() {
    this.initVideo();
  },
};
</script>