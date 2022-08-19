<template>
  <div class="ElectricFence">
    <div class="content">
      <div class="aside">
        <div class="fence" v-show="isShowFence">
          <el-input
            placeholder="请输入电子围栏名称"
            prefix-icon="el-icon-search"
            v-model="fenceSearch"
          >
          </el-input>
          <div class="operate">
            <el-button>删除</el-button>
            <el-button type="primary" @click="idShowAddFence = true"
              >新增</el-button
            >
          </div>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="selection"> </el-table-column>
            <el-table-column prop="name" label="电子围栏名称">
              <template slot-scope="scope">
                <span class="fenceName"
                  ><i class="el-icon-edit"></i>&nbsp;{{ scope.row.name }}</span
                >
              </template>
            </el-table-column>
            <el-table-column prop="num" label="设备绑定数"> </el-table-column>
            <el-table-column prop="status" label="状态"> </el-table-column>
          </el-table>
        </div>
        <div class="hideFence">
          <i
            :class="isShowFence ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"
            @click="isShowFence = !isShowFence"
          >
          </i>
        </div>

        <div class="addFence" v-if="idShowAddFence">
          <h3>
            <b>新增电子围栏</b>
            <i class="el-icon-close" @click="idShowAddFence = false"></i>
          </h3>
          <b>类型选择</b>
          <div class="region">
            <span>*</span>
            <div>类型</div>
            <el-select v-model="type" placeholder="请选择" size="small">
              <el-option
                v-for="item in typeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div class="region">
            <span>*</span>
            <div>围栏名称</div>
            <el-input
              v-model="fenceName"
              placeholder="请输入围栏名称"
              size="small"
            ></el-input>
          </div>
          <div class="region">
            <span>*</span>
            <div>围栏类型</div>
            <el-select v-model="fenceType" placeholder="请选择" size="small">
              <el-option
                v-for="item in fenceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </div>
          <div>
            <b>状态</b>
          </div>
          <div class="enable">
            <el-radio v-model="radio" label="1">启用</el-radio>
            <el-radio v-model="radio" label="2">停用</el-radio>
          </div>
          <div class="redraw">
            <el-button type="primary" size="small">重新绘制区域</el-button>
          </div>
          <div class="save">
            <el-button type="primary" size="small">保存</el-button>
            <el-button size="small">取消</el-button>
          </div>
        </div>
      </div>
      <div class="map">
        <el-amap
          class="amap-box"
          :vid="'amap-vue'"
          ref="GdMap"
          :events="amapGD"
          style="width: 100%; height: 100%"
        ></el-amap>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 地图相关的数据--------------------------------------
      // 地图实例
      map: null,
      // 获取地图实例
      amapGD: {
        // 地图加载后触发的事件
        complete: () => {
          this.map = this.$refs.GdMap.$$getInstance();
          let map = this.map;
          
        },
      },
      // 围栏列表相关-------------------------------------------
      // 是否显示围栏列表
      isShowFence: true,
      // 围栏列表搜索的值
      fenceSearch: "",
      // 列表数据
      tableData: [
        {
          name: "test",
          num: "0",
          status: "启用",
        },
      ],
      // 新增围栏相关---------------------------------------------
      // 是否显示添加围栏卡片
      idShowAddFence: true,
      // 区域类型
      type: "自定义区域",
      typeOptions: [
        {
          value: "自定义区域",
          label: "自定义区域",
        },
      ],
      // 围栏名称
      fenceName: "",
      // 围栏类型
      fenceType: "",
      fenceTypeOptions: [
        {
          value: "选项1",
          label: "工地",
        },
        {
          value: "选项2",
          label: "搅拌厂",
        },
        {
          value: "选项3",
          label: "作业区域",
        },
      ],
      // 是否启用
      radio: "1",
    };
  },
};
</script>

<style lang="less" scoped>
.ElectricFence {
  box-sizing: border-box;
  height: calc(100vh - 112px);
  .el-table--border .el-table__cell:first-child .cell {
    padding: 0;
  }
  .content {
    background-color: #f6f6f6;
    display: flex;
    height: 100%;
    padding: 20px;
    min-height: 450px;
    div {
      border-radius: 4px;
    }
    .aside {
      display: flex;
      .fence {
        box-sizing: border-box;
        padding: 20px;
        background-color: #fff;
        height: 100%;
        min-width: 400px;
        .operate {
          display: flex;
          justify-content: space-between;
          margin: 16px 0;
        }
        .el-table {
          .fenceName {
            color: #409eff;
            cursor: pointer;
          }
        }
      }
      .hideFence {
        position: relative;
        .el-icon-arrow-left,
        .el-icon-arrow-right {
          z-index: 99;
          position: relative;
          top: 50%;
          font-size: 16px;
          font-weight: 600;
          line-height: 50px;
          color: #fff;
          background-color: #70767a;
          cursor: pointer;
        }
      }
      .addFence {
        padding: 20px;
        background-color: #fff;
        font-size: 14px;
        // min-width: 240px;
        b {
          display: inline-block;
          font-weight: 600;
          color: #333232;
          font-size: 14px;
          margin-bottom: 10px;
        }
        h3 {
          display: flex;
          justify-content: space-between;
          margin-bottom: 30px;
          i {
            cursor: pointer;
            font-size: 18px;
          }
        }
        .region {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .el-select {
            min-width: 150px;
          }
          span {
            color: #f56c6c;
            margin-right: 5px;
          }
          div {
            min-width: 60px;
            white-space: nowrap;
            margin-right: 10px;
          }
        }
        .enable,
        .redraw {
          margin-bottom: 20px;
        }
        .redraw {
          .el-button {
            width: 100%;
          }
        }
        .save {
          .el-button {
            float: right;
            margin-left: 20px;
          }
        }
      }
    }
    .map {
      width: 100%;
    }
  }
}
</style>
