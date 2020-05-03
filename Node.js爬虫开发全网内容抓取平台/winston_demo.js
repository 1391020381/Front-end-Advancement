const winston = require('winston')
require('winston-daily-rotate-file')

const { Logger, transports } = winston

const logger = winston.createLogger({
    transports:[
        // 将 info输出到 logs目录下的 info.log
        new (transports.File)({
            name:'info-file',
            filename:'logs/info.log',
            level:'info'
        }),
        // 将error输出到 logs 目录下的 error.log
        new (transports.File)({
            name:'error-file',
            filename:'logs/error.log',
            level:'error'
        }),
        new transports.Console({
            level:'error'
        })
    ]
})

// 记录一条 info信息

logger.info('my first log with winston')

logger.error('my first log width winston')


// 处理请求的logger 

const reqLogger = winston.createLogger({
    transports:[
        new transports.Console(),
        new transports.DailyRotateFile({
            filename:'./logs/req_log.log',
            datePattern:'YYYY_MM_dd',
            prepend:true,
            level:'info'
        })
    ]
})

reqLogger.info('request from client')
