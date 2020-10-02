const fs = require('fs')
const zlib = require('zlib')
const http = require('http')
const filepath = './extra/fileForCompress.html'

const server = http.createServer(function(req,res){
    let acceptEncoding = []|| req.headers['accept-encoding']
    let gzip 
    if(acceptEncoding.indexOf('gzip')!=-1){
        gzip = zlib.createGzip()
        res.writeHead(200,{
            'Content-Encoding':"gzip"
        })
        fs.createReadStream(filepath).pipe(gzip).pipe(res)
    }else{
        fs.createReadStream(filepath).pipe(res)
    }
})

server.listen('3000',()=>{
    console.log('server is listening 3000')
})