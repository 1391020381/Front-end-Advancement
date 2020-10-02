const url = require('url')
const str = 'http://Chyingp:HelloWorld@ke.qq.com:8080/index.html?nick=%E7%A8%8B%E5%BA%8F%E7%8C%BF%E5%B0%8F%E5%8D%A1#part=1';

let obj1 = url.parse(str)
let obj2 = url.parse(str,true)
console.log(obj1)
console.log(obj2,obj2.query.nick)

const str2 = '//foo/bar'

let obj3 = url.parse(str2,true,false)
console.log(obj3)

let obj4 = url.parse(str2,true,true)
console.log(obj4)