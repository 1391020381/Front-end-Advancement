const fs = require('fs')

fs.unlink('./extra/fileForUnlink.txt',function(err){
    if(err) throw err
    console.log('文件删除成功!')
})

fs.unlinkSync('./extra/fileForUnlink-1.txt')
