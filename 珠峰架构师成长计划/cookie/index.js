const http = require('http')

const server  = http.createServer((req,res)=>{
    if(req.url == '/write'){
        res.setHeader('Set-Cookie','name=zfpx')
        res.end('wirte ok')
    }else if(req.url == '/read'){
        let cookie = req.headers['cookie']
        res.end(cookie)
    }else{
        res.end('Not Found')
    }    
})
server.listen(7001,()=>{
    console.log('server is listening http://127.0.0.1:7001')
})