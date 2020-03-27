# XMLHTTPRequest

# 回调函数 VS 系统调用栈

1. 回调函数
* 将一个函数作为参数传递给另外一个函数,那作为参数饿这个函数就是`回调函数`。

```
let callback = function () {
  console.log('i am do homework')
}

function doWork(cb) {
  console.log('start do work ')
  cb()  
  console.log('end do work')
}

doWork(callback)    

// 同步回调

```
* 回调函数callback 是在主函数doWork 返回之前执行的,我们把这个回调过程称为同步回调。

```
let callback = function () {
  console.log('i am do homework')
}
function doWork(cb){
  console.log('start do work')
  setTimeout(cb,1000)
  console.log('end do work')
}

doWork(callback)

```
* 这种回调函数在主函数外部执行的过程称为`异步回调`。

* `消息队列和主线程循环机制保证了页面有条不紊地运行`
* `当循环系统再执行一个任务的时候,都要为这个任务维护一个系统调用栈。` 这个系统调用栈类似于javascript的调用栈。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%B6%88%E6%81%AF%E5%BE%AA%E7%8E%AF%E7%B3%BB%E7%BB%9F%E8%B0%83%E7%94%A8%E6%A0%88%E8%AE%B0%E5%BD%95.png)

* 这幅图记录了一个Parse HTML的任务执行过程,其中黄色的条目表示执行javascript的过程,其他颜色的条目表示浏览器内部系统的执行过程。
* 通过该图你可以看出来,Parse HTML 任务在执行过程中会遇到一系列的子过程,比如在解析页面的过程中遇到了javascript脚本,那么就暂停解析过程出执行脚本,等待执行完成之后,再恢复解析过程,然后又遇到了样式表,这时候又开始解析样式表....... 直到整个任务完成。
* 需要说明的是,整个Parse HTML 是一个完整的任务,在执行过程中的脚本解析,样式表解析都是该任务的子过程,其下拉的长条就是执行过程中调用栈的信息。
* 每个任务在执行的过程中都有自己的调用栈,那么同步回调就是在当前主函数的上下文中执行回调函数。

* `异步回调是指回调函数在主函数之外执行,一般有两种方式:`
- * 第一种是把异步函数做成一个任务,添加到信息队列尾部；
- * 第二种是把异步函数添加到微任务队列中,这样就可以在当前任务的末尾处执行微任务了。

# XMLHttpRequest 运行机制
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/XMLHttpRequest%20%E5%B7%A5%E4%BD%9C%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

```

 function GetWebData(URL){
    /**
     * 1: 新建 XMLHttpRequest 请求对象
     */
    let xhr = new XMLHttpRequest()

    /**
     * 2: 注册相关事件回调处理函数 
     */
    xhr.onreadystatechange = function () {
        switch(xhr.readyState){
          case 0: // 请求未初始化
            console.log(" 请求未初始化 ")
            break;
          case 1://OPENED
            console.log("OPENED")
            break;
          case 2://HEADERS_RECEIVED
            console.log("HEADERS_RECEIVED")
            break;
          case 3://LOADING  
            console.log("LOADING")
            break;
          case 4://DONE
            if(this.status == 200||this.status == 304){
                console.log(this.responseText);
                }
            console.log("DONE")
            break;
        }
    }

    xhr.ontimeout = function(e) { console.log('ontimeout') }
    xhr.onerror = function(e) { console.log('onerror') }

    /**
     * 3: 打开请求
     */
    xhr.open('Get', URL, true);// 创建一个 Get 请求, 采用异步


    /**
     * 4: 配置参数
     */
    xhr.timeout = 3000 // 设置 xhr 请求的超时时间
    xhr.responseType = "text" // 设置响应返回的数据格式
    xhr.setRequestHeader("X_TEST","time.geekbang")

    /**
     * 5: 发送请求
     */
    xhr.send();
}



```

1.  第一步:创建XMLHttpRequest对象
* 当执行到 let xhr = new XMLHttpRequest() 后，javascript会创建一个XMLHttpRequest对象xhr,用来执行实际的网络请求操作。

2. 第二步:为xhr对象注册回调函数
* 因为网络请求比较耗时,所以要注册回调函数,这样后台任务执行完成之后,就会通过调用回调函数来告诉其执行结果。
* XMLHttpRequest的回调函数主要有以下几种:
- * ontimeout 用来监控超时请求,如果后台请求超时了,该函数会被调用；
- * onerror 用来监控出错信息,如果后台请求出错了,该函数会被调用
- * onreadystatechange 用来监控后台请求过程中的状态,比如可以监控到HTTP头加载完成的消息 HTTP响应体消息以及数据加载完成的消息等。

3. 第三部:配置基础的请求信息。
* 注册好回调事件之后,接下来就需要配置基础的请求信息了,首先要通过open接口配置一些基础的请求信息,包括请求的地址 请求方法(是 get 还是 post) 和请求方式(同步还是异步请求)。
* 然后通过xhr内部属性类配置一些其他可选的请求信息,你可以参考文中示例代码,我们通过xhr.timeout = 3000 来配置 超时时间。也就是说如果请求超过 3000毫秒还没响应,那么这次请求就被判断为失败了。
* 我们还可以通过xhr.responseType  =  'text' 来配置服务器返回的格式,`将服务器返回的数据自动转换为自己想要的格式` 如果将 responseType 的值设置为json,那么系统会自动将服务器返回的数据转换为javascript 对象格式。下面的图表是一些返回类型描述:
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/responseType%20.png)

* 使用xhr.setRequestHeader来添加 自己专用的请求头


4. 第四部：发送请求

* 调用xhr。send 来发起网络请求。
* 渲染进程会将请求发送给网络进程,然后网络进程负责资源的下载,等网络进程接收到数据之后,就会利用IPC来通知渲染进程;渲染进程接收到消息之后,会将xhr的回调函数封装成任务并添加到消息队列中,等主线程循环系统执行到该任务的时候,就会根据相关的状态来调用对应的回调函数。
- * 如果网络出错了,就会执行xhr.onerror
- * 如果超时了,就会执行xhr.ontimeout
- * 如果正常的数据接收,就会执行 onreadystatechange来反馈相应的状态。

# XMLHttpRequest 使用过程中的'坑'

1. 跨域问题

2. HTTPS混合内容的问题

* HTTPS混合内容是HTTPS页面中包含了不符合HTTPS安全要求的内容,比如包含了HTTP资源,通过HTTP加载的图像、视频 样式表 脚本等 都属于混合内容。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/HTTPS%20%E6%B7%B7%E5%90%88%E5%86%85%E5%AE%B9%E8%AD%A6%E5%91%8A.png)
* 通过HTML文件加载的混合资源,虽然给出警告,但是大部分类型还是能加载的。 
* 而适用XMLHttpRequest请求时,浏览器认为这种请求可能是攻击者发起的,会阻止此类危险的请求。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E4%BD%BF%E7%94%A8%20XMLHttpRequest%20%E6%B7%B7%E5%90%88%E8%B5%84%E6%BA%90%E5%A4%B1%E6%95%88.png)


# 总结

* setTimeout是直接将延迟任务添加到延迟队列中,而XMLHttpRequest发起请求,是由浏览器的其他进程或者线程去执行,然后再将执行结果利用IPC的方式通知渲染进程,之后渲染进程再将对应的消息添加到消息队列中。

* 你认为作为一名开发工程师，要如何去高效地学习前端的 Web 安全理论呢？