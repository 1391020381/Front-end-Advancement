const http = require('http')
const options = {
    protocol:'http:',
    hostname:'id.qq.com',
    porot:'80',
    path:'/',
    mehtod:'GET'
}

const client = http.request(options,(res)=>{
    let data = ''
    res.setEncoding('utf-8')
    res.on('data',(chunk)=>{
        data += chunk
    })
    res.on('end',()=>{
        console.log(data)
    })
})
client.end()