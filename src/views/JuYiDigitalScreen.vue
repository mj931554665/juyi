<template>
  <div class="DigitalScreen" style="padding-bottom: 1px;">
    <header>
      <h1>钜亿安全监控云平台</h1>
      <div class="showTime">1233</div>
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
          <h2>设备类型</h2>
          <div class="chart"></div>
          <div class="panel-footer"></div>
        </div>
      </div>
      <div class="column">
        <div class="no">
          <div class="no-hd">
            <ul>
              <li>123456</li>
              <li>100000</li>
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
import echarts from "@/utils/echarts";
export default {
  methods: {
    chart1() {
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
            },
            type: "category",
            // y轴更换第二个对象更换data数据
            data: [702, 350, 610, 793, 664],
          },
        ],
        series: [
          {
            // 给series  第一个对象里面的 添加
            yAxisIndex: 0,
            name: "条",
            // 柱子之间的距离
            barCategoryGap: 50,
            //柱子的宽度
            barWidth: 10,
            // 2. 给 itemStyle  里面的color 属性设置一个 返回值函数
            itemStyle: {
              // 柱子设为圆角
              barBorderRadius: 20,
              // params 传进来的是柱子对象
              color: function (param) {
                // dataIndex 是当前柱子的索引号
                return myColor[param.dataIndex];
              },
            },
            type: "bar",
            data: [70, 34, 60, 78, 69],
            // 图形上的文本标签
            label: {
              show: true,
              // 图形内显示
              position: "inside",
              // 文字的显示格式
              formatter: "{c}%",
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          {
            // 给series  第二个对象里面的 添加
            yAxisIndex: 1,
            name: "框",
            type: "bar",
            barCategoryGap: 50,
            barWidth: 15,
            itemStyle: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              barBorderRadius: 15,
            },
            data: [100, 100, 100, 100, 100],
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
  },
  created() {
    (function flexible(window, document) {
      var docEl = document.documentElement;
      var dpr = window.devicePixelRatio || 1;

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
        var rem = docEl.clientWidth / 24;
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
        var fakeBody = document.createElement("body");
        var testElement = document.createElement("div");
        testElement.style.border = ".5px solid transparent";
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
          docEl.classList.add("hairlines");
        }
        docEl.removeChild(fakeBody);
      }
    })(window, document);
    // this.chart1();
    
  },
  mounted() {
    (function () {
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
            },
            type: "category",
            // y轴更换第二个对象更换data数据
            data: [702, 350, 610, 793, 664],
          },
        ],
        series: [
          {
            // 给series  第一个对象里面的 添加
            yAxisIndex: 0,
            name: "条",
            // 柱子之间的距离
            barCategoryGap: 50,
            //柱子的宽度
            barWidth: 10,
            // 2. 给 itemStyle  里面的color 属性设置一个 返回值函数
            itemStyle: {
              // 柱子设为圆角
              barBorderRadius: 20,
              // params 传进来的是柱子对象
              color: function (param) {
                // dataIndex 是当前柱子的索引号
                return myColor[param.dataIndex];
              },
            },
            type: "bar",
            data: [70, 34, 60, 78, 69],
            // 图形上的文本标签
            label: {
              show: true,
              // 图形内显示
              position: "inside",
              // 文字的显示格式
              formatter: "{c}%",
              color: "#fff",
            },
            axisLabel: {
              color: "#fff",
            },
          },
          {
            // 给series  第二个对象里面的 添加
            yAxisIndex: 1,
            name: "框",
            type: "bar",
            barCategoryGap: 50,
            barWidth: 15,
            itemStyle: {
              color: "none",
              borderColor: "#00c1de",
              borderWidth: 3,
              barBorderRadius: 15,
            },
            data: [100, 100, 100, 100, 100],
          },
        ],
      };
      // 3.把配置项给实例对象
      chart.setOption(option);
      // 4.让图表跟随屏幕自适应
      window.addEventListener("resize", function () {
        chart.resize();
      });
    })();
    
(function () {
  // 定义两组数据
  let yearData = [
    {
      year: '2020',  // 年份
      data: [  // 两个数组是因为有两条线
        [24, 40, 101, 134, 90, 230, 210, 230, 120, 230, 210, 120],
        [40, 64, 191, 324, 290, 330, 310, 213, 180, 200, 180, 79]
      ]
    },
    {
      year: '2021',  // 年份
      data: [  // 两个数组是因为有两条线
        [123, 175, 112, 197, 121, 67, 98, 21, 43, 64, 76, 38],
        [143, 131, 165, 123, 178, 21, 82, 64, 43, 60, 19, 34]
      ]
    }
  ];
  // 1,实例化对象
  const chart = echarts.init(document.querySelector('.line .chart'))
  // 2,指定配置
  let option = {
    color: ['#00f2f1', '#ed3f35'],
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      textStyle: {
        color: '#4c9bfd'
      },
      right: '10%',
    },
    grid: {
      top: '20%',
      left: '3%',
      right: '4%',
      bottom: '3%',
      show: true, //显示边框
      borderColor: '#012f4a', //边框颜色
      containLabel: true //包含刻度在里面
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      // 去除刻度线
      axisTick: false,
      // 文本颜色
      axisLabel: {
        color: '#4c9bfd'
      },
      // 去除轴线
      axisLine: {
        show: false
      },
      // 去除轴内间距
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      // 去除刻度线
      axisTick: false,
      // 文本颜色
      axisLabel: {
        color: '#4c9bfd'
      },
      // 分割线颜色
      splitLine: {
        lineStyle: {
          color: '#012f4a'
        }
      }
    },
    series: [
      {
        name: '平均时长',
        data: yearData[0].data[0],
        type: 'line',
        stack: 'Total',
        // 折线平滑度
        smooth: 0.5
      },
      {
        name: '实际时长',
        data: yearData[0].data[1],
        type: 'line',
        stack: 'Total',
        // 折线平滑度
        smooth: 0.5
      }
    ]
  };

  // 3,把配置给实例对象
  chart.setOption(option)
  // 4,图表跟随屏幕自适应
  window.addEventListener('resize', function () {
    chart.resize()
  })
  // 5,点击切换折线图数据效果
  // $('.line h2').on("click", 'a', function () {
  //   // 点击a之后 根据当前a的索引号 找到对应的yearData的相关对象
  //   let currentA = $(this).index()
  //   let obj = yearData[currentA]
  //   option.series[0].data = obj.data[0]
  //   option.series[1].data = obj.data[1]
  //   chart.setOption(option)
  // })
})();

(function () {
  // 1,实例化对象
  const chart = echarts.init(document.querySelector('.line2 .chart'))
  let option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['实际租出', '预计租出'],
      textStyle: {
        fontSize: '12',
        color: 'rgba(255,255,255,.5)'
      }
    },
    toolbox: {},
    grid: {
      left: "10",
      top: "30",
      right: "10",
      bottom: "10",
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        // x轴更换数据
        data: ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "26", "28", "29", "30"],
        // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
        axisLabel: {
          color: 'rgba(255,255,255,.6)',
          fontSize: '12'
        },
        // x轴线的颜色为   rgba(255,255,255,.2)
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.2)"
          }
        }
      }
    ],
    yAxis: [
      {
        type: 'value',
        axisTick: { show: false },
        axisLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        },
        axisLabel: {
          color: "rgba(255,255,255,.6)",
          fontSize: 12
        },
        // 修改分割线的颜色
        splitLine: {
          lineStyle: {
            color: "rgba(255,255,255,.1)"
          }
        }
      }
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
          width: 2
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
                color: "rgba(1, 132, 213, 0.4)"
              },
              {
                offset: 0.8,
                color: "rgba(1, 132, 213, 0.1)"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        itemStyle: {
          color: "#0184d5",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        data: [
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          20,
          40,
          30,
          40,
          30,
          40,
          30,
          40,
          30,
          60,
          20,
          40,
          20,
          40,
          30,
          60,
          20,
          40,
          20,
          40
        ]
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
          width: 2
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
                color: "rgba(0, 216, 135, 0.4)"
              },
              {
                offset: 0.8,
                color: "rgba(0, 216, 135, 0.1)"
              }
            ],
            false
          ),
          shadowColor: "rgba(0, 0, 0, 0.1)"
        },
        // 设置拐点颜色以及边框
        itemStyle: {
          color: "#00d887",
          borderColor: "rgba(221, 220, 107, .1)",
          borderWidth: 12
        },
        data: [
          50,
          30,
          50,
          60,
          10,
          50,
          30,
          50,
          60,
          40,
          60,
          40,
          80,
          30,
          50,
          60,
          10,
          50,
          30,
          70,
          20,
          50,
          10,
          40,
          50,
          30,
          70,
          20,
          50,
          10,
          40
        ]
      }
    ]
  };
  chart.setOption(option);
  window.addEventListener('resize', function () {
    chart.resize()
  });
})();

(function () {
  const chart = echarts.init(document.querySelector('.pie .chart'))
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      // 距离底部为0%
      bottom: '0%',
      // left: 'center',
      // 修改图例组件的文字为 12px
      textStyle: {
        color: 'rgba(255,255,255,.5)',
        fontSize: 12
      },
      // 小图标的宽度和高度
      itemWidth: 10,
      itemHeight: 10,
      data: ["汽车吊", "履带吊", "塔吊", "辅助设备", "其他"],

    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        //  修改内圆半径和外圆半径为  百分比是相对于容器宽度来说的
        radius: ['40%', '60%'],
        // 设置饼形图在容器中的位置
        center: ['50%', '45%'],
        avoidLabelOverlap: false,
        // 不显示标签文字
        label: {
          show: false,
          position: 'center'
        },
        // 不显示连接线
        labelLine: {
          show: false
        },
        data: [
          { value: 1, name: "汽车吊" },
          { value: 4, name: "履带吊" },
          { value: 2, name: "塔吊" },
          { value: 2, name: "辅助设备" },
          { value: 1, name: "其他" }
        ],
        color: [
          "#065aab",
          "#066eab",
          "#0682ab",
          "#0696ab",
          "#06a0ab",
        ],
      }
    ]
  };

  chart.setOption(option);
  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    chart.resize()
  })
})();

(function () {
  // 南丁格尔是世界上第一个真正的女护士，开创了护理事业。由于南丁格尔的努力，让昔日地位低微的护士，于社会地位与形象都大为提高，成为崇高的象征。“南丁格尔”也成为护士精神的代名词。
  // 南丁格尔玫瑰图
  const chart = echarts.init(document.querySelector('.pie2 .chart'))

  let myColor = ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'];

  let option = {
    tooltip:{
      show:true
    },
    legend: {
      bottom: '0',
      textStyle: {
        color: "rgba(255,255,255,.5)",
        fontSize: 10
      },
      itemWidth: 10,
      itemHeight: 10
    },
    series: [
      {
        // 自定义饼图颜色
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        name: '地区分布',
        type: 'pie',
        radius: ['10%', '70%'],
        center: ['50%', '45%'],
        roseType: "radius",
        itemStyle: {
          barBorderRadius: 8,
          fontSize: '10px',
        },
        // 文本标签控制饼形图文字的相关样式， 注意它是一个对象
        label: {
          fontSize: 10,
          color: 'rgba(255,255,255,.8)'
        },
        // 引导线调整
        labelLine: {
          // 连接扇形图线长
          length: 6,
          // 连接文字线长
          length2: 8
        },
        data: [
          { value: 20, name: '云南' },
          { value: 26, name: '北京' },
          { value: 24, name: '山东' },
          { value: 25, name: '河北' },
          { value: 20, name: '福建' },
          { value: 25, name: '浙江' },
          { value: 30, name: '江苏' },
          { value: 42, name: '广东' }
        ]
      }
    ]
  };

  chart.setOption(option);

  // 4. 让图表跟随屏幕自动的去适应
  window.addEventListener('resize', function () {
    chart.resize()
  })
})();
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
  padding: 0 80px 0 40px;
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