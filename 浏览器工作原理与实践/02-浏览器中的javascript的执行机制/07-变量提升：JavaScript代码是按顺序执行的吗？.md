* 本文主要是从javascript的顺序执行讲起,然后一步步了解JavaScript是怎么运行的

# 变量提升（Hoisting）
* 变量的声明和赋值

```
var myName = '极客时间'

// 可以把它看成两行代码组成的：
var myName  // 声明部分
myName = '即可时间' // 赋值部分

```
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%A6%82%E4%BD%95%E7%90%86%E8%A7%A3%60var%20myname%20%3D%20'%E6%9E%81%E5%AE%A2%E6%97%B6%E9%97%B4'%60.png)

* 函数的声明和赋值
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%87%BD%E6%95%B0%E7%9A%84%E5%A3%B0%E6%98%8E%E5%92%8C%E8%B5%8B%E5%80%BC.png)  

* `所谓的变量提升,是指在JavaScript代码执行过程中,JavaScript引擎把变量的声明部分和函数的声明部分提升到代码开头的'行为'。变量被提升后,会默认给变量设置默认值,这个默认值就是我们熟悉的undefined`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%A8%A1%E6%8B%9F%E5%8F%98%E9%87%8F%E6%8F%90%E5%8D%87%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* `函数和变量在执行之前都提升到了代码开头`

# javascript代码的执行流程
* 实际上变量和函数声明在代码里的位置是不会改变的,而且是在编译阶段被JavaScript引擎放入内存中。

1. 编译阶段
- 1. 第一部分：变量提升部分的代码

```
var myName = undefined
function showName () {
  console.log('函数showName被执行')
}

```
- 2. 第二部分:执行部分的代码

```
showName()
console.log(myName)
myName = '极客时间'

```
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/JavaScript%20%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B%E7%BB%86%E5%8C%96%E5%9B%BE.png)

* 经过编译后,会生成两部分内容:执行上下文(Execution context)和可执行代码
* 执行上下文是JavaScript执行一段代码时的运行环境。比如调用一个函数,就会进入这个函数的执行上下文,确定该函数在执行期间用到的诸如this 变量 对象以及函数等
* 执行上下文将在 08中介绍
* 在执行上下文中存在一个 `变量环境对象(Viriable Environment)` 该变量中保存了变量提升的内容。
```
VariableEnvironment:
     myname -> undefined, 
     showName ->function : {console.log(myname)

```
2. 执行阶段
* javascript引擎开始执行'可执行代码' 按照顺序一行一行地执行。

# 代码中出现相同的变量或者函数怎么办

```
function showName() {
    console.log('极客邦');
}
showName();
function showName() {
    console.log('极客时间');
}
showName(); 

```
* 首先是编译阶段: `第二个showName函数会将第一个showName函数覆盖掉`
* 接下来是执行阶段。 由于变量环境只保存了第二个showName函数,所以最终调用的是第二个函数
* `一段代码如果定义了两个相同名字的函数,那么最终生效的是最后一个函数`

# 总结
* JavaScript代码执行过程中,需要先做`变量提升` 而之所以需要实现变量提升,是因为JavaScript代码在执行过程中需要先编译
* 在`编译阶段` 变量和函数会被存放到`变量环境`中,变量的默认值会被设置为 undefined;在代码执行阶段,JavaScript引擎会从变量环境中查找自定义的变量和函数
* 如果在编译阶段,存在两个相同的函数,那么最终存放在变量环境中的是最后定义的那个,这个因为后定义的会覆盖掉之前的定义的。
* JavaScript的执行机制:先编译 再执行