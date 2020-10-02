const http = require('http')
const server = http.createServer((req,res)=>{
    console.log(`1. 客户端请求url:${req.url}`)
    console.log(`2. http版本:${req.httpVersion}`)
    console.log(`3. http请求方法:${req.method}`)
    console.log(`4. http请求头部:${JSON.stringify(req.httpVersion)}`)
    res.end('ok')
})
server.listen(3000,()=>{
    console.log(`server is listening:`,'http://127.0.0.1:3000')
})