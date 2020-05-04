const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const host = 'http://www.zhufengpeixun.cn/2020/'
const url = 'http://www.zhufengpeixun.cn/2020/index.html'

getUrlContent()
async function getUrlContent(){
     try{
        const {data} =  await axios.get(url)
        handleUrlContent(data,true)
     }catch(e){
         console.log(e)
     }
}

function handleUrlContent(data,isIndex){
    const urls = []  // 保存所有分页的 url
    if(isIndex){
    fs.writeFile('../2020/index.html',data,(err)=>{
        if(err){
            console.log('写入文件错误',err)
        }
    })
}
    const $ = cheerio.load(data)
     $('.nav a').each((i,e)=>{
       const href = $(e).attr('href')
       urls.push(href)
   })
   axios.get(`${host}${urls[0]}`).then(res=>{
      // console.log('其他data:',res.data)
    fs.writeFile(`../2020/${urls[0]}`,res.data,(err)=>{
        if(err){
            console.log('获取其他内容失败',err)
        }
    })
})
    urls.forEach(item=>{
        axios.get(`${host}${encodeURI(item)}`).then(res=>{
            fs.writeFile(`../2020/${item}`,res.data,(err)=>{
                if(err){
                    console.log('获取其他内容失败',err)
                }
            })
        }).catch(e=>{
            console.log('获取url内容失败',e)
        })
    })

}