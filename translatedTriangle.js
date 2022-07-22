//顶点着色器程序
var VSHADER_SOURCE =
  "attribute vec4 a_Position; \n" +
  "uniform vec4 u_Translation; \n" + 
  "void main() { \n" +
  "gl_Position = a_Position + u_Translation;\n" +
  "}\n";

//片元着色器程序
var FSHADER_SOURCE =
  "void main() { \n" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n" + "}\n";

//在x，y，z方向上平移的距离
var Tx = 0.5, Ty = 0.5, Tz = 0.0;

function main() {
  //获取canvas元素
  var canvas = document.getElementById("webgl");
  //获取WebGL绘图上下文
  var gl = getWebGLContext(canvas);
  //初始化着色器
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  var n = initVertexBuffers(gl);

  //将平移距离传输给顶点着色器
  var u_Translation = gl.getUniformLocation(gl.program, 'u_Translation');
  gl.uniform4f(u_Translation, Tx, Ty, Tz, 0)
  
  //设置canvas的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}
function initVertexBuffers(gl) {
  var vertices = new Float32Array([0.0, 0.5, -0.5, -0.5, 0.5, -0.5]);
  var n = 3; //点的个数

  //创建缓冲区对象
  var vertexBuffer = gl.createBuffer();

  //将缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  //向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  //获取attribute变量a_Position的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");

  //将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  //连接a_Position变量与分配给他的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  return n;
}