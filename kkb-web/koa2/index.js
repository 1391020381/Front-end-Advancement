const myKoa = require('./myKoa')

const app = new myKoa()

app.use((req,res)=>{
    res.writeHead(200)
    res.end('hi myKoa')
})
app.listen(3000,()=>{
    console.log(`service is listen 3000`)
})