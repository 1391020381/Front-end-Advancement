const fs = require('fs')

let content = fs.readFileSync('./source/readFile.txt',['utf8'])

console.log('readFileSync:',content.toString())

fs.readFile('./source/readFile.txt',(err,content)=>{
    if(err) throw err
    console.log('readFile:',content.toString())
})