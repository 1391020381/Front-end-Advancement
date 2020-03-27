const http = require('http')
const context = require('./context')
const request = require('./request')
const response = require('./response')
class myKoa{
    listen(...args){
        const server = http.createServer((req,res)=>{
            const ctx = this.createContext(req,res)
            this.callback(req,res)
            res.end(ctx.body)
        })
        server.listen(ctx)
    }
    use(callback){
        this.callback = callback
    }
    createContext(req,res){
        const ctx = Object.create(context)
        ctx.request = Object.create(request)
        ctx.response = Object.create(response)
        ctx.req = ctx.request.req = req
        ctx.res = ctx.response.res = res
        return ctx
    }
}

module.exports = myKoa