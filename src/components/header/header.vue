<template>
    <div class="header">
       <div class="content-wrapper">
           <!-- 商家图片 -->
           <div class="avata">
               <img :src="seller.avatar" alt="" width="64" height="64">
           </div>
           <!-- 内容区域 -->
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description }}/{{seller.deliveryTime}}分钟送达 
                </div>
                <div class="support" v-if="seller.supports">
                    <!-- 根据数组返回的值来 显示不同的图标 -->
                    <div class="icon">
                        <!-- 图标组件 -->
                    <icon
                    :type="seller.supports[0].type"
                    ></icon>
                    </div>
                   
                    <!-- <span class="icon" :class="classArr[seller.supports[0].type]"></span> -->
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
                
            </div>
            <!-- 活动个数 -->
             <div class="support-count" v-if="seller.supports" @click="showBox">
                    <span class="count">{{seller.supports.length}}个</span>
                    <i class="icon-keyboard_arrow_right"></i>
            </div>
       </div>
       <!-- 公告区域 -->
       <div class="bulletin-wrapper" @click="showBox">
           <span class="bulletin-title"></span><span class="bulletion-text">{{seller.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
       </div>
       <!-- 背景图片 -->
       <div class="background">
           <img :src="seller.avatar" alt="" width="100%" height="100%">
       </div>

        <!-- 添加动画 -->
        <transition name="detail">
       <!-- 弹层 -->
       <div class="detail" v-show="show">
           <div class="detail-wrapper clearfix">
               <div class="detail-main">
                   <h1 class="name">{{seller.name}}</h1>
                   <!-- 评分组件  使用组件传值  size大小是我们自定义的-->
                   <div class="score">
                    <score
                   :size="48"
                   :score="seller.score"
                   ></score>
                   </div>
                   <div class="title">
                       <!-- 标题组件 -->
                       <mess
                       :title="title"
                       ></mess>
                    </div> 
                    <!-- 展示优惠信息 -->
                    <ul v-if="seller.supports" class="supports">
                        <li class="support-item" v-for="(item,index) of seller.supports" :key="index">
                            <div class="icon">
                                <!-- 图标组件 -->
                                <icon
                                :type="index"
                                ></icon>
                            </div>
                            <!-- <span class="icon" :class=" classArr[index]"></span> -->
                            <span class="text">{{item.description}}</span>
                        </li>
                    </ul>
                    <!-- 商家信息组件 -->
                    <div class="title shangjia">
                        <mess
                       :title="title1"
                       ></mess>
                    </div>
                    <!-- 内容区域 -->
                    <div class="bulletin">
                        <p class="conten">{{seller.bulletin}}</p>
                    </div>
               </div>
           </div>
           <!-- 固定在底部的层 -->
           <div class="detail-close" @click="close">
               <i class="icon-close"></i>
           </div>
       </div>
     </transition>
    </div>
</template>

<script>
import score from "../score/score.vue"
import mess from "../mess/mess.vue"
import icon from "../Tubiao/icon.vue"
export default {
    data(){
        return{
            // classArr:['decrease','discount','guarantee','invoice','special'],//定义样式数组
            show:false,
            title:'优惠信息',
            title1:'商家信息'
        }
    },
    props:{
        seller:{
            type:Object,
        }
    },
    methods:{
        showBox(){
            this.show=!this.show
        },
        close(){
            this.show=!this.show
        }
    },
    components:{
        score,
        mess,
        icon
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/css/minin.scss";
    .header{
        position: relative;
        color: #ffffff;
        background-color: rgba(7, 17, 27, .5);
        overflow: hidden;
        .content-wrapper{
            padding: 24px 12px 18px 24px;
            font-size: 0;
            position: relative;
            .avata{
                display: inline-block;
                vertical-align: top;
                img{
                    border-radius: 2px;
                }
            }
            .content{
                margin-left: 16px;
                display: inline-block;
                font-size: 14px;
                .title{
                    margin: 2px 0 8px 0;
                    .brand{
                        display: inline-block;
                        width: 30px;
                        height: 18px;
                        @include bgImg('./img/brand');
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                        // 图片和文字对齐
                         vertical-align: top;
                    }
                    .name{
                       margin-left: 6px;
                       font-size: 16px;
                       line-height: 18px;
                       font-weight: bold;
                    }
                }
                .description{
                   margin-bottom: 10px;
                   line-height: 12px;
                   font-size: 12px;
                }
                .support{
                    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                         vertical-align: top;
                        // 给下面的图片添加不同的样式 &表示当前元素   &.decrease ====》当前元素的后代 添加样式class
                        // &.decrease{
                        //     @include bgImg('./img/decrease_1')
                        // }
                        // &.discount{
                        //     @include bgImg('./img/discount_1')
                        // }
                        // &.guarantee{
                        //     @include bgImg('./img/guarantee_1')
                        // }
                        // &.invoice{
                        //     @include bgImg('./img/invoice_1')
                        // }
                        //  &.special{
                        //     @include bgImg('./img/special_1')
                        // }

                    }
                    .text{
                       vertical-align: top;
                        font-size: 10px;
                        line-height: 12px;
                    }
                }

            }
            .support-count{
                position: absolute;
                right: 12px;
                bottom: 14px;
                padding: 0 8px;
                background-color: rgba(0, 0, 0, .2);
                height: 24px;
                line-height: 24px;
                border-radius: 14px;
                .count{
                    vertical-align: top;
                    color: white;
                    font-size: 10px;
                    font-weight: 100px;
                    color: rgb(255, 255, 255)
                }
                .icon-keyboard_arrow_right{
                    // vertical-align:middle;
                    margin-left: 2px;
                    line-height: 24px;
                    font-size: 10px;
                }
            
            }
         }
        .bulletin-wrapper{
                 position: relative;
                height: 28px;
                line-height: 28px;
                padding: 0 22px 0 12px;
                background-color: rgba(7, 17, 27, .2);
                // 下面是将文字设置成....
                 white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                .bulletin-title{
                    display: inline-block;
                    width: 22px;
                    height: 12px;
                    @include bgImg('./img/bulletin');
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                }
                .bulletion-text{
                    font-size: 10px;
                    line-height: 28px;
                    color: rgb(255, 255, 255);
                    vertical-align: middle;
                    margin: 0 4px;
                }
                .icon-keyboard_arrow_right{
                    // vertical-align:middle;
                   position: absolute;
                   font-size: 10px;
                   line-height: 12px;
                   right: 12px;
                   top: 8px;
                }
            }
        .background{
               position: absolute;
               top: 0;
               left: 0;
               width: 100%;
               height: 100%;
               z-index: -1;
            filter: blur(10px);//模糊效果             
            }      
        // 弹层 样式
        .detail{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 999;
            background-color: rgba(7, 17, 27, .8);
            overflow: auto;
           .detail-wrapper{
               width: 100%;
               min-height: 100%;
               .detail-main{
                  margin-top: 64px;
                  padding-bottom: 64px;
                  .name{
                      width: 100%;
                      text-align: center;
                      font-size: 16px;
                      line-height: 16px;
                      color: rgb(255, 255, 255);
                      font-weight: 700;
                  }
                 .score{
                     margin-top: 16px;
                     margin-bottom: 28px;
                     padding: 2px 0;
                     height: 24px;
                     text-align: center;
                 }
                 .title{
                     width: 80%;
                     margin: auto;
                     text-align: center;
                    margin-bottom: 24px;
                 }
                 .supports{
                     width: 80%;
                     text-align: center;
                     margin: 0 auto;
                     .support-item{
                         padding: 0 12px;
                         margin-bottom: 12px;
                         font-size: 0px;
                         text-align: left;
                         &:last-child{
                             margin-bottom: 0;
                         }
                         .icon{
                             display: inline-block;
                             vertical-align: top;
                             width: 16px;
                             height: 16px;
                            margin-right: 6px;
                            background-size: 100% 100%;
                            background-repeat: no-repeat;
                            font-size: 10px;
                            &.decrease{
                            @include bgImg('./img/decrease_2')
                            }
                        &.discount{
                            @include bgImg('./img/discount_2')
                            }
                        &.guarantee{
                            @include bgImg('./img/guarantee_2')
                             }
                        &.invoice{
                            @include bgImg('./img/invoice_2')
                            }
                         &.special{
                            @include bgImg('./img/special_2')
                            }
                         }
                         .text{
                             line-height: 16px;
                             font-size: 12px;
                             vertical-align: top;
                         }
                     }
                 }
                 .shangjia{
                     margin: 28px auto 24px auto;
                 }
                 .bulletin{
                     width: 80%;
                     margin: 0 auto;
                    .content{
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                        font-weight: 200;
                    }
                 }
               }
           } 
            .detail-close{
                   position: relative;
                   width: 32px;
                   height: 32px;
                   font-size: 32px;
                   margin:-64px auto 0 auto;
                   color: rgba(255, 255, 255, .5);
                //    清除浮动 
                   clear: both;
               }
        }
        }
        //添加动画效果
        // 入场动画 和离场动画
        .detail-enter{
            opacity: 0;
        } 
        .detail-enter-to{
            opacity: 1;
            transition: all 1s;
        }
        .detail-leave{
            opacity: 1;
        }
        .detail-leave-to{
            opacity: 0;
             transition: all 1s;
        }
</style>

