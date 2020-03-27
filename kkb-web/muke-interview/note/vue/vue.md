# 常见面试题

1. v-show 和 v-if 的区别
2. 为何 v-for 中要使用 key
3. Vue 组件如何通信
4. Vue 组件生命周期 包括父子组件
5. 描述组件渲染和更新的过程
6. 双向数据绑定 v-model 的原理

# Vue 的基本使用

1. 指令 插值
   - 插值 表达式
   - 指令 动态属性
   - v-html：会有 xss 风险 会覆盖子组件
2. computed 和 watch
   - computed 有缓存 dat 不变则不会重新计算
   - watch 如何深度监听
   - watch 监听引用类型 拿不到 oldVal
3. class 和 style
   - 使用动态属性
   - 使用驼峰式写法
4. 条件渲染

   - v-if v-else 的用法 可以使用变量 也可以使用 === 表达式
   - v-if 和 v-show 的区别
   - v-if 和 v-show 的使用场景 频繁切换使用 v-show 一次性隐藏使用 v-if

5. 循环渲染
   - 如何遍历对象 也可以使用 v-for
   - key 的 重要性 key 不能瞎写 如 random 或者 index
   - v-for 和 v-if 不能一起使用
6. 事件
   - event 参数 自定义参数 event.target 事件在那个元素监听的   event.currentTarget 事件在哪里触发的
   - 事件修饰符 按键修饰符
   - 观察 事件被绑定到哪里

7. 事件修饰符
   <!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div> 

# 表单
   - v-model
   - 常见表单项 textarea checkbox radio  select
   - 修饰符 lazy  number trim

# Vue组件使用
   - props 和  $emit
   - 组件间通讯-自定义事件    vue（new Vue()）实例是提供了 $on $emit $off
   - 组件生命周期 包括父子组件 对照vue官网生命周期与源码 
   - https://cn.vuejs.org/images/lifecycle.png
      - 挂载阶段
      - 更新阶段
      - 销毁阶段

   - index created
   - list created
   - list mounted
   - index mounted


   - list before update
   - list before update
   - list updated
   - index updated   
   * vue 初始化的时候 是从 父组件开始
   * 挂载的时候，是从自组件开始   假设从父组件开始  父组件都不知道 自组件是否挂载
   * 更新和 销毁与 挂载类似

   # Vue 高级特性
   - 自定义 v-model
   - $nextTick
   - slot
   - refs
   - 动态 异步组件
   - keep-alive
   - mixin

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


* $nextTick
   - Vue是异步渲染
   - data 改变之后 dom不会立刻渲染
   - $nextTick 会在 dom渲染之后被触发 以获取最新的 dom节点
   - 页面渲染会将 data的修改的整合 多次 data 修改只会渲染一次
* slot 
   - 基本使用
   - 作用域插槽  让自组件内容 在 父组件可以访问到
   - 具名插槽   name    v-slot:name  替换某个插槽 

# 动态组件
   - :is="component-name"用法  <component :is="component-name"></component>
   - 需要根据数据 动态渲染的场景 即组件类型不确定
# 异步组件
   - import（） 函数  components:{ componentName:()=> import('../component/componentName') }
   - 按需加载 异步加载大组件   
# keep-alive
   - 缓存组件
   - 频繁切换  不需要重复渲染
   - Vue 常见性能优化  
# mixin
   - 多个组件有相同的逻辑 抽离出来  


   - 变量来源不明确 不利于阅读
   - 多个mixin 变量名称冲突
   - mixin和组件可能出现多对多的关系 复杂度较高 

 # Vuex 使用
   - state
   - getters
   - mutation
   - actions 

   - dispatch
   - commit
   - mapState
   - mapActions
   - mapMutations

* Vue Components -> Dispatch Actions(异步操作,整合多个 commit) ->Commit -> Mutations (Devtools) ->Mutate state ->Render Vue Components

# Vue-router使用
   - <router-view />
   - 路由模式 hash（默认） H5 history （需要server端支持）
   - 路由配置 动态路由 懒加载(import加载组件)   params query   $route.params  $route.query
