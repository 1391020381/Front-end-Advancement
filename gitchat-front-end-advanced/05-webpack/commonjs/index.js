// index.js
var data = require('./data').data  // 值的拷贝
var modifyData = require('./data').modifyData
console.log(data) // data
modifyData() // 改变的时 data.js中的 data
console.log(data) // data