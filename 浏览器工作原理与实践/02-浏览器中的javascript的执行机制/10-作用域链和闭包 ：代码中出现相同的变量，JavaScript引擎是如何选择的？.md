#  什么是作用域链 什么是闭包

```

function bar() {
    console.log(myName)
}
function foo() {
    var myName = " 极客邦 "
    bar()
}
var myName = " 极客时间 "
foo()



```

# 作用域链
* 其实在每个执行上下文的变量环境中,都包含了一个外部引用,用来指向外部的执行上下文,我们把这个外部引用称为outer。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%B8%A6%E6%9C%89%E5%A4%96%E9%83%A8%E5%BC%95%E7%94%A8%E7%9A%84%E8%B0%83%E7%94%A8%E6%A0%88%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

# 词法作用域
* 词法作用域就是指作用域是由代码中函数声明的位置来决定的,所以词法作用域是静态的作用域,通过它就能够预测代码在执行过程中如何查找标识符。


* 根据词法作用域,foo和bar的上级作用域都是全局作用域,所以如果foo或者bar函数使用了一个它们没有定义的变量,那么它们会到全局作用域去查找。也就是说,`词法作用域是代码阶段就决定好的,和函数是怎么调用的没有关系。` 

# 块级作用域中的变量查找

```

function bar() {
    var myName = " 极客世界 "
    let test1 = 100
    if (1) {
        let myName = "Chrome 浏览器 "
        console.log(test)
    }
}
function foo() {
    var myName = " 极客邦 "
    let test = 2
    {
        let test = 3
        bar()
    }
}
var myName = " 极客时间 "
let myAge = 10
let test = 1
foo()


```
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%9D%97%E7%BA%A7%E4%BD%9C%E7%94%A8%E5%9F%9F%E4%B8%AD%E6%98%AF%E5%A6%82%E4%BD%95%E6%9F%A5%E6%89%BE%E5%8F%98%E9%87%8F%E7%9A%84.png)

# 闭包

```
function foo() {
    var myName = " 极客时间 "
    let test1 = 1
    const test2 = 2
    var innerBar = {
        getName:function(){
            console.log(test1)
            return myName
        },
        setName:function(newName){
            myName = newName
        }
    }
    return innerBar
}
var bar = foo()
bar.setName(" 极客邦 ")
bar.getName()
console.log(bar.getName())


```

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%89%A7%E8%A1%8C%E5%88%B0%20return%20bar%20%E6%97%B6%E5%80%99%E7%9A%84%E8%B0%83%E7%94%A8%E6%A0%88.png)

* `根据词法作用域的规则,内部函数getName和setName总是可以访问它们的外部函数foo中变量。`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E9%97%AD%E5%8C%85%E7%9A%84%E4%BA%A7%E7%94%9F%E8%BF%87%E7%A8%8B.png)

* `在JavaScript中,根据词法作用域的规则,内部函数总是可以访问其外部函数中声明的变量,当通过调用一个外部函数返回一个内部函数后,即使该外部函数已经执行结束了,但是内部函数引用外部函数的变量依然保存在内存中,我们就把这些变量的集合称为闭包`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%89%A7%E8%A1%8C%20bar%20%E6%97%B6%E8%B0%83%E7%94%A8%E6%A0%88%E7%8A%B6%E6%80%81.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7%E4%B8%AD%E7%9A%84%E9%97%AD%E5%8C%85%E5%B1%95%E7%A4%BA.png)

# 闭包是怎么回收的
* 通常,如果引用闭包的函数是一个全局变量,那么闭包会一直存在直到页面关闭;但如果这个闭包以后不再使用的话,就会造成内存泄露。
* 如果引用闭包的函数是个局部变量,等函数销毁后,在下次JavaScript引擎执行垃圾回收时,判断闭包这块内容如果已经不再使用了,那么JavaScript引擎的垃圾回收器就会回收这块内存。


* 所以在使用闭包的时候,尽量注意一个原则:`如果该闭包会一直使用,那么它可以作为全局变量而存在;但如果使用频率不高,而且占用内存又比较大的话,那就尽量让它成为一个全局变量`

# 总结
* 首先,介绍了什么是作用域链,我们把通过作用域查找变量的链条称为作用域链;作用域链是通过词法作用域来确定的,而词法作用域反映了代码的结构。
* 其次,介绍了在块级作用域中是如何通过作用域链来查找变量的。
* 最后,又基于作用域链合词法环境介绍了到底什么是闭包



```

var bar = {
    myName:"time.geekbang.com",
    printName: function () {
        console.log(myName)
    }    
}
function foo() {
    let myName = " 极客时间 "
    return bar.printName
}
let myName = " 极客邦 "
let _printName = foo()
_printName()
bar.printName()




```