# 什么是XSS攻击
* XSS全称 Cross Site Scripting,为了与CSS 区分开来,故简称XSS,翻译过来就是`跨站脚本`。XSS攻击是指黑客往HTML文件中或者DOM中注入恶意脚本,从而在用户浏览器页面时利用注入的恶意脚本对用户实施攻击的一种手段。
* 恶意脚本可以做哪些事
1. 窃取Cookie信息
* document.cookie 获取Cookie信息,通过XMLHttpRequest或者 Fetch 加上CORS功能将数据发送给恶意服务器;恶意服务器拿到用户的Cookie信息之后,就可以在其他电脑上模拟用户的登录然后进行转账等操作。
2. 监听用户行为。恶意js可以使用 addEventListener接口来监听键盘事件,比如可以获取用户输入的信用卡等信息,将其发送到恶意服务器。
3. 修改DOM伪造假的登录窗口,用来欺骗用户输入用户名和密码等信息。
4. 在页面内生成浮窗广告
# 恶意脚本是怎么注入的
* 常见的注入方式。主要有 储存型XSS攻击  反射型XSS攻击  基于DOM的XSS攻击。

1. 存储型XSS攻击
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%AD%98%E5%82%A8%E5%9E%8BXSS%E6%94%BB%E5%87%BB.png)

2. 反射型XSS攻击
* 在一个反射型XSS攻击过程中,恶意js脚本属于用户发送给网站请求中的一部分,随后网站又把恶意js脚本返回给用户。当恶意js脚本在用户页面中被执行时,黑客就可以利用该脚本做一些恶意操作。

* http://localhost:3000/?xss=<script>alert('你被xss攻击了')

```

var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',xss:req.query.xss });
});


module.exports = router;

```

```

<!DOCTYPE html>
<html>
<head>
  <title><%= title %></title>
  <link rel='stylesheet' href='/stylesheets/style.css' />
</head>
<body>
  <h1><%= title %></h1>
  <p>Welcome to <%= title %></p>
  <div>
      <%- xss %>
  </div>
</body>
</html>

```

* `Web服务器不会存储反射型XSS攻击的恶意脚本,这是和存储型XSS攻击不用的地方。`
3. 基于DOM的XSS攻击
* 基于DOM的xss攻击是不牵涉到页面Web服务器的。具体来讲,黑客通过各种手段将恶意脚本注入用户的页面中,比如通过网络劫持在页面传输过程中修改HTML页面的内容,这种劫持类型很多,有通过WiFi路由器劫持的,有通过本地恶意软件劫持的,`它们的共同点是在Web资源传输过程中或者在用户使用页面的过程中修改Web页面的数据。`

# 如何阻止XSS攻击

* 存储型XSS攻击和反射型XSS攻击都是需要经过Web服务器来处理的,因此可以认为这两种的漏洞是服务端的安全漏洞。
* 基于DOM的XSS攻击全部都是在浏览器端完成de,因此基于DOM的XSS攻击是属于前端的安全漏洞。

* `无论是何种类型的XSS攻击,它们都有一个共同的点,那就是首先往浏览器中注入恶意脚本,然后再通过恶意脚本将用户信息发送至黑客部署的恶意服务器上。所以要阻止XSS攻击,我们可以通过阻止恶意js脚本的注入和恶意消息的发送来实现。`

* 一些常用的阻止XSS攻击的策略
1. 服务端对输入脚本进行过滤或转码。
* 不管是反射型还是存储型XSS攻击,我们都可以在服务器端将一些关键的字符进行转码。
```

code:<script>alert('你被xss攻击了')</script>  ->   code:   // 过滤 

                                            ->  code:&lt;script&gt;alert(&#39;你被xss攻击了&#39;)&lt;/script&gt;  // 转码 后的内容即使返回给了页面,也不会执行。

```
2. 充分利用CSP
* 实施严格的CSP可以有效地防范XSS攻击,具体来讲CSP有如下几个功能:
1. 限制加载其他域下的资源文件,这样即使黑客插入了一个js文件,这个js文件也是无法被加载的
2. 禁止向第三方域提交数据,这样用户信息也不会外泄
3. 禁止执行内联脚本和未授权的脚本
4. 还提供了上报机制,这样可以帮助我们尽快发现有哪些XSS攻击,以便尽快修复问题。

* [内容安全策略(CSP)](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CSP)
3. 使用HttpOnly属性

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/HttpOnly%E6%BC%94%E7%A4%BA.png)

# 总结
* XSS 攻击就是黑客往页面注入恶意脚本,然后将页面的一些数据上传到恶意服务器。
* 常见的三种XSS攻击模式是存储型XSS攻击 反射型XSS攻击  和 基于DOM的XSS攻击

* 这三种攻击方式共同特点是都需要往用户的页面中注入恶意脚本,然后再通过恶意脚本将用户数据上传到黑客的恶意服务器上。而三者的不同点在注入的方式不一样,有通过服务器漏洞注入的,还有在客户端直接注入的。

* 针对这些XSS攻击,主要有三种防范策略,第一种是通过服务器对输入的内容进行过滤或者转码,第二种是充分利用好CSP 第三种是使用HttpOnly来保护重要的Cookie信息。

* 除了以上策略之外,我们还可以通过添加验证码防止脚本冒充用户提交危险操作。而对于一些不受信任的输入，还可以限制其输入长度，这样可以增大 XSS 攻击的难度。