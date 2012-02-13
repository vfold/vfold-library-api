/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Page = {};

define(

function() {

    var c = Page;

    c.init = function() {

        require([
            "vfold/display/child",
            "vfold/display/container",
            "vfold/display/shape",
            "vfold/display/sprite",
            "vfold/display/stage",

            "vfold/layer/folders",
            "vfold/layer/panel",
            "vfold/layer/desktop",
            "vfold/layer/widgets",

            'vfold/controls/menu'], function() {
            Stage.init();
            var shape = new Shape();
            shape.beginFill(.5, .2, 0, 1);
            shape.drawRect(0, 0, 100, 100);
            shape.endFill();
            Stage.add(shape);
        });
    };
});