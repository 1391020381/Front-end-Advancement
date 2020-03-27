// 读取目录和文件

const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

function load(dir,cb){
    // 获取绝对路径
    const url = path.resolve(__dirname,dir)
    // 读取目录
    const files = fs.readdirSync(url)
    // 遍历
    files.forEach(filename=>{
       // 去掉扩展名
       filename = filename.replace('.js','') 
       const file = require(url + '/' + filename)
       cb(filename,file)
    })
}




load('routes',function(filename,file){
    console.log('routes:',filename,file)
    // routes: index { 'get /': [AsyncFunction: get /],
//   'get /detail': [AsyncFunction: get /detail] }
// routes: user {}
})

function initRouter(app){
    const router = new Router()
    load('routes',(filename,routes)=>{
        // routes 即是 文件内容
        routes = typeof routes === 'function'?routes(app):routes
        const prefix = filename === 'index'?'':`/${filename}`
        Object.keys(routes).forEach(key=>{
            const [method,path] = key.split(' ')
            console.log(`正在映射地址:${method.toLocaleUpperCase()} ${prefix}${path}`);
            
            // router[method](prefix+path,routes[key])
            router[method](prefix+path,async ctx=>{
                app.ctx = ctx
               await routes[key](app)
            })
        })
    })
    return router
}

function initController(){
    const controllers = {}
    load('controller',(filename,controller)=>{
        controllers[filename] = controller
    })
    return controllers
}

function initService(){
    const services = {}
    load('service',(filename,service)=>{
        services[filename] = service
    })
    return services
}

module.exports = {initRouter,initController,initService}


// initRouter()
// 根据目录和文件加载路由