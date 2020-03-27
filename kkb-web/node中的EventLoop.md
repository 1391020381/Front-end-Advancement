* 大致看出node中的事件循环的顺序：
    - 外部输入数据
    - 轮训阶段 poll
    - 检查阶段 check
    - 关闭事件回调阶段 close callback
    - 定时器检测阶段 timer 
    - I/O 事件回调阶段  I/O callbacks
    - 闲置阶段 idle prepare
    - 轮训阶段 按时该顺序反复运行。




 * 浏览器环境下，microtask的任务队列是每个macrotask执行完之后执行。而在Node.js中，microtask会在事件循环的各个阶段之间执行，也就是一个阶段执行完毕，就会去执行microtask队列的任务  


 * setTimeout 在 timer阶段执行
 * setImmediate 在poll阶段完成时执行 