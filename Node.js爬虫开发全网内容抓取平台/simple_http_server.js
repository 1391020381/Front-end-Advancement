const http = require('http')
const server = http.createServer()
const qs = require('querystring')
server.listen(8000,()=>{
    console.log(`server is listening:${'http://127.0.0.1:8000'}`)
})

// 根据不同 url返回不同的响应结果


// server.on('request',(req,res)=>{
//     const url = req.url
//     console.log(url)
//     let responseStr
//     if(url === '/hello'){
//         responseStr = 'hi there'
//     }else if(url==='bye'){
//         responseStr = 'see yoy tomorrow'
//     }else{
//         responseStr = 'I know nothing'
//     }
//     res.statusCode = 200
//     res.end(responseStr)
// })

// 解析query

// 输入 localhost:8000?i_need_money=true&how_much=100
// server.on('request',(req,res)=>{
//     const url = req.url
//     const queryStr = url.substr(url.indexOf('?')+1,url.length)
//     const query = qs.parse(queryStr)  // query 为一个对象
//     console.log('query:',query)
//     if(query.i_need_money ==='true'&&query.how_much==='1000'){
//         res.statusCode = 200
//         res.end('go away')
//     }else{
//         res.writeHead(200,{
//             "Content-Type":"text/html;charset=utf-8"
//         })
//         res.statusCode = 200
//         res.end('请输入query')
//     }
// })


// 解析path query 根据不同的 method返回不同的内容

// 输入 localhost:8000/user/?quan=3&people-=china

// let temp=4
// server.on('request',(req,res)=>{

//     users=[1,2,3];

//     const url=req.url; // /user?quan=3&people=china
//     const path=url.substr(0,url.indexOf('?')) // /user
//     const query=url.substr(url.indexOf('?')+1,url.length) // quan=3&people=china

//     switch(path){
//         case '/user':

//             // 注意req.method和req.url没有关系
//             switch(req.method){
//                 case 'GET':
//                     res.statusCode=200;
//                     res.end(JSON.stringify(users)) // 获取users
//                     break;
//                 case 'POST':
//                     users.push(temp++);
//                     res.statusCode=200;
//                     res.end(JSON.stringify(users)) // 增加user
//                     break;    
//             }
//             break;

//         default:
//             res.statusCode=404
//             res.end('')
//             break;    
//     } 
// });