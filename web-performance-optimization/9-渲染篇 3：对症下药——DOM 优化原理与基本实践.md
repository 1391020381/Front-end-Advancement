* `当我们用js出操作dom时,本质上是js引擎和渲染引擎之间的跨界交流。`
* 重绘不一定导致回流,回流（重排）一定会导致重绘。

* document.createDocument('span')
* dom Fragment对象允许我们像操作真实dom一样出调用各种各样的dom api.