/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

    /****************************************************************
     * Event Constants
     ****************************************************************/
const VfoldEvents = {
    WORKSPACE_CHANGE: "workspaceChange",
    WORKSPACE_ADD: "workspaceAdd"
};

var Page = {};
var Stage = {};

define([
    "vfold/layer/folders",
    "vfold/layer/panel",
    "vfold/layer/dekstop",
    "vfold/layer/widgets"
    ],

function() {

    var blnInstantiated = false;
    
                /****************************************************************
     * Main Layers
     ****************************************************************/

    var folders = null,
        widgets = null,
        panel = null,
        desktop = null;

    /****************************************************************
     * Rest of properties
     ****************************************************************/

     var intWorkspaceIndex:int=0;

     const dctLibraries={};
     const vctWorkspaces=[];

    /*********************************
     * Core Options
     *********************************/
     var AES_KEY;
     var FACEBOOK_APP_ID;
    /*********************************
     * Secure Value Object for User
     *********************************/
    var USER;
    /*********************************
     *  Gateway Session and if is Root
     *********************************/
    var HEADER;
    /**********************************
     *  Gateway KEY for acceptable calls
     **********************************/
    var ROOT_ENCRYPTED;
    /*********************************
     * Net Connection Pool
     *********************************/
     const NET_POOL:UtilityPooling=new UtilityPooling(NetConn);


    function Page() {

    }
    
    Page.prototype = {

        test: function init(options, gui) {

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

            Stage = new Kinetic.Stage("stage", window.innerWidth || document.body.clientWidth, window.innerHeight || document.body.clientHeight);

            if (gui) {

                folders = new require("./component/folders")();
                widgets = new require("./component/widgets")();
                panel = new require("./component/panel")();
                desktop = new require("./component/desktop")();

            }
            
            Stage.add(folders);
            Stage.add(widgets);
            Stage.add(panel);
            Stage.add(desktop);

            Page.dispatcher = new EventDispatcher();
            Page.dispatcher.fire(WorkspaceEvents.ADD);
        }

    };

    return Page;
});