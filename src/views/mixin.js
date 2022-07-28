export default {
  methods: {
    // 发送实时监控心跳id
    setHeartBeat(heartBeat) {
      let that = this;
      let t = null;
      t = setTimeout(time, 3000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        that.$api.getflashHeartBeat(heartBeat).then(val => {
          console.log("发送心跳id了噢！！！！！！！！！！！！！！！！");
          t = setTimeout(time, 3000); //设定定时器，循环运行
        });
      }
    },
  },
}