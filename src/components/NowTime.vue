<template>
  <span class="NowTime" title="当前时间"></span>
</template>

<script>
export default {
  created() {
    let t = null;
    t = setTimeout(time, 1000); //開始运行
    // clearTimeout(t); //清除定时器
    function time() {
      let dt = new Date();
      let y = dt.getFullYear();
      let mt = dt.getMonth() + 1;
      let day = dt.getDate();
      let h = dt.getHours(); //获取时
      let m = dt.getMinutes(); //获取分
      let s = dt.getSeconds(); //获取秒
      document.querySelector(".NowTime").innerHTML =
        y + "-" + mt + "-" + day + " -" + h + ":" + m + ":" + s;
    }
  },
};
</script>

<style>
</style>