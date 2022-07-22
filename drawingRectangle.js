function main() {
    //获取<canvas>元素
    var canvas = document.getElementById('example')
    if(!canvas) {
        return
    }
    //获取绘制二维图形的绘图上下文
    var ctx = canvas.getContext('2d');

    //绘制蓝色矩形
    ctx.fillStyle = 'rgba(0,0,255,1.0)'; // 填充蓝色
    ctx.fillRect(120,10,150,150) //使用填充颜色填充矩形
}