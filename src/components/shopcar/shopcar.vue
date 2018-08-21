<template>
<div>
    <div class="shopcar">
       <div class="content" @click="toggleList">
           <div class="content-left">
               <div class="logo-wrapper">
                   <!-- 条件渲染  如果成立就渲染 不成立就不渲染 -->
                   <div class="logo" :class="{'highlight':totalCount>0}">
                       <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                   </div>
                   <!-- 如果有就显示 没有就不显示 -->
                   <div class="num" v-show="totalCount" id="bage">
                       {{totalCount}}
                   </div>
               </div>
               <div class="price" :class="{'highlight':toalPrice>0}">￥{{toalPrice}}</div>
               <div class="desc">另需配送费{{deliveryPrice}}元</div>
           </div>
           <!-- 阻止冒泡 是想上冒泡 -->
            <div class="content-right" @click.stop="pay">
                <div class="pay" :class="payClass">
                   {{totaler}}
                </div>
            </div>
       </div>
       <!-- 添加动画 -->
      <transition name="fold">
        <div class="shopcart-list" v-show="listShow" >
             
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="listContent">
                <ul>
                    <!-- 遍历我们选中的数据 -->
                    <li class="food" v-for="(food,index) of selectFoods" :key="index+1" >
                        <span class="name">{{food.name}}</span>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcontrol-wrapper">
                            <!-- 引入按钮组件 传入我们选着的食物-->
                            <cartcontrol
                            :food="food"
                            ></cartcontrol>
                        </div>
                    </li>
                </ul>
            </div>
             
        </div>
      </transition>
    </div>
    <transition name="fade">
        <div class="list-mask" v-show="listShow" @click="hadelist"></div>
    </transition>
    
</div>    
</template>

<script>
import cartcontrol from "../cartcontrol/cartcontrol.vue" //按钮组件
import BScollr from "better-scroll";
let a;
export default {
    data(){
        return{
           
            fold:false,
        }
    },
   props: {
			deliveryPrice: {
				type: Number,
				default: 0
			},
			minPrice: {
				type: Number,
				default: 0
            },
            selectFoods:{
                type:Array,
                default(){//如果类型是数组和object 设置默认值需要 返回的是一个函数
                    return [
                       
                    ]
                }
            }
        },
        created(){
          
        },
        computed:{
            toalPrice(){//计算我们的价钱
                let total=0;
                /**
                 * [{price:1,count:2},{price:1,count:2},{price:1,count:2}].forEach( (item) => {
                 *        item === {price:1,count:2}
                 * })  ===等价于
                 *  ({price:1,count:2}) => {
                 *      
                 * }
                 * 
                 */
                this.selectFoods.forEach(food => {
                    total+=food.price*food.count;//计算总价                
                });
                return total;
            },
            totalCount(){//计算商品总和 
            let count=0;
            this.selectFoods.forEach(food => {
                count+=food.count;
            });
            return count;
            }, 
            totaler(){//计算起送价钱
                let sum=0;
                if(this.toalPrice ===0 ){
                     return `￥${this.minPrice}元起送`;
                }
              if(this.minPrice>parseInt(this.toalPrice)){
                  sum=Math.abs(this.minPrice-parseInt(this.toalPrice));
                  return `还差￥${sum}元起送`;
              }else{
                   sum = parseInt(this.toalPrice);
                     return `去结算`;
              }
            },
            payClass(){//计算样式
                   if (this.toalPrice>=this.minPrice){
                       return `highlight`
                   }else{
                       return `not-enough`
                   } 
            },
            listShow(){
                if(!this.totalCount){//非0为真
                    this.fold=true;
                    return false;
                }
                let show=!this.fold;
                console.log('show'+show);
                if(show){
                       this.$nextTick(() => {
                    if(!a){
                a=new BScollr(this.$refs.listContent,{
                          click:true
                         })
                         }else{
                             a.refresh()
                         }
                    })
                }
                return show;
            }
        },
        components:{
            cartcontrol
        },
        methods:{
            toggleList(){
                if(!this.totalCount){
                    return;
                }
                this.fold=!this.fold;
            },
            empty(){
                this.selectFoods.forEach((food) => {
                    food.count=0;
                });              
            },
            hadelist(){
                this.fold=true;
                console.log(this.fold)
            },
            pay(){
                // 判断价格是否满足最低价钱
                if(this.toalPrice<this.minPrice){
                    return;
                }
                alert("动动脑子，这个能支付吗？");
            }
        },
        mounted(){
           
          
        }

   
}
</script>

<style lang="scss" scoped>
@import "../../common/css/minin.scss";
    .shopcar{
        width: 100%;
        height: 48px;
        .content{
            display: flex;
            height: 100%;
            background-color: #141d27;
            font-size: 0;
            .content-left{
                flex: 1;
                .logo-wrapper{
                    display: inline-block;
                    position: relative;
                    top: -10px;
                    margin: 0 12px;
                    padding: 6px;
                    width: 56px;
                    height: 56px;
                    box-sizing: border-box;
                    vertical-align: top;
                    border-radius: 50%;
                    background-color: #141d27;
                    .logo{
                        width: 100%;
                        height: 100%;
                          border-radius: 50%;
                          background-color: #2b343c;
                          text-align: center;
                          &.highlight{
                              background-color: rgb(0, 160, 220);

                          }
                          .icon-shopping_cart{
                              font-size: 24px;
                                line-height: 44px;
                                color: #80858a;
                                &.highlight{
                                    color: #fff;
                                }
                          }
                    }
                    .num{
                        position: absolute;
                        top: 0;
                        right: 0;
                        width: 24px;
                        height: 16px;
                        line-height: 16px;
                        text-align: center;
                        border-radius: 16px;
                        font-size: 9px;
                        font-weight: 700;
                        color: white;
                        background-color: red;
                        box-shadow: 0 4px 8px 0 rgba(0,0,0, .4) 
                    }
                }
                .price{
                     display: inline-block;
                     vertical-align: top;
                     line-height: 24px;
                     font-size: 16px;
                     color: rgba(255,255,255,.4);
                    margin-top: 12px;
                    padding-right: 12px;
                     font-weight: 700;
                     box-sizing: border-box;
                   border-right: 1px solid rgba(255, 255, 255, .1);
                   &.highlight{
                       color: #fff;
                   }

                }
                .desc{
                     display: inline-block;
                     vertical-align: top;
                     line-height: 24px;
                     margin: 12px 0 0 12px;
                     font-size: 10px;
                     font-weight: 700;
                      color: rgba(255,255,255,.4);
                }
            }
            .content-right{
                flex:  0 0 105px;
                width: 105px;
                .pay{
                    height: 48px;
                    line-height: 48px;
                    font-size: 12px;
                    text-align: center;
                    color: rgba(255,255,255,.4);
                    font-weight: 700;
                    background-color: #2b333b;
                    &.highlight{
                        background-color: #00b43c;
                        color: #fff;
                    }
                    &.not-enough{
                        background-color: #2b333b
                    }
                }
            }
        }
        .shopcart-list{
            position: absolute;
            top:0; //相对于父盒子为0
            left:0;
            width: 100%;
            z-index: -1;
            transform:translate3d(0,-100%,0);
            // 添加动画
            &.fold-enter-active,&.fold-leave-active{
                 transition:all .5s;
            }
            &.fold-enter,&.fold-leave-active{
                 transform:translate3d(0,0,0);
            }        
            .list-header{
                height: 40px;
                line-height: 40px;
                text-align: center;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7, 17, 27, .1);
                .title{
                    float: left; 
                    font-size: 14px;
                    color: rgb(7, 17, 27)
                }
                .empty{
                    float: right;
                    font-size: 12px;
                    color: rgb(0, 160, 220)
                }
            }
            .list-content{
                padding: 0 18px;
                max-height: 217px;
                background: #fff;
                overflow: hidden;
                .food{
                    position: relative;
                    padding: 12px 0;
                    box-sizing: border-box;
                    @include border-1px(rgba(7, 17, 27, .1));
                    .name{
                        line-height:24px;
                        font-size: 14px;
                        color: rgb(7, 17, 27);
                    }
                    .price{
                        position: absolute;
                        right: 90px;
                        bottom: 12px;
                        line-height: 24px;
                        font-size: 24px;
                        font-weight: 700;
                        color: red;
                    }
                    .cartcontrol-wrapper{
                        position: absolute;
                        right: 0;
                        bottom: 6px;
                    }
                }               
            }
        }
      
    }
    .list-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -2;
        // 这里需要写展示的最终效果 下面只是写一个过渡的效果
        opacity: 1;
        background-color: rgba(7, 17, 27, .6);
        &.fade-enter-active, &.fade-leave-active {
        transition: all .5s;
        opacity: 1;
         background-color: rgba(7, 17, 27, .6);
        }
        .fade-enter, .fade-leave-to{
         opacity: 0;
        }
    }
      
       
       
</style>
