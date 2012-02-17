/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Shader={};
var ShaderType={VERTEX:"x-shader/x-vertex",FRAGMENT:"x-shader/x-fragment"}

define(

function() {

        /*****************************************************************
         * Matrix positioning Vertex Shader
         *****************************************************************/

        loadScript("vertex-default",ShaderType.VERTEX, '\
            // vertex shader\
attribute vec2 a_position;\
uniform mat3 u_matrix;\
void main() {\
// Multiply the position by the matrix.\
gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);}');

        /*****************************************************************
         * Default Color Shader
         *****************************************************************/

        loadScript("fragment-default",ShaderType.FRAGMENT, '\
precision mediump float;\
uniform vec4 u_color;\
void main() {\
gl_FragColor = u_color;}');

        /*****************************************************************
         * Bezier Curve Shader
         *****************************************************************/

        loadScript("fragment-bezier",ShaderType.FRAGMENT,'\
 #extension GL_OES_standard_derivatives : enable\
#ifdef GL_ES\
precision highp float;\
#endif\
varying vec2 vBezierCoord;\
void main() {\
    vec2 px = dFdx(vBezierCoord);\
vec2 py = dFdy(vBezierCoord);\
float fx = 2.0 * vBezierCoord.x * px.x - px.y;\
float fy = 2.0 * vBezierCoord.y * py.x - py.y;\
float sd = (vBezierCoord.x * vBezierCoord.x - vBezierCoord.y) / sqrt(fx * fx + fy * fy);\
gl_FragColor = vec4(0.0, 0.0, 1.0, clamp(0.5 - sd, 0.0, 1.0));');

        /*****************************************************************
         * TODO: move this generic function to another class
         *****************************************************************/

        function loadScript(id, type, src) {

            var script = document.createElement('script');
            script.id = id;
            script.type = type;
            script.text = src;
            document.getElementsByTagName('head')[0].appendChild(script);
        }

        /*****************************************************************
         * Setup a GLSL program for Matrix Positioning and Default Pixel 
         * Color assignment
         *****************************************************************/

        var vertexShader = gl.createShaderFromScript("vertex-shader");
        var fragmentShader = gl.createShaderFromScript("fragment-shader");
        var program = gl.createProgram([vertexShader, fragmentShader]);

        // look up where the vertex data needs to go.
        program.positionLocation = gl.getAttribLocation(program, "a_position");
        // lookup uniforms
        program.colorLocation = gl.getUniformLocation(program, "u_color");
        program.matrixLocation = gl.getUniformLocation(program, "u_matrix");

        Shader.NORMAL = program;

/*
        var vertexShader = gl.createShaderFromScript("vertex-shader");
        var fragmentShader = gl.createShaderFromScript("fragment-shader");
        var program = gl.createProgram([vertexShader, fragmentShader]);
        */

});