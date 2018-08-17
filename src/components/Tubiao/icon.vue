<template>
    <div class="icons">
        <span class="icon" :class="classArr[type]"></span>
    </div>
</template>

<script>
export default {
    data(){
        return{
             classArr:['decrease','discount','guarantee','invoice','special']
        }
    },
    props:['type']
}
</script>

<style lang="scss" scoped>
@import "../../common/css/minin.scss";
    .icon{
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        margin-right: 4px;
                        background-size: 100% 100%;
                        background-repeat: no-repeat;
                         vertical-align: top;
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
</style>

