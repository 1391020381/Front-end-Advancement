const http = require('http')
const url = require('url')
let queryStyring = require('querystring')

const server = http.createServer((req,res)=>{
    let urlObj = url.parse(req.url)
    let query = urlObj.query
    let queryObj = queryStyring.parse(query)
    console.log(JSON.stringify(queryObj))
    res.end(JSON.stringify(queryObj))
})
server.listen(3000)