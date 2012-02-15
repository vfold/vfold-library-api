/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var page = {};

define(
function() {

    var c = page;

    c.init = function() {

        require([
            
            "vfold/display/shape"], function() {
            
            window.onresize();
            var shape = new Shape();
            shape.beginFill(1, .2, 0, 1);
            shape.drawRect(0, 0, 200, 100);
            shape.x=100;
            //shape.endFill();
            //Stage.add(shape);
            
        });
    };
});