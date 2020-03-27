kvuex总结：

1、实现一个插件：声明Store类，挂载$store

2、$store的具体实现：

创建响应式state，保存mutations、actions和getters。
实现commit根据用户传入的type(即上例中的add)，执行对应mutation
实现dispatch根据用户传入的type(即上例中的add)，执行对应action，同时传递上下文。
实现getters，按照getters定义对state作派生（即getters中属性的改变依赖于state