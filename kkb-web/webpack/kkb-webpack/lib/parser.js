const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const {transformFromAst} = require('@babel/core')

module.exports = {
    getAst:(fileName)=>{
        let content = fs.readFileSync(fileName,'utf-8')
        return parser.parse(content,{
            sourceType:"module"
        })
    },
    getDependencies:(ast,fileName)=>{
        const dependencies = {}
        traverse(ast,{
            ImportDeclaration({node}){
                // console.log(node)
                // denpendcies.push(node.source.value) 相对路径
                const dirname = path.dirname(fileName)
                // console.log(dirname)
                const newPath = './' + path.join(dirname,node.source.value)
                // console.log(newPath)
                dependencies[node.source.value] = newPath
            }
        })
        return dependencies
    },
    getCode:(ast)=>{
        const {code}  = transformFromAst(ast,null,{
            presets:["@babel/preset-env"]
        })
        return code
    }
}