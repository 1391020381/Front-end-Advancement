const fs = require('fs')

let results = fs.writeFileSync('./source/writeFile.txt','行云流水justdoit')
console.log('writeFileSync:',results)

fs.writeFile('./source/writeFile.txt','!!!!!',[],(err,results)=>{
    if(err) throw err
    console.log('writeFile:',results)
})