/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Page={}

    Page.init = function() {

        window.onresize();

        var shape = new Shape();

        shape.beginFill(1, .2, 0, 1);
        shape.x = 126;
        shape.drawRect(0, 0, 300, 100);
        //shape.endFill();
        //Stage.add(shape);
    }