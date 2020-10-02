const fs = require('fs')

try{
    fs.writeFileSync('./extra/fileForCompress-1.txt','hello word','utf8')
    console.log('文件写入成功')
}catch(err){
    throw err
}