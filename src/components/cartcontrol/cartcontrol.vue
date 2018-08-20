<template>
    <div class="cartcontrol">
        <!-- 如果商品数量小于1  就不现实  -->
        <transition name="cart">
              <div class="cart-decrease" v-show="food.count>0" @click="decrease" ref="tttt">
                  <span class="inner icon-remove_circle_outline">

                  </span>
              </div>
        </transition>
      
        <div class="cart-count"  v-show="food.count>0">
                {{food.count}}
        </div>
        <div class="cart-add icon-add_circle" @click="add">

        </div>
        <!-- 动画小球 -->
        <!--   @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter" -->
          <transition name="drop" class="ball"
           @before-enter="beforeEnter"
         @enter="enter"
         @after-enter="afterEnter"   
          >
           <div class="ball-container" ref="ball" v-show="show">
           <!-- <div v-for="(ball,index) of balls"  >
              
           </div> -->
       </div>
        </transition>
    </div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
      data(){
        return {
            show:false
        }
    },
    props:{
        food:{
            type:Object,
            default(){
                return{
                
                }
            }

        }
    },
    created(){
    },
    methods:{
        add(){
        //   先判断food对象里面是否有count属性 如果没有的话 就添加count属性 
        // 如果需要动态给对象添加属性的 必须使用Vue.set()
        if(this.food.count){
           this.food.count++;
        }else{
            // 这个是全局操作 会修改对象本身
           Vue.set(this.food,'count',1)
        }
                console.log(this.food.count);
                this.show=!this.show
        // this.enter()
        },
        decrease(){
          let a=this.food.count;
          if(a===1){
              this.food.count=0;
          }else{
              this.food.count--;
          }
        },
        beforeEnter(el){
              el.style.transform = "translate(0,0)"; //恢复到初始位置  也就是我们定义的位置
        },
        enter(el,done){
         el.offsetWidth;
        let ballPosition=this.$refs.ball.getBoundingClientRect();//获取小球
       let bade=document.querySelector('#bage').getBoundingClientRect();//获取徽标
       console.log(bade);

       console.log(ballPosition)
        let xDist=bade.left-ballPosition.left;
        let yDist=bade.top-ballPosition.top;

        console.log(xDist);
        console.log(yDist);
        el.style.transform=`translate(${xDist}px,${yDist}px)`;
        el.style.transition="all 1s cubic-bezier(.17,.67,.83,.67)"
           done() //afterEnter的调用
        },
        afterEnter(el){
             this.show=!this.show;
        }
    },
    watch:{
    
    }
}
</script>

<style lang="scss" scoped>
    .cartcontrol{
        font-size: 0;
        position: relative;
        .cart-decrease{
            display: inline-block;
            padding: 6px;
            .inner{
             font-size: 24px;
            line-height: 24px;
             color: rgb(0, 160, 220);
            }
            
            //  vertical-align:middle;
        }
        .cart-count{
            display: inline-block;
            font-size: 10px;
             vertical-align: top;
             width: 12px;
             padding-top: 6px;
             line-height: 24px;
             text-align: center;
             color: rgb(147, 153, 159)
        }
        .cart-add{
            display: inline-block;
            font-size: 24px;
            line-height: 24px;
            padding: 6px;
            color: rgb(0, 160, 220);
            //  vertical-align: middle;
        }
          .ball-container{
              width: 15px;
              height: 15px;
              border-radius: 50%;
              background-color: red;
              position: absolute;
              top: 10px;
              right: 36px;
               z-index:999;
            .ball{   
                .inner{
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background-color: red;
                }
            }
        }
    }
    // 动画样式属性
    .cart-enter-to, .cart-leave{
     transition: all .4s linear;//过渡效果
      transform: translate3d(0,0,0) rotate(0); //回到初始位置
    }
.cart-enter, .cart-leave-to /* .fade-leave-active below version 2.1.8 */ {
     opacity: 0;
     transform: translate3d(24px,0,0) rotate(180deg);//动画效果  动画开始的时候的位置
      transition: all .4s linear;
}
</style>

