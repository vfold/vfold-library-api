/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var VFold;

define(

function() {

    var callbacks = [];

    function onWindowResize() {

        for (var i = 0; i < callbacks.length; i++) {
            callbacks[i]();
        }
    }

    function Class() {

        this.color = 0x232323;
    }

    Class.prototype = {

        addResizeCallback: function(func) {
            callbacks.push(func);
        }
    };
   
   window.onresize = onWindowResize;
   
   VFold=Class;
});