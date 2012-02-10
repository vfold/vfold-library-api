/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

define([
    "./layer/folders",
    "./layer/panel",
    "./layer/desktop",
    "./layer/widgets"
    ],

function() {

    const dctLibraries, vctWorkspaces = [];

    var blnInstantiated = false,
        /*********************************
         * Net Connection Pool
         *********************************/
        netPool,
        /*********************************
         * Main Layers
         *********************************/
        folders, widgets, panel, desktop,
        /*********************************
         * Main Layers
         *********************************/
        intWorkspaceIndex,
        /*********************************
         * Core Options
         *********************************/
        AES_KEY, FACEBOOK_APP_ID,
        /*********************************
         * Secure Value Object for User
         *********************************/
        USER,
        /*********************************
         *  Gateway Session and if is Root
         *********************************/
        HEADER,
        /*********************************
         *  Gateway KEY for valid calls
         *********************************/
        ROOT_ENCRYPTED;

    function Page() {

    }

    Page.prototype = {

        init: function(options, gui) {

            gui = gui ? gui : true;

            /****************************************
             *  Check Instantiation
             ****************************************/

            if (!blnInstantiated) {
                blnInstantiated = true;
            }
            else {
                alert("Only one instance of this Class is permitted!");
                return;
            }

            stage = new Kinetic.Stage("stage");

            if (gui) {

                folders = new(require("vfold/layer/folders"))();
                widgets = new(require("vfold/layer/widgets"))();
                panel = new(require("vfold/layer/panel"))();
                desktop = new(require("vfold/layer/desktop"))();

                stage.add(folders);
                stage.add(widgets);
                stage.add(panel);
                stage.add(desktop);
            }

            VFold.addResizeCallback(function() {
                stage.setSize(window.innerWidth || document.body.clientWidth, window.innerHeight || document.body.clientHeight);
            });

            Page.dispatcher = new EventDispatcher();
            Page.dispatcher.fire(VFoldEvent.WORKSPACE_ADD);
        }

    };

    return Page;
});