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

        shader.baseURL = 'vfold/shader/';

        loadShaders([
            'vertex-2d',
            'fragment-2d',
            'fragment-bezier'
                ]);

        function loadShaders(filenames) {
            var loadCount = 0;
            for (var i = 0; i < filenames.length; i++) {
                loadShader(filenames[i], function() {
                    loadCount++;
                    if (loadCount == filenames.length) {
                        makeShaders();
                    }
                })
            }
        }

        function loadShader(filename, callback) {

            var arr = filename.split("-");
            var script = document.createElement('script');
            script.id = filename;

            var shaders;

            switch (arr[0]) {
            case "vertex":
                script.type = "x-shader/x-vertex";
                shaders = vertexShaders;
                break;
            case "fragment":
                script.type = "x-shader/x-fragment";
                shaders = fragmentShaders;
                break;
            default:
                return;
                break;
            }

            require(["text!"+shader.baseURL+filename+".html"], function(text) {
                script.text = text;
                document.getElementsByTagName('head')[0].appendChild(script);
                callback();
            });
        }
        
        function makeShaders(){

        /*****************************************************************
         * Setup a GLSL program for Matrix Positioning and Default Pixel 
         * Color assignment
         *****************************************************************/

        var program = gl.createProgram([vertexShaders['2d'], fragmentShaders['2d']]);

        // look up where the vertex data needs to go.
        program.positionLocation = gl.getAttribLocation(program, "a_position");
        // lookup uniforms
        program.colorLocation = gl.getUniformLocation(program, "u_color");
        program.matrixLocation = gl.getUniformLocation(program, "u_matrix");

        shader.NORMAL = program;
        }
    }
});