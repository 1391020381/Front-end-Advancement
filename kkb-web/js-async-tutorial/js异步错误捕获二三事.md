# 无法捕获错误的情况
* 异步任务
    - 宏任务的回调函数中错误无法捕获
    - 异步任务由eventLoop加入任务队列,并取出入(js主进程)执行,而当task取出执行的时候,main的栈已经退出啦,也就是上下文已经改变啦,所以main（try catch）无法捕获 task的错误
    - 微任务 promise的回调


* 并不是回调函数无法 try catch    
    - 回调函数跟 main还在同一次事件循环,即一个 eventlooptick所以上下文没有改变,错误可以捕获

# promise 的异常捕获
- promise内部错误不会冒泡出来,而是被promise吃掉啦,只有通过 promise.catch才可以捕获,所以用Promise一定要写 catch啊
- promise内部的无论是 reject或者 throw new Error 都可以通过 catch回调捕获

- 需要和微任务区分开来,promise的微任务指的是 then的回调。而此处是 Promise构造函数传入的第一个参数 new Promise是同步执行的。

## then
* then之后的错误 只能使用 catch捕获

## 用Promise捕获异步错误
* 把异步操作用 Promise包装 通过 内部判断 把错误 reject 在外面通过 promise.catch捕获


# async await 的异常捕获