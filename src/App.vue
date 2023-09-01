<template>
  <div id="app">
    <keep-alive :include=keepArrys>
      <router-view></router-view>
    </keep-alive>
       <!-- 一级路由出口  -->
      <router-view />
    </div>
    
</template>

<script>
export default {
  data(){
    return{
      //缓存组件库
      keepArrys:['layoutIndex']
    }
  }
};
</script>

<style lang="less" >
.box{
  height: 300px;
  width: 300px;
  background-color: pink;
}
</style>