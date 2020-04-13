const merge = require('webpack-merge')
const base = require('./webpack-base')
const path = require('path')
const ServerRender = require('vue-server-renderer/server-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const resolve = (dir) => {
    return path.resolve(__dirname, dir)
}

module.exports = merge(base,{
    entry:{
        server:resolve('../src/server.entry.js')
    },
    target:'node',
    output:{
        libraryTarget:'commonjs2' // 把最终的结果导出到 module.exports
    },
    plugins:[
        new ServerRender(),
        new HtmlWebpackPlugin({
            filename:'index.ssr.html',
            template:resolve('../public/index.ssr.html'),
            excludeChunks:['server'] // 排除某个模块
        })
    ]
})