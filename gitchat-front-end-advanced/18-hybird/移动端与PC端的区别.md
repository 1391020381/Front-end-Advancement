* PC考虑的是浏览器的兼容性问题 移动端更多的是手机的兼容性,因为目前 安卓和ios 手机 一般浏览器都是webkit。
* 部分事件的处理上，移动端触屏事件
* 布局上,移动开发一般是要做到布局自适应的
* 动画的处理, PC js动画通用性更好却比CSS3牺牲较大的性能,手机端 CSS3
* 微信一些接口的开发  混合开发 
* 高清屏  1px 点击延迟



* PX转 REM
* 由于我门动态 设置屏幕不同的根字体大小,并且需要界面随根字体大小而调整,所以需要将 PX单位转 rem 单位

* 结合Webpack插件安装 postcss-pxtorem插件 自动转换 px 为 rem  在 webpack.config.js 

```
const pxtorem = require('postcss-pxtorem')

webpackConfig.postcss.push(pxtorem({
    rootValue:100,
    propWhiteList:[]
}))

```


# 移动web的知识

1. Pixel 移动开发像素知识

* 640*1136的图片 不能在 iphone5上完全显示？




* px： CSS pixels 逻辑像素,浏览器使用的抽象单位
* dp,pt : device independent pixels 设备无关像素
* dpr : devicePixeIRatio 设备像素缩放比

* 计算公式： 1px = (dpr)^2 * dp


* iphone5  dpr = 2    4英寸
* 平面上  1px = 2^2 * dp
* 纬度上  1px = 2 * dp


* iphone5   640dp * 1136dp   drp = 2 在某个纬度上   320px * 568px



* DPI 打印机每英寸可以喷的墨汁点 （印刷行业）
* PPI 屏幕每英寸的像素数据  即 单位英寸内的像素密度


* ppi = (1136* 1136 + 640*640) 开方  / 4 = 326ppi  视网膜Retina屏  单位都是 非px



* ppi 越高 像素数越高 图像越清晰


* ppi 默认缩放比    

ldpi    mdpi   hdpi   xhdpi

120     160    240     320

0.75     1.0    1.5     2.0



# iphone5 

设备分辨率 1136 * 640 dp   ->   (1136*1136 + 640*640)开方 / 4 英寸  = 326 ppi


326ppi 属于 retina 屏幕 dpr  = 2 (ppi 默认缩放比)

*  1px  = drp * drp  * dp    ->  320 * 568px




# Viewport

* 一个pc的页面在移动端设备上展示效果  整个页面可以访问

* Viewport 是为了排版正确   最早每有 viewport
* 手机浏览器默认为 我们做了两件事
    - 页面渲染在一个 980px(ios) 
    - 缩放


 * visual viewport  窗口缩放
 * layout viewport -> 渲染页面    底层

 * 设计移动 web  不实用 默认的 980px 的布局 viewport 
 * 宽度不开控  页面缩小版显示 交互不好
 * font-size 40px 等于 pc 12px  不规范



 1. meta标签
 * width : 设置布局 viewport的特定值  device-width
 * initial-scale: 设置页面的初始值缩放
 * minimum-scale :  最少缩放
 * maximum-scale    最大缩放
 *  user-scalable   用户能否缩放




# 设计移动Web
* 方案-  根据设备的实际宽度 来设计 
* 方案二   1px = 1dp   缩放 0.5  