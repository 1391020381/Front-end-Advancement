const fs = require('fs')
fs.writeFile('./extra/fileForRead.txt','hello world','utf8',function(err){
    if(err){
        throw err
    }
    console.log('文件写入成功')
})
console.log('fs.writeFile')