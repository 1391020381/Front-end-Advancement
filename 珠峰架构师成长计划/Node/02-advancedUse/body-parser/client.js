let http = require('http')

const options = {
    hostname:'127.0.0.1',
    port:'3000',
    path:'/test',
    mehtod:'POST',
    headers:{
        'Content-Type':'text/plain',
        'Content-Encoding':'identity'
    }
}
let client = http.request(options,(res)=>{
    res.pipe(process.stdout)
})

client.end('chyingp')