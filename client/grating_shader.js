//;(function(){
"use strict"

// https://stackoverflow.com/questions/53336342/how-to-include-shaders-as-external-files
const code_vertexShader=`
#version 100
precision highp float;

attribute vec2 position;
varying vec2 v_texCoord;

void main() {
  gl_Position = vec4(position*1.0, 0.0, 1.0);
  gl_PointSize = 384.0;
  v_texCoord = position;
}
`;

// More randoms: https://www.geeks3d.com/20100831/shader-library-noise-and-pseudo-random-number-generator-in-glsl/
//
const code_fragmentShader=`
#version 100
precision highp float;
//attribute vec2 position;

varying vec2 v_texCoord;

uniform float sf_div;
uniform float sigma;
uniform float amp;
uniform float theta;
uniform float rando;

/*
float rnd(vec2 x)
{
        int n = int(x.x * 40.0 + x.y * 6400.0);
        n = (n << 13) ^ n;
        return 1.0 - float( (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0;
};
*/

void main() {
  //vec2 fragmentPosition = (gl_PointCoord*3.0-1.0)/2.0-v_texCoord;
  //vec2 fragmentPosition = gl_PointCoord-0.5;
  vec2 fragmentPosition = v_texCoord*vec2(1.0,-1.0)*2.0 + gl_PointCoord-vec2(0.5,0.5);
  //vec2 fragmentPosition = position2;
  float distance = length(fragmentPosition);
  float distanceSqrd = distance * distance;
  //float sigma=1.00;
  //float theta=-3.1416/9.0; 
  //float sf_div=85.0;

  vec2 posRotate=vec2(cos(theta)*fragmentPosition[0]-sin(theta)*fragmentPosition[1],
                      sin(theta)*fragmentPosition[0]+cos(theta)*fragmentPosition[1]);

  float grating=sin(posRotate[0]*sf_div);
  float mag=1.0*exp(-distanceSqrd/sigma);
  float noiz;
  //mag = mag/10.0 + 0.5;
  //mag = amp;

  //if ((fragmentPosition[0]+fragmentPosition[1])>sigma) { mag=0; }
  //else {mag=0.99;}

  //mag=1.0;

  //noiz=fract(sin(dot(fragmentPosition+vec2(rando,rando),vec2(12.9898,78.233))) * 43758.5453);
  //noiz=rnd(fragmentPosition);
  mag=mag*amp; //mag/10.0+0.5;
  //float mag= 0.1/distanceSqrd;
  gl_FragColor = vec4(0.0,mag,0.0, 1.0 );
}
`;

// https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/By_example/Textures_from_code
// https://www.cs.cornell.edu/courses/cs4620/2017sp/cs4621/lecture08/

                //<input type="checkbox" id="chkFlanked"><label for='chkFlanked'>Bar Flanks</label>
                //<input type="checkbox" id="chkEFlanked"><label for='chkEFlanked'>E Flanks</label>
                    //<button type="button" id="init" onclick="myinit()">Initialize</button>

var gl;
var program;

function setupWebGL (evt) {
  //window.removeEventListener(evt.type, setupWebGL, false);
  
  if (!(gl = getRenderingContext()))
    return;

  var source = code_vertexShader;
  var vertexShader = gl.createShader(gl.VERTEX_SHADER);
  gl.shaderSource(vertexShader,source);
  gl.compileShader(vertexShader);

  source = code_fragmentShader;
  var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  gl.shaderSource(fragmentShader,source);
  gl.compileShader(fragmentShader);

  program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.detachShader(program, vertexShader);
  gl.detachShader(program, fragmentShader);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    var linkErrLog = gl.getProgramInfoLog(program);
    cleanup();
    document.querySelector("p").innerHTML = 
      "Shader program did not link successfully. "
      + "Error log: " + linkErrLog;
    return;
  } 
  initializeAttributes();
  gl.useProgram(program);
}

function showShaderGrating(sf,sigma,amp,theta,rando) {
  var locationOfSf = gl.getUniformLocation(program, "sf_div");
  var locationOfSigma = gl.getUniformLocation(program, "sigma");
  var locationOfAmp = gl.getUniformLocation(program, "amp");
  var locationOfTheta = gl.getUniformLocation(program, "theta");
  var locationOfRando = gl.getUniformLocation(program, "rando");

  gl.uniform1f(locationOfSf, sf);
  gl.uniform1f(locationOfAmp, amp);
  gl.uniform1f(locationOfSigma, sigma);
  gl.uniform1f(locationOfTheta, theta);
  gl.uniform1f(locationOfRando, rando);

  gl.clearColor(background_color,background_color,background_color, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.drawArrays(gl.POINTS, 0, 1);
}

function clearGrating() {
  var bcolor2=0.0;
  gl.clearColor(bcolor2,bcolor2,bcolor2, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var buffer;
function initializeAttributes() {
  gl.enableVertexAttribArray(0);
  buffer = gl.createBuffer();  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-0.25,-0.25, 0.25,0.25, -0.25,0.25, 0.25,-0.25]),
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0]),
      gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
}

// Make sure to call this when done
function cleanup() {
gl.useProgram(null);
if (buffer)
  gl.deleteBuffer(buffer);
if (program) 
  gl.deleteProgram(program);
}

const background_color=0.0;
function getRenderingContext() {

  //var canvas = document.querySelector("canvas");
  var canv = document.getElementById("canvas");
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  var gl = canvas.getContext("webgl") 
    || canvas.getContext("experimental-webgl");
  if (!gl) {
    var paragraph = document.querySelector("p");
    paragraph.innerHTML = "Failed to get WebGL context."
      + "Your browser or device may not support WebGL.";
    log.error('Failed to get WebGL context.');
    return null;
  }
  gl.viewport(0, 0, 
    gl.drawingBufferWidth, gl.drawingBufferHeight);

  gl.clearColor(background_color,background_color,background_color, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}
//})();

/*
float noise( in vec2 p )
{
    p.x = p.x + iTimeDelta;
    p.y = p.y + iTimeDelta;
	return fract(sin(dot(p.xy,vec2(12.9898,78.233))) * 43758.5453);
}
*/
