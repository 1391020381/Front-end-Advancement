

# 组件的通信

* prop  event slot
* ref 给元素或组件注册引用信息
* $parent / $children  访问父 子实例
* Vue 组件通信之 Bus  // https://cn.vuejs.org/v2/guide/migration.html#dispatch-%E5%92%8C-broadcast-%E6%9B%BF%E6%8D%A2

```
// 将在各处使用该事件中心
// 组件通过它来通信

var eventHub = new Vue()

// 然后在组件里 可以使用 $emit $on $off 分别来分发 监听 取消监听事件

eventHub.$emit('add-todo',{text:this.newTodoText})

eventHub.$on('add-todo',this.addTodo)

// 最好在组件销毁前  清除事件监听
eventHub.$off('add-todo',this.addTodo)

```


* provide / inject
* provide inject  绑定并不是可响应的。 这是刻意为之的。 然而 ,如果你传入了一个可监听的对象,那么其对象的属性还是可响应的



* 派发与广播——自行实现 dispatch 和 broadcast 方法



* Form 组件的核心功能是数据校验  一个Form 中包含了多个 FormItem 当点击提交按钮时,要逐一对每个FormItem内的表单组件校验。
* 而校验是由使用者发起,并通过Form来调用每个FormItem 的验证方法,再将校验结果汇总后,通过Form返回出去。
* 使用者 发起验证 Form 逐一验证 -> FromItem

* 因为要在Form中逐一调用FormItem 的验证方法,而Form和FormItem 是独立的,需要预先将FormItem的每个实例缓存到Form中,这个操作就需要 当FormItem渲染时,将其自身this 作为参数通过 dispatch 派发到Form组件中,然后通过一个数组缓存起来；同理当FormItem销毁时,将其从Form缓存的数组中移除。



* Vue.js的组件渲染顺序时由而外的



* Form 支持 blur change 触发校验事件


# extend mount 应用的场景
* 组件的模版是通过调用接口从服务端获取的,需要动态渲染组件
* 实现类似原生 window.alert() 的提示框组件 它位置是在body 下 而非  <div id="app"> 并不会通过常规的组件自定义标签的形式使用 而是像 js 调用函数的一样使用。


```

import Vue from 'vue';
import Notification from './notification.vue';

const props = {};  // 这里可以传入一些组件的 props 选项

const Instance = new Vue({
  render (h) {
    return h(Notification, {
      props: props
    });
  }
});

const component = Instance.$mount();
document.body.appendChild(component.$el);


```

#  Alert 组件
* alert.vue 组件  notices 保存alert 内容   add  remove 操作里面的数据
* notification.js  暴露一个 方法  先挂在一个 alert 实例到body 上  再向外 提供 add  remove 操作 notices alert 内容
* alert.js 再此封装 notification方法

# Render函数的使用场景
1. 使用相同的 slot 在template 中  Vue.js 不允许 使用相同的slot
2.  在 SSR 环境（服务端渲染），如果不是常规的 template 写法，比如通过 Vue.extend 和 new Vue 构造来生成的组件实例，是编译不过的
3. runtime 版本的Vue.js
4. 这可能是使用 Render 函数最重要的一点。一个 Vue.js 组件，有一部分内容需要从父级传递来显示，如果是文本之类的，直接通过 props 就可以，如果这个内容带有样式或复杂一点的 html 结构，可以使用 v-html 指令来渲染，父级传递的仍然是一个 HTML Element 字符串，不过它仅仅是能解析正常的 html 节点且有 XSS 风险。当需要最大化程度自定义显示内容时，就需要 Render 函数，它可以渲染一个完整的 Vue.js 组件。你可能会说，用 slot 不就好了？的确，slot 的作用就是做内容分发的，但在一些特殊组件中，可能 slot 也不行。比如一个表格组件 Table，它只接收两个 props：列配置 columns 和行数据 data，不过某一列的单元格，不是只将数据显示出来那么简单，可能带有一些复杂的操作，这种场景只用 slot 是不行的，没办法确定是那一列的 slot。这种场景有两种解决方案，其一就是 Render 函数，下一节的实战就是开发这样一个 Table 组件；另一种是用作用域 slot（slot-scope）



# 递归组件与动态组件

* 递归组件就是指组件在模版中调用自己,开启递归组件的必要条件 就是在组件中设置 一个 name 选项


* 总结下来，实现一个递归组件的必要条件是：

  - 要给组件设置 name；
  - 要有一个明确的结束条件


  * 动态组件    component is 