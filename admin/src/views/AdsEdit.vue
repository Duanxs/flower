<template>
  <div>
    <h1>{{id?'编辑':'新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="添加图片">
        <el-button @click="model.items.push({})">
          <i class="el-icon-plus"></i>
          添加广告
        </el-button>
        <el-row type="flex" style="flex-wrap: wrap">
          <el-col :md="12" v-for="(item, i) in model.items" :key="i">
            <el-form-item label="链接">
              <!-- <el-input v-model="item.url"></el-input> -->
              <el-input :placeholder="item.url" disabled></el-input>
              <el-button type="text" @click="dialogVisible = true">选择链接的商品</el-button>
              <el-dialog title="商品列表" :visible.sync="dialogVisible" width="30%">
                <el-table
                  highlight-current-row
                  stripe
                  border
                  ref="singleTable"
                  @current-change="res => $set(item, 'url', res._id)"
                  :data="goodsList"
                  row-key="_id"
                >
                  <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
                  <el-table-column prop="title" label="标题" align="center"></el-table-column>
                </el-table>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="dialogVisible = false">取 消</el-button>
                  <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
              </el-dialog>
            </el-form-item>
            <el-form-item label="图片">
              <el-upload
                class="avatar-uploader"
                :action="$http.defaults.baseURL+'/upload'"
                :headers="getAuthHeaders()"
                :show-file-list="false"
                :on-success="res => $set(item, 'image', res.url)"
              >
                <img v-if="item.image" :src="item.image" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {
        items: [
          {
            url: '',
            image: ''
          }
        ]
      },
      goodsList: [],

      dialogVisible: false,

      //当前选中行
      currentRow: {}
    };
  },

  methods: {
    // 存入数据库
    async save() {
      global.console.log(this.model)
      if (this.id) {
        await this.$http.put(`common/ads/${this.id}`, this.model);
      } else {
        await this.$http.post("common/ads", this.model);
      }

      this.$router.push("/ads/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    // 获取广告
    async fetch() {
      // const res = await this.$http.get(`common/categories/${this.id}`);
      const res = await this.$http.get(`common/ads/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    // 获取商品
    async fetchGoods() {
      // const res = await this.$http.get(`common/categories/${this.id}`);
      const res = await this.$http.get("common/goods");
      // global.console.log(res.data);
      this.goodsList = res.data;
      // this.goodsList = Object.assign({}, this.model, res.data);
    },

  },
  created() {
    // 若存在 id 则使用 fetch 获取分类名
    this.id && this.fetch();
    this.fetchGoods();
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>