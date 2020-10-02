const fs = require('fs')

fs.mkdirSync('./helloSync')

fs.mkdir('./hello',function(err){
    if(err) throw err
    console.log('目录创建成功')
})

