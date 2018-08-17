<template>
    <div class="goods">
        <!-- 选项列表 -->
        <div class="menu-wrapper">
            <ul>
                <li v-for="(item,index) of goods" :key="index" class="meun-item">
                    <span class="text">
                        <!-- 图标组件 -->
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
        <div class="foods-wrapper"></div>
    </div>
</template>

<script>
import icon from "../Tubiao/icon.vue"
export default {
    data(){
        return{
            goods:[]
        }
    },
    methods:{
        getMess(){//获取信息
            this.$http.get('/api/goods').then((result) => {
                if(result.status==200){
                    this.goods=result.data.data
                }
                console.log(this.goods)
            }).catch((err) => {
                console.error(err)
            });
        }
    },
    created(){
        this.getMess()
    },
    props:{
        seller:{
            type:Object
        }
    },
    components:{
        icon
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
        }
    }
</style>
