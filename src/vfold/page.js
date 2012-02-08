/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

const WorkspaceEvents = {
    CHANGE: "workspaceChange",
    ADD: "workspaceAdd"
};
var Page = {};

define([
    "vfold/component/folder",
    "vfold/component/tool",
    "vfold/component/wallpaper",
    "vfold/component/widget"
    ], function() {

    var blnInstantiated = false;

    function Page(options, gui) {



        gui = gui ? gui : true;

        /***********************
         *  Check Instance
         ***********************/

        if (!blnInstantiated) {
            blnInstantiated = true;
        }
        else {
            alert("Only one instance of this Class is permitted!");
            return;
        }

        var stage = new Kinetic.Stage("stage", window.innerWidth || document.body.clientWidth, window.innerHeight || document.body.clientHeight);

        if (gui) {
            var folders = new require("vfold/component/folder")();
            var widget = new require("vfold/component/folder")();
        }

        Page.dispatcher = new EventDispatcher();
        Page.dispatcher.fire(WorkspaceEvents.ADD);

    }
    Page.prototype = {

        test: function test() {
            alert("sss");
        }

    };
    return Page;
});