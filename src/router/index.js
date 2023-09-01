import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/layout.vue'
import Home from '../views/layout/home.vue'
import Category from '../views/layout/category.vue'
import Cart from '../views/layout/cart.vue'
import User from '../views/layout/user.vue'
import store from '../store/index'
import address from '../views/address/address.vue'

const Login = () =>import('@/views/login/login.vue')
const Search =() =>import('@/views/search/search.vue')
const SearchList =()=>import('@/views/search/list.vue')
const ProDetail=()=>import('@/views/prodetail/prodetail.vue')
const Pay=()=>import('@/views/pay/pay.vue')
const MyOrder=()=>import('@/views/myorder/myorder.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    redirect:'/home',
    children: [
      {
        path: 'home',
        component: Home
      },
      {
        path: 'category',
        component: Category
      },
      {
        path: 'cart',
        component: Cart
      },
      {
        path: 'user',
        component: User
      }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: MyOrder
  },
  {
    path:'/address',
    component:address
  }
]

const router = new VueRouter({
  routes
})
//所有的路由在真正被访问到之前(解析渲染对应组件页面前)，都会先经过全局前置守卫
//只有全局前置守卫放行了，才会到达对应的页面
//全局前置导航守卫
//to:到哪里去，到哪去的完整路由信息对象（路径，参数）
//from：从哪里来，从哪来的完整路由信息对象
//(1)next()直接放行，放行到to要去的路径
//(2)next(路径)进行拦截，拦截到next里面配置的路径
const authUrl = ['/pay','/myorder']
router.beforeEach((to,from,next)=>{
 const token = store.getters.token
 if(!authUrl.includes(to.path)){
  next()
  return
 }
 if(token){
  next()
 }else{
  next('/login')
 }
})
export default router
