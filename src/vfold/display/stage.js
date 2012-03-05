/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Stage() {

    var blnInit = false;
}

Stage.init = function(callback) {

    Stage = gl.init();

    Program.init(function() {

        var callbacks = [];

        Stage.addResizeCallback = function(func) {

            callbacks.push(func);
        }

        /*****************************************************************
         * On Stage resize callback
         *****************************************************************/
        window.onresize = function() {
            // set the resolution
            Stage.width = window.innerWidth;
            Stage.height = window.innerHeight;
            gl.viewport(0, 0, Stage.width, Stage.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            render();
            Stage.projectionMatrix = gl.make2DProjection(Stage.width, Stage.height);

            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }

            gl.flush();
            gl.finish();
        }

        callback();
    });
};