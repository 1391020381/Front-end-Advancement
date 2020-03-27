# 性能监控指标
* 一般来说,业界认可的常用指标有:
    - 首次绘制 FP 和首次有内容绘制 FCP 时间 First Contentful Panint
    - 首次有意义绘制 FMP 时间 First Meaningful Paint
    - 首屏时间
    - 用户可交互 TTI 时间 Time to Interactive
    - 总下载时间  页面所有资源加载完成锁需要的时间。 一般可以统计 window.onload
    - 自定义指标


 * DOMContentLoaded DOMContentLoaded 指的是文档中DOM内容加载完毕的时间,也就是说HTML结构已经完整。但是我们知道页面包含图片 特殊字体 视频 音频等其他资源,这些资源由网络请求获取,DOM内容加载完毕时  `由于这些资源往往需要额外的网络请求,还没有请求或者渲染完成。 而当页面上所有资源加载完成后,load事件才会被触发。`因此，在时间线上，load 事件往往会落后于 DOMContentLoaded 事件。

 # FMP的智能获取算法


 # 性能数据获取
 * window.performance 

 # 自定义时间计算
 * 使用 window.performance.timing 所获的数据，在单页应用中改变 URL 但不刷新页面的情况下（单页应用典型路由方案），是不会更新的，还需要开发者重新设计统计方案。同时，可能无法满足一些自定义的数据

1. 页面高度小于屏幕
    * 只要在页面底部加上脚本,完成当前时间的打印即可
    * 网页高度大于一屏  只要在估算接近于一屏幕的最后一个元素的位置后,插入脚本即可
    ```
    var time = + new Date() - window.performance.timing.navigationStart


    ```


 2. 集中化脚本统计首屏时间
    * 使用定时器不断检测img 节点，判断图片是否在首屏且加载完成,找到首屏记载最慢的图片加载完成的时间,从而计算出首屏时间。




# 错误信息收集
1. try catch
* 语法错误
* 异步错误
2. window.onerror
* 需要将 window.onerror放在所有脚本之前,这样才能对语法异常和运行异常进行处理

3. 跨域脚本的错误处理
* 加载不同域的javascript脚本 加载第三方内容 以展示广告 性能测试  错误统计  使用第三方服务

* crossorigin = 'anonymous'

4. 使用source map 进行错误还原

5. 对 Promise 错误处理
* 提倡写Promise的时候最后写上 catch函数的习惯。

6. 处理网络加载错误
* script 标签，link 标签进行脚本或者其他资源加载时，由于某种原因（可能是服务器错误，也可能是网络不稳定），导致了脚本请求失败，网络加载错误
* 除此之外，也可以使用 window.addEventListener('error') 方式对加载异常进行处理，注意这时候我们无法使用 window.onerror 进行处理，因为 window.onerror 事件是通过事件冒泡获取 error 信息的，而网络加载错误是不会进行事件冒泡的
* 那么，怎么区分网络资源加载错误和其他一般错误呢？这里有个小技巧，普通错误的 error 对象中会有一个 error.message 属性，表示错误信息，而资源加载错误对应的 error 对象却没有



7. 页面崩溃收集和处理


8. 框架的错误处理
* Vue.config.errorHandler



# 总结
1. js语法异常 代码异常
2. AJAX 请求异常（xhr.addEventListener('error', function (e) { //... })）
3. 静态资源加载异常
4. Promise 异常
5. 跨域Script error
6. 页面崩溃
7. 框架错误



9. 性能数据和错误信息上报
* 上报采用单独域名是否更好
* 独立域名的跨域问题
* 对于单独的日志域名，肯定会涉及跨域问题。我们经常发现页面使用「构造空的 Image 对象的方式」进行数据上报。原因是请求图片并不涉及跨域的问题

* 何时上报数据
 * 一般合适的场景为：
   - 页面加载和重新刷新
   - 页面切换路由
   - 页面所在的 Tab 标签重新变得可见
   - 页面关闭

* 单页应用上报



* 何时以及如何上报
* 如果是在页面离开时进行数据发送，那么在页面卸载期间是否能够安全地发送完数据是一个难题：因为页面跳转，进入下一个页面，就难以保证异步数据的发送了


```
window.addEventListener('unload', logData, false)

const logData = () => {
   navigator.sendBeacon("/log", data)
   //  方法可用于通过HTTP将少量数据异步传输到Web服务器
   // 使用 sendBeacon() 方法会使用户代理在有机会时异步地向服务器发送数据，同时不会延迟页面的卸载或影响下一导航的/// 载入性能。这就解决了提交分析数据时的所有的问题：数据可靠，传输异步并且不会影响下一页面的加载
}

```

* 总之，pushState()方法不会触发页面刷新，只是导致 History 对象发生变化，地址栏会有反应
# 无侵入和性能友好的方案设计