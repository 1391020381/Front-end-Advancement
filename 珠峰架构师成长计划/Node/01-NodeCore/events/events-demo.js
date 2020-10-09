const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter()

emitter.on('起床',function(time){
    console.log(`早上${time}开始起床,新的一天加油！`)
})
emitter.emit('起床','6:00')