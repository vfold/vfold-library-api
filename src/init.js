/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/
 

/********************************************
 * Global variables
 ********************************************/
var stage;

/********************************************
 * Global Constants
 ********************************************/
const VFoldEvent = {
    WORKSPACE_CHANGE: "workspaceChange",
    WORKSPACE_ADD: "workspaceAdd",
    FOLDER_CREATE: "FolderAdd",
    FOLDER_CLOSING: "FolderClose",
    FOLDER_SELECT: "FolderSelect"
};

require([
    "vfold/core",
    "vfold/vfold",
    "vfold/page",
    "vfold/options",
    "vfold/display/stage",
    "vfold/display/container",
    "vfold/utility/pooling",
    "vfold/utility/webgl",
    "lib/event",
    ],

function() {
    
    var opt = new Options();

    opt.aesKey = "796x9qh27xcrb69q27xcrb61274xcr6b";
    opt.facebookAppID = "";
    opt.rootPassword = "w957cbnooo5796";
    
    Page.init();

});

    /**
     * Wrapped logging function.
     * @param {string} msg The message to log.
     */
    var log = function(msg) {
            if (window.console && window.console.log) {
                window.console.log(msg);
            }
        };
    /**
     * Wrapped logging function.
     * @param {string} msg The message to log.
     */
    var error = function(msg) {
            if (window.console) {
                if (window.console.error) {
                    window.console.error(msg);
                }
                else if (window.console.log) {
                    window.console.log(msg);
                }
            }
        };