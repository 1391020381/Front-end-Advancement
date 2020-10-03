const Koa = require('koa')
const serve = require('koa-static')
const config = require('./webpack.config.js')
const koaWebpack = require('koa-webpack')
const webpack = require('webpack')
const {resolve} = require('path')

const app = new Koa()
const port = process.env.PORT || 3000

async function start(){
    const compiler = webpack(config)
    try{
        const middleware = await koaWebpack({
            compiler
        })
        app.use(middleware)
        app.use(serve(resolve(__dirname,'./dist')))
        app.listen(3000,()=>{
            console.log('server is listening http://127.0.0.1:3000`')
        })
    }catch(e){
        console.log(e)
    }
}

start()
