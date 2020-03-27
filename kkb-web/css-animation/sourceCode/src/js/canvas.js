function drawLine(){
   var canvas = document.getElementById('canvas')
   canvas.width = 800
   canvas.height = 600
   var context = canvas.getContext('2d')
   context.moveTo(100,100)
   //context.moveTo(0,0)
   context.lineTo(600,600)
   context.lineWidth = 5
   context.strokeStyle = '#aa394c'
   context.stroke()
  }


function drawSomeLine(){
    var canvas = document.getElementById('canvas')
    canvas.width = 800
    canvas.height = 600
    var context = canvas.getContext('2d')

    context.beginPath()
    context.moveTo(100,100)
    context.lineTo(300,300)
    context.lineTo(100,500)
    context.lineWidth = 5
    context.strokeStyle = 'red'
    context.stroke()
   
    context.beginPath();
    context.moveTo(300,100)
    context.lineTo(500,300)
    context.lineTo(300,500)
    context.lineWidth  = 5
    context.strokeStyle = 'blue'
    context.stroke()

    context.beginPath();
    context.moveTo(500,100)
    context.lineTo(700,300)
    context.lineWidth = 5
    context.strokeStyle = 'black'
    context.stroke()
}
function  createRect(){
    var canvas = document.getElementById('canvas')
    canvas.width = 800
    canvas.height = 600
    var context = canvas.getContext('2d')

    context.beginPath()
    context.moveTo(150,50)
    context.lineTo(650,50)
    context.lineTo(650,550)
    context.lineTo(150,550)
    context.lineTo(150,50)
    context.closePath()

    context.lineWidth = 5
    context.strokeStyle = 'black'
    context.fill()
    context.stroke()
}

function drawRect(ctx,x,y,width,height,fillColor,borderWidth,borderColor){
   ctx.beginPath()
   ctx.moveTo(x,y)
   ctx.lineTo(x+width,y)
   ctx.lineTo(x+width,y+height)
   ctx.lineTo(x,y+height)
   ctx.lineTo(x,y)
   ctx.closePath()
   ctx.lineWidth = borderWidth
   ctx.strokeStyle = borderColor
   ctx.fillStyle = fillColor
   ctx.fill()
   ctx.stroke()
}

function drawReactOther(context){
    context.beginPath();
        context.rect(0, 0, 800, 600);
        context.fillStyle = "#AA9033";

        context.fill();

        context.beginPath();
        for(var i=0; i<=20; i++){
            drawWhiteRect(context, 200 + 10 * i, 100 + 10 * i, 400 - 20 * i, 400 - 20 * i);
            drawBlackRect(context, 205 + 10 * i, 105 + 10 * i, 390 - 20 * i, 390 - 20 * i);
        }
        context.beginPath();
        context.rect(395, 295, 5, 5);
        context.fillStyle = "black";
        context.lineWidth = 5;

        context.fill();
        context.stroke();
        function drawBlackRect(cxt, x, y, width, height){
            cxt.beginPath();
            cxt.rect(x, y, width, height);
    
            cxt.lineWidth = 5;
            cxt.strokeStyle = "black";
    
            cxt.stroke();
        }
    
        function drawWhiteRect(cxt, x, y, width, height){
            cxt.beginPath();
            cxt.rect(x, y, width, height);
    
            cxt.lineWidth = 5;
            cxt.strokeStyle = "white";
    
            cxt.stroke();
        }
}

function lineCap(context){
    context.lineWidth = 5
    context.strokeStyle = '#1baaaa'
    context.beginPath()
    context.moveTo(100,100)
    context.lineTo(700,100)
    context.lineCap = 'butt'
    context.stroke()

    context.beginPath()
    context.moveTo(300,300)
    context.lineTo(700,300)
   context.lineCap = 'round'
   //context.lineCap = 'butt'
    context.stroke()

    context.beginPath()
    context.moveTo(100,500)
    context.lineTo(700,500)
  //  context.lineCap = 'square'
  context.lineCap = 'butt'
    context.stroke()

    context.lineWidth = 3
    context.strokeStyle = 'black'

    context.beginPath()
    context.moveTo(100,0)
    context.lineTo(100,600)
    context.lineTo(700,0)
    context.lineTo(700,600)
    context.stroke()
}
  window.onload = function(){
    var canvas = document.getElementById('canvas')
    canvas.width = 800
    canvas.height = 600
    var context = canvas.getContext('2d')
    //  drawLine()
   // drawSomeLine()
  // createRect()
//   drawRect(context,100,100,500,600,'red',5,'#333333')
// drawReactOther(context)
lineCap(context)
  }