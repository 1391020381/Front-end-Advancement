# 坐标系 
* 以左上角为零点
* x 右为正  y下为 正
# 渲染上下文
* getContext() 用来获取渲染上下文和它的绘图功能。

```
var canvas = document.getElementById('tutorial')

var ctx = canvas.getContext('2d')

```

# 绘制矩行
* fillRect(x,y,width,height)
* strokeReact(x,y,width,height)
* clearReact(x,y,width,height)
* rect(x, y, width, height)

# 绘制路径
* beginPath
* closePath
* stroke
* fill

# 移动笔触
* moveTo(x,y)
# 线
* lineTo(x,y)


* canvas 是基于状态的绘制
* 其实这段代码每次使用stroke()时，它都会把之前设置的状态再绘制一遍。第一次stroke()时，绘制一条红色的折线；第二次stroke()时，会再重新绘制之前的那条红色的折线，但是这个时候的画笔已经被更换成蓝色的了，所以画出的折线全是蓝色的。换言之，strokeStyle属性被覆盖了。同理，第三次绘制的时候，画笔颜色是最后的黑色，所以会重新绘制三条黑色的折线。所以，这里看到的三条折线，其实绘制了3次，一共绘制了6条折线。