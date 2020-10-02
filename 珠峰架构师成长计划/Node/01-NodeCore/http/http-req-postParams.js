const http = require('http')
const url = require('url')
const querystring = require('querystring')

const server = http.createServer((req,res)=>{
    let body = ''
    req.on('data',(thunk)=>{
        body += thunk
    })
    req.on('end',()=>{
        console.log('post body is:',body)
        res.end('ok')
    })
})
server.listen(3000)