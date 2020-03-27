const Utils = require('loader-utils')
module.exports = function(source){
    
    let options = Utils.getOptions(this)
    // console.log(options)
    return source.replace('kkb',options.name)
}