* React基本原理
* React组建设计
* React 数据状态管理
* React的状态和未来
* 同构应用中你所忽略的细节
* 从框架和类库,我们该学到什么

* 看其他的博客和文章也是看源码的一部分。
* [learn-vue2-mvvm](https://github.com/wangfupeng1988/learn-vue2-mvvm)
1. 说下使用 jQuery和使用框架的区别
    - 数据和视图的分离 解耦 开放封闭原则
    - 以数据驱动视图 只关心数据变化 DOM操纵被封装
2. 说下对MVVM的理解
    - m model 通过vue的数据绑定来改变 view
    - vm  new vue()
    - view view通过 dom的事件绑定来改变 model
    - 响应式：vue如何监听到data的没个属性的变化
    - 模版引擎：vue的模版如何被解析 指令如何处理
    - 渲染:vue的模版如何被渲染成html 以及渲染过程
3. vue中如何实现响应式
4. vue中如何解析模版
5. vue的整个流程。



* 因为 Array.prototype 上挂载的方法并不能触发 data.course.author 属性值的 setter，`由于这并不属于做赋值操作`，而是 push API 调用操作
* Vue 同样存在这样的问题,它的解决方法是:将数组的常用方法进行重写,进而覆盖掉原生的数组方法,重写之后的数组方法需要能够被拦截

 
 * 我们知道模版编译过程中会读取数据（生成Watcher）,进而触发数据源属性值的getter,因此数据拦截或代理就是在数据监听的 (添加Watcher),同时在setter触发数据变化时（Watcher 通知 触发这个Watcher依赖的方法）,执行依赖对应的相关操作,最终触发模版中依赖的变化。




 * vue工作原理
 * vue响应式原理
 * 依赖收集与追踪
 * 编辑compile


1. 使用 Object.defineProperty 把传入的 data 初始化成 响应式数据
    - dep = new Dep()
    - 在 Dep.target 有值的时候 收集依赖 把 dep.addSub(Dep.target)
    - 在 set 的时候触发 dep.notify();
    - Dep.target 其实就是 在编译模版的时候 即模版生成 vnode的时候,发现模版的语法或者指令 时生成的 Watcher
2. 编译模版 模版生成 虚拟dom 
    - 当发现 模版语法 比如 {{}} 会 new Watcher（）
    - 在 Watcher里面 把  Dep.target = this  然后 this.updater()
    - 在 this.updater 函数就是 获取模版里面值并填充到 vnode中

3. 模版编译完 是 挂在到  # app 下面  



* 经过 1 2 步骤  在页面上依赖的元素 都被 Object.defineProperty 改为  响应式数据。在 编译和收集依赖的过程中, 把每个 依赖的数据 的 渲染watcher 添加到 Dep中  再下次数据改变后 会在set 中 处罚法 渲染watcher的 updater



* 数组 push 行为并没有被拦截。这是因为 Array.prototype 上挂载的方法并不能触发 data.course.author 属性值的 setter，由于这并不属于做赋值操作，而是 push API 调用操作。