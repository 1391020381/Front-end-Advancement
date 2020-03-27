const fs = require('fs')
const thunkify = require('thunkify')
const readFileThunk = thunkify(fs.readFile)
const fn = readFileThunk('data1.json')
const gen = function *(fn){
    let result = null
    while(true){
        result = yield fn
        console.log(result.toString())
        if(result){
            break
        }
        console.log('break---')
    }
}
// const g = gen()

// g.next() 是一个 thunk 函数  

// thunk函数的特点
//     我们经过对传统的异步操作函数进行封装,
//     得到一个只有一个参数的函数,而且这个参数是一个 callback函数,那就是一个 thunk函数。 
// g.next().value((err,data1)=>{
//     console.log(data1.toString())
//     g.next(data1).value((err,data2)=>{
//         console.log(data2.toString())
//         g.next(data2)
//     })
// })

function run(g){ // 递归
    function next (err,data){
        const result = g.next(data)
        if(result.done){
            return
        }
        result.value(next)
    }
    next()
}

run(gen(fn))