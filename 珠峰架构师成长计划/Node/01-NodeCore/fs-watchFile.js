const fs = require('fs')
const options = {
    persistent:true,
    interval:2000
}

fs.watchFile('./extra/fileForWatch.txt',options,function(cur,prev){
    console.log('修改时间为:',cur.mtime)
})