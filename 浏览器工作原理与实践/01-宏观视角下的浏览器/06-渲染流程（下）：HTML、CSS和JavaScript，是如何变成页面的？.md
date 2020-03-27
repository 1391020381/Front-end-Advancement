* 上一节主要内容:
- 1. 在HTML页面内容被提交给渲染引擎
- 2. 渲染引擎首先将HTML解析为浏览器可以理解的DOM
- 3. 根据CSS样式表,计算出DOM树所有节点的样式
- 4. 接着又计算每个元素的几何坐标位置,并将这些信息保存在布局树中

# 分层
* 因为页面中有很复杂的效果,如一些复杂的3D变换 页面滚动 或者使用z-indexing做z轴排序等,为了更加方便的实现这些效果,`渲染引擎还需要为特定的节点生成专用的图层,并生成一颗树对应的图层树(LayerTree)`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%B8%83%E5%B1%80%E6%A0%91%E5%92%8C%E5%9B%BE%E5%B1%82%E6%A0%91%E5%85%B3%E7%B3%BB%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* 通常情况下,并不是布局树的每个节点都包含一个图层,如果一个节点没有对应的层,那么这个节点就从属于父节点的图层。

* 通常满足以下两点中任意一点的元素就可以被提升为单独的一个图层。
- 1. 有用层叠上下文属性的元素被提升为单独的一层
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%B1%82%E5%8F%A0%E4%B8%8A%E4%B8%8B%E6%96%87%E7%A4%BA%E6%84%8F%E5%9B%BE.png)
- 2. 需要剪裁(clip) 的地方也会被创建为图层

```

<style>
      div {
            width: 200;
            height: 200;
            overflow:auto;
            background: gray;
        } 
</style>
<body>
    <div >
        <p> 所以元素有了层叠上下文的属性或者需要被剪裁，那么就会被提升成为单独一层，你可以参看下图：</p>
        <p> 从上图我们可以看到，document 层上有 A 和 B 层，而 B 层之上又有两个图层。这些图层组织在一起也是一颗树状结构。</p>
        <p> 图层树是基于布局树来创建的，为了找出哪些元素需要在哪些层中，渲染引擎会遍历布局树来创建层树（Update LayerTree）。</p> 
    </div>
</body>

```

* 文字移除隐藏了
* 出现这种裁剪的情况的时候,渲染引擎会为文字部分单独创建一个层,如果出现滚动条,滚动条也会被提升为单独的层。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%A2%AB%E8%A3%81%E5%89%AA%E7%9A%84%E5%86%85%E5%AE%B9%E4%BC%9A%E5%87%BA%E7%8E%B0%E5%9C%A8%E5%8D%95%E7%8B%AC%E4%B8%80%E5%B1%82.png)

# 图层绘制
* 渲染引擎实现图层的绘制与之类似,会把一个图层的绘制拆分成很多小的绘制指令,然后再把这些指令按照顺序组成一个待绘制列表。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E7%BB%98%E5%88%B6%E5%88%97%E8%A1%A8.png)

* `图层绘制阶段,输出的内容就是这些待绘制的列表`

# 栅格化 (raster) 操作
* 绘制列表只是用来记录绘制顺序和绘制指令的列表,`而实际上绘制操作是由渲染引擎中的合成线程完成的。`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%B8%B2%E6%9F%93%E8%BF%9B%E7%A8%8B%E4%B8%AD%E7%9A%84%E5%90%88%E6%88%90%E7%BA%BF%E7%A8%8B%E5%92%8C%E4%B8%BB%E7%BA%BF%E7%A8%8B.png)

* `当图层的绘制列表准备好之后,主线程把该绘制列表提交给合成线程`

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%A7%86%E5%8F%A3.png)

* 通常一个页面可能很大,但是用户只能看到其中的一部分,我们把用户可以看到的这个部分叫做视口(viewport)
* 在有些情况下,有的图可以很大,比如有的页面你使用滚动条要滚动好久才能滚动到底部,但是通过视口,用户只能看到页面的很小一部分,所以在这种情况下,要绘制出所有图内容的话,就会产生太大的开销,而且也没有必要。
* `基于这个原因,合成线程会将图层划分为图块(title)` 这些图块的大小通常是256x256或者512x512如下图所示

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%9B%BE%E5%B1%82%E8%A2%AB%E5%88%92%E5%88%86%E4%B8%BA%E5%9B%BE%E5%9D%97%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* 然后合成线程会按照视口附近的图块来优先生成位图,实际生成位图的操作是由栅格化来执行的。`所谓栅格化,是指将图块转换为位图`
* 而图块是栅格化执行的最小单位。渲染进程维护了一个栅格化的线程池,所有的图块栅格化都是在线程池内执行的,运行方式如下图：

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%90%88%E6%88%90%E7%BA%BF%E7%A8%8B%E6%8F%90%E4%BA%A4%E5%9B%BE%E5%9D%97%E7%BB%99%E6%A0%85%E6%A0%BC%E5%8C%96%E7%BA%BF%E7%A8%8B%E6%B1%A0.png)

* 通常,栅格化过程都会使用GPU来加速生成,使用GPU生成位图的过程叫快速栅格化,或者GPU栅格化,生成的位图被保存在GPU内存中。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/GPU%20%E6%A0%85%E6%A0%BC%E5%8C%96.png)

* 渲染进程把生成图块的指令发送给GPU,然后再GPU中执行生成图块的位图,并保存在GPU的内存中。


#合成和显示
* 一旦所有图块都被光栅化,合成线程就会生成一个绘制图块的命令———— 'DrawQuad' 然后将该命令提交给浏览器进程。
* 浏览器进程里面有一个叫viz的组件,用来接收合成线程发过来的DrawQuad命令,然后根据DrawQuad命令,将其页面内容绘制到内存中,最后再将内存显示在屏幕上。
# 渲染流水线总结
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%AE%8C%E6%95%B4%E7%9A%84%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4%E7%BA%BF%E7%A4%BA%E6%84%8F%E5%9B%BE.png)
* 一个完整的渲染流程大致可以总结为如下：
- 1. 渲染进程将HTML内容转换为能够读懂的`DOM树`结构
- 2. 渲染引擎将CSS样式转化为浏览器可以理解的`styleSheets`,计算出DOM节点的样式
- 3. 创建`布局树`,并计算元素的布局信息
- 4. 对布局树进行分层,并生成`分层树`
- 5. 为每个图层生成`绘制列表`,并将其提交到合成线程
- 6. 合成线程将图层分层图块,并在`光栅化线程池`中将图块转换成位图
- 7. 合成线程发送绘制图块命令`DrawQuad`给浏览器进程
- 8. 浏览器进程根据DrawQuad消息`生成页面`,并显示到显示器上。

# 相关概念
1. 更新了元素的几何属性(重排)
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%9B%B4%E6%96%B0%E5%85%83%E7%B4%A0%E7%9A%84%E5%87%A0%E4%BD%95%E5%B1%9E%E6%80%A7.png)

* 通过javascript或者css修改元素的几何位置属性,例如改变元素的宽度 高度 等,那么浏览器会触发重新布局,解析之后的一系列子阶段,这个过程叫`重排`。无疑,`重排需要更新完整的渲染流水线,所以开销也是最大的`

2. 更新元素的绘制属性(重绘)
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%9B%B4%E6%96%B0%E5%85%83%E7%B4%A0%E8%83%8C%E6%99%AF.png)

* 如果修改了元素的背景颜色,布局阶段将不会被执行,因为并没有引起集合位置的变换,所以就直接进入了绘制阶段,然后执行之后的一系列子阶段,这个过程叫 重绘。相交于重排,重绘省去了布局和分层的阶段,那么执行效率会比重排操作要高些。
3. 直接合成阶段
* 更改一个既不要布局有不要绘制的属性,渲染引擎将跳过布局和绘制,只执行后续的合成操作,我们把这个过程叫做合成。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E9%81%BF%E5%BC%80%E9%87%8D%E6%8E%92%E5%92%8C%E9%87%8D%E7%BB%98.png)

* 使用了CSS的transform来实现动画效果,这可以避开重排和重绘阶段,直接在非主线程上执行合成动画操作。因为是在非主线程上合成,并没有占用主线程的资源,另外也避开了布局和绘制两个子阶段,所以相对于重绘和重排,合成能大大提升绘制效率。