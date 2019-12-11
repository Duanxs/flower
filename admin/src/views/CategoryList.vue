<template>
  <div>
    <div slot="header" class="clearfix">
      <h1>分类列表</h1>
    </div>
    <el-table
      stripe
      border
      :data="items"
      default-expand-all
      row-key="_id"
      :tree-props="{ children: 'children' }"
    >
      >
      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
      <!-- <el-table-column prop="_id" label="Id" width="220"></el-table-column> -->
      <!-- <el-table-column prop="parent.name" label="上级分类"></el-table-column> -->
      <el-table-column prop="name" label="分类名称" align="center"></el-table-column>
      <el-table-column label="分类图片" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template v-slot="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="text"
            size="small"
            :disabled="scope.row.hasChild?true:false"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            :disabled="scope.row.hasChild?true:false"
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
    // 获取分类信息
    async fetch() {
      const res = await this.$http.get("common/categories", {
        params: this.params
      });
      global.console.log(res.data);
      let parents = res.data.filter(v => !v.parent);
      let children = res.data.filter(v => v.parent);
      parents.forEach(v => {
        let c = [];
        children.forEach(k => {
          if (v.name === k.parent.name) {
            c = c.concat([{ name: k.name, _id: k._id }]);
            // global.console.log(c);
            v.hasChild = true;
          }
          v.children = c;
        });
      });
      this.items = parents;
      // global.console.log(this.items)
      // global.console.log(parents);
      // global.console.log(children)
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`此操作将永久删除 ${row.name} 分类, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`common/categories/${row._id}`);
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
