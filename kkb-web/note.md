* 在浏览器环境中,常见的 macro task 有 setTimeout MessageChannel postMessage   setImmediate 
* 常见的 micro task 有 MutationObsever 和 Promise.then 

* 如何监听数组的push
* 组件的实现


# node
* download-git-repo

# koa 

* .req Node 的request
* .res Node 的response
* .response koa的response
* .request koa的 request


* app.on('error',err=>{

})


* Session/Cookie
* Token  jwt
* OAuth
* koa-session



* context 
* koa为了保证简化API,引入上下文context概念,将原始请求对象req和响应对象res封装并挂载到context上,并且在context上设置 getter 和 setter,从而简化操作

* [HTTP](https://www.bilibili.com/video/av81756002)




* Promise 参数的传递
    - 执行resolve 传餐的值 会被第一个 then 处理时接收到
    - 如果 then有链式操作，前面步骤返回的值,会被后面的步骤获取到
    - 如果前面步骤返回值是一个Promise的话,情况就不一样了, `后面的then 将会被当做这个返回的Promise的第一个then来对待。`

* Promise.resolve的应用 
    - promise.resolve能够将thenable对象转换为promise对象。


```
// 定义一个 thenable对象

const thenable = {
    // 所谓 thenable 对象，就是具有 then 属性，而且属性值是如下格式函数的对象
    then:(resolve,reject)=>{
        resolve(200)
    }
}

// thenable 对象可以转换为 Promise对象

const promise = Promise.resolve(thenable)
promise.then(data=>{
    
})

```


* 中间件常见任务
    - 请求拦截
    - 路由
    - 日志
    - 静态文件服务