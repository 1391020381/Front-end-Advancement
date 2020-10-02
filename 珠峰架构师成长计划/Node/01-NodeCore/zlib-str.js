const http = require('http')
const zlib = require('zlib')
const responseText = 'hello world'

const server = http.createServer(function(req,res){
    let acceptEncoding = []|| req.headers['accept-encoding']
    if(acceptEncoding.indexOf('gzip')!=-1){
        res.end(zlib.gzipSync(responseText))
    }else{
        res.end(responseText)
    }
})
server.listen('3000',()=>{
    console.log('server is listening 3000')
})