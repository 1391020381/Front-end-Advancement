const {getAst,getCode,getDependencies} = require('./parser')
const path = require('path')
const fs = require('fs')
module.exports =  class Compiler {
    constructor(options){
        // console.log(options)
        this.entry = options.entry
        this.output = options.output
        this.modules = []
    }
    run(){
       
       let info =  this.build(this.entry)
     let temp =   { fileName: './src/index.js',
       dependencies: { './hello.js': 'src/hello.js' },
       code:`"use strict";\n\nvar _hello = require("./hello.js");\n\ndocument.write('hello' + (0, _hello.say)('webpack'));` }
      // 循环判断 info 中是否有 dependencies 如果有的话 就是有依赖
        this.modules.push(info)  
        for(let i = 0;i<this.modules.length;i++){
            const item = this.modules[i]
            const {dependencies} = item
            if(dependencies){
                for(let j in dependencies){
                    // 依赖会被push到数组的尾部
                    this.modules.push(this.build(dependencies[j]))
                }
            }
        }
        // 转换数据结构
        const obj = {}
        this.modules.forEach(item=>{
            obj[item.fileName] = {
                dependencies:item.dependencies,
                code:item.code
            }
        })
        // console.log('obj:',obj)
        this.file(obj)
    }
    build(fileName){ // ./src/index.js
        let ast = getAst(fileName)
        let dependencies = getDependencies(ast,fileName)
        let code = getCode(ast)
        return {
            fileName,
            dependencies,
            code
        }
    }
    file(code){
       const filePath = path.join(this.output.path,this.output.filename)
       const newCode = JSON.stringify(code)
       // graph 就是 前面的 obj 保存依赖关系的
       // localRequire 处理路径
       const bundle = `
       (function(graph){
            function require(module){
                function localRequire(relativePath){
                    return require(graph[module].dependencies[relativePath])
                }
                var exports = {};
                (function(require,exports,code){
                    eval(code)
                })(localRequire,exports,graph[module].code)
                return exports;
            }
            require('${this.entry}')
       })(${newCode})
       
       `
       fs.writeFileSync(filePath,bundle,'utf-8')

    }
}

// @babel/parser

// traverse(ast,{
//     ImportDeclaration({node}){
//         console.log(node)
//     }
// })
// Node {
//     type: 'ImportDeclaration',
//     start: 0,
//     end: 30,
//     loc:
//      SourceLocation {
//        start: Position { line: 1, column: 0 },
//        end: Position { line: 1, column: 30 } },
//     specifiers:
//      [ Node {
//          type: 'ImportSpecifier',
//          start: 8,
//          end: 11,
//          loc: [SourceLocation],
//          imported: [Node],
//          local: [Node] } ],
//     source:
//      Node {
//        type: 'StringLiteral',
//        start: 18,
//        end: 30,
//        loc: SourceLocation { start: [Position], end: [Position] },
//        extra: { rawValue: './hello.js', raw: "'./hello.js'" },
//        value: './hello.js' } }


// obj

// 后面生成代码中需要自己 处理 require函数 
//  里层的require 是不一样的 需要 处理相对路径 在  dependencies


// { './src/index.js':
// { dependencies: { './hello.js': './src/hello.js' },
//   code:
//    `"use strict";\n\nvar _hello = require("./hello.js");\n\ndocument.write('hello' + (0, _hello.say)('webpack'));` },
// './src/hello.js':
// { dependencies: { './a.js': './src/a.js' },
//   code:
//    '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.say = say;\n\nvar _a = require("./a.js");\n\nfunction say(str) {\n  return str + (0, _a.add)(10 + 8);\n}' },
// './src/a.js':
// { dependencies: {},
//   code:
//    '"use strict";\n\nObject.defineProperty(exports, "__esModule", {\n  value: true\n});\nexports.add = add;\n\nfunction add(a, b) {\n  return a + b;\n}' } }