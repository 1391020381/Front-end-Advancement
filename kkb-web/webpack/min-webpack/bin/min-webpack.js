#! /usr/bin/env node  

// 标示使用 node 执行


// 1. 需要找到当前执行命令的路径  拿到 webpack.config.js配置
const path = require('path')

let config = require(path.resolve('webpack.config.js'))

let Compiler = require('./lib/Compiler.js')