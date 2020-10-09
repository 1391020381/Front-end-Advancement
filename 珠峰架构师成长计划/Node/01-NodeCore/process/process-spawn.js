const { pid } = require('process')

const spawn = require('child_process').spawn
const child = spawn('ls',['-l'],{cwd:'/usr'})

child.stdout.pipe(process.stdout)
console.log(process.pid,child.pid)