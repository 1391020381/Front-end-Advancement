* 介绍的V8执行机制,能帮助你从底层了解JavaScript,也能帮助你深入理解语言转换器Babel 语法检查工具ESLint 前端框架Vue 和React的一些底实现机制。因此,了解V8的编译流程能让你对语言以及相关工具有更加充分的认识。

* 需要关注的点 编译器(Compiler) 解释器(Interpreter) 抽象语法树(AST) 字节码(Bytecode)  即时编译(JIT)

# 编译器和解释器
* 之所以存在编译器和解释器,是因为机器不能直接理解我们所写的代码,所以在执行程序之前,需要将我们所写的代码'翻译'成机器能读懂的机器语言。按语言的执行流程,可以把语言划分为编译型语言和解释型语言

* 编译型语言在程序执行之前,需要经过编译器的编译过程,并且编译之后会直接保留机器能读懂的二进制文件,这样每次运行程序时,都可以直接运行该二进制文件,而不需要再次重新编译了。
* 而解释型语言编写的程序,在每次运行时都需要通过解释器对程序进行动态解析和执行。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E7%BC%96%E8%AF%91%E5%99%A8%E5%92%8C%E8%A7%A3%E9%87%8A%E5%99%A8%E2%80%9C%E7%BF%BB%E8%AF%91%E2%80%9D%E4%BB%A3%E7%A0%81.png)

# V8是如何执行一段javascript代码的

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/V8%20%E6%89%A7%E8%A1%8C%E4%B8%80%E6%AE%B5%E4%BB%A3%E7%A0%81%E6%B5%81%E7%A8%8B%E5%9B%BE.png)

* V8中有解释器(Ignition) 编译器(TurboFan) 

## 生成抽象语法树(AST) 和执行上下文
* 将源代码转换成抽象语法树,并生成执行上下文(主要是代码在执行过程中的环境信息)
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%8A%BD%E8%B1%A1%E8%AF%AD%E6%B3%95%E6%A0%91%EF%BC%88AST%EF%BC%89%E7%BB%93%E6%9E%84.png)

- * 第一阶段是分词(tokenize) 又称为词法分析,其作用是将一行行的源码拆解成一个个token。所以token,指的是语法上不能再分的 最小的单个字符或字符串。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%88%86%E8%A7%A3%20token%20%E7%A4%BA%E6%84%8F%E5%9B%BE.png)
- * 第二阶段是解析(parse) 又称为语法分析,其作用是将上一步生成的token数据,根据语法规则转为AST。如果源码符合语法规则,这一步就会顺利完成。但如果源码存在语法错误,这一步就会终止,并抛出一个 语法错误


## 生成字节码

* 解释器Ignition 根据AST生成字节码,并解释执行字节码

* 一开始V8并没有字节码,是由于在手机上,V8需要消耗大量的内存来存放转换后的机器码。为了解决内存占用问题,引入了字节码

* `字节码就是介于AST和机器码之间的一种代码。但是与特定类型的机器码无关,字节码需要通过解释器将其转换为机器码后才能执行`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%AD%97%E8%8A%82%E7%A0%81%E5%92%8C%E6%9C%BA%E5%99%A8%E7%A0%81%E5%8D%A0%E7%94%A8%E7%A9%BA%E9%97%B4%E5%AF%B9%E6%AF%94.png)

* 从图中可以看出,机器码所占用的空间远远超过了字节码,所以使用字节码可以减少系统的内存使用

## 执行代码
* 通常,如果有一段第一次执行的字节码,解释器Ignition会逐条解释执行。在执行字节码的过程中,如果发现有热点代码(HotSpot) 比如一段代码被重复执行多次,这种就称为 `热点代码` 那么后台的编译器TurboFan就会把该段热点的字节码编译为高效的机器码,然后当再次执行这段被优化的代码时,只需要执行编译后的机器码就可以了,以提升代码执行效率。

* 其实字节码配合解释器和编译器时最近一段时间很火的技术,比如java和python的虚拟机也都是基于这种技术实现的,我们把这种技术称为 即时编译的(JTI)。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%8D%B3%E6%97%B6%E7%BC%96%E8%AF%91%EF%BC%88JIT%EF%BC%89%E6%8A%80%E6%9C%AF.png)

# javascript的性能优化

* 对于优化javascript执行效率,把优化的中心聚焦在单次脚本的执行时间和脚本的网络下载上,主要关注一下三点内容:
1. 提升单次脚本的执行速度,避免JavaScript的长任务霸占主线程,这样可以使得页面快速响应交互
2. 避免大的内联脚本,因为咋解析HTML的过程中,解析和编译也会占用主线程
3. 减少JavaScript文件的容量,因为更小的文件会提升下载速度,并且占用更低的内存。

# 总结

* 解释器和编译器的区别
* V8执行js的过程：V8依据JavaScript代码生成AST和执行上下文,再基于AST生成字节码,然后通过解释器执行字节码,通过编译器来优化编译字节码
* 基于字节码和编译器的JIT技术
* 优化js性能需要关注的是 提升单次js执行速度    减少内联js   减少js文件大小