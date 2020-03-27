# Code Splitting 
    - 为 Vendor单独打包 （Vendor指第三方库或者公共的基础组件,因为Vendor的变化比较少,单独打包利于缓存）
    - 为 manifest webpack的runtime代码 单独打包
    - 为不同入口的公共业务代码打包 （同理 也是为了缓存和加载速度）
    - 为异步加载的代码打一个公共的包

# Long-term caching
*  给静态文件一个很长的缓存过期时间,比如一年。然后在给文件名里加上一个 hash， 每次构建时,当文件内容改变的时,文件名的hash也会改变。浏览器在根据文件名称作为标示,所以当hash 改变时,浏览器就会重新加载这个文件。   


* [对Webpack的hash稳定性的初步探索](https://zhuanlan.zhihu.com/p/35093098)
# 稳定webpack的hash

* 在默认情况下，哪怕一个chunk中的实际内容没有变化，其hash也会因其它chunk的变化变得不同
* 造成 hash不稳定现象的根本原因在于 webpack使用自增的数字 作为每一个模块的id，因此在上面的案例中，由于插入了b这个模块占用了一个id，导致lodash对应的id发生了变化，最终引起了hash的变化。

* 为了解决这一问题，我们将继续进行探索，根据实际第三方库使用的稳定性（即是不是必须用，是不是会频繁的在用和不用间切换）来进一步地拆分stable-vendors和vendors

* 更进一步地，对业务代码或许也可以进行这样的拆分，一个系统注定有一部分业务是稳定运行的，一部分是频繁更新和维护的，再一次进行拆分也可以更好地控制缓存有效的部分。


* [基于 webpack4以前 的持久化缓存方案](https://github.com/pigcan/blog/issues/9)
    - 对脚本文件应用 [chunkhash] 对 extractTextPlugin 应用的的文件应用 [contenthash]；
    - 使用 CommonsChunkPlugin 合理抽出公共库 vendor（包含社区工具库这些 如 lodash）, 如果
    - 要也可以抽取业务公共库 common(公共部分的业务逻辑)，以及 webpack的 runtime；
    - 在开发环境下使用 NamedModulesPlugin 来固化 module id，在生产环境下使用   HashedModuleIdsPlugin 来固化 module id
    - 使用 NamedChunksPlugin 来固化 runtime 内以及在使用动态加载时分离出的 chunk 的 chunk id。


* [基于webpack4[.3+]构建可预测的持久化缓存方案](https://github.com/jiangjiu/blog-md/issues/49)   


# 需要长效缓存的资源
* 图片 字体等media资源 media 资源可以使用 file-loader根据资源内容生成hash 配置url-loader 可以按需内联成base64格式
* url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL 
* {
  loader: 'file-loader',
  options: {
    name: '[path][name].[ext]'
  }
}
* css css 资源 如果不做特殊处理,会直接打进js文件 生产环境通常会使用 mini-css-extract-plugin
* js 




* hash chunkhash  contenthash
* 简单来说, 当 chunk只能包含 css  wasm 时,如果css 改动 chunhash也会发生变化,导致 chunk的hash变化；
* 如果使用 contenthash css 的改动不会影响到 chunk的hash值 因为它是依据chunk 的js内容生成的。



* 在实际生产环境中，当新引入的chunk依赖了其他公用模块时，还是会导致一些文件的哈希值变动，不过这个可以通过拆包策略来解决，这里就不赘述了

* mouduleId  chunkId
* 究其原因，是因为虽然我们稳定住了moduleId，但是对chunkId无能为力，而且异步的模块因为没有chunk.name，导致又使用了数字自增进行命名。

* 好在我们还有NamedChunksPlugin可以进行chunkId的稳定