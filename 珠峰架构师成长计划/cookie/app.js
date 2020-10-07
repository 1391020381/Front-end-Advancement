const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser())


app.get('/write',(req,res)=>{
   res.cookie = function(key,val,options){
        let {domain,path,maxAge,expires,httpOnly,secure} = options
        console.log(domain,path,maxAge,expires,httpOnly,secure)
        let parts = [`${key}=${val}`]
        if(domain){
            parts.push(`Domain=${domain}`)
        }
        if(path){
            parts.push(`Path=${path}`)
        }
        if(maxAge){
            parts.push(`Max-Age=${maxAge}`)
        }
        if(expires){
            parts.push(`Expires=${expires.toUTCString()}`)
        }
        if(httpOnly){
            parts.push(`httpOnly`)
        }
        if(secure){
            parts.push(`Secure`)
        }
        let cookie = parts.join(';')
        console.log(cookie)
        res.setHeader('Set-Cookie',cookie)
   } 
   res.cookie('name','zfpx',{
       httpOnly:true,
       secure:true,
       maxAge:10*100,
       path:'/read',
       domain:'localhost',
       expires:new Date(Date.now() + 10*100)
   })

   res.end('ok')
})

app.get('/read',(req,res)=>{
    res.send(req.cookies)
})

app.get('/read1',(req,res)=>{
    res.send(req.cookies)
})
app.get('/read1/1',(req,res)=>{
    res.send(req.cookies)
})
app.listen(7001,()=>{
    console.log('server is listening http://127.0.0.1:7001')
})