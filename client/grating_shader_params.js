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
uniform vec3 color;
uniform float background;
uniform float rando;
uniform float phase; 

/*
float rnd(vec2 x)
{
        int n = int(x.x * 40.0 + x.y * 6400.0);
        n = (n << 13) ^ n;
        return 1.0 - float( (n * (n * n * 15731 + 789221) + 1376312589) & 0x7fffffff) / 1073741824.0;
};
*/

float noi(vec2 p )
{
    //float iTimeDelta=0.0;
    p.x = p.x + rando;
    p.y = p.y + rando;
	return fract(sin(dot(p.xy,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 fragmentPosition = gl_PointCoord-vec2(0.5,0.5); //convert from 0..1 to -0.5..0.5
  float distance = length(fragmentPosition);
  float distanceSqrd = distance * distance;

  vec2 posRotate=vec2(cos(theta)*fragmentPosition[0]-sin(theta)*fragmentPosition[1],
                      sin(theta)*fragmentPosition[0]+cos(theta)*fragmentPosition[1]);

  float grating=sin(posRotate[0]*sf_div*6.28+phase); // phase random, but same for all pixels
  //float mag=1.0*exp(-distanceSqrd/0.01);  // Gaussian
  //float mag_raw=ceil(sigma-distance);
  //float mag=mag_raw*amp;
  // smoothing or ramp ideas:
  // plt.plot(xr, np.ceil( (0.1-(-xr)**2 ) ), '.-'); plt.plot( xr,1.0-(-xr)**2/(4*np.pi*0.1**2)); plt.plot(xr,(0.1-(-xr)**2)**0.3/0.5); plt.show();
  //float distance_mask=max(1.0-(distance/(2.0*2.0*3.14*sigma*sigma)),0.0);
  float distance_mask=ceil(sigma-distance); // circular ramp with sharp edges (at sigma: 0 or 1)

  // If too far away (greater than sigma), will go 0 or negative, making this value 0
  // if close (less than sigma), will be 1.0 
  float alpha_mask=distance_mask; 
  float r=noi(fragmentPosition);
  float colorval=grating*amp;

    // Noisy bit method (Allard/Faubert 2008)
    // Add random jitter btwn -0.5 and 0.5 "8 bit levels"
    // noi is btw 0 and 1.0
  colorval+=(noi(fragmentPosition)-0.5)/255.0;

  colorval *= distance_mask; // don't need distance mask? (Since in alpha)

  colorval=pow(colorval+background, (1.0/2.4)); // then do the inverse Gamma
  gl_FragColor = vec4(colorval, colorval, colorval, 1.0);
}
`;

// Confirmed shader color understanding: 
//float colorval=(fragmentPosition[0]+0.5)/100.0+126.0*1.0/255.0;
// Bu plotting in Pymplt:  plt.plot( np.floor((x/100.0+126/255.)*255 +0.5 ) ); plt.show()
// plt.plot( np.floor((x/100.0+126/255.+(noises-0.5)/255.0)*255 +0.5 ) );
//


// Samsung's Gamma: 2.4 http://www.displaymate.com/Galaxy_S8_ShootOut_01.htm

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

function showShaderGrating(params) {
  var locationOfSf = gl.getUniformLocation(program, "sf_div");
  var locationOfSigma = gl.getUniformLocation(program, "sigma");
  var locationOfAmp = gl.getUniformLocation(program, "amp");
  var locationOfTheta = gl.getUniformLocation(program, "theta");
  var locationOfColor = gl.getUniformLocation(program, "color");
  var locationOfBackground = gl.getUniformLocation(program, "background");
  var locationOfRando = gl.getUniformLocation(program, "rando");
  var locationOfPhase = gl.getUniformLocation(program, "phase");

//sf,sigma,amp,theta,color,background,rando,which) {
  gl.uniform1f(locationOfSf, params.sf);
  gl.uniform1f(locationOfSigma, params.radius);
  gl.uniform1f(locationOfAmp, params.contrast);
  gl.uniform1f(locationOfTheta, params.theta);
  gl.uniform1f(locationOfPhase, params.phase);

  var r, g, b;
  switch(params.color) {
    case 0: // W
      r=1.0;g=1.0;b=1.0;
      break;
    case 1: // G
      r=0.0;g=1.00;b=0.0;
      break;
    case 2: // R
      r=1.0;g=0.00;b=0.0;
      break;
    default: // white. whatever
      r=1.0,g=1.0,b=1.0;
      break;
  }
  gl.uniform3f(locationOfColor,r,g,b);
  gl.uniform1f(locationOfBackground,params.background);
  gl.uniform1f(locationOfRando, params.rando);

  //float mag_red=pow(mag*color[0]+backbround,(1.0/2.4)); // Inverse Gamma (appropriate for a Samsung Sx OLED phone.)
  var back_gammad=Math.pow(params.background,1.0/2.4);
  gl.clearColor(back_gammad,back_gammad,back_gammad, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var which_ori=parseInt(params.ori/90);
  gl.drawArrays(gl.POINTS, which_ori, 1);
}

function clearGrating(background_color) {
  var back_gammad=Math.pow(background_color,1.0/2.4);
  gl.clearColor(back_gammad,back_gammad,back_gammad, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var buffer;
function initializeAttributes() {
  //gl.enable( gl.GL_BLEND );
  //gl.blendFunc(gl.GL_SRC_ALPHA, gl.GL_ONE_MINUS_SRC_ALPHA);
  //gl.blendFunc(gl.GL_SRC_ALPHA, gl.GL_ZERO);
  //gl.blendEquation(gl.GL_FUNC_ADD);

  gl.enableVertexAttribArray(0);
  buffer = gl.createBuffer();  
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

                                                    // 0 (left),90 (up), 180 (left), 270 (down)
                                                    // y=0.5 is above, confusingly
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([ 0.5,0,
                                                    0,0.5,
                                                   -0.5,0,
                                                    0,-0.5
  ]), gl.STATIC_DRAW);

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

  gl.clear(gl.COLOR_BUFFER_BIT);
  return gl;
}
//})();

