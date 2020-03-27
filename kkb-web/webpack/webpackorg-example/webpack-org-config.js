const path = require('path')
const fs = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack = require('webpack')

const makePlugins = (configs)=>{
    const plugins = [
        new CleanWebpackPlugin(['dist'],{
            root:path.resolve(__dirname,'../')
        })
    ]
    Object.keys(configs.entry).forEach(item=>{
        plugins.push(
            new HtmlWebpackPlugin({
                template:'src/index.html',
                filename:`${item}.html`,
                chunks:['runtime','vendors',item]
            })
        )
    })

}

module.exports = {
    mode:'production',
    entry:{
        index:'./src/index.js'
    },
    output:{
        filename:'[name].[chunkhash].bundle.js',
        chunkFilename: '[name].[chunkhash].bundle.js',
        publicPath: './',
        path:path.resolve(__dirname,'dist')
    },
    devtool:'hidden-source-map',
    devServer:{
        contentBase:'./dist',
        hot:true
    },
    optimization:{
        splitChunks:{
            chunks:'all',
        },
        runtimeChunk:true,
    },
    plugins:[
        // new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //     title:'webpackorg-example'
        // }),
      //  new webpack.HashedModuleIdsPlugin()
    ],
    module: {
        
    }
}