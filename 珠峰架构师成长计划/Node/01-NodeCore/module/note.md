* Node.js中可以通过module.exports require来导出和引入一个模块
* 在模块加载机制中,Node.js采用了延迟加载的策略,只有在用到的情况下,系统模块才会被加载,加载完成后会放到 binding_cache中。

* 在Node.js中模块加载一般会经历3个步骤， 路径分析 文件定位  编译执行
* 系统缓存 系统模块  文件模块 目录模块（package.json main:） node_modules目录加载


