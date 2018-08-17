<template>
    <div class="mess">
        <div class="line"></div>
        <div class="text">{{title}}</div>
        <div class="line"></div>
    </div>
</template>

<script>
export default {
    props:['title']
}
</script>

<style lang="scss" scoped>
@import "../../common/css/minin.scss";
    .mess{
        display: flex;  
        width: 100%;
        text-align: center;
        .line{
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255,255,255,0.2)
        }
        .text{
            padding: 0 12px;
            font-size: 10px;
            font-weight: 700;
        }
    }
</style>

