<template>
  <div>
    <h1>商品列表</h1>
    <el-table :data="items" border>
      <!-- <el-table-column prop="_id" label="Id" width="100"></el-table-column> -->
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="title" label="标题" width="220"></el-table-column>
      <el-table-column prop="category" label="分类">
        <template v-slot="scope" >
            <el-tag v-for="item in scope.row.category" :key="item._id">{{item.name}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="file" label="首图">
        <template v-slot="scope">
          <!-- {{(scope.row.file[0]).url}} -->
          <img :src="scope.row.file[0].url" style="height:6em">
        </template>
      </el-table-column>
      <el-table-column prop="goodsStatus" label="状态"></el-table-column>
      <el-table-column prop="goodsStock" label="库存"></el-table-column>
      <el-table-column prop="goodsPrice" label="现价"></el-table-column>
      <el-table-column prop="linePrice" label="划线价格"></el-table-column>
      <el-table-column prop="goodsSales" label="销量"></el-table-column>
      <el-table-column prop="goodsViews" label="浏览量"></el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template v-slot="scope">
          <!-- <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button> -->
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/goods/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: []
    };
  },
  methods: {
    // 获取商品信息
    async fetch() {
      const res = await this.$http.get("common/goods");
      this.items = res.data;
      global.console.log(this.items);
    },
    // 删除分类
    async remove(row) {
      this.$confirm(`此操作将永久删除 ${row.name} 分类, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$http.delete(`common/goods/${row._id}`);
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

<style></style>
