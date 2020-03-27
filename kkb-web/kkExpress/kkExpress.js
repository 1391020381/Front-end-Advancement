const http = require('http')
const url = require('url')
const {EventEmitter} = require('events')
const router = []

class Application extends EventEmitter{
    get(path,handler){
        if(typeof path === 'string'){
            router.push({
                path,
                method:'get',
                handler
            })
        }else{
            router.push({
                path:'*',
                method:'get',
                handler:path
            })
        }
    }
    listen(){
        const server = http.createServer((req,res)=>{
            // url.parse(req.url,true) 当第二个参数设置为 true 时 ,query 参数将会被解析为 object
            const {pathname} = url.parse(req.url,true)
            for(const route of router){
                const {path,method,handler} = route
                if(pathname === path && req.method.toLocaleLowerCase() === method){
                    return handler(req,res)
                }
                if(path === '*'){
                    return handler(req,res)
                }
            }
            process.on('uncaughtException', e=> {
                console.log('Server Exception:',e)
            })
        })
        server.listen(...arguments)
    }
}
module.exports = function createApplication(){
    return new Application()
}