/**
 * 抛出一个错误
 * 
 */

//  throw new Error('something wrong')
 
//  const obj = {
//      message:'something wrong'
//  }

// Error.captureStackTrace(obj)

// throw obj


/**
 * 
 * 同步代码中捕获一个抛出的错误
 */
// try{
//     throw new Error('something wrong')
// }catch(error){
//     console.log(error)
// }

/**
 * 在回调函数中处理错误
 * 缺陷：不够显示地处理错误
 */

//  function foo(params,cb){
//      // 处理异步任务 (比如处理http请求)时出错
//      const err = new Error('Http wrong')

//      // 返回error给cb

//      if(err){
//          cb(err)
//      }
//  }

//  foo({},(err,result)=>{
//      if(err){
//          console.log('cb deal err')
//      }
//  })

/**
 * 使用 catch 捕获在 async 函数抛出的错误
 */

//  async function foo(){
//      throw new Error('foo function got wrong')
//  }
//  foo().catch(e=>{
//      console.log('caught foo wrong',e)
//  })

/**
 * 用 try catch 捕获async 函数中的某一步错误
 */

//  async function foo(){
//      try{
//         await B
//      }catch(err){
//          console.log('caught foo wrong')
//      }
//  }
//  async function bar(){
//      throw Error('bar function got wrong')
//  }
//  foo()

/**
 * 将抛出的错误在捕获后继续给抛给外层
 */

 async function foo(){
     try{
        await bar()
     }catch(err){
        console.log('caught bar wrong')
     }
 }
 async function bar(){
     throw new Error('bar function got wrong')
 }

 (async function(){
    try {
        await foo()
     }catch(err){
         console.log('caught foo wrong')
     }
 })()