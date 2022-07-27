<template>
  <div class="VideoArea">
    <slot name="video"></slot>
    <div class="videoBottomBox" v-if="false">
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
</template>

<script>
export default {};
</script>

<style lang="less">
.VideoArea {
  .videoContent {
    height: 100%;
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
</style>