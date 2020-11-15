* videojs.getPlayers("video-player").html5player.tech_.setPlaybackRate(2.5)


# 上下文路径
* docker build -t nginx:v3 .
* 上下文路径 是指docker在构建镜像 有时候想要使用本机的文件（比如复制） docker build命令得知这个路径后，会将路径下的所有内容打包。
* 由于docker的运行模式是C/S。我们本机是C,dokcer引擎是S。实际的构建过程是在docker引擎下完成饿,所以这个时候无法用到我们本机大的文件。这就需要把本机的指定目录下的文件一起打包提供给docker引擎使用。如果未说明最后一个参数 那么默认上下文路径就是Dockerfile所在的位置
* 上下文路径下不要放无用的文件，因为会一起打包发送给docker引擎，如果文件过多造成过程缓慢。