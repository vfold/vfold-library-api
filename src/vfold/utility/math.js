/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Math = {};

define(

function() {

    var c = Math;

    // Returns a random integer from 0 to range - 1.
    c.randomInt = function(range) {
        return Math.floor(Math.random() * range);
    };

});