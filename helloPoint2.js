//顶点着色器程序
var VSHADER_SOURCE =
    'attribute vec4 a_Position; \n' +
    'attribute float a_PointSize; \n' + 
    'void main() { \n' + 
    'gl_Position = a_Position;\n'+
    'gl_PointSize = a_PointSize;\n'+
    '}\n';

//片元着色器程序
var FSHADER_SOURCE = 'void main() { \n' +
    'gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n' +
    '}\n';

function main() {
    //获取canvas元素
    var canvas = document.getElementById('webgl');
    //获取WebGL绘图上下文
    var gl = getWebGLContext(canvas);
    //初始化着色器
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)

    //获取attribute变量a_Position的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');

    //获取attribute变量a_PointSize的存储位置
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');
    
    //将顶点位置传输给attribute变量a_Position
    gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0)

    //将顶点位置传输给attribute变量a_PointSize
    gl.vertexAttrib1f(a_PointSize, 40.0)

    //设置canvas的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);

}
