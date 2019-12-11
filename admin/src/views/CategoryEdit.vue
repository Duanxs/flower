<template>
  <div>
    <h1>{{id?'编辑':'新建'}}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select clearable v-model="model.parent" placeholder="请选择" @clear="handleClear">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
        {{model.parent}}
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
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
      model: {},
      cat: {},
      // 上级分类
      parents: []
    };
  },


  methods: {
    // async hasParent() {
    //   if(this.model.name) {
    //     const res = await this.$http.get(`common/categories/${this.model.id}`);

    //     this.model.children = [this.cat]
    //   } else {
    //     this.model = this.cat
    //   }
    //   global.console.log(this.model)
    // },
    // 存入数据库
    async save() {
      if (this.id) {
        await this.$http.put(`common/categories/${this.id}`, this.model);
      } else {
        await this.$http.post("common/categories", this.model);
      }

      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },

    // 获取分类名
    async fetch() {
      const res = await this.$http.get(`common/categories/${this.id}`);
      this.model = res.data;
    },

    // 获取父级分类
    async fetchParents() {
      const res = await this.$http.get("common/categories");
      // 凡是没有 parent 属性的，都属于父级
      this.parents = res.data.filter(v => !v.parent);
      if(this.id) {
        this.parents = this.parents.filter(v => this.id !== v._id)
      }
    },

    // 当清除选择器时，使 model.parent 属性为 null，以防报错
    handleClear() {
      this.model.parent = null
    }
  },
  created() {
    // 若存在 id 则使用 fetch 获取分类名
    this.id && this.fetch();
    this.fetchParents();
  }
};
</script>

<style>
</style>