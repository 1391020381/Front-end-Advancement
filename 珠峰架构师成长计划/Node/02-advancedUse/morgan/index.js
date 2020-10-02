const express = require('express')
const app = express()
const morgan = require('morgan')
const FilereamRotator = require('file-stream-rotator')
const fs = require('fs')
const path = require('path')



// let accessLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})

// morgan.token('from',(req,res)=>{
//     return req.query.from || '-'
// })

// morgan.format('justdoit','[justdoit]:method:url:status:from')

// app.use(morgan('justdoit',{stream:accessLogStream}))

// app.use(morgan('justdoit'))


const logDirector = path.join(__dirname,'log')

fs.existsSync(logDirector) || fs.mkdirSync(logDirector)
let accessLogStream = FilereamRotator.getStream({
    date_format:'YYYYMMDD',
    filename:path.join(logDirector,'access-%DATE%.log'),
    frequency:'daily',
    verbose:false
})

app.use(morgan('combined',{stream:accessLogStream}))

app.use((req,res,next)=>{
    res.end('ok')
})
app.listen(3000,()=>{
    console.log('server is listening http://127.0.0.1:3000')
})