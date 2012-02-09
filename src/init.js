/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

/********************************************
 * Global Classes
 ********************************************/
var Pooling,
/********************************************
 * Global variables
 ********************************************/
stage;

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
    "vfold/page",
    "vfold/options",
    "vfold/utility/pooling",
    "lib/event",
    "lib/kinetic"],

function(page, options, pooling) {

    Page = page;
    Pooling = pooling;

    var opt = new options();

    opt.aesKey = "796x9qh27xcrb69q27xcrb61274xcr6b";
    opt.facebookAppID = "";
    opt.rootPassword = "w957cbnooo5796";

    var pge = new Page();

    pge.init(opt)
});