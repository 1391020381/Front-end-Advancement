console.time('console.log')
console.log('你好世界')
console.log('你好%s','世界')
// console.error(new Error('错误信息'))
const name = '描述'
console.warn(`警告${name}`)
console.assert(true, '什么都不做')
console.error('error #%d',5)
// console.trace('展示')
console.timeEnd('console.log')