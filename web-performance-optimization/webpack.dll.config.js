const path = require('path')
const webpack = require('webpack')

module.exports  = {
    entry:{
        // 依赖的库数组
        vendor:[
            'prop-type',
            'babel-polyfill',
            'react',
            'react-dom',
            'react-router-dom'
        ]
    },
    output:{
        path:path.join(__dirname,'dist'),
        filename:'[name].js',
        library:'[name]_[hash]'
    },
    plugins:[
       new webpack.DllPlugin({
           // DllPlugin 的 name 属性需要和libary 保持一致
           name:'[name]_[hash]',
           path:path.join(__dirname,'dist','[name]-manifest.json'),
           // context 需要和webpack.config.js保持一致
           context:__dirname
       })
    ]
}


// vendor-manifest.json
// vendor.js