<template>
  <div class="TrackTable">
    <el-table
      :data="
        tableData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
      stripe
      border
      :height="heights"
      ref="refsTable"
    >
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="time_cloud" label="上报时间" width="100">
      </el-table-column>
      <el-table-column prop="speed_gps" label="车速 (km/h)" width="98">
      </el-table-column>
      <el-table-column prop="incMileageGPS" label="距起点里程（km）" width="85">
      </el-table-column>
      <el-table-column prop="position" label="地理位置"> </el-table-column>
    </el-table>
    <el-pagination
      background
      align="center"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      tableData: [],
      currentPage: 1, // 当前页码
      total: 0, // 总条数
      pageSize: 10, // 每页的数据条数
    };
  },
  created() {
    this.$api
      .getHistoryTrackDetail(
        "2022-06-08 00:00:00",
        "2022-06-08 23:59:59",
        "CC0260CB5352"
      )
      .then((res) => {
        console.log("res.data", res.data.data.listPoint);
        this.tableData = res.data.data.listPoint;
      });
  },
  mounted() {
    this.$nextTick(() => {
      // 根据浏览器高度设置初始高度
      this.heights =
        window.innerHeight - this.$refs.refsTable.$el.offsetTop - 100;
      // 监听浏览器高度变化，修改表格高度
      window.onresize = () => {
        this.heights =
          window.innerHeight - this.$refs.refsTable.$el.offsetTop - 100;
      };
    });
  },
  methods: {
    //每页条数改变时触发 选择一页显示多少行
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.currentPage = 1;
      this.pageSize = val;
    },
    //当前页改变时触发 跳转其他页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
  },
};
</script>
<style lang="less">
.TrackTable {
  background-color: #fff;
  thead {
    tr {
      box-sizing: border-box;
      border: 1px solid #8cc5ff;
      th {
        background-color: #c6e2ff !important;
        outline: 1px solid #8cc5ff;
        border-color: #8cc5ff !important;
        font-size: 12px;
      }
    }
  }
  tbody {
    td {
      border-right: none !important;
    }
  }
}
</style>
