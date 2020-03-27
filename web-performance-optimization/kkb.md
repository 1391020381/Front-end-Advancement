* 前端性能优化

1. 文件获取优化
    - 加载css  js 
    - http 协议细节
    - 从输入url到页面加载完毕,发生了什么
    - 大厂怎么上线前端代码
2. 代码执行优化
    - 节流 防抖
    - 重绘 回流
    - vue react（ssr） 常见优化 代码执行的更少 dom操作更少
    - 浏览器是如何渲染页面的 

1. DNS -> IP
2. 和IP地址建立TCP连接, 发送http
3. 后端接受处理 返回响应
4. 解析html -> dom
7. 解析 css -> css-tree
8. dom + csstree 生成 render-tree
9. 加载 script 的js 文件
10. 执行js        


# 网络协议
1. ip协议 
2. ip协议之上,使用tcp来确保数据的完整有序
    - 三次握手
    - 滑动窗口
    - 慢启动
    - 挥手
    - 分包
    - 重发

 3. tcp 协议上,http   应用层



 * 合理利用浏览器文件缓存
    - 强制缓存 expires cache-control
    - 协商缓存 if-modified-since  last-modified  if-no-match : etag


 1. 加时间戳 <script src="/a.js?_t=xxx>">
 2. 加版本号 <script src="a.js?_v=1.6"> 比如 jq vue 共用库 内容没有变 还需要重新加载
 3. 加指纹 但是不产生 新的文件 <script src="/a.js?_h=abdss">  这种方式 不能清楚cdn 的缓存 但是不生成新文件有小问题 （html js谁先上）
 * 文件内容加 hash  hash是整个文件 md5 文件内容不变,hash不变  产生新文件  



 * vue1 的问题是 每个数据都有监听器 watcher 太多了项目庞大之后,尤其明显 vue2做了这种 watcher只到 组件层  一个组件只有一个watcher 组件内部使用 domdiff

 * 虚拟列表