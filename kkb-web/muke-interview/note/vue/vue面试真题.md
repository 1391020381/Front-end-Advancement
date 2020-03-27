# v-show 和 v-if 的区别
* v-show通过 css display 控制显示和隐藏
* v-if组件真正的渲染和销毁 而不是显示和隐藏
* 频繁切换状态用  v-show 否则用 v-if

# 为何在 v-for 中 用key

* 必须用key 且 不能是 index和 random
* diff算法中通过 tag和 key来判断 是否是 sameNode
* 减少渲染次数 提高渲染性能

# 描述 Vue组件生命周期（父子组件）


# Vue组件如何通讯（常见）
* 父子组件 props 和 $emit
* 自定义事件 event.$on event.$off  event.$emit
* vuex

# 描述组件渲染和更新的过程
* [vue-lifecycle](https://cn.vuejs.org/images/lifecycle.png)
* [vue-响应式原理](https://cn.vuejs.org/images/data.png)

# 双向数据绑定 v-model的实现原理
* input 元素的 value = this.name
* 绑定 input事件 this.name = $event.target.value
* data更新触发 re-render

# 对 MVVM的理解
* [mvvm](https://user-images.githubusercontent.com/9583120/32172846-0a520f48-bd4b-11e7-9e2b-1ebdcb293387.jpeg)

# computed有何特点
* 缓存 data不变 不会重写计算
* 提高性能

# 为何组件 data必须是一个函数
* .vue函数 是一个类 每次使用都是对 类的实例化。使用函数防止 多个地方共用一个data数据

# ajax应该放在哪个生命周期里执行
* mounted
* js是单线程 ajax异步获取数据
* 放在 mounted之前没有用 只会让逻辑更加不清晰

# 如何将组件所有 props传递给子组件
* $props
* <User v-bind=“$props”>

# 如何自己定义 v-model

```
   <!-- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value attribute 用于不同的目的。
   
   model 选项可以用来避免这样的冲突: 
   
   input 使用 :value 而不是 v-model 且 绑定的值 与 model.props 和 props checked 保持一致

   change 与 model.event 对应起来
   
   -->

   Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      v-bind:checked="checked"
      v-on:change="$emit('change', $event.target.checked)"
    >
  `
})

<base-checkbox v-model="lovingVue"></base-checkbox>


<!-- 这里的 lovingVue 的值将会传入这个名为   checked 的 prop。
同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新 -->

```



# 多个组件有相同的逻辑 如何抽离
* mixin
* 以及 mixin的一些缺点

# 何时使用异步组件
* 加载大组件
* 路由异步加载
# 何时需要使用keep-alive
* 缓存组件 不需要重复渲染
* 如多个静态 tab也的切换
* 优化性能

# 何时需要使用 beforeDestory
* 解绑自定义事件 event.$off
* 清除定时器
* 解绑自定义的 dom事件 如 window.scroll等

# 作用于插槽

```
<template>
  <a :href="url">
      <slot :slotData="website">
          {{website.subTitle}}
      </slot>
  </a>
</template>

<script>
export default {
  name: '',
  components: {},
  props: ['url'],
  data () {
    return {
      website: {
        url: 'http://wangEditor.com/',
        title: 'wangEditor',
        subTitle: '轻量级富文本编辑器'
      }
    }
  },
  created () {},
  mounted () {},
  activited () {},
  methods: {

  },
  filter: {},
  computed: {},
  watch: {}
}
</script>


```


```
<template>
  <div>
      <ScopedSlotDemo :url="website.url">
          <template v-slot="slotProps">
              {{slotProps.slotData.title}}
          </template>
      </ScopedSlotDemo>
  </div>
</template>

<script>


```

# Vuex 中 action 和 mutation区别
*  action 中处理异步 mutation不可以
* mutation 做原子操作
* action 可以整合 多个 mutation

# Vue-router常用的路由模式
* hash默认
* h5 history 需要服务端支持

# 如何配置 Vue-router 异步加载
* import 导入组件

# 请用vnode 描述一个dom结构
* tag props  children

# 监听 data 变化的核心 api
* Object.defineProperty
* 深度监听 监听数组
* 缺点 不能监听数组需要 hack  新增删除 Vue.set Vue.delete

# Vue如何监听数组变化
* Object.defineProperty不能 监听数组变化
* 重写定义原型  重写 push  pop等方法 实现监听
* Proxy 可以原生支持 数组变化

# 请描述响应式原理
* 监听data 变化
* 组件渲染 和更新的流程
# diff算法的时间复杂度
* o(n)
* 做了哪些优化
# 简述 diff算法过程
* patch(elem,vnode) 和 patch（vnode，newVode）
* patchVnode 和 addVodes  removeVondes
* updateChildren （key的重要性)

# vue 为何 是异步渲染   $nextTick何用
* 异步渲染 以及合并 data 修改  以及提高 渲染性能
* $nextTick 在 dom更新完之后 触发回调

# Vue常见性能优化
* 合理使用 v-show v-if
* 合理使用 computed
* v-for时 加 key  以及避免 和 v-if 同时使用
* 自定义事件 dom事件 及时销毁
* 合理使用异步组件
* 合理使用 keep-alive
* data层级不要太深
* 使用 vue-loader在开发环境进行编译
* webpack层面优化
* 前端通用性能优化
* 使用ssr