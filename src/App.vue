<template>
  <div id="app">
    <!-- 组件传值 -->
     <heade
      :seller="seller"
     ></heade>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/ratings" >评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
      <!-- router-view 动态传参   由 router-view传递给goods组件  然后再由goods组件传递给 shopcar组件   同理其实也传递给了 rating
      和seller组件只是 他们没有接受
    因为goods组件需要这个 seller
      -->
        <router-view :seller="seller"></router-view>
  </div>
</template>

<script>

import heade from './components/header/header.vue'
export default {
  name: 'App',
  data(){
    return{
      seller:{}
    }
  },
  methods:{
    getSeller(){//获取seller数据
    this.$http.get('/api/seller').then((result) => {
      if(result.status==200){
        this.seller=result.data.data;
      }     
    }).catch((err) => {
      console.error(err)
    });
    },
    test(){
     this.$store.dispatch('g')
      console.log(this.$store.state.test02)
    }
  },
  created(){
    this.getSeller()
  },
  components:{
    heade
  }
}
</script>

<style lang="scss" scoped>
@import "./common/css/minin.scss";

#app{
 .tab{
    display: flex;
    height: 40px;
    width: 100%;
    line-height: 40px;
    justify-content: space-around;
    // 引入scss函数
     @include border-1px(rgba(7, 17, 27, 0.1));
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

