* javascript语言的作用域是由`词法作用域`决定的,而`词法作用域是由代码结构来决定的`
* `在对象内部的方法中使用对象内部的属性时一个非常普遍的需求。` 但是javascript的作用域机制并不支持这一点,基于这个需求,javascript又搞出来另一套 this机制

# javascript中的this是什么
* 执行上下文包括: 变量环境 词法环境 外部环境  但是其实还有一个 this

* 执行上文主要分为 三种 全局执行上下文  函数执行上下文  eval执行上下文。
* 因此 this 也只有这三种 ——————全局执行上下文的this  函数中的this 和eval中的this

# 全局执行上下文中的 this
* 全局执行上下文中的this 是指向window对象的。这也是this和作用域的唯一交点,作用域链的最底端包含了window对象,全局执行上下文的this也是指向window对象。

# 函数执行上下文的this
- 1. 通过函数的call方法设置 bind apply
- 2. 通过对象调用方法设置  `使用对象来调用其内部的一个方法,该方法的this是指向对象本身的`
- 3. 通过构造函数设置

# this的设计缺陷以及应对方案
1. 嵌套函数中的this不会从外层函数中继承

```
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    function bar(){console.log(this)}
    bar()
  }
}
myObj.showThis()


```
* 函数bar中的this指向的是全局window对象,而函数showThis中的this指向的是myObj对象

* 可以在 showThis函数中声明一个变量 self 用来保存 this,然后在 bar函数中使用self

```
var myObj = {
  name : " 极客时间 ", 
  showThis: function(){
    console.log(this)
    var self = this
    function bar(){
      self.name = " 极客邦 "
    }
     var bar = ()=>{
        this.name = '极客帮'
        console.log(this)
    } 
    bar()
  }
}
myObj.showThis()
console.log(myObj.name)
console.log(window.name)


```
* ES6中的箭头函数并不会创建其自身的执行上下文,所以箭头函数中的this取决于它的外部函数
* `解决嵌套函数不会从调用它的函数中继承this的问题` 1. 可以使用self变量保存  2. 箭头函数
2. 普通函数中的this默认执向全局对象 window
* 可以通过 javascript的 `严格模式`来解决

# 总结
1. 当函数作为对象的方法调用时,函数中的this就是该对象
2. 当函数被正常调用时,在严格模式下,this值是undefined 非严格模式下 this执向的是全局对象window
3. 嵌套函数中的this不会继承外层函数的this值。
4. 箭头函数,因为箭头函数没有自己的执行上下文,所以箭头函数的this就是它外层函数的this