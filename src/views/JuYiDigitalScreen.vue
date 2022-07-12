<template>
  <div class="DigitalScreen" style="min-width: 1024px; min-height: 100vh">
    <header>
      <h1>钜亿安全监控云平台</h1>
      <div class="showTime" style="display: flex">
        <span class="time">当前时间：2022年2月2日-22时22分22秒</span>
        <FuncBtn
          :isScreen="true"
          style="
            border: none;
            color: #fff;
            background: none;
            height: auto;
            margin-left: 10px;
            font-size: 24px;
          "
        ></FuncBtn>
      </div>
    </header>
    <!-- 页面主体部分 -->
    <div class="mainbox">
      <div class="column">
        <!-- 封装一个公共样式 panel ，内部再放对应的图表 -->
        <div class="panel line">
          <h2>
            工作时长
            <a></a>
            <a></a>
          </h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel line2">
          <h2>租赁状态</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel pie">
          <h2>设备类型{{ deviceIdList }}</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>30565</li>
              <li>192233</li>
            </ul>
          </div>
          <div class="no-bd">
            <ul>
              <li>总起重总量（吨）</li>
              <li>总起重力矩（吨*米）</li>
            </ul>
          </div>
        </div>
        <div class="map">
          <div class="map1"></div>
          <div class="map2"></div>
          <div class="map3"></div>
          <div class="chart"></div>
        </div>
      </div>
      <div class="column">
        <div class="panel pie2">
          <h2>地区分布</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel bar2">
          <h2>年限分析</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
        <div class="panel bar">
          <h2>到期统计</h2>
          <div class="baoxian">
            <p>
              保险到期 <span><span>0</span> ▶</span>
            </p>
            <p>
              证件到期 <span><span>0</span> ▶</span>
            </p>
            <p>
              特种设备检验到期 <span><span>0</span> ▶</span>
            </p>
          </div>
          <div class="panel-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import FuncBtn from "@/components/FuncBtn.vue";
export default {
  components: {
    FuncBtn,
  },
  computed:{
    deviceIdList(){
      let list = JSON.parse(localStorage.getItem("Screen_deviceList")).rows;
      let countWeekData = [];
      let count = 0;
      list.forEach(item=>{
        this.getDeviceDetails(item.id).then(val=>{
          count++;
          console.log(count,'---',val);
        })
        // countWeekData.push();
      })
      console.log(countWeekData);
      return 'test';
    }
  },
  data() {
    return {
      // 五个图表的数据
      barOutLineHData: {
        percentage: [5, 24, 26, 40, 3],
        data: [5, 59, 38, 35, 8],
        count: [59, 59, 59, 59, 59],
      },
      lineStackVData: {
        date: ["6/30", "7/01", "7/02", "7/03", "7/04", "7/05", "7/06"],
        average: [3.65, 7.75, 8.45, 10.05, 11.75, 5.59, 3.75],
        actual: [4.9, 7.5, 8.9, 12.5, 15.8, 4.7, 4],
      },
      lineCrossVData: {
        date: [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "26",
          "28",
          "29",
          "30",
        ],
        actual: [
          30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 20, 40, 30, 40, 30, 40, 30,
          40, 30, 60, 20, 40, 20, 40, 30, 60, 20, 40, 20, 40,
        ],
        expected: [
          50, 30, 50, 60, 10, 50, 30, 50, 60, 40, 60, 40, 80, 30, 50, 60, 10,
          50, 30, 70, 20, 50, 10, 40, 50, 30, 70, 20, 50, 10, 40,
        ],
      },
      pieBlueData: {
        type: ["汽车吊", "履带吊", "塔吊", "辅助设备", "其他"],
        typeNum: [
          { value: 0, name: "汽车吊" },
          { value: 145, name: "履带吊" },
          { value: 0, name: "塔吊" },
          { value: 0, name: "辅助设备" },
          { value: 0, name: "其他" },
        ],
        color: ["#065afb", "#277fbc", "#06f2ab", "#e696ab", "#06a0ab"],
      },
      pieNDGEData: {
        data: [
          { value: 20, name: "云南" },
          { value: 26, name: "北京" },
          { value: 24, name: "山东" },
          { value: 25, name: "湖南" },
          { value: 20, name: "福建" },
          { value: 25, name: "浙江" },
          { value: 30, name: "江苏" },
          { value: 42, name: "广东" },
        ],
        color: [
          "#006cff",
          "#60cda0",
          "#ed8884",
          "#ff9f7f",
          "#0096ff",
          "#9fe6b8",
          "#32c5e9",
          "#1d9dff",
        ],
      },
      // 地图数据
      mapData: JSON.parse(localStorage.getItem("Screen_deviceList")),
      rarr: [],
      robj: {},
    };
  },
  methods: {
    async getDeviceDetails(id) {
      return await this.$api.getDetailWithWorkConditionData(id);
    },
    fullScreen() {
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
    },
    // 外边框柱形图
    barOutLineH() {
      let chart = echarts.init(document.querySelector(".bar2 .chart"));
      // 声明颜色数组
      let myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        // legend: {},
        grid: {
          top: "10%",
          left: "22%",
          // right: '4%',
          bottom: "10%",
          // containLabel: true
        },
        xAxis: {
          // 不显示x轴
          show: false,
          // type: 'value',
          // boundaryGap: [0, 0.01]
        },
        yAxis: [
          {
            //不显示y轴线条
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            // y轴文字的颜色设置为白色
            axisLabel: {
              color: "#fff",
            },
            type: "category",
            // y轴更换第一个对象更换data数据
            data: ["2022", "2021", "2020", "2019", "2018"],
            inverse: true,
          },
          {
            // 是否显示
            show: true,
            //不显示y轴线条
            axisLine: {
              show: false,
            },
            // 不显示刻度
            axisTick: {
              show: false,
            },
            // y轴文字的颜色设置为白色
            axisLabel: {
              color: "#fff",
              fontSize: 12,
              // 文字的显示格式
              formatter: "{value}%",
            },
            type: "category",
            // y轴更换第二个对象更换data数据
            data: this.barOutLineHData.percentage,
          },
        ],
        series: [
          {
            // 给series  第一个对象里面的 添加
            yAxisIndex: 0,
            name: "设备数",
            // 柱子之间的距离
            barCategoryGap: 50,
            //柱子的宽度
            barWidth: 10,
            // 2. 给 itemStyle  里面的color 属性设置一个 返回值函数
            itemStyle: {
              // 柱子设为圆角
              borderRadius: 20,
              // params 传进来的是柱子对象
              color: function (param) {
                // dataIndex 是当前柱子的索引号
                return myColor[param.dataIndex];
              },
            },
            type: "bar",
            data: this.barOutLineHData.data,
            // 图形上的文本标签
            label: {
              show: true,
              // 图形内显示
              position: "inside",
              // 文字的显示格式
              formatter: "{c}",
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          {
            // 给series  第二个对象里面的 添加
            yAxisIndex: 1,
            name: "最大数",
            type: "bar",
            barCategoryGap: 50,
            barWidth: 15,
            itemStyle: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              borderRadius: 15,
            },
            data: this.barOutLineHData.count,
          },
        ],
      };
      // 3.把配置项给实例对象
      chart.setOption(option);
      // 4.让图表跟随屏幕自适应
      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
    // 层叠折线图
    lineStackV() {
      {
        // 1,实例化对象
        const chart = echarts.init(document.querySelector(".line .chart"));
        // 2,指定配置
        let option = {
          color: ["#00f2f1", "#ed3f35"],
          tooltip: {
            trigger: "axis",
          },
          legend: {
            textStyle: {
              color: "#4c9bfd",
            },
            right: "10%",
          },
          grid: {
            top: "20%",
            left: "3%",
            right: "4%",
            bottom: "3%",
            show: true, //显示边框
            borderColor: "#012f4a", //边框颜色
            containLabel: true, //包含刻度在里面
          },
          xAxis: {
            type: "category",
            data: this.lineStackVData.date,
            // 去除刻度线
            axisTick: false,
            // 文本颜色
            axisLabel: {
              color: "#4c9bfd",
            },
            // 去除轴线
            axisLine: {
              show: false,
            },
            // 去除轴内间距
            boundaryGap: false,
          },
          yAxis: {
            type: "value",
            // 去除刻度线
            axisTick: false,
            // 文本颜色
            axisLabel: {
              color: "#4c9bfd",
            },
            // 分割线颜色
            splitLine: {
              lineStyle: {
                color: "#012f4a",
              },
            },
          },
          series: [
            {
              name: "平均时长",
              data: this.lineStackVData.average,
              type: "line",
              stack: "Total",
              // 折线平滑度
              smooth: 0.5,
            },
            {
              name: "实际时长",
              data: this.lineStackVData.actual,
              type: "line",
              stack: "Total",
              // 折线平滑度
              smooth: 0.5,
            },
          ],
        };

        // 3,把配置给实例对象
        chart.setOption(option);
        // 4,图表跟随屏幕自适应
        window.addEventListener("resize", function () {
          chart.resize();
        });
      }
    },
    // 交叉折线图
    lineCrossV() {
      // 1,实例化对象
      const chart = echarts.init(document.querySelector(".line2 .chart"));
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["实际租出", "预计租出"],
          textStyle: {
            fontSize: "12",
            color: "rgba(255,255,255,.5)",
          },
        },
        toolbox: {},
        grid: {
          left: "10",
          top: "30",
          right: "10",
          bottom: "10",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            // x轴更换数据
            data: this.lineCrossVData.date,
            // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: "12",
            },
            // x轴线的颜色为   rgba(255,255,255,.2)
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.2)",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisTick: { show: false },
            axisLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
            axisLabel: {
              color: "rgba(255,255,255,.6)",
              fontSize: 12,
            },
            // 修改分割线的颜色
            splitLine: {
              lineStyle: {
                color: "rgba(255,255,255,.1)",
              },
            },
          },
        ],
        series: [
          {
            name: "实际租出",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 5,
            showSymbol: false,
            lineStyle: {
              color: "#0184d5",
              width: 2,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(1, 132, 213, 0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(1, 132, 213, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            itemStyle: {
              color: "#0184d5",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            data: this.lineCrossVData.actual,
          },
          {
            name: "预计租出",
            type: "line",
            smooth: true,
            // 设置拐点 小圆点
            symbol: "circle",
            // 拐点大小
            symbolSize: 5,
            // 开始不显示拐点， 鼠标经过显示
            showSymbol: false,
            lineStyle: {
              color: "#00d887",
              width: 2,
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: "rgba(0, 216, 135, 0.4)",
                  },
                  {
                    offset: 0.8,
                    color: "rgba(0, 216, 135, 0.1)",
                  },
                ],
                false
              ),
              shadowColor: "rgba(0, 0, 0, 0.1)",
            },
            // 设置拐点颜色以及边框
            itemStyle: {
              color: "#00d887",
              borderColor: "rgba(221, 220, 107, .1)",
              borderWidth: 12,
            },
            data: this.lineCrossVData.expected,
          },
        ],
      };
      chart.setOption(option);
      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
    // 蓝色饼图
    pieBlue() {
      const chart = echarts.init(document.querySelector(".pie .chart"));
      let option = {
        title: {
          // text: "主标题",
        },
        legend: {
          // 竖向排列
          orient: "vertical",
          top: "center",
          right: "10%",
          align: "left",
          itemGap: 6,
          itemWidth: 10, // 设置宽度
          itemHeight: 10, // 设置高度
          // 修改图例组件的文字为 12px
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 12,
          },
          data: this.pieBlueData.type,
          formatter: function (name) {
            let data = option.series[0].data;
            // console.log(data, 'data')
            let total = 0;
            let tarValue;
            for (let i = 0; i < data.length; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value;
              }
            }
            let v = tarValue + "";
            //计算出百分比
            let p = Math.round((tarValue / total) * 100) + "%";
            return `${name}  ${v} `;
            //name是名称，v是数值
          },
        },
        series: [
          {
            name: "设备类型占比",
            type: "pie",
            //  修改内圆半径和外圆半径为  百分比是相对于容器宽度来说的
            radius: ["40%", "60%"],
            // 设置饼形图在容器中的位置
            center: ["40%", "45%"],
            avoidLabelOverlap: false,
            // 不显示标签文字
            label: {
              //echarts饼图内部显示百分比设置
              show: true,
              position: "outside", //outside 外部显示  inside 内部显示
              formatter: `{c}`,
              color: "#ffffff", //颜色
              fontSize: 12, //字体大小
            },
            // 显示连接线
            labelLine: {
              // 连接扇形图线长
              length: 15,
              // 连接文字线长
              length2: 20,
            },
            data: this.pieBlueData.typeNum,
            color: this.pieBlueData.color,
          },
        ],
      };

      chart.setOption(option);
      // 4. 让图表跟随屏幕自动的去适应
      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
    // 南丁格尔饼形图
    pieNDGE() {
      // 南丁格尔玫瑰图
      const chart = echarts.init(document.querySelector(".pie2 .chart"));

      let option = {
        tooltip: {
          show: true,
        },
        legend: {
          bottom: "0",
          textStyle: {
            color: "rgba(255,255,255,.5)",
            fontSize: 10,
          },
          itemWidth: 10,
          itemHeight: 10,
        },
        series: [
          {
            // 自定义饼图颜色
            color: this.pieNDGEData.color,
            name: "地区分布",
            type: "pie",
            radius: ["10%", "70%"],
            center: ["50%", "45%"],
            roseType: "radius",
            itemStyle: {
              borderRadius: 8,
              fontSize: "10px",
            },
            // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
            label: {
              fontSize: 10,
              color: "rgba(255,255,255,.8)",
            },
            // 引导线调整
            labelLine: {
              // 连接扇形图线长
              length: 6,
              // 连接文字线长
              length2: 8,
            },
            data: this.pieNDGEData.data,
          },
        ],
      };

      chart.setOption(option);

      // 4. 让图表跟随屏幕自动的去适应
      window.addEventListener("resize", function () {
        chart.resize();
      });
    },
    // 获取地图设备位置数据
    // ------分割线------
    // 判断数据是否获取成功，成功则存入，不成功则弹出错误，登录失效则返回登录页面
    judgeResponse(response, storageName) {
      if (response.data.code === 200) {
        localStorage.setItem(storageName, JSON.stringify(response.data.data));
      } else if (response.data.code === 401) {
        this.$notify.error({
          title: response.data.code + " 错误",
          message: response.data.message,
        });
        this.$router.replace({ path: "/login" });
      } else {
        this.$notify({
          title: response.data.code + " 警告",
          message: response.data.message,
          type: "warning",
          duration: 0,
        });
      }
    },
    // 获取设备列表数据
    async getqueryEquipmentsByPage() {
      // 获取已定位的设备总数显示在地图上
      let amount = 999;
      // 传入在线设备数据获取定位设备列表
      let deviceList = await this.$api.getqueryEquipmentsByPage("0", amount);
      // 传入判断响应是否成功的函数进行判断
      this.judgeResponse(deviceList, "Screen_deviceList");
    },
    
    // 初始化转换地图数据
    initMapData() {
      let rdata = this.mapData.rows;
      let robj = {};
      let rarr = [];
      for (let i = 0; i < rdata.length; i++) {
        robj[rdata[i].name] = [Number(rdata[i].lng), Number(rdata[i].lat)];
        rarr[i] = {
          name: rdata[i].name,
          equipmentNo: rdata[i].equipmentNo,
          powerTypeLable: rdata[i].powerTypeLable,
          locationState: rdata[i].locationState,
          id: rdata[i].id,
          hasVideo: rdata[i].hasVideo,
          carStatusLabel: rdata[i].carStatusLabel,
          onlineStatusLabel: rdata[i].onlineStatusLabel,
          locationTime: rdata[i].locationTime,
          address: rdata[i].address,
        };
      }
      this.robj = robj;
      this.rarr = rarr;
    },
    // 初始化地图
    initMap() {
      let myChart = echarts.init(document.querySelector(".map .chart"));

      let data = this.rarr;

      let geoCoordMap = this.robj;
      let convertData = function (data) {
        let res = [];
        for (let i = 0; i < data.length; i++) {
          let geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value),
              equipmentNo: data[i].equipmentNo,
              powerTypeLable: data[i].powerTypeLable,
              locationState: data[i].locationState,
              id: data[i].id,
              hasVideo: data[i].hasVideo,
              carStatusLabel: data[i].carStatusLabel,
              onlineStatusLabel: data[i].onlineStatusLabel,
              locationTime: data[i].locationTime,
              address: data[i].address,
            });
          }
        }
        return res;
      };
      let option = {
        tooltip: {
          // 鼠标是否可以进入悬浮框
          enterable: false,
          // 触发方式 mousemove, click, none, mousemove|click
          triggerOn: `none`,
          // item 图形触发， axis 坐标轴触发， none 不触发
          trigger: `item`,
          // 浮层隐藏的延迟
          hideDelay: 800,
          // 浮层的渲染模式
          renderMode: "html",
          // 将 tooltip 框限制在图表的区域内
          appendToBody: true,
          confine: true,
          // 背景色
          backgroundColor: `rgba(0,0,0,0.2)`,
          // 字体颜色
          textStyle: {
            color: "#fff",
          },
          alwaysShowContent: true,

          //自定义修改显示
          formatter: function (data) {
            return "<div><p>设备编号：" + data.value[2] + "</p></div>";
          },
        },
        geo: {
          map: "china",
          left: "center",
          top: "30%",
          // 把中国地图放大了1.2倍
          zoom: 1.4,
          roam: true,
          itemStyle: {
            show: true,
            // 地图省份的背景颜色
            areaColor: "rgba(20, 41, 87,0.6)",
            // 地图各省份边框颜色
            borderColor: "#195BB9",
            // 地图各省份边框宽度
            borderWidth: 1,
            emphasis: {
              areaColor: "#2B91B7",
              // color: "#fff",
            },
          },
          emphasis: {
            areaColor: "#2B91B7",
            label: {
              color: "#fff",
            },
          },
          label: {
            color: "#fff",
          },
        },
        series: [
          {
            name: "设备",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: "40",
            symbol:
              "image://" + require("@/assets/images/digitalScreen/device.png"),
            label: {
              position: "insideLeft", // 设置标签向内
              formatter: "{b}", // 设置标签格式
              position: "right",
              color: "#fff",
              emphasis: {
                show: true,
                color: "#fff",
              },
            },
            itemStyle: {
              // 地图图标透明度
              opacity: 1,
              emphasis: {
                show: true,
              },
            },
          },
        ],
      };
      const appData = require("@/utils/china.json"); //本地json路径
      echarts.registerMap("chibishi", appData); //注册
      option.geo.map = "chibishi";
      myChart.setOption(option);
      window.addEventListener("resize", function () {
        myChart.resize();
      });
    },
  },
  created() {
    (function flexible(window, document) {
      let docEl = document.documentElement;
      let dpr = window.devicePixelRatio || 1;

      // adjust body font size
      function setBodyFontSize() {
        if (document.body) {
          document.body.style.fontSize = 12 * dpr + "px";
        } else {
          document.addEventListener("DOMContentLoaded", setBodyFontSize);
        }
      }
      setBodyFontSize();

      // set 1rem = viewWidth / 10
      function setRemUnit() {
        let rem = docEl.clientWidth / 24;
        docEl.style.fontSize = rem + "px";
      }

      setRemUnit();

      // reset rem unit on page resize
      window.addEventListener("resize", setRemUnit);
      window.addEventListener("pageshow", function (e) {
        if (e.persisted) {
          setRemUnit();
        }
      });

      // detect 0.5px supports
      if (dpr >= 2) {
        let fakeBody = document.createElement("body");
        let testElement = document.createElement("div");
        testElement.style.border = ".5px solid transparent";
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
          docEl.classList.add("hairlines");
        }
        docEl.removeChild(fakeBody);
      }
    })(window, document);
    // 格式： 当前时间：2020年3月17-0时54分14秒
    (function () {
      var t = null;
      t = setTimeout(time, 1000); //開始运行
      function time() {
        clearTimeout(t); //清除定时器
        var dt = new Date();
        var y = dt.getFullYear();
        var mt = dt.getMonth() + 1;
        var day = dt.getDate();
        var h = dt.getHours(); //获取时
        var m = dt.getMinutes(); //获取分
        var s = dt.getSeconds(); //获取秒
        document.querySelector(".time").innerHTML =
          "当前时间：" +
          y +
          "年" +
          mt +
          "月" +
          day +
          "日-" +
          h +
          "时" +
          m +
          "分" +
          s +
          "秒";
        t = setTimeout(time, 1000); //设定定时器，循环运行
      }
    })();
  },
  mounted() {
    // 清空缓存数据
    // this.mapData={};
    this.rarr = [];
    this.robj = {};
    // 渲染图表
    this.barOutLineH();
    this.lineStackV();
    this.lineCrossV();
    this.pieBlue();
    this.pieNDGE();
    // 获取在线接口设备位置信息
    this.getqueryEquipmentsByPage();
    // 初始化数据
    this.initMapData();
    // 初始化地图
    this.initMap();
    // 全屏方法
    this.fullScreen();
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}

.DigitalScreen {
  background: url(@/assets/images/digitalScreen/bg.jpg);
}

@font-face {
  font-family: electronicFont;
  src: url(@/assets/font/DS-DIGIT.TTF);
}

header {
  position: relative;
  height: 1.25rem;
  background: url(@/assets/images/digitalScreen/head_bg.png);

  h1 {
    color: #fff;
    font-size: 0.475rem;
    text-align: center;
    line-height: 1rem;
  }

  .showTime {
    position: absolute;
    right: 0.375rem;
    top: 0;
    line-height: 0.9375rem;
    color: rgba(255, 255, 255, 0.7);
    font-size: 0.25rem;
  }
}

.mainbox {
  display: flex;
  min-width: 1024px;
  max-width: 1920px;
  margin: 0 auto;
  padding: 0.125rem 0.125rem 0;

  .column {
    flex: 3;
  }

  .column:nth-child(2) {
    flex: 5;
    margin: 0 0.125rem 0.1875rem;
    overflow: hidden;
    .no {
      background: rgba(101, 132, 226, 0.125rem);
      padding: 0.1875rem;

      .no-hd {
        position: relative;
        border: 1px solid rgba(25, 286, 139, 0.17);

        &::before {
          position: absolute;
          top: 0%;
          left: 0%;
          content: "";
          width: 30px;
          height: 10px;
          border-top: 2px solid #02a6b5;
          border-left: 2px solid #02a6b5;
        }

        &::after {
          position: absolute;
          bottom: 0%;
          right: 0%;
          content: "";
          width: 30px;
          height: 10px;
          border-bottom: 2px solid #02a6b5;
          border-right: 2px solid #02a6b5;
        }

        ul {
          display: flex;

          li:nth-child(1) {
            &::after {
              content: "";
              position: absolute;
              top: 25%;
              right: 0;
              height: 50%;
              width: 1px;
              background-color: rgba(255, 255, 255, 0.2);
            }
          }

          li {
            position: relative;
            flex: 1;
            line-height: 1rem;
            height: 1rem;
            font-size: 0.875rem;
            color: #ffeb7b;
            font-family: electronicFont;
            text-align: center;
          }
        }
      }

      .no-bd {
        ul {
          display: flex;

          li {
            flex: 1;
            line-height: 0.5rem;
            height: 0.5rem;
            text-align: center;
            font-size: 0.225rem;
            color: rgba(255, 255, 255, 0.7);
            padding-top: 0.125rem;
          }
        }
      }
    }
    .map {
      position: relative;
      height: 10.125rem;
      .chart {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 5;
        height: 10.125rem;
        width: 100%;
      }
      .map1,
      .map2,
      .map3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 6.475rem;
        width: 6.475rem;
        background: url(@/assets/images/digitalScreen/map.png) no-repeat;
        background-size: 100% 100%;
        opacity: 0.3;
      }
      .map2 {
        width: 8.0375rem;
        height: 8.0375rem;
        background: url(@/assets/images/digitalScreen/lbx.png) no-repeat;
        background-size: 100% 100%;
        opacity: 0.6;
        animation: rotate 15s linear infinite;
      }
      .map3 {
        width: 7.075rem;
        height: 7.075rem;
        background: url(@/assets/images/digitalScreen/jt.png) no-repeat;
        background-size: 100% 100%;
        animation: rotate 10s linear infinite reverse;
      }
      @keyframes rotate {
        from {
          transform: translate(-50%, -50%) rotate(0deg);
        }
        to {
          transform: translate(-50%, -50%) rotate(360deg);
        }
      }
    }
  }

  .panel {
    position: relative;
    height: 3.875rem;
    border: 1px solid rgba(25, 186, 139, 0.17);
    background: url(@/assets/images/digitalScreen/line\(1\).png)
      rgba(255, 255, 255, 0.03);
    padding: 0 0.1875rem 40px;
    margin-bottom: 0.1875rem;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 10px;
      height: 10px;
      border-left: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      width: 10px;
      height: 10px;
      border-right: 2px solid #02a6b5;
      border-top: 2px solid #02a6b5;
    }

    .panel-footer {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;

      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 10px;
        height: 10px;
        border-left: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        right: 0;
        width: 10px;
        height: 10px;
        border-right: 2px solid #02a6b5;
        border-bottom: 2px solid #02a6b5;
      }
    }

    h2 {
      position: relative;
      height: 0.6rem;
      line-height: 0.6rem;
      color: #fff;
      text-align: center;
      font-size: 0.25rem;
      font-weight: 400;
      a {
        position: relative;
        color: #fff;
        text-decoration: none;
        margin: 0 0.0125rem;
        &:nth-child(1) {
          right: -40px;
        }
        &:nth-child(2) {
          right: -40px;
        }
        &:hover {
          color: rgb(163, 195, 224);
        }
      }
    }

    .chart {
      height: 3rem;
      // background-color: aquamarine;
    }
  }
}
.baoxian {
  display: flex;
  color: #fff;
  flex-direction: column;
  align-items: stretch;
  height: 100%;
  padding: 0 1rem 0 0.5rem;
  justify-content: space-evenly;
  p {
    display: flex;
    justify-content: space-between;
    color: #00c6ff;
    span {
      span {
        text-decoration: underline;
      }
    }
  }
}
</style>