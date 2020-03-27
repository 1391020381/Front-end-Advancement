
* ES模块的设计思想是尽量静态化,这样能保证在编译时就能确定模块之间的依赖关系,每个模块的输入和输出变量也都是这样确定的。
* CommonJS和AMD模块无法保证前置即确定这些内容,只能在运行时确定。
* CommonJS模块输出的是一个值的拷贝 ES模块输出的是值的引用。


```
// data.js
export let data = 'data'
export function modifyData() {
   data = 'modified data'
}

// index.js
import { data, modifyData } from './lib'
console.log(data) // data
modifyData()
console.log(data) // modified data

我们在 index.js 中调用了 modifyData 方法，之后查询 data 值，得到了最新的变化。

```

```


```