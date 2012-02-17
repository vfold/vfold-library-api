/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var stage = {};

define(

function() {

    var blnInit = false;

    stage.init = function(callback) {


        stage = gl.init();

        program.init(function() {


            var callbacks = [];

            stage.addResizeCallback = function(func) {

                callbacks.push(func);
            }

            /*****************************************************************
             * On Stage resize callback
             *****************************************************************/

            window.onresize = function() {
                // set the resolution
                stage.width = window.innerWidth;
                stage.height = window.innerHeight;
                gl.viewport(0, 0, stage.width, stage.height);
                gl.clear(gl.COLOR_BUFFER_BIT);
                stage.projectionMatrix = gl.make2DProjection(stage.width, stage.height);

                for (var i = 0; i < callbacks.length; i++) {
                    callbacks[i]();
                }

            }
            callback();
        });
    };
});