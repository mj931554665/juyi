export default {
  methods: {
    test(){
      console.log('测试');
    },
    initVideo(vehicleCodes,channel) {
      let videoInfo = {}
      // 2.5-视频通道信息（新天眼）
      this.$api.getVehicleCode(vehicleCodes).then((val) => {
        let data = val.data.data[0];
        // 赋值获取到的数据
        // this.VideoCarByVehicleCode = data;
        // console.log("VideoCarByVehicleCode", data);
        // 2.6-视频各通道状态（新天眼）
        this.$api.getVideoChannelState(data.terminalId).then((val) => {
          // 把通道信息分割成数组
          let data = val.data.data[0].split(",").map(Number);
          // 通道信息赋值给data数据在页面显示状态
          // this.VideoChannelState = data;
          videoInfo.ChannelState = data;
          // console.log('State',data);
        });
      });
      this.$api.getvideoPlay(vehicleCodes, channel).then((val) => {
        let data = val.data.data.split("|");
        // this.videosrc[0] = data[1];
        videoInfo.videosrc = data[1];
        this.setHeartBeat(data[2]);
        console.log('videosrc',data);
      });
      return videoInfo;
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
}