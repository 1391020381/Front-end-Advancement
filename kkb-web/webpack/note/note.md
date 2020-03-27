* webpack 模块打包工具
    - js
    - css
    - png 

# 什么是webpack模块
* 对比Node.js模块 webpack模块能够以各种方式表达它们的依赖关系。几个例子如下
    - ES2015 import 语句
    - CommonJS require() 语句
    - AMD define 和 require() 语句
    - css/sass/less 文件中的 @import语句
    - 样式（url(...)）或者 HTML文件（<img src=""/>）中图片链接

 # Webpack支持的模块
* webpack通过loader 可以支持各种语言和预处理器编写模块。
* loader 描述了webpack如何处理非 js 模块,并且在bundle中引入这些依赖。
* webpack社区已经为各种流行语言处理器构建了loader，包括:
    - CoffeeScript
    - TypeScript
    - ESNext(babel)
    - Sass
    - Less
    - Stylus
* 总的来说 webpack提供了可定制 强大和丰富的API 允许任何技术栈使用webpack，保持了在你的开发 测试 和生成流程中 无侵入性。    



# postcss-loader
* css-loader  -> importLoader 2  在scss文件中 @import 倒入 scss  postcss-loader可能不会起作用。但是在 css-loader的options中 添加 importLoader 
* css-loader  options module



# file-loader  不仅可以打包 图片  还可以打包  字体文件

* webpack 官网指南  管理资源模块  讲解了  如何 管理 css 图片   字体  数据 全局资源


* source-map 告诉哪一行 哪一列出错
* cheap-inline-source-map 告诉哪一行出错  业务代码
* cheap-module-inline-source-map  告诉哪行出错 不排除 第三发代码  



* 开发环境   cheap-module-eval-source-map
* 生产环境    cheap-module-source-map



* webpack --watch
* webpack-dev-server


# Babel

```
import "@babel/polyfill"
presets:[
    ['@babel/preset-env',{
        target:{
            chrome:'67'
        },
        useBuiltIns:'usage'
    }]
]

```
* when setting 'useBuiltIns':'usage' polyfills are automatically imported needed

* @babel/plugin-transform-runtime 类库 corejs:2 



#  treeShaking
* model:development 只会标示 哪些到处哪些使用  避免 sourcemap 不准确
* model：production 默认是有 treeShaking


# development 和 production 模式 区分打包
* webpack-merge  model

# Code Splitting
* clean-webpack-plugin 不能删除 项目同级目录

```
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // all, async, and initial
      minSize: 30000, // 引入的包 大于 30000字节（30kb） 才分割
      minRemainingSize: 0,
      maxSize: 0, // splitChunks 打包后的chunk 大于 maxSize时 尝试再分割
      minChunks: 1, //  要分割的代码 使用大于 1 才分割
      maxAsyncRequests: 6,// 最大异步请求是6  假设有7个库 前面5个分别分割 ,后面两个分割在一起
      maxInitialRequests: 4, // 入口chunks 最多分割几个chunks
      automaticNameDelimiter: '~',
      automaticNameMaxLength: 30,
      cacheGroups: { // 缓存分组, 当 符合 splitChunks 的条件,先分割 再查看是否符合cacheGroup,以便把代码分割到那个 cacheGroup分组  
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          
        },
        default: { // 当 不符合splitChunks其他条件时 走 default 
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true // 复用已经存在的chunks
        }
      }
    }
  }
}

```
* optimization splitChunks 同步
* 异步代码  import


# Lazy Loading  
* import
* chunk

# 打包分析 Preloading  Prefetching
* 打包分析 https://github.com/webpack/analyse   https://webpack.js.org/guides/code-splitting/#bundle-analysis
*  command shift + p 查看资源利用率


* import(/* webpackPrefetch: true */ 'LoginModal')
* prefetch 等待核心代码加载完,再加载 LoginModal
* import(/* webpackPreload: true */ 'ChartingLibrary') 
* preload 资源下载权限高

* MiniCssExtractPlugin  CSS 文件的代码分割
* optimize-css-assets-webpack-plugin 和 分离出来的 css 文件

* output -> filename 入口文件 chunkFilename codeSplit 





* Exit code: 1 Command: node-gyp rebuild报错可以不用管吗 百度
* https://www.iteye.com/blog/qiaolevip-2427527

* https://github.com/nodejs/node-gyp/issues/809  尝试多次



* There are three general approaches to code splitting available:

  - Entry Points: Manually split code using entry configuration. // 入口文件
  - Prevent Duplication: Use the SplitChunksPlugin to dedupe and split chunks. // optimization splitChunks
  - Dynamic Imports: Split code via inline function calls within modules. // 动态引入


  # output
  * contenthash  与内容有关   增加空格或 删除空格都有影响 


  * 分离 runtimeChunk
  * webpack provides an optimization feature to split runtime code into a separate chunk using the optimization.runtimeChunk option. Set it to single to create a single runtime bundle for all chunks: 

  # 使用 WebpackDevServer 实现请求转发

```
proxy:{
  historyApiFallback: true,  //  history适应前端路由
  "/react/api":{
    target:"http://www.dell-lee.com",
    pathRewrite:{
      'header.json':'demo.json'
    }
  }
}


```
# eslint
* npx eslint --init    eslint文档
* eslint-loader   devServer.overlay  Shows a full-screen overlay in the browser when there are compiler errors or warnings. If you want to show only compiler errors
* vscode与eslint

* 实际项目中在 git 钩子中检测  防止 代码不符合规范 被提交


# webpack 性能优化

1. 提升Webpack打包速度的方法
  - 跟上技术的迭代 Node npm yarn webpack 版本更新会做内部优化
  - 在尽可能少的模块上应用loader   exclude
  - Plugin 尽可能精简并确保可靠
  - resolve 参数的合理配置  
``` 
  resolve:{ extensions:'',alias:''}
``` 
  - 使用 DllPlugin 提高打包速度  
  * add-asset-webpack-plugin Dynamically add an asset to the Webpack graph
  - 控制打包文件大小
  - thread-loader parallel-webpack happypack
  - 合理使用 sourcemap
  - 结合 stats 分析打包结果
  - 开发环境内存编译 devServer
  - 开发环境无用插件剔除 例如压缩


# 多页面打包配置

```
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


```

1. webpack中的hash、chunkhash、contenthash区别

* hash 我们可以看到构建生成的文件hash值都是一样的,所以 hash计算是跟整个项目的构建相关的,同一次构建过程生成的哈希都是一样的。

* chunk  我们可以看到，由于采用chunkhash，所以项目主入口文件Index.js及其对应的依赖文件Index.css由于被打包在同一个模块，所以共用相同的chunkhash，但是公共库由于是不同的模块，所以有单独的chunkhash。这样子就保证了在线上构建的时候只要文件内容没有更改就不会重复构建
* chunk  可以看到，bundle 的名称是它内容（通过 hash）的映射。如果我们不做修改，然后再次运行构建，我们以为文件名会保持不变。然而，如果我们真的运行，可能会发现情况并非如此：（译注：这里的意思是，如果不做修改，文件名可能会变，也可能不会。）
* runtime manifest   这也是因为 webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest。（译注：样板(boilerplate)指 webpack 运行时的引导代码）
* output.filename 无 contenthash选项
* new extractTextPlugin('../css/bundle.[name].[contenthash].css')
