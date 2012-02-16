/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Shader;

define(

function() {
    
    var p = Class.prototype;
    
    function Class(){
        
    }
        /*****************************************************************
         * Setup a GLSL program
         *****************************************************************/

        var vertexShader = gl.createShaderFromScript(gl, "vertex-shader");
        var fragmentShader = gl.createShaderFromScript(gl, "fragment-shader");
        p.program = gl.createProgram([vertexShader, fragmentShader]);
        gl.useProgram(p.program);

        // look up where the vertex data needs to go.
        gl.positionLocation = gl.getAttribLocation(program, "a_position");
        // lookup uniforms
        gl.colorLocation = gl.getUniformLocation(program, "u_color");
        gl.matrixLocation = gl.getUniformLocation(program, "u_matrix");


});