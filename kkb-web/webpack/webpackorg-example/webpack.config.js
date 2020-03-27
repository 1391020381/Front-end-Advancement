const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {HashedModuleIdsPlugin,NamedModulesPlugin} = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    mode: 'production',
    context: path.join(__dirname, 'src'),
    entry: {
        index: './index.js',
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[hash].bundle.js',
        chunkFilename: '[name].[hash].bundle.js',
    },
    devServer:{
        contentBase:'./dist',
        hot:true,
        overlay:true
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        },
        runtimeChunk: true,
    },
    plugins:[
      new CleanWebpackPlugin(),
      new HashedModuleIdsPlugin(),
      new NamedModulesPlugin(
        chunk => chunk.name || Array.from(chunk.modulesIterable, m => m.id).join("_")
 ),
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        chunkFilename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
            title:'webpackorg-example'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    {loader: MiniCssExtractPlugin.loader},
                    {loader: 'css-loader'}
                ]
            }
        ]
    }
};