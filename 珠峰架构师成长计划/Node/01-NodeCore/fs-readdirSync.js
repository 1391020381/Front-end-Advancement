const fs = require('fs')
const path = require('path')
let getFilesInDir = function(dir){
    let results = [path.resolve(dir)]
    let files = fs.readdirSync(dir,'utf-8')
    files.forEach(function(file){
        file = path.resolve(dir,file)
        let stats = fs.statSync(file)
        if(stats.isFile()){
            results.push(file)
        }else if(stats.isDirectory()){
            results = results.concat(getFilesInDir(file))
        }
    })
    return results
}
// var getFilesInDir = function(dir){

//     var results = [ path.resolve(dir) ];
//     var files = fs.readdirSync(dir, 'utf8');

//     files.forEach(function(file){

//         file = path.resolve(dir, file);

//         var stats = fs.statSync(file);

//         if(stats.isFile()){
//             results.push(file);
//         }else if(stats.isDirectory()){
//             results = results.concat( getFilesInDir(file) );
//         }
//     });

//     return results;
// };
let files = getFilesInDir('../../../珠峰架构师成长计划')
console.log(files)