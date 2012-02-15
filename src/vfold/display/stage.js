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

    stage.init = function() {

        /*****************************************************************
         * On Stage resize callback
         *****************************************************************/

        stage = gl.init();

        var callbacks = [];

        stage.addResizeCallback = function(func) {
           
           callbacks.push(func);
        }

        window.onresize = function() {
            
                    // set the resolution
            
            stage.width = window.innerWidth;
            stage.height = window.innerHeight;
            gl.viewport(0, 0, stage.width, stage.height);
            gl.uniform2f(gl.resolutionLocation, stage.width, stage.height);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }
            
            //draw();
        }
        


    };
});