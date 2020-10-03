const cluster = require('cluster')
const cpuNums = require('os').cpus().length
const http = require('http')

if(cluster.isMaster){
    for(let i =0;i<cpuNums;i++){
        cluster.fork()
    }
}else{
    http.createServer((req,res)=>{
        res.end(`response from worker${process.pid}`)
    }).listen(3000,()=>{
        console.log(`work ${process.pid} is listening http://127.0.0.1:3000`)
    })
}