* transition 指从一个状态 到 另一个状态的动画模拟
* 当我们告诉浏览器,我们想在某个元素上使用 transition 时,就是让浏览器在状态变化过程中对属性的值进行自动插值。

# Transition properties
* transition-property: all;
* transition-duration: 0.4s;
* transition-timing-function: ease-out;
* transition [property] [duration] [delay][timing-function]

* font-family 不适用 
* 用css 创建的背景图像（例如渐变效果） 不能对其属性使用动画。这意味着浏览器用每帧动画重新创建背景图像。
* 不过你可以在 opacity 和 background-position上使用过渡。通过移动背景图 background image或者隐藏背景图可以创建很丰富的效果

# Animations
* the animation property
* animation-name
* animation-duration
* animation-delay
* animation-direction
* animation-fill-mode
* animation-iteration-count
* animation-play-state
* animation-timing-function
* animation-repeat

* 过渡指从一个状态到另一个状态的平滑的变化过程,而动画可以是多个 状态 间的变化

# Transitions vs. Animations
* transition 是指从一种状态到另一种状态（A 到 B）的变化，通常是由某种“动作”触发，比如鼠标悬停，或者用 JavaScript 添加或删除样式类
* animation 更加复杂一些，它允许你按照实际需求添加很多的 keyframes 来创建动画。它可以自动触发，并且可以循环

# CSS3 animation属性中的steps功能符深入介绍 张鑫旭

* steps()功能符和css3 animation中的 cubic-bezier() 功能符的地位和作用是一样的,都可以作为 animation-timing-function的属性值
* steps(number,position)
* number 数值 表示把我们的动画分成了几段
* position 关键字 表示动画是从时间的开头连续还是末尾连续。支持 start end关键字