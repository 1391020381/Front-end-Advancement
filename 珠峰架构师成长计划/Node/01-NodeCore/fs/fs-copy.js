const fs = require('fs')

function copy(src,target){
    fs.readFile(src,(err,data)=>{
        if(err) throw err
        fs.writeFile(target,data,(err,results)=>{
            if(err) throw err
            
        })
    })
}

copy('./source/appendFile.txt','./source/copy.txt')