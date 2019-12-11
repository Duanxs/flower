import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import Overview from '../views/Overview.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import GoodsEdit from '../views/GoodsEdit.vue'
import GoodsList from '../views/GoodsList.vue'
import AdsEdit from '../views/AdsEdit.vue'
import AdsList from '../views/AdsList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      isPublic: true
    }
  },
  {
    path: '/',
    name: 'main',
    component: Main,
    children: [
      // 概况路由
      {path: '/overview', component: Overview},

      // 分类路由
      {path: '/categories/create', component: CategoryEdit},
      {path: '/categories/list', component: CategoryList},
      {path: '/categories/edit/:id', component: CategoryEdit, props: true},

      // 商品路由
      {path: '/goods/create', component: GoodsEdit},
      {path: '/goods/list', component: GoodsList},
      {path: '/goods/edit/:id', component: GoodsEdit, props: true},
      
      // 广告路由
      {path: '/ads/create', component: AdsEdit},
      {path: '/ads/list', component: AdsList},
      {path: '/ads/edit/:id', component: AdsEdit, props: true},

      // 后台管理员
      {path: '/admin_user/create', component: AdminUserEdit},
      {path: '/admin_user/list', component: AdminUserList},
      {path: '/admin_user/edit/:id', component: AdminUserEdit, props: true},
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(!to.meta.isPublic && !localStorage.token) {
    return next('/login')
  }
  next() 
})
export default router
