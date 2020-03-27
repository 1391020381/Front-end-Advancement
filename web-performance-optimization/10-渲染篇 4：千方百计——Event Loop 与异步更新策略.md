
* Micro-Task 与 Macro-Task

* 常见的宏任务: setTimeout setInterval script i/o ui
* 常见的微任务: Promise.then MutationObserver


* `如果我们把任务塞进异步更新队列里,它们会先在js的层面上被 批量执行完毕。当流程走到渲染这一步时,它仅仅需要针对有意义的计算结果操作一次DOM。`