

###配置mock数据

1.在webpack.dev.config 文件中，配置假数据

'const appData=require('../mock/data.json');

const seller=appData.seller; //商家数据

const goods=appData.goods;//商品数据

const rating=appData.rating;//评论数据'

2.然后在devServer配置我们对应的api

### 在脚手架中 如果要使用less 和sass 只需要安装 相应的模块 less ----------> less less-loader  scss ---------------> node-sass sass-loader


##使用sacc 混合指令完成border 1px效果
1.Sass代码的mixins输出行将直接编译为CSS样式，而函数则返回一个可以作为CSS属性或可传递给另一个function或mixin的值
2. &.decrease  ===>  当前元素的后代