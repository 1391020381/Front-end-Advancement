const http = require('http')

let parsePostBody = function(req,done){
    let arr = []
    let chunks
    req.on('data',buff=>{
        arr.push(buff)
    })
    req.on('end',()=>{
        chunks = Buffer.concat(arr)
        done(chunks)
    })
}
let server = http.createServer(function(req,res){
    parsePostBody(req,(chunks)=>{
        let body = chunks.toString()
        console.log(`Your nick is ${body}`)
        res.end(`Your nick is ${body}`)
    })
})

server.listen(3000)