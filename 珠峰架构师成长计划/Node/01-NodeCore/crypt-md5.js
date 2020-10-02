const crypto = require('crypto')
const md5 = crypto.createHash('md5')
let result = md5.update('a').digest('hex')

console.log(result)


function cryptoPwd(password){
    let md5 = crypto.createHash('md5')
    return md5.update(password).digest('hex')
}

let password = '123456'
let cryptoPassword = cryptoPwd(password)

console.log(cryptoPassword)