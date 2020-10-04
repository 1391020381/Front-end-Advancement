const fs = require('fs')

fs.writeFileSync('./source/appendFile.txt','writeFileSync')

fs.appendFile('./source/appendFile.txt','appendFile',(err,results)=>{
    if(err) throw err
    console.log('appendFile:',results)
})