/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Folders;

define(['vfold/display/container'],

function() {

    var p = new Container(),

        /*********************************
         *  Workspace Containers
         *********************************/
        wrkContainers = [],
        /*********************************
         *  Active Folder
         *********************************/
        actFolder,
        /*********************************
         *  Folder Tabs
         *********************************/
        fldTabs;

    function Class() {

        this.dispatcher = new EventDispatcher();
    }



    function onTabClose() {
        removeFolder(fldTabs.currentData);
    }

    function onTabSelect() {
        selectFolder(fldTabs.currentData);
    }

    function selectFolder(folder) {
        if (wSpace.numChildren > 0) Folder(wSpace.getChildAt(wSpace.numChildren - 1)).active = false;
        folder.active = true;
        fldTabs.selectTab(folder);
        actFolder = folder;
        wSpace.addChildAt(folder, wSpace.numChildren);
        dispatchEvent(new Event(FOLDER_SELECT));
    }

    p.constructor = Class;

    p.init = function() {

        // This is a dummy dashboard workspace
        this.add(new Kinetic.Layer());
        this.dispatcher.addListener(VFoldEvents.FOLDER_SELECT, function() {
            p.selectFolder(Folder(e.target));
        });

        fldTabs = new Tabs(Panel.CONTENT_HEIGHT / 2 - 3, VFold.color, .7, onTabSelect, onTabClose);
        fldTabs.y = PanelHandler.CONTENT_HEIGHT - fldTabs.height;
        addChild(fldTabs);

        VFold.addResizeCallback(function() {
            fldTabs.adjust(stage.width - x);
        });
    }

    p.addFolder = function(classPath) {
        WorkspaceComponent.instantiate(classPath, function(instance) {
            var f = instance;
            fldTabs.addTab(f.name, f);
            dispatchEvent(new Event(FOLDER_CREATE));
            selectFolder(f);
        });
    }

    p.removeFolder = function(folder) {
        actFolder = folder;
        wSpace.removeChild(folder);
        dispatchEvent(new Event(FOLDER_CLOSING));
        if (wSpace.numChildren > 0) Folder(wSpace.getChildAt(wSpace.numChildren - 1)).active = true;
    }

    p.closeFolder = function(folder) {
        fldTabs.removeTabByData(folder);
        removeFolder(folder);
    }

    p.selectFolder = selectFolder;

    p.getFolderBar = function() {
        return fldTabs
    }
    p.getActiveFolder = function() {
        return actFolder
    }

    p.onWorkspaceChange = function() {
        this.remove(0);
        this.add(wrkContainers[Core.currentWorkspaceIndex]);
    }

    function onWorkspaceAdd() {
        wrkContainers.push(new Kinetic.Container());
    }

    function getCurrentContainer() {
        return wrkContainers[Core.currentWorkspaceIndex]
    }
Folders = Class;
}
);