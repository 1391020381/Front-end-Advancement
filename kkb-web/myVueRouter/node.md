* 总结：

* 引入的时候 需要 Vue.use(VueRouter) VueRouter router 的映射
* 手写router的大致思路：

1. 作为一个插件存在：创建VueRouter类和install方法。kvue-router.js

2. 实现两个全局组件：router-view用于显示匹配组件内容，router-link用于组件之间跳转。krouter-view.js和krouter-link.js

3 监控url变化：使用hashChange或popChange事件。kvue-router.js

4 响应最新url:创建一个响应式的属性current，当它改变时获取对应组件并显示。kvue-router.js