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
    var blnInit = false;

    c.init = function() {

        /*****************************************************************
         * Check if Stage is already active
         *****************************************************************/

        if (blnInit) {
            error("Stage is already active");
            return;
        }
        blnInit = true;

    };

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
});