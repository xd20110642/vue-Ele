<template>
    <div class="score" :class="starType">
        <span v-for="(item,index) in itemClasses" :class="item" class="star-item" :key="index"></span>
    </div>
</template>

<script>
const length=5;
const CLS_ON='on';
const CLS_HALF='half';
const CLS_OFF='off';
export default {
    props:{
        size:{
            type:Number
        },
        score:{
            type:Number
        }
    },
    computed:{
        starType(newValue,oldValue){
            // 动态生成样式 class
            return 'star-'+this.size 
        },
        itemClasses(newValue,oldVuale){ //计算样式
            let result=[];
            let num=parseInt(this.score)//转换为number
            let scrore=Math.floor(num*2)/2    //获取整数 向下取整  4.3x2=8.6 ==》取整8 8/2===>4
           let hasDecimal=scrore%1 !==0;  //判断是否有小数
           let integer=Math.floor(scrore); //判断全星
           for(let i=0;i<integer;i++){ //存储全星
                result.push(CLS_ON)
           }
           if(hasDecimal){//存储半星
               result.push(CLS_HALF)
           }
            // 如果数组长度没有5个 就添加空心 直到长度为5位置
           while(result.length<length){//存储空心
               result.push(CLS_OFF)
           }
            // 返回数组
           return result;
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/css/minin.scss";
    .score{
        font-size: 0;
        .star-item{ //基础class  这里是如果都没有的话 那么就显示默认样式 
            display: inline-block;
            background-repeat: no-repeat;
        }
        &.star-48{//计算属性生成的样式
            .star-item{//图片样式大小
                width: 20px;
                height: 20px;
                margin-right: 22px;
                background-size: 100% 100%;
                &:last-child{
                    margin-right: 0;
                }
            &.on{//遍历动态绑定的样式 class
                @include bgImg('./img/star48_on')
            }
            &.half{
                 @include bgImg('./img/star48_half')
            }
             &.off{
                 @include bgImg('./img/star48_off')
            }
            }
        }
        &.star-36{//计算属性生成的样式
            .star-item{
                width: 15px;
                height: 15px;
                margin-right: 6px;
                background-size: 100% 100%;
                &:last-child{
                    margin-right: 0;
                }
            &.on{//全星
                @include bgImg('./img/star36_on')
            }
            &.half{
                 @include bgImg('./img/star36_half')
            }
             &.off{
                 @include bgImg('./img/star36_off')
            }
            }
        }
        &.star-24{//计算属性生成的样式
             .star-item{
                width: 10px;
                height: 10px;
                margin-right: 3px;
                background-size: 100% 100%;
                &:last-child{
                    margin-right: 0;
                }
            &.on{//全星
                @include bgImg('./img/star24_on')
            }
            &.half{
                 @include bgImg('./img/star24_half')
            }
             &.off{
                 @include bgImg('./img/star24_off')
            }
            }
        }
        
    }
</style>

