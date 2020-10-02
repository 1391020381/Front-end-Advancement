let http = require('http')
let  server = http.createServer((req,res)=>{
    let url = req.url
    console.log('url:',req.url)
    res.writeHead(200,{
        'Content-type':'utf-8'
    })
    res.end(`url:`,url)
})
server.listen(3000)

let client = http.get('http://127.0.0.1:3000',(res)=>{
    
    res.pipe(process.stdout)
})
// let client = http.get('http://127.0.0.1:3000')