const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')
const fs = require('fs')
const path = require('path')
const app = new Koa()
const router = new Router()
const VueServerRender = require('vue-server-renderer')



const ServerBundle = require('./dist/vue-ssr-server-bundle.json')
const template = fs.readFileSync('./dist/index.ssr.html','utf8')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const render = VueServerRender.createBundleRenderer(ServerBundle,{
    template,
    clientManifest
})
router.get('/',async ctx=>{
    ctx.body = await new Promise((resolve,reject)=>{
        // 方法必须写成回调函数的形式,否则css不生效
        render.renderToString({url:'/'},(err,data)=>{
            console.log(err)
            if(err) reject(err)
            resolve(data)
        })
    })
})

app.use(router.routes())
app.use(Static(path.join(__dirname,'dist')))
app.use(async ctx=>{
    // 前端切换是不会触发 koa路由
    // 如果在前端刷新路由 匹配不到 koa路由 
   try{
    ctx.body = await new Promise((resolve,reject)=>{
        // 方法必须写成回调函数的形式,否则css不生效

        // {url:ctx.url} 会传递给  server.entry.js
        render.renderToString({url:ctx.url},(err,data)=>{
            if(err) reject(err)
            resolve(data)
        })
    })
   }catch(e){
        ctx.body =  '404'
   }

})
app.listen(3000,()=>{
    console.log(`server is listen http://127.0.0.1:3000`)
})


// 