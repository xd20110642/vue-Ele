<template>
    <div class="header">
       <div class="content-wrapper">
           <div class="avata">
               <img :src="seller.avatar" alt="" width="64" height="64">
           </div>
            <div class="content">
                <div class="title">
                    <span class="brand"></span>
                    <span class="name">{{seller.name}}</span>
                </div>
                <div class="description">
                    {{seller.description }}/{{seller.deliveryTime}}分钟送达 
                </div>
                <div class="support" v-if="seller.supports">
                    <span class="icon" :class="classArr[seller.supports[0].type]"></span>
                    <span class="text">{{seller.supports[0].description}}</span>
                </div>
            </div>
       </div>
       <div class="bulletin-wrapper"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            classArr:['decrease','discount','guarantee','invoice','special'],//定义样式数组
        }
    },
    props:{
        seller:{
            type:Object,
        }
    }
}
</script>

<style lang="scss" scoped>

@import "../../common/css/minin.scss";
    .header{
        color: #ffffff;
        background-color: black;
        .content-wrapper{
            padding: 24px 12px 18px 24px;
            font-size: 0;
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
                        // 给下面的图片添加不同的样式 &表示当前元素   &.decrease ====》当前元素的后代 添加样式class
                        &.decrease{
                            @include bgImg('./img/decrease_1')
                        }
                        &.discount{
                            @include bgImg('./img/discount_1')
                        }
                        &.guarantee{
                            @include bgImg('./img/guarantee_1')
                        }
                        &.invoice{
                            @include bgImg('./img/invoice_1')
                        }
                         &.special{
                            @include bgImg('./img/special_1')
                        }

                    }
                }

            }
             }
        }
</style>

