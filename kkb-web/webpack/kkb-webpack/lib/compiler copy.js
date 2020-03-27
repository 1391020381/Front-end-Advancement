const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')
module.exports =  class Compiler {
    constructor(options){
        // console.log(options)
        this.entry = options.entry
        this.output = options.output
    }
    run(){
        this.build(this.entry)
    }
    build(entryFile){ // ./src/index.js
        // console.log('entryFile:',entryFile)
        const content = fs.readFileSync(entryFile,'utf-8')
        const ast = parser.parse(content,{
            sourceType:"module"
        })
        const denpendcies = {}
        traverse(ast,{
            ImportDeclaration({node}){
                // console.log(node)
                // denpendcies.push(node.source.value) 相对路径
                const dirname = path.dirname(entryFile)
                // console.log(dirname)
                const newPath = path.join(dirname,node.source.value)
                // console.log(newPath)
                denpendcies[node.source.value] = newPath
            }
        })
        const {code}  = transformFromAst(ast,null,{
            presets:["@babel/preset-env"]
        })
         console.log(denpendcies,code)
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