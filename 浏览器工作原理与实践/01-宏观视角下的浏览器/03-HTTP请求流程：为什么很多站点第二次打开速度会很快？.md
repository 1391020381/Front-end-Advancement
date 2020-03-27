* HTTP 协议 是建立在 TCP连接基础上的。`HTTP是一种允许浏览器想服务器获取资源的协议,是web的基础` 通常由浏览器发起请求,用来获取不同类型的文件,例如 html css javascript。


* 本篇通过分析一个HTTP请求过程中每一步的状态来了解完整的HTTP请求过程。

# 浏览器端发起HTTP请求流程
* 在浏览器地址栏输入 http://time.geekbang.org/index.html

1. 构建请求
* 首先 浏览器构建 `请求行` 信息(如下所示) 构建好后 浏览器 `准备`发起网络请求

```
GET /index.html HTTP1.1

```
2. 查缓存
* `在发起网络请求之前,浏览器会先在浏览器缓存中查询是否有要请求的文件。` 其中,浏览器缓存是一种在本地保存资源副本,以供下次请求时直接使用的技术。
* 当浏览器发现请求的资源已经在浏览器缓存中存在有副本,它会拦截请求,返回该资源的副本,并直接结束请求,而不会再去资源服务器重新下载。这样可以：
* 缓解服务器端压力,提升性能(获取资源的耗时更短了)
*  对于网站来说,缓存是实现快速资源加载的重要组成部分。

3. 准备IP 地址和端口
* 浏览器使用HTTP 协议作为应用层协议,用来封装请求的文本信息;并使用TCP/IP作传输层协议将它发到网络上,所以在HTTP工作开始前,浏览器需要通过TCP与服务器建立连接。 也就是说`HTTP的内容是通过TCP的传输数据阶段来实现的`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/TCP%20%E5%92%8C%20HTTP%20%E7%9A%84%E5%85%B3%E7%B3%BB%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* 那么有以下一些问题:
* HTTP网络请求的第一步是做什么呢？ 结合上图看,是和服务器建立 TCP连接
* 建立TCP连接的信息都有吗？ IP地址 端口号
* 怎么获取IP地址和端口号？ 现在我们已知一个 url地址

* `负责把域名和IP地址做一一映射。`这套域名映射为IP的系统就叫做 域名系统 简称 DNS(Domain Name System)

* `第一步浏览器 会请求DNS 返回域名对应的 IP `。 当然浏览器还提供DNS数据缓存服务,如果某个域名已经解析过了,那么浏览器会缓存解析的结果,以供下次查询时直接使用,这样也会减少一次网络请求。
* 拿到IP之后,接下来就需要 获取端口号了。通常情况下,如果URL没有特别指明端口号,那么HTTP协议默认是80端口

4. 等待TCP队列
* Chrome有个机制,同一个域名同时最多只能建立6个TCP连接,如果在同一个域名下同时有10个请求发生,那么其中4个请求会进入队列等待状态,直至进行中的请求完成。
5. 建立TCP连接
6. 发送HTTP请求  请求行 请求头 请求体 一次发送
* 一旦建立了TCP连接,浏览器就可以和服务器进行通信了。而HTTP中数据正是这个通信过程中传输的。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/HTTP%20%E8%AF%B7%E6%B1%82%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F.png)

### 服务端处理HTTP请求流程
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%93%8D%E5%BA%94%E7%9A%84%E6%95%B0%E6%8D%AE%E6%A0%BC%E5%BC%8F.png)
1. 返回请求
2. 断开连接
* 通常情况下,一旦服务器向客户端返回了请求数据,它就要关闭TCP连接。
* 浏览器或服务器在HTTP 中加入了 Connect:Keep-Alive  那么TCP连接在发送后将仍然保持打开状态,这样浏览器就可以继续通过同一个TCP连接发送请求。`保持TCP连接可以省去下次请求需要建立连接的时间,提升资源加载速度。`
3. 重定向


# 问题
1. 为什么很多站点第二次打开速度会很快
* 主要原因是第一次加载页面过程中,缓存了一些耗时的数据
* DNS缓存和页面资源缓存
* DNS 缓存主要就是浏览器本地把对应的IP和域名关联起来。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E7%BC%93%E5%AD%98%E6%9F%A5%E6%89%BE%E6%B5%81%E7%A8%8B%E7%A4%BA%E6%84%8F%E5%9B%BE.png)


* http缓存
1. 强制缓存 Cache-Control (优先级高)  Expires  Pragma(http1.1基本不用)
2. 协商缓存  ETag/if-None-Match  (优先级高)      Last-Modified/ if-Modified-Since



2. 登录状态时如何保持的?  Cookie  浏览器本地存储功能

# 总结

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/HTTP%20%E8%AF%B7%E6%B1%82%E6%B5%81%E7%A8%8B%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

