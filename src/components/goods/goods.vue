<template>
    <div class="goods">
        <!-- 选项列表 -->
        <div class="menu-wrapper" ref="meunWrapper">
            <ul>
                <!-- 'current' ====> 这个写法是 字符串 -->
                <li v-for="(item,index) of goods" :key="index" class="meun-item" :class="{'current':currentIndex === index}"
                @click="sellectMenu(index)"
                >
                    <span class="text">
                        <!-- 图标组件  [currentIndex==index ? 'current' : '']-->
                        <span v-show="item.type>0" class="icon">
                            <icon
                            :type="item.type"
                            >
                            </icon>
                        </span>{{item.name}}  
                    </span>
                </li>
            </ul>
        </div>
        <!-- 详情列表 -->
        <div class="foods-wrapper" ref="foodWrapper">
            <ul>
                <li v-for="(item,index) of goods" class="food-list food-list-hock" :key="index">
                    <h1 class="title">{{item.name}}</h1>
                    <ul>
                     <li v-for="(food,index) of item.foods" :key="index" class="food-item">
                        <div class="icon">
                            <img :src="food.icon" alt="" width="57" height="57">
                        </div>
                        <div class="content">
                            <h2 class="name">{{food.name}}</h2>
                            <p class="desc">{{food.description}}</p>
                            <div class="extra">
                                <span>月售:{{food.sellCount}}份</span>
                                <span>好评率:{{food.rating}}%</span>
                            </div>
                            <div class="price">
                                <span>￥{{food.price}}</span>
                                <span v-show="food.oldPrice" class="oldPrice">￥{{food.oldPrice}}</span>
                            </div>
                             <!-- 按钮组件 传入food-->
                             <div class="cartcontrol-wrapper">
                                  <cartcontrol
                                  :food="food"
                                  ></cartcontrol>
                             </div>
                       
                        </div>
                    </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 购物车组件 -->
        <div class="shopcart">
            <!-- 这个地方使用的是商家的信息 而我们在这个goods组件只是获取了 商品的信息  所以我们必须 我们必须接受到 商家的信息 
            就通过路由视图 来传递信息
            -->
            <shop-car
            :deliveryPrice="seller.deliveryPrice"
            :minPrice="seller.minPrice"
            :selectFoods="selectFoods"
            ></shop-car>
        </div>
    </div>
</template>

<script>
import icon from "../Tubiao/icon.vue"
import BScroll from 'better-scroll';
import shopCar from '../shopcar/shopcar.vue'
import cartcontrol from "../cartcontrol/cartcontrol.vue"
let a;
let b;
export default {
    data(){
        return{
            goods:[],
            listHeight:[],
            scrollY:0,
        }
    },
    methods:{
        getMess(){//获取信息
            this.$http.get('/api/goods').then((result) => {
                if(result.status==200){
                    this.goods=result.data.data;
                    this.$nextTick(() =>{
                            this._calculateHeight();
                            this._initScroll();
                      })
      
                }
                console.log(this.goods)
            }).catch((err) => {
                console.error(err)
            });
        },
        _initScroll(){//初始化 滚动插件
             a= new BScroll(this.$refs.meunWrapper,{
               click:true, //运行点击事件
            });


             b=new BScroll(this.$refs.foodWrapper,{
                probeType:3, //
                click:true //添加点击事件
            });

            b.on('scroll',(pos) => { //监听滚动事件 
                this.scrollY=Math.abs(Math.round(pos.y)) ;
                // console.log(this.scrollY)
            })
        
        },
        _calculateHeight(){//获取高度
            let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hock'); //获取全部的li
           let height=0;//定义临时变量
        //    console.log(foodList.length)
           this.listHeight.push(height); //这个是初始默认数组中有一个,然后进入 循环
           for(let i=0;i<foodList.length;i++){
               let item=foodList[i];
               height+=item.clientHeight;//视口的大小 就是我们能看见的高度的大小  获得累加的高度
               this.listHeight.push(height)
           }
        },
        sellectMenu(index){
            console.log(index);
            let foodList=this.$refs.foodWrapper.getElementsByClassName('food-list-hock');
            let el=foodList[index]//获取我们选择的标题
            b.scrollToElement(el,300);//调用接口 点击跳转的接口
        
        
        
        
        }   
    },
    created(){
        this.getMess();
        
    },
    mounted(){
        // this._initScroll();
                    
                     
        
    },
    props:{
        seller:{ //这个接受的是 传递进来的商家 信息
            type:Object
        }
    },
    computed:{
        currentIndex(){//返回现在是第几个
            for(let i=0;i<this.listHeight.length;i++){
                // 获取区间上下的范围
                let height1=this.listHeight[i];
                let height2=this.listHeight[i+1];
                // 落在某个区间  为什么有一个!height 是因为最后一个height 不存在   
                // 利用了 逻辑短路  因为当！height为假的时候  说明是在数组的范围内   而且执行的是判断后面的操作  如果为真 说明不在数组的范围内，并且由于
                // 逻辑短路 那么就会直接 返回return i;
                if(!height2||(this.scrollY>=height1&&this.scrollY<height2)){
                   
                    return i;
                   
                }
            }
            return 0;
        },
        selectFoods(){
            let foods=[];
            // 因为使用vue.set（）所以修改了全局的对象
          this.goods.forEach( goods => { //这里是热销榜 
              goods.foods.forEach((food) => {//热销榜里面的食物
                    if(food.count){
                        foods.push(food)
                    }
              })
           })
            return foods;
        }
    }
    ,
    components:{
        icon,
        shopCar,
        cartcontrol
    },
    watch:{
        
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/minin.scss";
    .goods{
        // 这里定位是将起放到固定的位置
        position: absolute;
        top: 174px;
        bottom: 46px;
        width: 100%;
        display: flex;
        overflow: hidden;
        .menu-wrapper{
            width: 80px;
            flex: 0 0 80px;
            background-color: #f3f5f7;
            .meun-item{
                 display: table;//垂直居中
                width: 56px;
                height: 54px;
                line-height: 14px;
                padding: 0 12px;
               
                 .text{
                     display: table-cell;
                     width: 56px;
                     vertical-align: middle;
                     font-size: 12px;
                     text-align: center;
                     @include border-1px(rgba(7,17,27,.1));
                     .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 2px;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                         vertical-align: top;
                        
                    }
                 }   
                 
                
            }
        }
        .foods-wrapper{
            width: 100%;
            flex: 1;
           .title{
               padding-left: 14px;
               height: 26px;
               line-height: 26px;
               border-left: 2px solid #d9dde1;
               background-color: #f3f5f7;
               color: rgb(147, 153, 159);
               font-size: 12px;
           }
           .food-item{
               display: flex;
               margin: 18px;
               padding-bottom: 18px;
               @include border-1px(rgba(7,17,27,.1));
            //    最后一个没有下划线
               &:last-child{
                //    因为 我们是用伪类完成的 所以border=0 是不能完全清除的
                  @include border-none();
                   margin-bottom: 0px;
               }
               .icon{
                   flex: 0 0 57px;
                   margin-right: 10px;
               }
               .content{
                   flex: 1;
                   .name{
                       font-size: 14px;
                       line-height: 14px;   
                       color: rgb(7, 17, 27);
                      margin: 2px 0 8px 0;
                      font-size: 14px;
                   }
                   .desc{
                       margin-bottom: 8px;
                       font-size: 10px;
                       line-height: 10px;
                       color: rgb(147, 153, 159)
                   }
                   .extra{
                        font-size: 10px;
                       line-height: 10px;
                       color: rgb(147, 153, 159);
                       span:first-child{
                           margin-right: 12px;
                       }
                   }
                   .price{
                       font-size: 14px;
                       line-height: 24px;
                       font-weight: normal;
                       color: red;
                       .oldPrice{
                           font-size: 10px;
                            text-decoration: line-through;
                            margin-left: 8px;
                             font-weight: 700;
                              color: rgb(147, 153, 159);
                       }
                   }
                   .cartcontrol-wrapper{
                       position: absolute;
                       right: 0;
                        bottom: 12px;
                   }
               }
           }
        }
        
    }
     .current{
                    background-color: white;
                    position: relative;
                    margin-top: -1px;
                    font-weight: 700;
                    z-index: 10;
                    
                }
    .shopcart{
        position: fixed;
        bottom: 0;
        left: 0;
        z-index: 99;
        width: 100%;
        height: 48px;
        }
</style>
