![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/HTML%E3%80%81CSS%20%E5%92%8C%20JavaScript%20%E5%85%B3%E7%B3%BB%E5%9B%BE.png)

* `HTML的内容是由标记和文本组成。` 标记也称为标签,每个标签都有它自己的语意,浏览器会根据标签的语意来正确展示HTML内容。
* 需要改变HTML的字体颜色 大小等信息,就需要用到CSS. `CSS又称为层叠样式表,是由选择器和属性组成。`
* javascript 使用它可以使网页的内容'动'起来。

* 由于渲染机制过于复杂,所以渲染模块在执行过程中会被划分为很多子阶段,输入的HTML经过这些子阶段,最后输出像素。我们把这样的一个处理流程叫做渲染流水线。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%B8%B2%E6%9F%93%E6%B5%81%E6%B0%B4%E7%BA%BF%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* 按照渲染的时间顺序,流水线可分为如下几个阶段：构建DOM树 样式计算  布局阶段 分层 绘制 分块 光栅化和合成。

# 构建DOM树
* `因为浏览器无法直接理解和使用html，所以需要将HTML转换为浏览器能够理解的结构————DOM树`
  
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/DOM%20%E6%A0%91%E6%9E%84%E5%BB%BA%E8%BF%87%E7%A8%8B%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

# 样式计算 (Recalculate Style)
1. 把CSS 转换为浏览器能够理解的结构
* css样式来源主要有三种：
  - 通过link引用的外部css文件
  -  <style>标记内的css
  -  元素的style属性内嵌的css
 
* 当渲染引擎接受到css文本时,会执行一个转换操作,将css文本转换为浏览器可以理解的结构——styleSheets
* styleSheets结构中的数据,并且该结构同时具备查询和修改的功能。
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/styleSheets.png)

2. 转换样式表中的属性值,使其标准化
* css文本中的 2em blue bold不容易被渲染引擎理解,所以需要将所有值转换为渲染引擎容易理解的 标准化的计算值,这个过程就是属性值标准化。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%A0%87%E5%87%86%E5%8C%96%E5%B1%9E%E6%80%A7%E5%80%BC.png)

3. 计算出DOM树中每个节点的具体样式
* `涉及到CSS样式的继承规则和层叠规则`
* css继承 css继承就是每个DOM节点都包含有父节点的样式。

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E8%AE%A1%E7%AE%97%E5%90%8E%20DOM%20%E7%9A%84%E6%A0%B7%E5%BC%8F.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E6%A0%B7%E5%BC%8F%E7%9A%84%E7%BB%A7%E6%89%BF%E8%BF%87%E7%A8%8B%E7%95%8C%E9%9D%A2.png)

![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/DOM%20%E5%85%83%E7%B4%A0%E6%9C%80%E7%BB%88%E8%AE%A1%E7%AE%97%E7%9A%84%E6%A0%B7%E5%BC%8F.png)

# 布局阶段
* 现在有DOM树和DOM树中元素样式
* 现在需要根据这些 计算出DOM树中可见元素的几何位置,我们把计算过程叫做布局
* Chrome在布局阶段需要完成两个任务：创建布局树和布局计算

1. 创建布局树
* DOM树还包含很多不可见的元素,比如head标签,还有使用了 display:none属性的元素。`所以在显示之前,我们还要额外地构建一颗包含可见元素布局树`
![](https://raw.githubusercontent.com/1391020381/Front-end-Advancement/%E6%B5%8F%E8%A7%88%E5%99%A8%E5%B7%A5%E4%BD%9C%E5%8E%9F%E7%90%86%E4%B8%8E%E5%AE%9E%E8%B7%B5/note/img/%E5%B8%83%E5%B1%80%E6%A0%91%E6%9E%84%E9%80%A0%E8%BF%87%E7%A8%8B%E7%A4%BA%E6%84%8F%E5%9B%BE.png)

* 为了构建布局树,浏览器大体上完成了下面的这些工作:
- 遍历DOM树中的所有可见节点,并把这些节点加到布局中
- 而不可见的节点会被布局树忽略掉,如head标签下面的全部内容,再比如 body.p.span 这个元素,因为它的属性包含 dispaly:none 所以这个元素也没有被包进布局树。

2. 布局计算
* 现在我们有了一个课完整的布局树。 接下来就要计算布局树节点的坐标位置了。 `布局的计算过程非常复杂,我们这里先跳过不讲,等到后面文章中我再做详细的介绍`

# 总结
* 本节介绍渲染流程的前三个阶段:DOM生成  样式计算和布局。要点大致总结如下:

- 浏览器不能直接理解HTML数据,所以第一步需要将其转换为浏览器能够理解的DOM树结构
- 生成DOM树后,还需要根据CSS样式表,来计算出DOM树所有节点的样式。
- 最后计算DOM元素的布局信息,使其保存在布局树中。


* `现在每个节点都拥有了自己的样式和布局信息`



# 问答

* `当我在JavaScript中访问了某个元素的样式，那么这时候就需要等待这个样式被下载完成才能继续往下执行，所以在这种情况下，CSS也会阻塞DOM的解析。`
