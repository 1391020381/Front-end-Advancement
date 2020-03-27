
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E4%BB%8E%E8%BE%93%E5%85%A5%20URL%20%E5%88%B0%E9%A1%B5%E9%9D%A2%E5%B1%95%E7%A4%BA%E5%AE%8C%E6%95%B4%E6%B5%81%E7%A8%8B%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* 浏览器进程主要负责用户交互 子进程管理和文件存储等功能
* 网络进程是面向渲染进程和浏览器进程等提供网络下载功能
* 渲染进程的主要职责是把网络下载的HTML JavaScript css   图片等资源解析为可以显示和交互的页面。因为渲染进程所有的内容都是通过网络获取的,会存在一些恶意代码利用浏览器漏洞对系统进行攻击,所以运行在渲染进程里面的代码是不被信任的。这也是为什么Chrome 会让渲染进程运行在安全沙箱里,就是为了保证系统的安全。


 * 整个流程大致如下:
1. 首先 用户从浏览器进程里 `输入请求信息`
2. 然后 网络进程 `发起URL请求`
3. 服务器响应URL请求之后,浏览器进程就又要开始 `准备渲染进程`了
4. 渲染进程准备好了之后,需要先向渲染进程提交页面数据,我们称为`提交文档`阶段
5. 渲染进程接收完文档信息之后,便开始`解析页面和加载子资源` 完成页面的渲染。

* `用户发出URL 请求到页面开始解析的这个过程,就叫做导航`


# 从输入URL到页面展示
1. 用户输入
* 当用户在地址栏中输入一个查询关键字时,地址栏会判断输入的关键字是 `搜索内容`  还是 `请求的URL`
* 如果是搜索内容,地址栏会使用浏览器默认的搜索引擎,来合成新的带搜索关键字的url
* 如果判断输入内容符合URL规则,比如输入的是time.geekbang.org 那么地址栏会根据规则,把这段内容加上协议,合成为完整的URL， 如https://time.geekbang.org


* 当用户输入关键字并键入回车之后,浏览器便进入下图的状态

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%BC%80%E5%A7%8B%E5%8A%A0%E8%BD%BD%20URL%20%E6%B5%8F%E8%A7%88%E5%99%A8%E7%8A%B6%E6%80%81.png)

* 当浏览器刚开始加载一个地址之后,标签页上的图标便会进入加载状态。但此时图中页面显示的依然是之前打开的页面内容,并没立即替换为即刻时间的页面。因为需要等待提交文档阶段,页面内容才会被替代。

2. URL请求过程
* 浏览器进程会通过进程间通信 (IPC) 把URL请求发送至网络进程,网络进程接收到URL请求后,会在这里发起真正的URL请求流程。
* 首先,网络进程会查找本地缓存是否缓存了该资源。如果有缓存资源,那么直接返回资源给浏览器进程
* 如果在缓存中没有查找到资源,那么直接进入网络请求流程。  请求前 还要DNS解析 获取服务器IP地址。   HTTPS还需要 建立TLS连接
* 接下来即使利用IP地址和服务器建立TCP连接。连接建立之后,浏览器端会构建请求行 请求头等信息,`并把和该域名相关的Cookie等数据附加到请求头中` 然后向服务器发送构建的请求信息。
* 服务器接收到请求信息后,会根据请求信息生成响应数据(响应行 响应头 响应体等信息) 并发给网络进程。等网络进程接收了响应行和响应头之后,就开始解析响应头的内容了。

- 2.1 重定向
  * 在接收到服务器返回的响应头后,网络进程开始解析响应头,如果发现返回的状态码是301 或者302,那么说明服务器需要浏览器重定向到其他url。这时网络进程会从响应头的Location 字段里面读取重定向的地址,然后再发起新的HTTP或者HTTPS请求,一切重头开始。
  * `在导航过程中,如果服务器响应行的状态码包含了 301 302一类的跳转信息,浏览器会跳转到新的地址继续导航；如果响应行是200,那么表示浏览器可以继续处理该请求。`
- 2.2 响应数据类型处理
* `Content-Type是HTTP头中一个非常重要的字段,它告诉浏览器服务器返回的响应体数据是什么类型` 浏览器会根据Content-Type的值来决定如何显示响应体的内容。


* 如果服务器配置Content-Type不正确,比如将 text/html类型配置成 application/octet-stream类型,那么浏览器可能会曲解文件内容比如会将一个本来是用来展示的页面,变成了一个下载文件。

* 不同Content-Type 的后续处理流程也截然不同。如果Content-Type字段的值被浏览器判断为下载类型,`那么该请求会被提交给浏览器的下载管理器,同时该URL请求的导航流程就此结束。但是如果是HTML,那么浏览器则会继续进行导航流程。`


3. 准备渲染进程 
* 默认情况下,Chrome会为每个页面分配一个渲染进程,也就是说,每打开一个新页面就会配套创建一个新的渲染进程。但是,也有一些例外。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%A4%9A%E4%B8%AA%E9%A1%B5%E9%9D%A2%E8%BF%90%E8%A1%8C%E5%9C%A8%E4%B8%80%E4%B8%AA%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B%E4%B8%AD.png)

* `同一站点 (same-site)` 具体地将,我们将 '同一站点' 定义为 根域名 (例如，geekbang.org) 加上协议(例如 https://  或 htt://) 还包含了该根域名下的所有子域名和不同的端口  
* `相同的协议和根域名`

```
https://time.geekbang.org
https://www.geekbang.org
https://www.geekbang.org:8080


```

* Chrome的默认策略是,每个标签对应一个渲染进程。但`如果从一个页面打开了另一个新页面,而新页面和当前页面属于同一站点的话,那么新页面会复用父页面的渲染进程。` 官方把这个默认策略叫 process-per-site-instance

* `总结来说,打开一个新页面采用的渲染进程策略就是:`
- * 通常情况下，打开新的页面都会使用单独的渲染进程
- 如果从A页面打开B页面,且A和B都属于同一站点的话,那么B页面复用A页面的渲染进程；如果是其他情况,浏览器进程则会为B创建一个新的渲染进程。

4. 提交文档
* `首先要明确一点，这里的'文档'是指URL请求响应体数据`
* '提交文档'的消息是由浏览器进程发出的,渲染进程接收到 '提交文档' 的消息后,会和网络进程建立传输数据的 '管道'
* 等文档数据传输完成之后,渲染进程会返回 '确认提交' 的消息给浏览器进程
* 浏览器进程在收到 '确认提交' 的消息后,会 `更新浏览器界面状态` 包括了安全状态 地址栏的URL 前进后退的历史状态 并更新Web页面

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%AF%BC%E8%88%AA%E5%AE%8C%E6%88%90%E7%8A%B6%E6%80%81.png)

5. 渲染阶段

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%B8%B2%E6%9F%93%E7%BB%93%E6%9D%9F.png)

# 总结
* 服务器可以根据响应头来控制浏览器的行为,如跳转 网络数据类型判断
* Chrome默认采用每个标签对应一个渲染进程,但是如果两个页面属于同一站点,那这两个标签使用同一个渲染进程。
* 浏览器的导航过程涵盖了从用户发起请求到提交文档给渲染进程的中间所有阶段。


* <div class="_2_QraFYR_0">结合老师的讲义，自己总结了下，不考虑用户输入搜索关键字的情况：<br>&nbsp;&nbsp;&nbsp;&nbsp;1，用户输入url并回车<br>&nbsp;&nbsp;&nbsp;&nbsp;2，浏览器进程检查url，组装协议，构成完整的url<br>&nbsp;&nbsp;&nbsp;&nbsp;3，浏览器进程通过进程间通信（IPC）把url请求发送给网络进程<br>&nbsp;&nbsp;&nbsp;&nbsp;4，网络进程接收到url请求后检查本地缓存是否缓存了该请求资源，如果有则将该资源返回给浏览器进程<br>&nbsp;&nbsp;&nbsp;&nbsp;5，如果没有，网络进程向web服务器发起http请求（网络请求），请求流程如下：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.1 进行DNS解析，获取服务器ip地址，端口（端口是通过dns解析获取的吗？这里有个疑问）<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.2 利用ip地址和服务器建立tcp连接<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.3 构建请求头信息<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.4 发送请求头信息<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5.5 服务器响应后，网络进程接收响应头和响应信息，并解析响应内容<br>&nbsp;&nbsp;&nbsp;&nbsp;6，网络进程解析响应流程；<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.1 检查状态码，如果是301/302，则需要重定向，从Location自动中读取地址，重新进行第4步<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（301/302跳转也会读取本地缓存吗？这里有个疑问），如果是200，则继续处理请求。<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;6.2 200响应处理：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;检查响应类型Content-Type，如果是字节流类型，则将该请求提交给下载管理器，该导航流程结束，不再进行<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;后续的渲染，如果是html则通知浏览器进程准备渲染进程准备进行渲染。<br>&nbsp;&nbsp;&nbsp;&nbsp;7，准备渲染进程<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;7.1 浏览器进程检查当前url是否和之前打开的渲染进程根域名是否相同，如果相同，则复用原来的进程，如果不同，则开启新的渲染进程<br>&nbsp;&nbsp;&nbsp;&nbsp;8. 传输数据、更新状态<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.1 渲染进程准备好后，浏览器向渲染进程发起“提交文档”的消息，渲染进程接收到消息和网络进程建立传输数据的“管道”<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.2 渲染进程接收完数据后，向浏览器发送“确认提交”<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;8.3 浏览器进程接收到确认消息后更新浏览器界面状态：安全、地址栏url、前进后退的历史状态、更新web页面。</div>


* 使用noopener noreferrer就是告诉浏览器，新打开的子窗口不需要访问父窗口的任何内容，这是为了防止一些钓鱼网站窃取父窗口的信息。