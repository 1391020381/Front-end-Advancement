/**
 * log4js日志 - 简单示例
 */

 const path = require('path')

 const log4js = require('log4js')

 log4js.configure({
     appenders:{
         // 控制台
         console:{ type:'console'},
         // 日志文件
         file:{ type:'file',filename:path.join(__dirname,'../logs/server.log')}
     },
     categories:{
         // 默认日志
         default:{appenders:['file','console'],level:'debug'}
     }
 })

 // 获取默认日志实例

 const logger = log4js.getLogger()

 module.exports = logger