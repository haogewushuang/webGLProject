"use strict";

//顶点着色器-分号是必要的
var VSHADER_SOURCE = "attribute vec4 a_Position; \n" + "attribute vec4 a_Color; \n" + "uniform mat4 u_ViewMatrix;\n" + "varying vec4 v_Color; \n" + //varying变量
"void main() { \n" + "gl_Position = u_ViewMatrix * a_Position;\n" + "gl_PointSize = 10.0;\n" + "v_Color = a_Color;\n" + "}\n"; //片元着色器-使用变量时需要定义精度

var FSHADER_SOURCE = "precision mediump float;\n" + "varying vec4 v_Color;\n" + "void main() { \n" + "gl_FragColor = v_Color; \n" + "}\n";

function main() {
  //获取canvas元素
  var canvas = document.getElementById("webgl"); //获取WebGL绘图上下文

  var gl = getWebGLContext(canvas); //初始化着色器

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE); //设置顶点坐标和颜色

  var n = initVertexBuffers(gl); //获取u_ViewMatrix变量的存储地址

  var u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix'); //设置视点、视线、上方向

  var viewMatrix = new Matrix4();
  viewMatrix.setLookAt(0.20, 0.25, 0.25, 0, 0, 0, 0, 1, 0); //将视图矩阵传给u_viewMatrix变量

  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix.elements); //设置canvas的背景色

  gl.clearColor(0.0, 0.0, 0.0, 1.0); //清空canvas

  gl.clear(gl.COLOR_BUFFER_BIT); //绘制点
  //gl.drawArrays(gl.POINT, 0, n);
  //绘制三角形

  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initVertexBuffers(gl) {
  var verticesColors = new Float32Array([//顶点坐标和颜色
  0.0, 0.5, -0.4, 0.4, 1.0, 0.4, //绿色三角形在最后面
  -0.5, -0.5, -0.4, 0.4, 1.0, 0.4, 0.5, -0.5, -0.4, 1.0, 0.4, 0.4, 0.5, 0.4, -0.2, 1.0, 0.4, 0.4, //黄色三角形在中间
  -0.5, 0.4, -0.2, 1.0, 1.0, 0.4, 0.0, -0.6, -0.2, 1.0, 1.0, 0.4, 0.0, 0.5, 0.0, 0.4, 0.4, 1.0, //蓝色三角形在最前面
  -0.5, -0.5, 0.0, 0.4, 0.4, 1.0, 0.5, -0.5, 0.0, 1.0, 0.4, 0.4]);
  var n = 9; //点的个数
  //创建缓冲区对象

  var vertexColorBuffer = gl.createBuffer(); //将缓冲区对象绑定到目标

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer); //向缓冲区对象中写入数据

  gl.bufferData(gl.ARRAY_BUFFER, verticesColors, gl.STATIC_DRAW);
  var FSIZE = verticesColors.BYTES_PER_ELEMENT; //获取attribute变量a_Position的存储位置

  var a_Position = gl.getAttribLocation(gl.program, "a_Position"); //将缓冲区对象分配给a_Position变量

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0); //连接a_Position变量与分配给他的缓冲区对象

  gl.enableVertexAttribArray(a_Position); //获取a_Color的存储位置，分配缓冲区并开启

  var a_Color = gl.getAttribLocation(gl.program, 'a_Color'); //将缓冲区对象分配给a_Position变量

  gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2); //连接a_Position变量与分配给他的缓冲区对象

  gl.enableVertexAttribArray(a_Color);
  return n;
}