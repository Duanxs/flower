<template>
  <div class="login-container">
    <el-card header="请登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名">
          <el-input v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'login',
  data(){
    return {
      model: {}
    }
  },
  methods: {
    async login() {
      // global.console.log(this.model)
      const res = await this.$http.post('login', this.model)
      // global.console.log(res.data)
      // 在本地存储 token
      localStorage.token = res.data.token
      this.$router.push('/')
      this.$message({
        type: 'success',
        message: '登录成功'
      })
    }
  }
}
</script>

<style>
/* .login-container {
  
} */

.login-card {
  width: 25rem;
  margin: 10rem auto;
}
</style>
