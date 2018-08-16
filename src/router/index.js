import Vue from 'vue'
import Router from 'vue-router'
import rating from '../components/rating/rating.vue'
import goods from '../components/goods/goods.vue'
import seller from '../components/seller/seller.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {path:'/',redirect:'/goods'},
      {path:'/goods',component:goods,name:'goods'},
      {path:'/ratings',component:rating,name:'rating'},
      {path:'/seller',component:seller,name:'seller'}
  ],
  
})
