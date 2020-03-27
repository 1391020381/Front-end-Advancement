* 本文介绍DOM树是怎么生成的。
* 基于DOM树的解析流程介绍两块内容:
- * 第一个是在解析过程中遇到javascript脚本,DOM解析器时如何处理的?
- * 第二个是DOM解析器时如何处理跨站点资源的


# 什么是DOM
* 从网络传给渲染引擎的HTML文件字节流试无法直接被渲染引擎理解的,所以要将其转化为渲染引擎能够理解的内部结构,这个结构就是DOM。
* DOM提供了对HTML文档结构化的表述。在渲染引擎中,DOM有三个层面的作用。
- * 从页面的视角来看,DOM是生成页面的基础数据结构。
- * 从JavaScript脚本视角来看,DOM提供给JavaScript脚本操作的接口,通过这套接口,JavaScript可以对DOM结构进行访问,从而改变文档的结构,样式和内容。
- * 从安全视角来看,DOM是一道安全防护线,一些不安全的内容在DOM解析阶段就被拒之门外了。

* `DOM是表述HTML的内部数据结构,它会将Web页面和JavaScript脚本连接起来,并过滤一些不安全的内容。`


# DOM树如何生成
* 在渲染引擎内部,有一个叫`HTML解析器(HTMLParser)`的模块,它的职责就是负责将HTML字节流转换为DOM结构。

## HTML解析器
* `HTML解析器并不是等整个文档加载完成之后再解析的,而是网络进程加载了多少数据,HTML解析器便解析多少数据。`

* 网络进程接收到响应头之后,会根据请求头中的content-type字段来判断文件的类型,比如content-type的值是 text/html,那么浏览器就会判断这是一个HTML类型的文件,然后为该请求选择或者创建一个渲染进程。渲染进程准备好了之后,`网络进程和渲染进程之间会建立一个共享数据的管道,` 网络进程接收到数据后就往这个管道里面放,而渲染进程则从管道的另外一端不断地读取数据,并同时将读取的数据'喂' HTML解析器。你可以把这个管道想象成一个'水管',网络进程接收到字节流像水一样倒进这个'水管',而'水管'的另外一端是渲染进程的HTML解析器,它会动态接收字节流,并将其解析为DOM。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%AD%97%E8%8A%82%E6%B5%81%E8%BD%AC%E6%8D%A2%E4%B8%BA%20DOM.png)

* 字节流转换为DOM需要三个阶段。
1. 第一个阶段,通过分词器将字节流转换为Token

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E7%94%9F%E6%88%90%E7%9A%84%20Token%20%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* `至于后续的第二个和第三个阶段是同步进行的,需要将Token解析为DOM节点,并将DOM节点添加到DOM树中。`

* HTML解析器维护了一个Token栈结构,该Token栈主要用来计算节点之间的父子关系,在第一个阶段中生成的Token会被按照顺序压到这个栈中。具体的处理规则如下：
- * 如果压入到栈中的是StartTag Token,HTML解析器会为该Token创建一个Dom节点,然后将该节点加入到DOM树中,它的父节点就是栈中相邻的那个元素生成的节点。
- * 如果分词器解析出来的是文本Token,那么会生成一个文本节点,然后将节点加入到DOM树中,文本Token是不需要压入到栈中,它的父节点就是当前栈顶Token所以对应的DOM节点。
- * 如果分词器解析出来的是EndTag标签,比如EndTag div  HTML解析器会查看Token栈顶的元素是否StartTag div 如果是, 就将StartTag div 从栈中弹出,表示该div元素解析完毕。
```
<html>
<body>
    <div>1</div>
    <div>test</div>
</body>
</html>



```

* 上面代码以字节流的形式传给HTML解析器,经过分词器处理,解析出来的第一个Token是StartTag html ，解析出来的Token会被压入到栈中,并同时创建一个html的DOM节点,将其加入到DOM树中。

* `HTML解析器开始工作时,会默认创建了一个根为document的空DOM结构`,同时会将一个StartTag document的Token压入栈底。然后经过分词解析器解析出来的第一个StartTag html Token 会被压入到栈中,并创建一个html的DOM节点,添加到document上

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%A7%A3%E6%9E%90%E5%88%B0%20StartTag%20html%20%E6%97%B6%E7%9A%84%E7%8A%B6%E6%80%81.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%A7%A3%E6%9E%90%E5%88%B0%20StartTag%20div%20%E6%97%B6%E7%9A%84%E7%8A%B6%E6%80%81.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%A7%A3%E6%9E%90%E5%87%BA%E7%AC%AC%E4%B8%80%E4%B8%AA%E6%96%87%E6%9C%AC%20Token%20%E6%97%B6%E7%9A%84%E7%8A%B6%E6%80%81.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%85%83%E7%B4%A0%E5%BC%B9%E5%87%BA%20Token%20%E6%A0%88%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%9C%80%E7%BB%88%E8%A7%A3%E6%9E%90%E7%BB%93%E6%9E%9C.png)

* 实际生成环境中,HTML原文件中包含css js 图片  音频  视频。会比这个复杂

# javascript是如何影响DOM生成的


![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%89%A7%E8%A1%8C%E8%84%9A%E6%9C%AC%E6%97%B6%20DOM%20%E7%9A%84%E7%8A%B6%E6%80%81.png)

```

<html>
<body>
    <div>1</div>
    <script>
    let div1 = document.getElementsByTagName('div')[0]
    div1.innerText = 'time.geekbang'
    </script>
    <div>test</div>
</body>
</html>


```

* <script> 标签之前,所有的解析流程还是和之前介绍的一样。
* 但是解析到<script> 标签时,渲染引擎判断这是一段脚本,此时HTML解析器就会暂停DOM的解析,因为接下来的javascript可能要修改当前已经生成的DOM结构。

* 脚本修改了DOM中第一个div中的内容,所以执行这段脚本之后,div节点内容已经修改未 time.geekbang。脚本执行完成之后,hmtl解析器恢复解析过程。继续解析后续内容,直至生成最终的dom

* 当把内嵌javascript脚本修改成了通过javascript文件加载。其整个执行流程还是一样的。区别就是需要先下载这段javascript代码。
* 这里需要重点关注下载环境,因为`JavaScript文件的下载过程会阻塞DOM解析`,而通常下载又是非常耗时的,会受到网络环境, javascript文件大小等因素的影响。

* Chrom浏览器做了一些优化,其中一个主要的优化是`预解析操作`。 当渲染引擎受到字节流之后,会开启一个预解析线程,用于分析html文件中包含的javascript css 等相关文件,解析到相关文件之后,预解析线程会提前下载这些文件。

* 引入JavaScript线程会阻塞DOM，不过也有一些相关的策略来规避,比如使用CDN来加速javascript文件的加载,压缩JavaScript文件的体积。另外,如果JavaScript文件中没有操作dom相关代码,就可以将该javascript脚本设置为异步加载,通过async 或defer 来标记代码。
* async 和 defer 虽然都是异步的,不过还有一些差异,
- * `使用 async 标志的脚本文件一旦加载完成,会立即执行` 
- *  `而使用了defer标记的脚本文件,需要等到DOMContentLoaded事件之后执行。`


```
//theme.css
div {color:blue}

<html>
    <head>
        <style src='theme.css'></style>
    </head>
<body>
    <div>1</div>
    <script>
            let div1 = document.getElementsByTagName('div')[0]
            div1.innerText = 'time.geekbang' // 需要 DOM
            div1.style.color = 'red'  // 需要 CSSOM
        </script>
    <div>test</div>
</body>
</html>


```
* js中出现 div1.style.color = 'red' 它是用来操作CSSOM的,所以在执行js之前,需要先解析js语句之上所有的CSS样式。
* `所以如果代码里引用了外部的CSS那么执行js之前,还需要等待外部的css文件下载完成,并解析生成CSSOM对象之后,才能执行js脚本。`
* js引擎在解析js之前,是不知道js是否操作了CSSOM的,所以渲染引擎在遇到js脚本时,不管该脚本是否操作了CSSOM,都会执行CSSwenj 下载,解析操作,再执行js脚本。

* `js会阻塞DOM生成,样式文件又会阻塞javascript的执行,所以实际的工作中需要重点关注js文件和样式表文件,使用不当会影响到页面性能的。`


* 额外说明一下，渲染引擎还有一个安全检查模块叫 `XSSAuditor`，是用来检测词法安全的。在分词器解析出来 Token 之后，它会检测这些模块是否安全，比如是否引用了外部脚本，是否符合 CSP 规范，是否存在跨站点请求等。如果出现不符合规范的内容，XSSAuditor 会对该脚本或者下载任务进行拦截。详细内容我们会在后面的安全模块介绍，这里就不赘述了。