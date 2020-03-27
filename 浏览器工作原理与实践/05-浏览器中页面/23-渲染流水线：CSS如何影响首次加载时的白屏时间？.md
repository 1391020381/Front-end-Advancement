
 * 本文站在渲染流水线的视角来介绍CSS是如何工作的,然后通过CSS的工作流程来分析性能瓶颈,最后再来讨论如何减少首次加载时的白屏时间。

 # 渲染流水线视角下的CSS

 ```
//theme.css
div{ 
    color : coral;
    background-color:black
}

<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
</body>
</html>


 ```

 ![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%90%AB%E6%9C%89%20CSS%20%E7%9A%84%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4%E7%BA%BF.png)


 * 首先是发起主页页面的请求,这个发起请求方可能是渲染进程,也可能是浏览器进程,发起的请求被送到网络进程中去执行。网络进程接收到返回的HTML数据之后,将其发送给渲染进程,渲染进程会解析HTML数据并构建DOM。这里需要特别注意下,`请求HTML数据和构建DOM中间有一段空闲时间,这个空闲时间有可能成为页面渲染的瓶颈。`


 * 前面提到过,当渲染进程接收到HTML文件字节流时,会开启一个`预解析线程`,如果遇到js或者css文件,那么预解析线程会提前下载这些数据。这里就是theme.css文件。这里也有一个空闲时间需要注意`就是在DOM构建结束之后,theme.css文件还未下载完成的这段时间内,渲染流水线无事可做,因为下一步是合成布局树,而合成布局树需要CSSOM和DOM,所以这里需要等待CSS加载结束并解析完成CSSOM`

 # 按渲染流水线为什么需要CSSOM呢？
 * CSS文件内容需要将其解析成渲染引擎能够理解的结构,CSSOM。
 - * 第一个是提供给js操作样式表的能力
 - * 第二个是未布局树合成提供基础的样式信息。


 * CSSOM体现在DOM中就是 document.styleSheets

 * 等DOM和CSSOM都构建好之后,渲染引擎就会构造布局树。布局树的结构基本就是复制DOM树的结构,不同之处在于DOM树中那些不需要显示的元素会被过滤掉,如display:none属性元素, head标签 script标签等。复制好基本的布局结构之后,渲染引擎会为对应的DOM元素选择对应的样式信息,这个过程就是`样式计算`。样式计算完成之后,渲染引擎还需要计算布局树中每个元素对应的几何位置,这个过程就是`计算布局` 通过样式计算和计算布局就完成了最终布局树的构建。再之后,就是后续绘制操作了。

 ```

//theme.css
div{ 
    color : coral;
    background-color:black
}

<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script>
        console.log('time.geekbang.org')
    </script>
    <div>geekbang com</div>
</body>
</html>




 ```

 ![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%90%AB%E6%9C%89%20JavaScript%20%E5%92%8C%20CSS%20%E7%9A%84%E9%A1%B5%E9%9D%A2%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4.png)

 * 在执行js脚本前,如果页面中包含了外部CSS文件的引用,或者通过style标签内置了css内容,那么渲染引擎还需要将这些内容转换为CSSOM，因为js有修改CSSOM的能力,所以在执行js之前,还需要依赖CSSOM。也就是说CSS在部分情况下也会阻塞DOM的生成。


 ```

//theme.css
div{ 
    color : coral;
    background-color:black
}

<html>
<head>
    <link href="theme.css" rel="stylesheet">
</head>
<body>
    <div>geekbang com</div>
    <script src='foo.js'></script>
    <div>geekbang com</div>
</body>
</html>



 ```
 ![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%90%AB%E6%9C%89%20JavaScript%20%E6%96%87%E4%BB%B6%E5%92%8C%20CSS%20%E6%96%87%E4%BB%B6%E9%A1%B5%E9%9D%A2%E7%9A%84%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4%E7%BA%BF.png)

* 在接收到HTML数据之后的预解析过程中,HTML预解析器识别出来了有css文件和js文件需要下载,然后就同时发起这个两个文件的下载请求,需要注意的是,这两个文件的`下载过程是重叠的`,所以下载时间按照最久的那个文件来计算。
* 后面的流水线就和前面是一样的了,`不管CSS文件和js文件谁先到达,都要先等css文件下载完成并生成CSSOM`，然后再执行js脚本,最后再继续构建DOM,构建布局树,绘制页面。


# 影响页面展示的因素以及优化策略

* `渲染流水线影响到了首次页面展示的速度,而首次页面展示的速度又直接影响到了用户体验。`


* 从发起URL请求开始,到首次显示页面的内容,在视觉上经历的三个阶段。
- * 第一个阶段,等请求发出去之后,到提交数据阶段,这时页面展示出来的还是之前的页面的内容。 关于提交数据可以参考 04节
- * 第二个阶段,提交数据之后渲染进程创建了一个空白页面,我们通常把这段时间称为'解析白屏',并等待CSS文件和js文件的加载完成,生成CSSOM和DOM,然后合成布局树,最后还要经过一系列的步骤准备首次渲染。
- * 第三阶段,等首次渲染完成之后,就开始进入完整的页面的生成阶段了,然后页面会一点点被绘制出来。


* 第一阶段的因素主要是网络或者服务器处理这块儿  参考 21节


* 第二阶段,主要问题是白屏时间,如果白屏时间过久,就会影响到用户体验。为了缩短白屏时间,需要分析这个阶段的主要任务: 解析HTML 下载css 下载js 生成cssom  执行js 绘制页面一系列操作。


* 通常情况下的瓶颈主要体现在 下载CSS文件  下载javascript 文件 和执行JavaScript

* 要想缩短白屏时长,可以有以下策略:
- * 通过内联JavaScript 内联CSS来 移除这两种类型的文件下载,这样获取到HTML文件之后就可以直接开始渲染流程了
- * 但并不是所有的场合都适合内联,那么还可以尽量减少文件大小,比如通过webpack等工具移除一些不必要的注释,并压缩JavaScript文件。
- * 还可以将一些不需要再解析HTML阶段使用的javascript标记上 async或者defer
- * 对于大的文件CSS文件,可以通过媒体查询属性,将其拆分为多个不同用途的CSS文件,这样只有在特定的场景下才会加载特定的CSS文件。




```

<script src="foo.js" type="text/javascript"></script>
<script defer src="foo.js" type="text/javascript"></script>
<script sync src="foo.js" type="text/javascript"></script>
<link rel="stylesheet" type="text/css" href="foo.css" />
<link rel="stylesheet" type="text/css" href="foo.css" media="screen"/>
<link rel="stylesheet" type="text/css" href="foo.css" media="print" />
<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:landscape" />
<link rel="stylesheet" type="text/css" href="foo.css" media="orientation:portrait" />



```
