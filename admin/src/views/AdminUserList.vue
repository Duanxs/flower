<template>
  <div>
    <!-- <el-card class="box-card">
      <div slot="header" class="clearfix"> -->
        <h1>分类列表</h1>
      <!-- </div> -->
      <el-table
        stripe
        border
        :data="items"
        row-key="_id"
      >
        >
        <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
        <!-- <el-table-column prop="_id" label="Id" width="220"></el-table-column> -->
        <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
        <el-table-column prop="username" label="用户名" align="center"></el-table-column>
        <!-- <el-table-column prop="password" label="密码" align="center"></el-table-column> -->
        <el-table-column  label="操作" align="center">
          <template v-slot="scope">
            <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
            <el-button
              type="text"
              size="small"
              @click="$router.push(`/admin_user/edit/${scope.row._id}`)"
            >编辑</el-button>
            <el-button
              type="text"
              size="small"
              @click="remove(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="2"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
      ></el-pagination>-->
    <!-- </el-card> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],

      // 查询条件
      params: {}
    };
  },
  methods: {
    // 获取用户信息
    async fetch() {
      const res = await this.$http.get("common/admin_user", {
        params: this.params
      });
      this.items = res.data;
    },
    // 删除用户
    async remove(row) {
      this.$confirm(`此操作将永久删除 ${row.username} 用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`common/admin_user/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style>

</style>
