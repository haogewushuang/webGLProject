//顶点着色器
var VSHADER_SOURCE =
'attribute vec4 a_Position;\n' +
'attribute vec2 a_TexCoord;\n' +
'varying vec2 v_TexCoord;\n' +
'void main() {\n' +
'   gl_Position = a_Position;\n' +
'   v_TexCoord = a_TexCoord;\n' +
'}\n';
//片元着色器
var FSHADER_SOURCE =
'precision mediump float;\n' +
'varying vec2 v_TexCoord;\n' +
'uniform sampler2D u_Sampler;\n' +
'void main() {\n' +
'   gl_FragColor = texture2D(u_Sampler, v_TexCoord);\n' +
'}\n';
function main() {
  //获取canvas元素
  var canvas = document.getElementById("webgl");
  //获取WebGL绘图上下文
  var gl = getWebGLContext(canvas);
  //初始化着色器
  initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);

  //设置顶点坐标和颜色
  var n = initVertexBuffers(gl);

  //配置纹理
  if (!initTextures(gl, n)) {
  }
}

function initVertexBuffers(gl) {
  var verticesTexCoords = new Float32Array([
    -0.5, 0.5, -0.3, 1.7, // 前 2 位是位置坐标， 后 2 位是纹理坐标
    -0.5, -0.5, -0.3, -0.2,
    0.5, 0.5, 1.7, 1.7,
    0.5, -0.5, 1.7, -0.2
  ]);
  var n = 4; //顶点个数

  //创建缓冲区对象
  var vertexTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer);
  //向缓冲区对象中写入数据
  gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW);

  var FSIZE = verticesTexCoords.BYTES_PER_ELEMENT;

  //获取attribute变量a_Position的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");

  //将缓冲区对象分配给a_Position变量
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0);
  //连接a_Position变量与分配给他的缓冲区对象
  gl.enableVertexAttribArray(a_Position);

  //将纹理坐标分配给a_TexCoord并开启它
  var a_TexCoord = gl.getAttribLocation(gl.program, "a_TexCoord");

  gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2);
  gl.enableVertexAttribArray(a_TexCoord);
  return n;
}
function initTextures(gl, n) {
  var texture = gl.createTexture(); //创建纹理对象

  //获取u_Sampler的存储位置
  var u_Sampler = gl.getUniformLocation(gl.program, "u_Sampler");

  var image = new Image(); //创建一个image对象

  //注册图像的加载时间的响应函数
  image.onload = function () {
    loadTexture(gl, n, texture, u_Sampler, image);
  };
  //直接转为base64编码图片，图片太大了显示不出来，不知道为啥？
  image.src =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA31JREFUeF7tm0voTVscxz/f8WVmdBkjKWQkBmQmFOWVIo/UHXgOGCBuboqJR0oGhPKKie6VouuR8iiPDDwyYkCJmTuQ0u+2tA7nv//r/PfZe6+z96mz1vDstX6Pz/r9fuux9xED3jTg/pMApAgYcAKNpoCZ3fb870ra28RcNALAzKYBTzMOb5N0qG4ItQMws7XAyQ6OHpO0sU4ItQIws6NAnoPXgDWSPtUBojYAZnYPmNWlU688hEdd9i/drecAzGwC8AT4raCVX4G1ki4UHFeoe08BmNlC4Gohi4Z33ilpf0UZHYf3DICZbQcOBDT/BywAWktgq8sc4G9gVGDMSUnrewGhJwDM7DSwOmDwM2A+ML4DgDfAP4BbJrPtlk+JdzFBRAXg8/0SMCVg5CVJy93vZjY7BEDSHf/8IrAsIOOtL44/+sVo0QDk5Ptfkna3DM4D4CHsA3Z1cHKdpFN9A2CEfHc2rpZ0tt3YbgB4CKuAMx0cHQK1LIzKEWBmblfndnfZ9hlYLunf7INuAXgIcwGXEmMCOs77lPhWOwCf7875mQHlD3zBeh0yrAgAD2Ei4EJ+RkDeQw8hqCsPTOkIMDO3QflR1DLtHPCHpC+dlBcF4CGMBo4DKwNyL0pakeds6HkVAO+B3zNCD0rakWdIGQAtmWbm9hZuj9HePkgam6c3NgB3dN3SJnSzJHfYyW1VAPho2AQcaVN0WNLWXMWBDqUjwBviHP4O3JB0vVsDqgLwuucBi4AXkg53qzvbrxKAskpjACirOwHIEEgRECuUishJKZBzGCoCs2rflAJVCZYZn1IgpcDIFyJloqrsmFQDypKrMi7VgFQDUg0Y8Va4SnoVHTusCJrZOH/15F5l3Zfk7uqjtjprgJlNBRzwl8BzSR/bnQkBOAFs8J3cWXtyVO+7eC8QU5+ZPQame5mXJS3NA2AZA+a0XljEMqyuCAjpkTRk0kMRkACkCBhKIKVAqgH+rW0qgpEIDPwq4Dia2ZDVJrs8xWDdt8ugB7AHWOIdvdKLL0X7GkCMGc6TkQAEjt19sRPMm7lYz1MEpAgYfvGSUqDEafDPWDnZkBy33P5sZSKgIbt7ozYB6CIF3Ld3pb646s2cRZV6R5L7KPtXSmTFm9liwH2cOCmq6uaF3fSXou4fKZ0BNG9nvRY08m6wXhdH1pYA9NNsNGHLwEfA/yBf9lCJVGqHAAAAAElFTkSuQmCC"
  return true;
}
function loadTexture(gl, n, texture, u_Sampler, image) {
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); //对纹理图像进行y轴反转
  //开启0号纹理单位
  gl.activeTexture(gl.TEXTURE0);
  //向target绑定纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture);

  //配置纹理参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  //配置纹理图像
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  //将0号纹理传递给着色器
  gl.uniform1i(u_Sampler, 0);

  //设置canvas的背景色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  //清空canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, n);
}
