const fs = require('fs')
let data 

try{
    data = fs.readFileSync('./extra/fileForRead.txt','utf-8')
    console.log('文件内容:',data)
}catch(err){
    console.log('读取文件出错:',err.message)
}

