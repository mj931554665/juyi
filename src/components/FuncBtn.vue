<template>
  <div class="btn" @click="fullScreen()" :class="isShadow ? 'shadow' : ''" :style="`background-color: $(bcolor);`">
    <slot name="content">
      <i class="el-icon-full-screen"></i>
    </slot>
  </div>
</template>

<script>
export default {
  props: ["isScreen","isShadow"],
  data() {
    return {
      ScreenStatus: false,
    };
  },
  methods: {
    //全屏
    fullScreen() {
      if (this.isScreen) {
        if (!this.ScreenStatus) {
          // 全屏方法
          let el = document.documentElement;
          let rfs =
            el.requestFullScreen ||
            el.webkitRequestFullScreen ||
            el.mozRequestFullScreen ||
            el.msRequestFullScreen;

          //typeof rfs != "undefined" && rfs
          if (rfs) {
            rfs.call(el);
          } else if (typeof window.ActiveXObject !== "undefined") {
            //for IE，这里其实就是模拟了按下键盘的F11，使浏览器全屏
            let wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
              wscript.SendKeys("{F11}");
            }
          }
          // 修改屏幕状态数据
          this.ScreenStatus = true;
        } else {
          //退出全屏
          let el = document;
          let cfs =
            el.cancelFullScreen ||
            el.webkitCancelFullScreen ||
            el.mozCancelFullScreen ||
            el.exitFullScreen;

          //typeof cfs != "undefined" && cfs
          if (cfs) {
            cfs.call(el);
          } else if (typeof window.ActiveXObject !== "undefined") {
            //for IE，这里和fullScreen相同，模拟按下F11键退出全屏
            let wscript = new ActiveXObject("WScript.Shell");
            if (wscript != null) {
              wscript.SendKeys("{F11}");
            }
          }
          // 修改屏幕状态数据
          this.ScreenStatus = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.btn {
  height: 36px;
  padding: 0px 10px;
  border-radius: 8px;
  background-color: #efefef;
  border: 1px solid #abaeb8;
  color: rgb(0, 0, 0);
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
.shadow{
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.27), 0 0 40px rgba(0, 0, 0, 0.06);
}
</style>