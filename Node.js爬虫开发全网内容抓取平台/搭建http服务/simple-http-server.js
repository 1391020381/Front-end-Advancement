const http = require('http')
// const server = http.createServer((req,res)=>{
//     res.end('hello,justdoit')
// })

// server.listen(3000,()=>{
//     console.log(`server is listen http://127.0.0.1:3000`)
// })

const server = http.createServer()

server.listen(3000,()=>{
    console.log(`server is listen http://127.0.0.1:3000`)
})

server.on('request',(req,res)=>{
    res.statusCode = 200
    res.end('welcome to first http server')
})


// URL
// Schema://host:port/path?query#hash

// port   22 ssh    80 http  443 https  27017 mongodb