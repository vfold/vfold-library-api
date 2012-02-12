/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Stage = {};

define(

function() {

    var c = Stage;

    /*****************************************************************
     * Check the WebGL context support
     *****************************************************************/
     
     var canvas = document.createElement("canvas");

    function hasGL() {
        try {
            return ( !! (window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))));
        }
        catch (e) {
            return false;
        }
    }

    if (!hasGL()) {
        alert("WebGL not working..");
    }

    var gl = canvas.getContext("experimental-webgl");

    if (!gl) {
        gl = canvas.getContext('webgl');
    }

    /*****************************************************************
     * On Stage resize callback
     *****************************************************************/

    var callbacks = [];

    window.onresize = function onWindowResize() {

        Stage.width = canvas.width = window.innerWidth || document.body.clientWidth;
        Stage.height = canvas.height = window.innerHeight || document.body.clientHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    };

    c.addResizeCallback = function(func) {
        callbacks.push(func);

    }

    /*****************************************************************
     * Setup a GLSL program
     *****************************************************************/

    var vertexShader = createShaderFromScriptElement(gl, "2d-vertex-shader");
    var fragmentShader = createShaderFromScriptElement(gl, "2d-fragment-shader");
    var program = createProgram(gl, [vertexShader, fragmentShader]);
    gl.useProgram(program);

    var positionLocation = gl.getAttribLocation(program, "a_position");

    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
});