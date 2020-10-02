const fs = require('fs')
const readStream = fs.createReadStream('./extra/fileForRead.txt','utf8')

readStream.on('data',function(chunk){
    console.log('读取数据:',chunk)
})

readStream.on('error',function(err){
    console.log('出错:',err.message)
})
readStream.on('end',function(err){
    console.log('没有数据啦')
})
readStream.on('close',function(){
    console.log('已经关闭')
})