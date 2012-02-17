/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var shader = {};

define(

function() {

    shader.init = function() {

        var vertexShaders = {},
            fragmentShaders = {};

        shader.baseURL = 'src/vfold/shader/';

        loadShader('vertex-2d');
        loadShader('fragment-2d');
        loadShader('fragment-bezier');

        /*****************************************************************
         * TODO: move this generic function to another class
         *****************************************************************/

        function loadShader(filename) {

            var arr = filename.split("-");
            var script = document.createElement('script');
            script.id = filename;
            script.src = shader.baseURL + filename + ".js";


            switch (arr[0]) {
            case "vertex":
                script.type = "x-shader/x-vertex";
                break;
            case "fragment":
                script.type = "x-shader/x-vertex";
                break;
            default:
                return;
                break;
            }

            document.getElementsByTagName('head')[0].appendChild(script);
            fragmentShaders[arr[1]] = gl.createShaderFromScript(filename);
        }

        /*****************************************************************
         * Setup a GLSL program for Matrix Positioning and Default Pixel 
         * Color assignment
         *****************************************************************/

        var vertexShader = gl.createShaderFromScript("vertex-default");
        var fragmentShader = gl.createShaderFromScript("fragment-default");

        var program = gl.createProgram([vertexShader, fragmentShader]);

        // look up where the vertex data needs to go.
        program.positionLocation = gl.getAttribLocation(program, "a_position");
        // lookup uniforms
        program.colorLocation = gl.getUniformLocation(program, "u_color");
        program.matrixLocation = gl.getUniformLocation(program, "u_matrix");

        shader.NORMAL = program;

/*
        var vertexShader = gl.createShaderFromScript("vertex-shader");
        var fragmentShader = gl.createShaderFromScript("fragment-shader");
        var program = gl.createProgram([vertexShader, fragmentShader]);
        */
    }
});