
* 一般有以下几种情况下代码,才会在执行之前就进行编译并创建执行上下文。
1. 当javas执行全局代码的时候,会编译全局代码并创建全局执行上下文,而且在整个页面的生存周期内,全局执行上下文只有一份。
2. 当调用一个函数的时候,函数体内的代码会被编译,并创建函数执行上下文,一般情况下,函数执行结束之后,创建的函数执行上下文会被销毁。
3. 当使用eval函数的时候,eval的代码也会被编译,并创建执行上下文。

* 学习调用栈至少有以下三点好处:
1. 可以帮助你了解JavaScript引擎背后的工作原理
2. 让你有调试javascript代码的能力
3. 搞定面试

* `调用栈就是用来管理函数调用关系的一种数据结构`

# 什么是函数调用
* `函数调用就是运行一个函数,具体使用方式是使用函数名称跟着一对小括号`

```
var a = 2
function add(){
var b = 10
return  a+b
}
add()


```
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%85%A8%E5%B1%80%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E8%BF%87%E7%A8%8B.png)

# 什么是栈
* 后进先出

## 什么是javascript的调用栈
* javascript引擎正式利用栈的这种结构来管理执行上下文的。在执行上下文创建好后,JavaScript引擎会将执行上下文压入栈中,通常把这种用来管理执行上下文的栈称为`执行上下文栈,也称为调用栈`

```

var a = 2
function add(b,c){
  return b+c
}
function addAll(b,c){
var d = 10
result = add(b,c)
return  a+result+d
}
addAll(3,6)


```
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%85%A8%E5%B1%80%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E5%8E%8B%E6%A0%88.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%B5%8B%E5%80%BC%E6%93%8D%E4%BD%9C%E6%94%B9%E5%8F%98%E6%89%A7%E8%A1%8C%E4%B8%8A%E4%B8%8B%E6%96%87%E4%B8%AD%E7%9A%84%E5%80%BC.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%89%A7%E8%A1%8C%20addAll%20%E5%87%BD%E6%95%B0%E6%97%B6%E7%9A%84%E8%B0%83%E7%94%A8%E6%A0%88.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%89%A7%E8%A1%8C%20add%20%E5%87%BD%E6%95%B0%E6%97%B6%E7%9A%84%E8%B0%83%E7%94%A8%E6%A0%88.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/add%20%E5%87%BD%E6%95%B0%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9D%9F%E6%97%B6%E7%9A%84%E8%B0%83%E7%94%A8%E6%A0%88.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/addAll%20%E5%87%BD%E6%95%B0%E6%89%A7%E8%A1%8C%E7%BB%93%E6%9D%9F%E6%97%B6%E7%9A%84%E8%B0%83%E7%94%A8%E6%A0%88.png)

# 在开发中,如何利用好调用栈
1. 如何利用浏览器查看调用栈的信息。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%9F%A5%E7%9C%8B%E5%87%BD%E6%95%B0%E8%B0%83%E7%94%A8%E5%85%B3%E7%B3%BB.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E4%BD%BF%E7%94%A8%20trace%20%E5%87%BD%E6%95%B0%E8%BE%93%E5%87%BA%E5%BD%93%E5%89%8D%E8%B0%83%E7%94%A8%E6%A0%88%E4%BF%A1%E6%81%AF.png)

2. 栈溢出( Stack Overflow)
* `调用栈是有大小的`
* 当入栈的执行上下文超过一定数目,javascript引擎就会报错,我们把这种错误叫做栈溢出。
* 超过了最大栈调用大小(Maximun call stack size exceeded)

# 总结
1. 每调用一个函数,javascript引擎会为其创建执行上下文,并把该执行上下文压入调用栈,然后JavaScript引擎开始执行函数代码。
2. 如果在一个函数A中调用了另一个函数B,那么JavaScript引擎会为B函数创建执行上下文,并将B函数的执行上下文压入栈顶。
3. 当前函数执行完毕后,JavaScript引擎会将函数的执行上下文弹出栈。
4. 当分配的调用栈空间被占满时,会引发'堆栈溢出'问题