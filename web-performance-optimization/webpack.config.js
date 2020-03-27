const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
module.exports = {
    mode:'production',
    entry:{
        main:'./src/index.js'
    },
    output:{
       path:path.join(__dirname,'dist/'),
       filename:'[name].js' 
    },
    // dll 相关配置
    plugins:[
        new webpack.DllReferencePlugin({
            context:__dirname,
            manifest:require('./dist/vendor-manifest.json')
        }),
        new UglifyJsPlugin({
            // 允许并发
            parallel:true,
            cache:true,
            compress:{
                drop_console:true,
                // 把使用多次的静态值自动定义为变量
                reduce_vars:true
            },
            output:{
                comment:false,
                // 使输出的代码尽可能紧凑
                beautify:false
            }
        })
    ]
}