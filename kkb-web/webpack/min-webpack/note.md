* package.json  bin

* min-webpack 下 npm link
* 在 min-webpack-demo下 npm link min-webpack 把 全局的包映射到 min-webpack-demo



# Node中的 process.cww() 与 __dirname

* 在 min-webpack 路径下 执行  node lib/test-node-api.js
* process.cwd(): /Users/zhoujin/Desktop/web/Front-end-Advancement/kkb-web/webpack/min-webpack
* __dirname /Users/zhoujin/Desktop/web/Front-end-Advancement/kkb-web/webpack/min-webpack/lib


* process.cwd（）是当前执行node 命令时候的文件夹地址 ———— 工作目录 保证了文件在不同目录下执行时 路径始终不变

* __dirname:当前模块的目录名。