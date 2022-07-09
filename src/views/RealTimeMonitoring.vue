<template>
  <div class="RealTimeMonitoring">
    <div class="navbar">

      <el-breadcrumb separator=">">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item>设备列表</el-breadcrumb-item>
        <el-breadcrumb-item active>实时监控</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="operate">
        <div class="fullScreen">
          <div class="btn">
            <i class="el-icon-full-screen"></i>
          </div>
        </div>

        <div class="userMenu">
          <div class="btn">
            <div style="margin-left: 5px;" class="username">userName</div>
            <i style="margin-left: 10px;" class="el-icon-arrow-down"></i>
          </div>
        </div>
      </div>

    </div>

    <div class="content">
      <div class="module1">
        <div class="mainWarp">
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
          <div class="map"></div>
          <div class="videoBottomBox">
            <div style="float: left; padding-left: 1em;">
              通道1
              <div class="el-dropdown" style="cursor: pointer;">
                <span>
                  <i title="选择像素" class="el-icon-setting"></i>
                </span>
              </div>
              225Kbps
            </div>
            <div style="margin: 0 30px 0 0;">
              <i title="录像" class="el-icon-video-camera-solid"></i>
              <i title="截图" class="el-icon-camera-solid"></i>
              <i title="全屏" class="el-icon-full-screen"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="module2">
        <div class="mainWarp">
          <div class="card1">
            <h1>设备信息</h1>
            <div>
              <p>设备名称：271</p>
              <p>设备类型： 履带式起重机</p>
              <p>车 牌 号： --</p>
              <p>设备编号： CC0260CC0277</p>
            </div>
          </div>
          <div class="card2">
            <h1>视频通道
            </h1>
            <div class="block">
              <div class="channel-content">
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道1" class="channel-item active">
                    <div data-v-7a856cc4="">通道1</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道2" class="channel-item active">
                    <div data-v-7a856cc4="">通道2</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道3" class="channel-item active">
                    <div data-v-7a856cc4="">通道3</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道4" class="channel-item active">
                    <div data-v-7a856cc4="">通道4</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道5" class="channel-item active">
                    <div data-v-7a856cc4="">通道5</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道6" class="channel-item active">
                    <div data-v-7a856cc4="">通道6</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道7" class="channel-item active">
                    <div data-v-7a856cc4="">通道7</div>
                  </div>
                </div>
                <div data-v-7a856cc4="">
                  <div data-v-7a856cc4="" title="通道8" class="channel-item active">
                    <div data-v-7a856cc4="">通道8</div>
                  </div>
                </div>
              </div>
              <el-button plain>全部播放</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}
</script>
<style lang="less">
@import '@/assets/test/font/iconfont.css';

.RealTimeMonitoring {
  .content {
    background-color: #dfdfdf;
    display: flex;
    margin: 30px 0 0 0;
    padding: 0 0 50px 0;

    .module1 {
      margin: 10px 10px 0 10px;
      background-color: #fff;
      padding: 10px;
      border-radius: 10px;

      .mainWarp {
        position: relative;

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

        .map {
          width: 960px;
          height: 450px;
          // padding-bottom: 30px;
          background: url('@/assets/test/ssjk.png') no-repeat;
          background-size: contain;
        }

        .videoBottomBox {
          display: flex;
          justify-content: space-between;
          padding: 10px 0px 10px 20px;
          margin-right: 30px;
          background: gainsboro;
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;

          i {
            margin: 0 5px 0 0;
            cursor: pointer;
          }
        }
      }
    }

    .module2 {
      background-color: #fff;
      margin: 10px 20px 0 0;
      padding: 10px;
      border-radius: 10px;

      .mainWarp {
        .card1 {
          background-color: #efefef;
          border-radius: 10px;
          padding: 0 0 20px 0;

          h1 {
            height: 48px;
            border-bottom: 1px gray dashed;
            font-size: 20px;
            line-height: 48px;
            text-align: center;
          }

          p {
            color: #635d5d;
            margin: 30px 0 10px 10px;
          }
        }

        .card2 {
          margin: 20px 0 0 0;
          background-color: #efefef;
          border-radius: 10px;

          h1 {
            height: 48px;
            border-bottom: 1px gray dashed;
            font-size: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px
          }

          .block {
            height: 100%;
            display: flex;
            align-items: center;
            flex-direction: column;

            .channel-content {
              width: 100%;
              display: flex;
              flex-wrap: wrap;
              justify-content: space-between;
              // height: 200px;

              .channel-item {
                position: relative;
                // margin: 0 8px 9.6px 0;
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

                &:before {
                  position: absolute;
                  top: 8px;
                  left: 4px;
                  display: block;
                  margin: 2.4px;
                  content: "";
                  width: 4px;
                  height: 4px;
                  background: #13ca40;
                  border-radius: 50%;
                }

                div {
                  padding-left: 7.8px;
                  margin-right: 4.8px;
                  text-overflow: ellipsis;
                  text-align: center;
                  line-height: normal;
                }
              }
            }

            .el-button {
              width: 80%;
              margin: 100px 0 20px 0;
            }
          }
        }
      }
    }
  }
}
</style>