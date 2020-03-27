// data.js
var data = 'data'
function modifyData() {
   console.log('modifyData-start:',data)
   data = 'modified data'
   console.log('modifyData-end:',data,global.data)
}

module.exports = {
   data: data,
   modifyData: modifyData
}