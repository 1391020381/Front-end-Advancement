# 面试为何会考察原理

* 知其然知其所以然———— 各个行业通用道理
* 了解原理 才能应用的更好（竞争激烈 择优录取）
* 大厂造轮子（有钱有资源 业务定制  技术kpi）

# 面试中如何考察 以何种方式
* 考察重点 而不是细节。掌握好2/8原则
* 和使用相关联的原理 例如 vdom 模版渲染
* 整体流程是否全面 热门技术是否有深度

# Vue原理包括哪些
* 组件化和 MVVM
* 响应式原理
* vdom 和 diff算法    v-for中为何使用key
* 模版编译
* 组件渲染过程   组件渲染和更新过程（全面）  v-model原理
* 前端路由

## 组件化基础
* 数据驱动视图
    - 传统组件 只是静态渲染  更新还要依赖于操作dom
    - 数据驱动视图 Vue MVVM
    - 数据驱动视图  React setState

* 通过ViewModel（Vue）  把 View(dom) 和  Model（Plain javascript objects） 关联起来
* View 通过 dom事件绑定 修改 Model
* Model 通过 指令 修改 View 

## Vue 响应式
* 组件data的数据一旦变化,立刻触发视图的更新
* 实现数据驱动视图的第一步
* 考察Vue原理的第一题

* 核心API- Object.defineProperty   Vue3.0  Proxy有兼容问题无法polyfill


*  深层监听（判断对象的value是否是对象,要再次使用 Object.defineProperty,set中也要做类似判断） 
* 监听数组    重新定义数组原型

```
const oldArrayProperty = Array.prototype

const arrProto = Object.create(oldArrayProperty)

arrProro.push = function (){  console.log(100)}



// 但是不会影响 arrProto.__proto__.push

['push','pop','shift','unshift'].forEach(methodName=>{
    arrProto[methodName] = function () {
        updateView（）
        oldArrayProperty[methodName].call(this,...arguments)
    }
})
// 在 使用 Object.defineProperty 时 发现是数组就 改变其原型
// 如果直接 覆盖 Array.prototype 会污染全局的api
```


* 深度监听,需要递归到底,一次性计算量大 
* 无法监听新增属性/删除属性  Vue.set  Vue.delete 
* 数组无法兼容需要 hack


# Virtual dom 和 diff
* vdom是实现 vue 和 react的重要基石
* diff 算法是vdom中核心  最关键的部分
* vdom是一个热门话题,也是面试中的热门问题

* dom操作非常耗费性能
* vue react是数据驱动视图 如何有效控制 dom操作

* 有了一定复杂度 想减少计算次数比较难
* 把计算转移到 js 因为js执行速度很快
* vdom 用js模拟dom结构 计算出最小的变更 操作dom

* 树 diff的时间复杂度 o（n*n*n） 遍历tree1 遍历tree2  排序 不可用 



## 优化时间复杂度到 o(n)
* 只比较同一层级,不跨级比较
* tag 不相同 则直接删除重建 不再深度比较
* tag 和 key 两者都相同 则认为 是相同节点 不再深度比较 

* diff 算法总结
    - patchVnode
    - addVnodes removeVnodes
    - updateChildren (key的重要性)


 * vdom 核心概念  h  vnode patch diff key等 
 * vdom 跨平台  数据驱动

 # 模版编译  
 * with语法
    - 改变 {} 内自由变量的查找规则 当做 obj属性来查找
    - 如果找不到匹配的 obj属性 就会报错
    - width 要慎用,它打破的作用域规则

  * 模版编译为 render函数  执行render函数 返回 vnode  vm.render(vm,vm.$createElement)
  * 基于 vnode 再执行patch 和diff   
  * 使用 webpack vue-loader 会在开发环境编译模版 （重要）

# 组件渲染/更新过程
* 响应式:监听data 属性 getter setter （保留数组 ,新增和删除属性）
* 模版编译：模版 render函数 再到vnode
* vdom:patch(elem,vnode) 和 patch（vnode,newVnode）

* [vue-lifecycle](https://cn.vuejs.org/images/lifecycle.png)
* [vue-响应式原理](https://cn.vuejs.org/images/data.png)
* 初步渲染过程
    - 解析模版为 render函数  （或在开发环境已完成 vue-loader）
    - 触发响应式 监听 data 属性 getter setter
    - 执行 render 函数 生成 vnode（会触发 getter） patch（elem,vnode）
* 更新过程
    - 修改data,触发setter （此前在 getter中已被监听）
    - 重写执行render函数 生成 newVnode
    - patch（vnode,newVnode）
* 异步渲染
    - $nextTick
    - 汇总data的修改 一次性 更新视图
    - 减少dom操作 提高性能

# 前端路由原理
* vue-router路由模式
* hash
    - hash变化触发页面跳转 即浏览器的前进 后退
    - hash变化不会刷新页面 SPA必须的特点
    - hash永远不会提交到server端
* h5 history    
    - 用url规范的路由 但跳转时不刷新页面
    - history.pushState
    - window.onpopstate 监听浏览器前进 后退