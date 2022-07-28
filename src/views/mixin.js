import Vue from 'vue'
export default {
  data(){
    return {
      timeEvent: {}
    }
  },
  methods: {
    // 发送实时监控心跳id
    setHeartBeat(heartBeat,channel) {
      let that = this;
      let event = setTimeout(time, 3000); //開始运行
      Vue.set(that.timeEvent,channel,event)
      function time() {
        that.$api.getflashHeartBeat(heartBeat).then((val) => {
          console.log("发送心跳id了噢！！！！！！！！！！！！！！！！");
          // that.timeEvent = setTimeout(time, 3000); //设定定时器，循环运行
          let event = setTimeout(time, 3000);//设定定时器，循环运行
          Vue.set(that.timeEvent,channel,event)
        });
      }
    },
    stopHeartBeat(channel){
      if(Object.keys(this.timeEvent).length){
        clearTimeout(this.timeEvent[channel]); //清除定时器
        Vue.delete(this.timeEvent,channel) //对象删除属性
      }
    }
  },
}