const http = require('http')

let server = http.createServer(function(serverReq,serverRes){
    let url = serverReq.url
    serverRes.writeHead(200, {'Content-Type': 'text/plain;charset=utf-8'})
    serverRes.end('您返回的地址是:',url)
})

server.listen(3000)

let client = http.get('http://127.0.0.1:3000',function(clientRes){
    clientRes.pipe(process.stdout)
})