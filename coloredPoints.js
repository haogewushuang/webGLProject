//顶点着色器程序
var VSHADER_SOURCE =
  "attribute vec4 a_Position; \n" +
  "attribute float a_PointSize; \n" +
  "void main() { \n" +
  "gl_Position = a_Position;\n" +
  "gl_PointSize = a_PointSize;\n" +
  "}\n";

//片元着色器程序
var FSHADER_SOURCE =
  "precision mediump float;\n" +
  "uniform vec4 u_FragColor;\n" + 
  "void main() { \n" +
  "gl_FragColor = u_FragColor;\n" + 
  "}\n";

function main() {
  //获取canvas元素
  var canvas = document.getElementById("webgl");
  //获取WebGL绘图上下文
  var gl = getWebGLContext(canvas);
  //初始化着色器
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  //获取attribute变量a_Position的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");

  //获取attribute变量a_PointSize的存储位置
  var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

  // 获取u_FragColor变量的存储位置
  var u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");

  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor);
  };

  //设置canvas的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

}

var g_points = [];
var g_colors = [];
function click(ev, gl, canvas, a_Position, a_PointSize, u_FragColor) {
  var x = ev.clientX; //鼠标点击处x坐标
  var y = ev.clientY; //鼠标点击处y坐标
  var rect = ev.target.getBoundingClientRect();
  x = (x - rect.left - canvas.height / 2) / (canvas.height / 2);
  y = (canvas.width / 2 - (y - rect.top)) / (canvas.width / 2);
  //将坐标存储到g_points数组中
  g_points.push([x, y]);
  if(x >= 0.0 && y >= 0.0) {
    g_colors.push([1.0, 0.0, 0.0, 1.0])
  } else if(x < 0.0 && y < 0.0) {
    g_colors.push([0.0,1.0,0.0,1.0])
  } else {
    g_colors.push([0.0, 0.0, 1.0, 1.0]);
  }
  gl.clear(gl.COLOR_BUFFER_BIT);
  for(var i = 0; i < g_points.length; i++) {
    var xy = g_points[i];
    var rgba = g_colors[i];
    gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    gl.vertexAttrib1f(a_PointSize, 40.0);
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    //绘制一个点
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
