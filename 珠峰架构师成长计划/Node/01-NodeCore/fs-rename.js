const fs = require('fs')



fs.rename('./hello','./world',function(err){
    if(err) throw err
    console.log('rename success')
})

fs.renameSync('./helloSync','./hello')

