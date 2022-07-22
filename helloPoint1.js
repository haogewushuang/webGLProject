//顶点着色器程序
var VSHADER_SOURCE = 'void main() { \n' + 
    'gl_Position = vec4(0.0, 0.0, 0.0, 1.0); \n' +
    'gl_PointSize = 10.0; \n' + 
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

    //设置canvas的背景色
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    //清空canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);

}
