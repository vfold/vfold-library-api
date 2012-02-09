/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/
 
define(
    function (){
    Class.prototype = new Kinetic.Layer("panel");
    Class.prototype.constructor = Class;

    function Class() {

    }

    return Class;
    }
);
