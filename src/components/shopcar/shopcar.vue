<template>
    <div class="shopcar">
       <div class="content">
           <div class="content-left">
               <div class="logo-wrapper">
                   <!-- 条件渲染  如果成立就渲染 不成立就不渲染 -->
                   <div class="logo" :class="{'highlight':totalCount>0}">
                       <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                   </div>
                   <!-- 如果有就显示 没有就不显示 -->
                   <div class="num" v-show="totalCount">
                       {{totalCount}}
                   </div>
               </div>
               <div class="price" :class="{'highlight':toalPrice>0}">￥{{toalPrice}}</div>
               <div class="desc">另需配送费{{deliveryPrice}}元</div>
           </div>
            <div class="content-right">
                <div class="pay">
                    ￥{{totaler}}
                </div>
            </div>
       </div>
    </div>
</template>

<script>
export default {
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
                        {
                            price:10,
                            count:1
                        }
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
              if(this.minPrice>parseInt(this.toalPrice)){
                  sum=Math.abs(this.minPrice-parseInt(this.toalPrice));
                  return `还差${sum}元起送`;
              }else{
                   sum = parseInt(this.toalPrice);
                     return `去结算`;
              }
            }
        }

   
}
</script>

<style lang="scss" scoped>
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
                }
            }
        }
    }
</style>
