const path = require('path')
const fs = require('fs')
const cheerio = require('cheerio')
const axios = require('axios')
getImagUrl()

function getImagUrl(){
    const imgUrls = [ 'http://img.zhufengpeixun.cn/asyncfunc1.png','http://img.zhufengpeixun.cn/syncfunc.png']
    
    const orgigin = '../2020/html'
    const files = fs.readdirSync(orgigin)
    // console.log('files:',files)
    files.forEach((item,index)=>{
        let fPath = path.join(orgigin,item)
        let stat = fs.statSync(fPath)
        if(stat.isDirectory()=== true){
           // getImagUrl(fPath)
        }
        if(stat.isFile()=== true){
           const htmlContent =  fs.readFileSync(fPath)
           const $ = cheerio.load(htmlContent)
           $('img').each((i,e)=>{
            const src = $(e).attr('src')
           imgUrls.push(src)
      })
        }
    })
    let temp = []
    // 
    // https://images.gitee.com/uploads/images/2019/0109/192758_7fdaa324_1720749.jpeg'
  // let k = ['https://p.ssl.qhimg.com/','https://images.gitee.com/uploads/images/']
    imgUrls.forEach(item=>{
        
        if(item){
            let k = item.split('/')
            temp.push({
                orgigin:item,
                type:k[k.length-1]
            })
        }
    })
    // console.log('imgUrls:',temp)
    temp.forEach(item=>{
        download(item.orgigin,'../2020/static/img',item.type)
    })
}

 function download(url, dir, filename){
axios({
    method: 'get',
    url: encodeURI(url),
    responseType: 'stream',
    // headers
  }).then(function(response) {
    response.data.pipe(fs.createWriteStream(dir + "/" + filename))
  }).catch(e=>{
    
  })
}


