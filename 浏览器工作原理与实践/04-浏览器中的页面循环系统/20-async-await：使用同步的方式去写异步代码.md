* 使用Promise.then也是相当复杂,代码里面包含了大量的then函数,使得代码依然不是太容易阅读。`基于这个原因,ES7引入了async/await,这是JavaScript异步编程的一个重大改进,提供了在不阻塞主线程的情况下使用同步代码实现异步访问资源的能力,并且使得代码逻辑更加清晰。`

* 本文介绍 生成器(Generator) 是如何工作的,接着讲解Generator的底层实现机制——协成(Coroutine) 又因为 async/await使用了Generator和Promise两种技术,所以紧接着我们就通过Generator和Promise来分析asynce/await到底是如何以同步的方式来编写异步代码的。

# 生成器 VS 协成

* `生成器函数是一个带星号函数,而且可以暂停执行和恢复执行的`

```

function* genDemo() {
    console.log(" 开始执行第一段 ")
    yield 'generator 2'

    console.log(" 开始执行第二段 ")
    yield 'generator 2'

    console.log(" 开始执行第三段 ")
    yield 'generator 2'

    console.log(" 执行结束 ")
    return 'generator 2'
}

console.log('main 0')
let gen = genDemo()
console.log(gen.next().value)
console.log('main 1')
console.log(gen.next().value)
console.log('main 2')
console.log(gen.next().value)
console.log('main 3')
console.log(gen.next().value)
console.log('main 4')



```
* 生成器函数的具体使用方式:
- * 在生成器函数的内部执行一段代码,如果遇到 yield关键字 那么 JavaScript引擎将会返回关键字后面的内容给外部,并暂停该函数的执行
- * 外部函数可以通过next 方法恢复函数的执行。

* `协成是一种比线程更加轻量级的存在` 可以把协程看成是跑在线程上的任务,一个线程上可以存在多个协程,但是在线程上同时只能执行一个协程。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%8D%8F%E7%A8%8B%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

* 协成的特点:
- 1.  通过调用生成器函数 genDemo来创建一个协成 gen, 创建之后,gen协成并没有理解执行。
- 2. 要让gen 协成执行,需要通过调用 gen.next。
- 3. 当协成正在执行的时候,可以通过 yield 关键来暂停 gen 协成的执行,并返回主要信息给父线程。
- 4. 如果协成在执行期间,遇到了 return 关键字,那么 javascript引擎会结束当前协成,并将return 后面的内容返回给父线程。

* 父线程和gen协程 调用栈关系
- 1. gen 协程和父协程是在主线程上交互执行的,并不是并发执行的,它们之前的切换是通过 yield和gen.next来配合完成的。
- 2. 当在gen协成中调用了yield方法时,javascript引擎会保存gen协程当前的调用栈信息,并恢复父协程的调用栈信息。同样,当在父协程中执行gen.next时,JavaScript引擎会保存父协程的调用栈信息,并恢复gen协程的调用栈信息。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/gen%20%E5%8D%8F%E7%A8%8B%E5%92%8C%E7%88%B6%E5%8D%8F%E7%A8%8B%E4%B9%8B%E9%97%B4%E7%9A%84%E5%88%87%E6%8D%A2.png)


```
//foo 函数
function* foo() {
    let response1 = yield fetch('https://www.geekbang.org')
    console.log('response1')
    console.log(response1)
    let response2 = yield fetch('https://www.geekbang.org/test')
    console.log('response2')
    console.log(response2)
}

// 执行 foo 函数的代码
let gen = foo()
function getGenPromise(gen) {
    return gen.next().value
}
getGenPromise(gen).then((response) => {
    console.log('response1')
    console.log(response)
    return getGenPromise(gen)
}).then((response) => {
    console.log('response2')
    console.log(response)
})


```

* 首先执行的是 let gen = foo() 创建了gen协程
* 然后在父协程中通过执行 gen.next把主线程的权限控制交给gen协程。
* gen 协程获取到主线程的控制权后,就调用fetch函数创建了一个Promise对象。
response1 然后通过 yield 暂停gen 协程的执行,并将response1 返回给父协程。
* 父协程恢复执行后,调用 response1.then方法等待请求结果。
* 等通过fetch 发起的请求完成之后,会调用then中的回调函数,then中的回调函数拿到结果之后,通过调用gen.next放弃主线程的控制权,将控制权限继续执行下个请求。


* 把执行生成器的代码封装成一个函数,并把这个执行生成器代码的函数称为执行器。

# async/await


* async/await技术背后的秘密就是Promise和生成器的应用,底层就是 微服务和协成应用

1. async
* 根据MDN定义,async是一个通过 异步执行并隐式返回Promise作为结果的函数
* 异步执行  隐式返回Promise

```
async function foo() {
    return 2
}
console.log(foo())  // Promise {<resolved>: 2}


```

* `调用 async声明的foo函数返回了一个Promise对象,状态时resolved`

2. await

```
async function foo() {
    console.log(1)
    let a = await 100
    console.log(a)
    console.log(2)
}
console.log(0)
foo()
console.log(3)


```

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/async-await%20%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

* 重点分析:await

```

let a = await 100


let promise_ = new Promise((resolve,reject){
    resolce(100)
})

```
* promise_ 对象创建的过程中,executor函数中调用 resolve函数,javascript引擎会将该任务提交 微任务队列
* JavaScript引擎会暂停当前协成的执行,将主线程的控制权交给父协程执行
* 主线程的控制权已经交给父协程了,这时候父协程要做的一件事是调用 promise-.then来监控promise状态的改变。
* 接下来继续执行父协程的流程,然后进入 微任务的检查点,然后执行微任务队列,微任务队列中有resolve(100)的任务等待执行,并会触发promise_then的回调函数.
* `该回调函数被激活以后,会将主线程的控制权交给foo函数的协程,并同时将value值传给该协程。`
* foo 协程激活之后,会把value赋值给变量a，然后foo协程继续执行后续语句,执行完成之后,将控制权归还给父协程。
```
promise_.then((value)=>{
   // 回调函数被激活后
  // 将主线程控制权交给 foo 协程，并将 vaule 值传给协程
})


```

* 思考题

```

async function foo() {
    console.log('foo')
}
async function bar() {
    console.log('bar start')
    await foo()
    console.log('bar end')
}
console.log('script start')
setTimeout(function () {
    console.log('setTimeout')
}, 0)
bar();
new Promise(function (resolve) {
    console.log('promise executor')
    resolve();
}).then(function () {
    console.log('promise then')
})
console.log('script end')


```

