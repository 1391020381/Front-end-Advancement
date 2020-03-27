
```


const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')


```
1. parser 编译源代码为 ast
2. traverse 过滤 ast 中有用部分  例如 ImportDeclaration 模块依赖
3. transformFromAst 把 ast 转换成代码
4. 通过 1 2 3 找到所有依赖