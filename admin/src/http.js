import axios from 'axios'
import Vue from 'vue'
import router from './router'
// 请求接口
const http= axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/admin/api',
  // baseURL: 'http://localhost:3000/admin/api'
})

// 添加拦截器
http.interceptors.request.use((config) => {
  //添加请求头
  if(localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token
  }

  return config
}, (err) => {
  return Promise.reject(err)
})

http.interceptors.response.use((res) => {
  return res
}, (err) => {
  if( err.response.data.message ) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })

    // 如果 401，统一跳回登录页
    if( err.response.status === 401) {
      // global.console.log('login')
      router.push('/login')
    }
  }
  // global.console.log(err.response.data.message)
  return Promise.reject(err)
})

export default http