
* Promise DOM/BOM API中新加入的API大多都是建立Promise上的

# 异步编程的问题:代码逻辑不连续

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/Web%20%E5%BA%94%E7%94%A8%E7%9A%84%E5%BC%82%E6%AD%A5%E7%BC%96%E7%A8%8B%E6%A8%A1%E5%9E%8B.png)

* 一个标准的异步编程模型,页面主线程发起了一个耗时的任务,并将任务交给另外一个进程去处理,这时页面主线程会继续执行消息队列中的任务。等该进程处理完整个任务后,会将该任务添加到渲染进程的消息队列中,并排队等待循环系统的处理。排队结束之后,循环系统会取出消息队列中的任务进行处理,并触发相关的回调操作。
* 页面编程的一大特点:异步回调

```
// 执行状态
function onResolve(response){console.log(response) }
function onReject(error){console.log(error) }

let xhr = new XMLHttpRequest()
xhr.ontimeout = function(e) { onReject(e)}
xhr.onerror = function(e) { onReject(e) }
xhr.onreadystatechange = function () { onResolve(xhr.response) }

// 设置请求类型，请求 URL，是否同步信息
let URL = 'https://time.geekbang.com'
xhr.open('Get', URL, true);

// 设置参数
xhr.timeout = 3000 // 设置 xhr 请求的超时时间
xhr.responseType = "text" // 设置响应返回的数据格式
xhr.setRequestHeader("X_TEST","time.geekbang")

// 发出请求
xhr.send();


```

* 异步代码回调太多

# 封装异步代码,让处理流程变的线性
* 重点关注 输入内容 (请求信息) 和 输出内容(回复信息)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%B0%81%E8%A3%85%E8%AF%B7%E6%B1%82%E8%BF%87%E7%A8%8B.png)

```

// makeRequest 用来构造 request 对象

function makeRequest(request_url) {
    let request = {
        method:'GET',
        url:request_url,
        headers:'',
        body:'',
        credentials:false,
        sync:true,
        responseType:'text',
        referrer:''
    }
 return request
}



// request 
// resolve 
// reject

function XFetch(request,resolve,reject) {
    let xhr  = new XMLHttpRequest()
    xhr.ontimeout = function (e) {reject(e)}
    xhr.onerror = function (e) {reject(e)}
    xhr.onreadystatechange = function () {
        if(xhr.status == 200) {
            resolve(xhr.response)
        }
    }
    xhr.open(request.method,request.url,request.sync)
    xhr.timeout = request.timeout
    xhr.responseType = reqest.responseType
    // 补充其他请求信息
    
    xhr.send()
}

XFetch(makeRequest('https://time.geekbang.org'),function resolve(data){
    console.log(data)
},function reject(e){
    console.log(e)
})

```

# 新的问题:回调地狱
* 归结原因:
- * 第一是嵌套调用,下面的任务依赖上个任务的请求结果,并在上个任务的回调函数内部执行新的业务逻辑。这样当嵌套层次多了,代码的可读性就变得非常差了。
- * 第二是任务的不确定性,执行每个任务都有两种可能的结果(成功或者失败),所以体现在代码中就需要对每个任务的执行结果做两次判断,这种对每个任务都要进行一次额外的错误处理的方式,明显增加了代码的混乱程度。

* `解决问题的思路:`
- * 第一是消灭嵌套调用
- * 第二是合并多个任务的错误处理

# Promise:消灭嵌套调用和多次错误处理

// Promise 版 XFetch 

```
function XFetch(request){
    function executor(resolve,reject) {
        let xhr = new XMLHttpRequest()
        xhr.open('GET',request,url,true)
        xhr.ontimeout = function (e) { reject(e) }
        xhr.onerror = function (e) { reject(e) }
        xhr.onreadystatechange = function () {
            if(this.readyState === 4) {
                if(this.status === 200){
                    resolve(this.responseText,this)
                }else {
                    let error = {
                        code :this.status,
                        response:this.response
                    }
                    reject(error,this)
                }
            }
        }
        xhr.send()
    }
    return new Promsie(executor)
}

```

// 使用XFetch 来构造请求流程

```
var x1 = XFetch(makeRequest('https://time.geekbang.org/?category'))

var x2 = x1.then(value=>{
    console.log(value)
    return XFetch(makeRequest('https://www.geekbang.org/column'))
})

var x3 = x2.then(value=>{
    console.log(value)
    return XFetch(makeRequest('https://time.geekbang.org'))
})

x3.catch(error=>{
    console.log(error)
})

```
* 在调用XFetch时,会返回一个Promise对象
* 构建Promsie对象时,需要传入一个executor函数,XFetch的主要业务流程都在executor函数中执行。
* 如果运行在excutor函数的中业务执行成功了,会调用resolve 函数；如果执行失败,则调用reject函数
* `在excutor函数中调用resolve函数时,会触发 promise.then 设置 的调用函数;而调用reject函数时,会触发promsie.catch设置的回调函数`

1. `首先,Promise 实现了回调函数的延迟绑定`

* 回调函数的延迟绑定在代码上体现就是 先创建Promise 对象x1通过Promise的构造函数executor来执行业务逻辑;
* 创建Promise 对象 x1之后,再使用x1.then来设置回调函数。

```
// 创建Promise 对象 x1 并在 executor函数中执行业务逻辑

function executor (resolve,reject) {
    resolve(100)
}

let x1 = new Promsise(executor)

// x1 延迟绑定回调函数 onResolve

function onResolve(value) {
    console.log(value)
}

x1.then(onResolve)

```

2. `其次,需要将回调函数 onResolve的返回值穿透到最外层。`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%9B%9E%E8%B0%83%E5%87%BD%E6%95%B0%E8%BF%94%E5%9B%9E%E5%80%BC%E7%A9%BF%E9%80%8F%E5%88%B0%E6%9C%80%E5%A4%96%E5%B1%82.png)


```

function executor(resolve, reject) {
    let rand = Math.random();
    console.log(1)
    console.log(rand)
    if (rand > 0.5)
        resolve()
    else
        reject()
}
var p0 = new Promise(executor);

var p1 = p0.then((value) => {
    console.log("succeed-1")
    return new Promise(executor)
})

var p3 = p1.then((value) => {
    console.log("succeed-2")
    return new Promise(executor)
})

var p4 = p3.then((value) => {
    console.log("succeed-3")
    return new Promise(executor)
})

p4.catch((error) => {
    console.log("error")
})
console.log(2)



```
* p0 - p4  无论哪个对象里面抛出异常,都可以通过最后一个对象 p4.catch 来捕获异常,通过这种方式可以将所有Promise对象的错误合并到一个函数来处理,这样就解决了每个任务都需要单独处理异常的问题。
*  因为Promise 对象的错误具有'冒泡' 性质,会一直向后传递,直到被 onReject 函数处理或catch语句捕获为止。

# Promise 与 微任务

```

function executor (resolve,reject) {
    resolve(100)
}

let demo = new Promise(excutor)

function onResolve(value){
    console.log(value)
}

demo.then(onResolve)

```
* 首先执行 new Promise时,Promise 的构造函数会被执行,不过由于Promise是V8引擎提供的,所以暂时看不到Promise构造函数的细节。
* 接下来,Promise 的构造函数会调用 Promise 的参数 executor 函数。然后再executor中执行了resolve ,resolve函数也是在V8内部实现的,执行resolve函数,会触发demo.then设置的回调函数 onResolve,所以推测resolve 函数内部调用了通过demo.then设置的onResolve函数


* 模拟实现Promise 


```

function Bromise (executor) {
    var onResolve_ = null
    var onReject)_ = null

    // 模拟实现 resolve 和 then 暂不支持 reject
    this.then = function (onResolve,onReject) {
        onResolve_ = onResolve
    }
    function resolve(value){
        setTimeout(()=>{
        onResolve_(value)
         },0)
    }
    executor(resolve,null)
}

```

```

function executor (resolve,reject) {
    resolve(100)
}
// 将 Promise 改成 Bromise

let demo  = new Bromise(executor)

function onResolve(value) {
    console.log(value)
}

demo.then(onResolve)

```

* 采用了定时器来推迟 onResolve 的执行,不过使用定时器的效率并不是太高, 所以Promise又把这个定时器改造成了微任务。保证了延迟调用,既要保证了执行效率。

# 总结

* Web页面是单线程架构模型,决定异步编程模型。这样导致关键逻辑点被打乱。然后尝试封装,产生了回调地狱。
* 产生回调地狱的原因:
- * 多层嵌套的问题。
- * 每种任务的处理结果存在两种可能性(成功或失败),那么需要在每种任务执行结束后分别处理这两种可能性。


* Promise 通过回调函数延迟绑定  回调函数返回值穿透和错误 '冒泡' 解决上面的问题。



<ol>
<li>Promise 中为什么要引入微任务？</li>
<li>Promise 中是如何实现回调函数返回值穿透的？</li>
<li>Promise 出错后，是怎么通过“冒泡”传递给最后那个捕获异常的函数？</li>
</ol>