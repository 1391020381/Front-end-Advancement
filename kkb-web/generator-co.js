

const promise = name => new Promise((resolve)=>{
    setTimeout(()=>{
        resolve(name)
    },1000)
})

const generator = function*(name){
    yield promise(name)
 
   yield promise(name)
  
}
const gen = generator('Generator')


// yield 后面返回 promise   
gen.next().value.then((r1)=>{
    console.log('r1:',r1)
    gen.next().value.then(r2=>{
        console.log('r2:',r2)
    })
})


let co = function(gen,name){
    var it = gen(name)
    var ret = it.next()
    ret.value.then(function(res){
        console.log('res:',res)
        it.next(res)
    })
}
co(generator,'CO');

(async()=>{
    let r1 = await promise('async/await')
    console.log('async-r1:',r1)
   let r2 =  await promise('async/await')
   console.log('async-r2:',r2)
})()


// 轮训订单状态

function * getOrderStatus (fn){
    let result = null
    while(true){
     result =   yield fn()
     if(result.done){
         break
     }
    }
}
