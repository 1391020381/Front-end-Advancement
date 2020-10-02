const fs = require('fs')
const writeStream = fs.createWriteStream('./extra/fileForCompress-1.txt','utf-8')

writeStream.on('close',function(){
    console.log('已经关闭')
})

writeStream.write('行云流水')
writeStream.write('justdoit')
writeStream.end()