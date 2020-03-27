* this
* 闭包
* 实现api
* 其他知识图谱和高频考点梳理
* 异步 Promise
* 面向对象和原型
* ES6

* const 声明的变量不会挂载到 window 全局对象当中

![](https://pic2.zhimg.com/v2-7aefb8c7db2342f3935cd211d13e7954.png)

* 结论:在执行函数时,如果函数中的this是被上一级的对象所调用,那么this指向的就是上一级的对象;否则指向全局环境。


* 经过预编译过程,我们应该注意三点:
1. 预编译阶段进行变量声明
2. 预编译阶段变量声明进行提升,但是为 undefined
3. 预编译阶段所有非表达式的函数声明进行提升。



* `函数嵌套函数时,内层函数引用了外层函数作用域下的变量,并且内层函数在全局环境下可访问,就形成了闭包`


* 一般情况下,基本数据类型保存在栈内存当中,引用类型保存在堆内存当中。

* 内存泄露是指内存空间明明已经不再被使用,但由于某个原因并没有被释放的现象。
* 内存泄露危害却非常直观:它会直接导致程序运行缓慢,甚至崩溃

* 浏览器垃圾回收 标记清楚  引用计数


* javaScript高级程序设计 与 你不知道的javascript介绍到对象转换为基本类型时,会调用valueOf 再调用 toString。




# Promise
1. 参数传递
* 执行resolve传递的值,会被第一个 then处理时接收到
* 如果 then 有链式操作,前面步骤返回的值,会被后面的步骤获取到

2. Promise 中异常处理 建议使用 catch方法 而不是 then的第二个参数
* 在若干个then串联之后,我们一般在最后跟一个.catch来捕获异常,而且执行reject时传递的参数也会catch中捕获到


3. 串联多个异步操作

```
const fullFileName2 = path.resolve(__dirname, '../data/data2.json')
const result2 = readFilePromise(fullFileName2)
const fullFileName1 = path.resolve(__dirname, '../data/data1.json')
const result1 = readFilePromise(fullFileName1)

result2.then(data => {
    console.log('data2.json', data)
    return result1  // 此处只需返回读取 data1.json 的 Promise 即可
}).then(data => {
    console.log('data1.json', data) // data 即可接收到 data1.json 的内容
})


```

* 上文参数传递提到过 如果 then有链式操作,前面步骤返回的值,会被后面的步骤获取到。`但是，如果前面步骤返回值时一个Promise的话,情况就不一样了————如果前面返回的是Promise对象,后面的then将会被当做这个返回的Promsiede 第一个then来对待`

4. Promise.all Promise.race的应用

5. Promise。resolve的应用
* Promise。resolve能够将 thenable对象转换为 Promise对象

```

// 定义一个 thenable对象
const thenable = {
  /// 所谓 thenable 对象 就是具有 then属性 ,而且属性值是如下格式函数的对象
  then:(resolve,reject)=>{
    resolve(200)
  }
}

// thenable 对象可以转换为Promise对象

const promsie = Promise.resolve(thenable)

promise.then(data=>{

})

```


# Generator  Iterator

## 生成器实现机制————协程
* 协程是一种比线程更加轻量级的存在,协程处在线程环境中, `一个线程可以存在多个协程` 可以将协程理解为线程中的一个个任务。不像进程和线程,协程并不受操作系统的管理,而是被具体的应用程序代码所控制。
* js是单线程执行的,一个线程一次只能执行一个协程。比如当前执行A协程,另外还有一个B协程,如果想要执行B的任务,就必须在A协程中将 `js线程的控制权交给B协程` 那么现在B执行，A就相当于暂停的状态


# 宏任务和微任务

1. 一般地宏任务包括:
* setTimeout
* setInterval
* i/o
* 事件
* requestAnimationFrame
* UI渲染


```
var b = 10;
(function b(){
b = 20;
console.log(b); // [Function: b]
})();

```
* 具有名称的函数表达式"会在外层词法环境和它自己执行产生的词法环境之间产生一个词法环境，再把自己的名称和值当作变量塞进去，所以你这里的b = 20 并没有改变外面的b，而是试图改变一个只读的变量b





* 在函数前面的 async 这个单词表达了一个简单的事情：`即这个函数总是返回一个 promise 。 即使这个函数实际上会返回一个非promise的值，函数定义前加上了 async 关键字会 指示 js引擎 自动将返回的值包装在一个已决议 resolved 的promise内`
* 



* 上文参数传递提到过 如果 then有链式操作,前面步骤返回的值,会被后面的步骤获取到。`但是，如果前面步骤返回值时一个Promise的话,情况就不一样了————如果前面返回的是Promise对象,后面的then将会被当做这个返回的Promsiede 第一个then来对待`


* await会先执行其右侧的函数 并让出主线程，跳出 async 函数

* 如果 await 右侧表达逻辑不是 promise 类型，那么仍然异步处理，将其理解包装为 promise