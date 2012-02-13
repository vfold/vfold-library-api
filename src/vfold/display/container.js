/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Container;

define(

function() {

    var p = Class.prototype;

    function Class() {

        this.children = [];
        this.childrenIDs = [];
    }

    /************************************************
     * Add Child to the container
     *************************************************/

    p.addChild = function(child) {
        this.childrenIDs[child.id] = child;
        child.index = this.children.length;
        child.parent = this;
        this.children.push(child);
    }

    /************************************************
     * Remove Display Object Child from the container
     *************************************************/

    p.removeChild = function(child) {
        this.childrenIDs[child.id] = undefined;
        this.children.splice(child.index, 1);
        setChildrenIndices();
        child = undefined;
    }

    /************************************************
     * Add Child at a specified index
     *************************************************/

    p.addChildAt = function(child, index) {
        this.childrenIDs[child.id] = child;
        child.index = index;
        child.parent = this;
        this.children.splice(index, 0, child);
        setChildrenIndices();
    }

    /************************************************
     * Remove Child from a specific index
     *************************************************/

    p.removeChildAt = function(index) {
        var child = this.children[index];
        this.childrenIDs[child.id] = undefined;
        this.children.splice(index, 1);
        setChildrenIndices();
        child = undefined;
    }
    /************************************************
     * Reorder Children based on their array index
     *************************************************/

    function setChildrenIndices() {
        for (var n = 0; n < this.children.length; n++) {
            this.children[n].index = n;
        }
    }
    Container = Class;
});