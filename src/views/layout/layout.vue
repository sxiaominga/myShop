<template>
  <div>
    <keep-alive :include=keepArry >
      <router-view></router-view>
    </keep-alive>
      
       <!-- 二级路由出口  -->
    <!-- 二级组件 -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="wap-home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/category" icon="apps-o">分类页</van-tabbar-item>
      <van-tabbar-item to="/cart" icon="shopping-cart-o">购物车</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "layoutIndex",
  data(){
    return{
      //缓存组件库
      keepArry:['HomePage']
    }
  }
};
</script>

<style>
</style>