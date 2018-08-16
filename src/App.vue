<template>
  <div id="app">
     <heade></heade>
      <div class="tab">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings">评价</router-link>
          
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
        <router-view></router-view>
     
  </div>
</template>

<script>

import heade from './components/header/header.vue'
export default {
  name: 'App',
  components:{
    heade
  }
}
</script>

<style lang="scss" scoped>
#app{
 .tab{
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    justify-content: space-around;
    border-bottom: 1px solid rgba(7, 17, 27, 0.1);
    .tab-item{
      font-size: 14px;
      color: rgba(7, 17, 27, 0.2);
      & > a{
        display: block;

      }
    }
  }
}
//修改路由默认样式
.router-link-active{ 
  color: rgb(240, 20, 20);
} 
</style>

