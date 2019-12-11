<template>
  <div>
    <h1>{{id?'编辑':'新建'}}商品</h1>
    <el-form
      :model="model"
      label-width="120px"
      :rules="rules"
      ref="addModelRef"
      @submit.native.prevent="save"
    >
      <el-form-item label="分类" required>
        <el-select multiple v-model="model.category" placeholder="请选择">
          <el-option v-for="item in cats" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="花语">
        <el-input v-model="model.goodsMean"></el-input>
      </el-form-item>
      <el-form-item label="花材" prop="goods_info">
        <el-input v-model="model.goodsInfo"></el-input>
      </el-form-item>
      <el-form-item label="价格" prop="goods_price">
        <el-input v-model="model.goodsPrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="划线价格">
        <el-input v-model="model.linePrice" type="number"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="goods_status">
        <el-radio v-model="model.goodsStatus" label="上架">上架</el-radio>
        <el-radio v-model="model.goodsStatus" label="入库">入库</el-radio>
      </el-form-item>
      <el-form-item label="库存" prop="goods_stock">
        <el-input v-model="model.goodsStock" type="number"></el-input>
      </el-form-item>
      <el-form-item label="销量">
        <el-input v-model="model.goodsSales" type="number"></el-input>
      </el-form-item>
      <el-form-item label="浏览量">
        <el-input v-model="model.goodsViews" type="number"></el-input>
      </el-form-item>
      <el-form-item label="图片">
        <el-upload
          :action="$http.defaults.baseURL+'/upload'"
          :headers="getAuthHeaders()"
          list-type="picture-card"
          multiple
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="afterUpload"
          :file-list="fileList"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt />
        </el-dialog>
      </el-form-item>
      <el-form-item label="详情">
        <vue-editor v-model="model.content"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template> 

<script>
// 引入 富文本编辑器
import { VueEditor } from "vue2-editor";

export default {
  components: {
    VueEditor
  },

  props: {
    id: {}
  },
  data() {
    return {
      model: {
        file: []
      },
      // 分类
      cats: [],
      fileList: [],

      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      // 校验规则
      rules: {
        title: { required: true, message: "请输入标题", trigger: "blur" },
        goodsInfo: { required: true, message: "请输入花材", trigger: "blur" },
        goodsPrice: { required: true, message: "请输入价格", trigger: "blur" },
        goodsStock: { required: true, message: "请输入库存", trigger: "blur" }
        // goods_price: { required: true, message: '请输入价格', trigger: 'blur' },
      }
    };
  },
  methods: {
    // 存入数据库
    save() {
      this.$refs.addModelRef.validate(async valid => {
        if (!valid) {
          return this.$message.error("请填写必要的表单！");
        }
        if (this.id) {
          await this.$http.put(`common/goods/${this.id}`, this.model);
        } else {
          await this.$http.post("common/goods", this.model);
        }
        this.$router.push("/goods/list");
        this.$message({
          type: "success",
          message: "保存成功"
        });
      });
    },

    // 获取商品
    async fetch() {
      const res = await this.$http.get(`common/goods/${this.id}`);
      this.model = res.data;
      // this.$set(this.fileList,)
      this.fileList = this.model.file;
      // global.console.log(this.fileList)
    },
    // 获取分类
    async fetchCats() {
      const res = await this.$http.get("common/categories");
      this.cats = res.data.filter(v => v.parent);
      // this.cats = res.data
    },

    // 图片预览
    handleRemove(file) {
      global.console.log(file);
      this.model.file = this.model.file.filter(v => {
        // return v.url !== file.url;
        return this.id ? v.url !== file.url : v.url !== file.response.url;
      });
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    afterUpload(res) {
      this.model.file = this.model.file.concat({ url: res.url });
      // this.fileList = this.model.file
      // global.console.log(file);
      // global.console.log(fileList);
    }
  },
  created() {
    // 若存在 id 则使用 fetch 获取分类名
    this.id && this.fetch();
    this.fetchCats();
  }
};
</script>

<style>
</style>