<template>
  <div class="ElectricFence">
    <div class="navbar">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>设备管理</el-breadcrumb-item>
        <el-breadcrumb-item active>电子围栏管理</el-breadcrumb-item>
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
      <div class="container">
        <div class="map"> </div>
        <div class="card1">
          <div>
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input2">
            </el-input>
          </div>
          <div class="operate">
            <el-button>删除</el-button>
            <el-button type="primary">新增</el-button>
          </div>
          <div class="table">
            <el-table :data="tableData" style="width: 100%">
              <el-table-column type="selection">
              </el-table-column>
              <el-table-column prop="name" label="电子围栏名称">
              </el-table-column>
              <el-table-column prop="num" label="绑定车辆数">
              </el-table-column>
              <el-table-column prop="status" label="状态">
              </el-table-column>
            </el-table>
          </div>
          <div class="pagination">
            <el-pagination small layout="prev, pager, next" :total="50">
            </el-pagination>
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
      tableData: [{
        name: 'test',
        num: '0',
        status: '启用'
      },]
    }
  }
}
</script>

<style lang="less" scoped>
.ElectricFence {
  .content {
    .container {
      position: relative;

      .map {
        width: 100%;
        height: 689px;
        background: url('@/assets/test/dzwl.png') no-repeat;
      }

      .card1 {
        position: absolute;
        left: 20px;
        top: 20px;
        width: 340px;
        height: 588px;
        background-color: #fff;
        border-radius: 10px;
        padding: 20px;

        .operate {
          display: flex;
          justify-content: space-between;
          margin: 10px 5px 10px 5px;
        }

        .table {
          height: 450px;
          border-bottom: 1px dashed gray;
          .el-table {
            font-size: 13px;
          }
        }
        .pagination{
          margin-top: 5px;
        }
      }
    }
  }
}
</style>