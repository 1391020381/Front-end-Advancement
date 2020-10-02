const fs = require('fs')

fs.access('./extra/fileForRead.txt',function(err){
    if(err) throw err
    console.log('fileForRead.txt存在')
})

fs.access('./extra/fileForCompress-1.txt',function(err){
    if(err) throw err

    console.log('fileForCompress-1.txt存在')
})