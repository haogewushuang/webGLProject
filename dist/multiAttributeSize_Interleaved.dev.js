"use strict";

//顶点着色器程序
var VSHADER_SOURCE = "attribute vec4 a_Position; \n" + "attribute float a_PointSize; \n" + "void main() { \n" + "gl_Position = a_Position;\n" + "gl_PointSize = a_PointSize;\n" + "}\n"; //片元着色器程序

var FSHADER_SOURCE = "void main() { \n" + "gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); \n" + "}\n";

function main() {
  //获取canvas元素
  var canvas = document.getElementById("webgl"); //获取WebGL绘图上下文

  var gl = getWebGLContext(canvas); //初始化着色器

  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
  var n = initVertexBuffers(gl); //设置canvas的背景色

  gl.clearColor(0.0, 0.0, 0.0, 1.0); //清空canvas

  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.POINT, 0, n);
}

function initVertexBuffers(gl) {
  var verticesSize = new Float32Array([-0.5, 0.5, 10.0, -0.5, -0.5, 20.0, 0.5, 0.5, 30.0]);
  var n = 3; //点的个数
  //创建缓冲区对象

  var vertexBuffer = gl.createBuffer(); //将缓冲区对象绑定到目标

  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer); //向缓冲区对象中写入数据

  gl.bufferData(gl.ARRAY_BUFFER, verticesSize, gl.STATIC_DRAW);
  var FSIZE = verticesSize.BYTES_PER_ELEMENT; //获取attribute变量a_Position的存储位置

  var a_Position = gl.getAttribLocation(gl.program, "a_Position"); //获取attribute变量a_PointSize的存储位置

  var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize"); //将缓冲区对象分配给a_Position变量

  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 3, 0); //连接a_Position变量与分配给他的缓冲区对象

  gl.enableVertexAttribArray(a_Position); //将缓冲区对象分配给a_Position变量

  gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 3, FSIZE * 2); //连接a_Position变量与分配给他的缓冲区对象

  gl.enableVertexAttribArray(a_PointSize);
  return n;
}