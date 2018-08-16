

###配置mock数据

1.在webpack.dev.config 文件中，配置假数据

'const appData=require('../mock/data.json');

const seller=appData.seller; //商家数据

const goods=appData.goods;//商品数据

const rating=appData.rating;//评论数据'

2.然后在devServer配置我们对应的api

### 在脚手架中 如果要使用less 和sass 只需要安装 相应的模块 less ----------> less less-loader  scss ---------------> node-sass sass-loader