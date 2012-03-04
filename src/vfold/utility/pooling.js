/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Pooling() {
   
   /*****************************************
     *  Objects in the Pool (Active/Inactive)
     *****************************************/
    var availableOBJs = [],
        activeOBJs = [],
        /*********************************
         *  Object Class
         *********************************/
        OC,
        /*****************************************
         *  If last Object got was instantiated
         *****************************************/
        ib;

    function Class(ObjectClass) {

        OC = ObjectClass;
    }

    Class.prototype = {

        getObject: function() {
            var o;
            if (availableOBJs.length > 0) {
                o = availableOBJs.pop();
                ib = false;
            }
            else {
                o = new OC();
                ib = true;
            }
            activeOBJs.push(o);
            return o;
        },

        returnToPool: function(object) {
            activeOBJs.splice(activeOBJs.indexOf(object), 1);
            availableOBJs.push(object);
        },

        returnAll: function() {
            while (activeOBJs.length > 0) {
                var o = activeOBJs[0];
                activeOBJs.splice(0, 1);
                availableOBJs.push(o);
            }
        },

        getObjects: function() {
            return activeOBJs;
        },

        isLastInstantiated: function() {
            return ib;
        },

        numActiveObjects: function() {
            return activeOBJs.length;
        }

    };
    Pooling=Class;
}