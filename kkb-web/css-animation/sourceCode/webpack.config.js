const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'bundle.js',
        path:path.resolve(__dirname,'dist')
    },
    devServer: {
        contentBase: './dist'
           },
    devtool: 'inline-source-map',
    plugins: [
        new CleanWebpackPlugin(),
        // new HtmlWebpackPlugin({
        //        title: 'css-animation',
        //        template: "./src/css-animation.html"
        //      })
        new HtmlWebpackPlugin({
            title: 'css-animation',
            template: "./src/canvas.html"
          })
          ],
    module: {
        rules: [{
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }]
        }
}