/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var material = {};

define(

function() {

    material.init = function(callback) {

        var vertexShaders = {},
            fragmentShaders = {};

        material.baseURL = 'vfold/shader/';

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
                        makeMaterials();
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

            require(["text!" + material.baseURL + filename + ".html"], function(text) {
                script.text = text;
                document.getElementsByTagName('head')[0].appendChild(script);
                callback();
            });
        }

        function makeMaterials() {

            /*****************************************************************
             * Setup a GLSL program for Matrix Positioning and Default Pixel 
             * Color assignment
             *****************************************************************/

            var program = create([vertexShaders['2d'], fragmentShaders['2d']]);

            program.positionLocation = gl.getAttribLocation(program, "a_position");
            program.colorLocation = gl.getUniformLocation(program, "u_color");
            program.matrixLocation = gl.getUniformLocation(program, "u_matrix");

            material.NORMAL = program;

            callback();
        }

        function use(program) {
           
           gl.linkProgram(program);
            // Check the link status
            var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!linked) {
                // something went wrong with the link
                error("Error in program linking:" + gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
        }

        /**
         * Creates a program, attaches shaders, binds attrib locations
         * @param {!Array.<!WebGLShader>} shaders The shaders to attach
         * @param {!Array.<string>} opt_attribs The attribs names.
         * @param {!Array.<number>} opt_locations The locations for the attribs.
         */

        function create(shaders, opt_attribs, opt_locations) {
            var program = gl.createProgram();
            for (var i = 0; i < shaders.length; i++) {
                gl.attachShader(program, shaders[i]);
            }
            if (opt_attribs) {
                for (var i = 0; i < opt_attribs.length; i++) {
                    gl.bindAttribLocation(
                    program, opt_locations ? opt_locations[i] : i, opt_attribs[i]);
                }
            }
            return program;
        };
    }
});