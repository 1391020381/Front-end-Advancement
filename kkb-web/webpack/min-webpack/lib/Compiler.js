const  fs = require('fs')
const path = require('path')
const babylon = require('babylon')
const traverse = require('@babel/traverse').default
const t = require('@babel/types')
const generator = require('@babel/generator')

// babylon 主要就是把 源码 转换成ast
//  @babel/traverse   遍历
// @babel/types      替换
// @babel/generator  生成

class Compiler{
    constructor(config){
        this.config = config
        // 保存入口文件路径
        this.entryId 
        // 保存所有路径的模块依赖
        this.modules = {}
        this.entry = config.entry
        // 工作路径
        this.root = process.cwd()
    }
    run(){
        this.buildModule(path.resolve(this.root,this.entry),true)
        this.emitFile()
    }
    getSource(modulePath){
        let content  = fs.readFileSync(modulePath,'utf8')
        return content
    }
    buildModule(modulePath,isEntry){  // 创建模块的依赖
        let source = this.getSource(modulePaths)
        let moduleName = './' + path.relative(this.root,modulePath)
        if(isEntry){
            this.entryId = moduleName
        }
        // path.dirname 返回路径中代表文件夹的部分
       let {sourceCode,dependencies} =  this.parse(source,path.dirname(moduleName))
       // 相对路径 和模块内容联系起来
       this.modules[moduleName] = sourceCode
    }
    parse(source,parentPath){
        let ast = babylon(source)
        let dependencies = []
        traverse(ast,{
            CallExpression(p){
                let node = p.node
                if(node.callee.name === 'require'){
                    node.callee.name = '__webpack_require__'
                    let moduleName = node.arguments[0].value
                    moduleName = moduleName + (path.extname(moduleName)?"":".js")
                   moduleName = './' + path.join(parentPath,moduleName) // './src/a.js'
                   dependencies.push(moduleName)
                   node.arguments = [t.stringLiteral(moduleName)]
                }
            }
        })
        let sourceCode = generator(ast).code
        dependencies.forEach(dep=>{
            this.buildModule(path.join(this.root,dep),false)
        })
        return {sourceCode,dependencies}
    }
    emitFile(){
      let main =   path.join(this.config.output.path,this.config.output.filename)
    }
}

module.exports = Compiler