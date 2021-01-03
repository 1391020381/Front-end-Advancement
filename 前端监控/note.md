# 技术监控
1. 页面性能监控
2. 静态资源监控
3. 错误监控
4. 接口性能监控

# 行为监控
1. 用户行为路径
2. 打点监控
3. 大量log上报策略
4. 时效策略

# Performance

* navigationStart 前一个网页卸载时间  默认  fetchStart
* unloadEventStart 前一个页面 unload事件开始
* unloadEventEnd
* redirectStart
* redirectEnd


* fetchStart 开始请求
* domainLookupStart  dns查询开始
* domainLookupEnd   dns 查询结束
* connectStart 向服务器建立连接握手开始
* connectEnd
* secureConnectionStart 安全握手


* requestStart
* responseStart
* responseEnd
* domLoading 解析dom开始   document.readyState loading    
* domInteractive 解析dom结束 document.readyState interactive
* domContentLoadedEventStart  DOMContentLoaded当初始的 HTML 文档被完全加载和解析完成之后，DOMContentLoaded 事件被触发，而无需等待样式表、图像和子框架的完全加载 
* domContentLoadedEventEnd   DOMContentLoaded事件结束
* domComplete 文档解析完成
* loadEventStart 事件发送前
* loadEventEnd