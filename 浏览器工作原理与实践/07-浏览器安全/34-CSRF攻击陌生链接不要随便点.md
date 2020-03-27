# 什么是CSRF攻击
* CSRF全称是Cross-site request forgery,也称为 '跨站请求伪造' ,是指黑客引诱用户打开黑客的网站,在黑客的网站中,利用用户的登录状态发起的跨站请求。简单来讲,`CSRF攻击就是黑客利用了用户的登录状态,并通过第三方的站点来做一些坏事。`

* CSRF攻击,那么黑客是拿不到受害者站点数据的。但是黑客会在他的A站点调用受害者B站点的http接口,这接口可以是转账,删帖或者设置等。
* 需要注意一点,在黑客A站点中调用受害者B站点的http接口时,默认情况下,浏览器依然会把受害着者的Cookie等信息数据发送到受害者的B站点,<不是黑客的A站点> 如果B站点存在漏洞的话,那么黑客就会攻击成功啦。
1. 自动发起Get请求

```

<!DOCTYPE html>
<html>
  <body>
    <h1>黑客的站点：CSRF攻击演示</h1>
    <img src="https://time.geekbang.org/sendcoin?user=hacker&number=100">
  </body>
</html>

```
2. 自动发起POST请求

```

<!DOCTYPE html>
<html>
<body>
  <h1>黑客的站点：CSRF攻击演示</h1>
  <form id='hacker-form' action="https://time.geekbang.org/sendcoin" method=POST>
    <input type="hidden" name="user" value="hacker" />
    <input type="hidden" name="number" value="100" />
  </form>
  <script> document.getElementById('hacker-form').submit(); </script>
</body>
</html>

```
3. 诱惑用户点击链接

```

<div>
  <img width=150 src=http://images.xuejuzi.cn/1612/1_161230185104_1.jpg> </img> </div> <div>
  <a href="https://time.geekbang.org/sendcoin?user=hacker&number=100" taget="_blank">
    点击下载美女照片
  </a>
</div>

```

* `和XSS不同的是,CSRF攻击不需要将恶意代码注入用户的页面,仅仅是利用服务器的漏洞和用户的登录状态来实施攻击。`

# 如何防止CSRF攻击
* 发起CSRF攻击的三个必要条件:
1. 目标站点有一定要有CSRF漏洞
2. 用户要登录过目标站点,并且在浏览器上保持有该站点的登录状态
3. 需要用户打开一个第三方站点,可以是黑客的站点,也可以是一些论坛。

* 要让服务器避免遭受大到CSRF攻击,通常由以下几种途径
1. 充分利用好Cookie的SameSite属性
* Cookie正是浏览器和服务器之间维护登录状态的一个关键数据。
* 通常CSRF攻击都是从第三方站点发起的,要防止CSRf攻击,我们最好能实现从第三方站点发送请求时禁止Cookie的发送,在浏览器通过不同的源发送HTTP请求时,有如下区别:
  - 第三方站点禁止浏览器发送某些关键的Cookie数据到输入器
  - 同一个站点发起的请求,需要保证Cookie数据正常发送 

* Cookie中的SameSite属性正是为了解决这个问题。

* set-cookie: 1P_JAR=2019-10-20-06; expires=Tue, 19-Nov-2019 06:36:21 GMT; path=/; domain=.google.com; SameSite=none

* SameSite 选项通常有Strict Lax 和None 三个值
  - Strict最为严格。浏览器会完全禁止第三方Cookie。
  - Lax相对宽松一点。在跨站点的情况下,从第三方站点的链接打开和从第三方站点提交Get方式的表单这两种方式都会携带Cookie。但如果在第三方站点中使用Post方法,或者通过img iframe等标签加载的URL这些场景都不会携带Cookie。
  - None。任何情况下都会发送Cookie数据。

* `对于防范 CSRF 攻击，我们可以针对实际情况将一些关键的 Cookie 设置为 Strict 或者 Lax 模式，这样在跨站点请求时，这些关键的 Cookie 就不会被发送到服务器，从而使得黑客的 CSRF 攻击失效。`

2. 验证请求的来源站点
* 服务器端验证请求来源的站点。 CSRF攻击大多数来自于第三方站点,因此服务器可以禁止来自第三方站点的请求。

* `Referer是HTTP请求头中的一个字段,记录了该HTTP请求的来源地址.`

* Referrer-Policy 首部用来监管哪些访问来源信息——会在 Referer  中发送——应该被包含在生成的请求当中。

* 服务器端验证请求头中的Referer并不是太可靠，因此有了,Origin属性。
* Origin属性只包含了域名信息,并没有包含具体的URL路径,这是Origin和Referer的主要区别。Origin 的值之所以不包含详细路径信息，是有些站点因为安全考虑，不想把源站点的详细路径暴露给服务器。

* 服务器的策略是优先判断Origin,没有包含Origin属性,再根据实际情况判断是否使用Referer值。

3. CSRF Token
1. 在浏览器想服务器发起请求时,服务器生成一个 CSRF Token。 CSRF Token其实就是服务器生成的字符串,然后将该字符串植入到返回的页面中。
2. 在浏览器如果要发起转账的请求,那么需要带上页面的CSRFToken ,然后验证该Token是否合法。第三方的站点发出的请求,将无法获取到CSRF Token的值。

# 总结

* CSRF 攻击,要发起 CSRF 攻击需要具备三个条件：目标站点存在漏洞、用户要登录过目标站点和黑客需要通过第三方站点发起攻击。
* 根据这三个必要条件，我们又介绍了该如何防止 CSRF 攻击，具体来讲主要有三种方式：充分利用好 Cookie 的 SameSite 属性、验证请求的来源站点和使用 CSRF Token。这三种方式需要合理搭配使用，这样才可以有效地防止 CSRF 攻击。