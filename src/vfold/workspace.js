/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Workspace, WorkspaceComponent, WorkspaceLayer;

define(

function() {

    createWorkspace();
    createWorkspaceLayer();
    createWorkspaceComponent();

    /********************************************
     * The workspace contains the main layers:
     * Folders, Widgets, Desktop, Panel
     ********************************************/

    function createWorkspace() {

        var p = Class.prorotype;

        /***************************************
         * Components
         ***************************************/

        var dicFolders = [],
            dicTools = [],
            dicWidgets = [],
            dicDesktops = [];

        function Class() {

        }

        p.title = "Untitled";

        p.menu = new MenuOptions;

        p.getFolders = function() {
            return dicFolders;
        };
        p.getTools = function() {
            return dicTools;
        };
        p.getWidgets = function() {
            return dicWidgets;
        };
        p.getDesktops = function() {
            return dicDesktops;
        };

        p.getComponent = function(classPath) {

            var
            f = dicFolders[classPath],
                d = dicDesktops[classPath],
                w = dicWidgets[classPath],
                t = dicTools[classPath];

            return f ? f : d ? d : w ? w : t ? t : null;
        };


        p.setComponent = function(component) {

            var t = WorkspaceComponent.type;

            switch (component.type) {

            case t.DESKTOP:
                component.initOnce = true;
                dicDesktops[component.class_path] = component;
                break;

            case t.FOLDER:

                var parent = menu;
                var titles = component.menu_path.split(".");
                for (var i;
                i < titles.length;
                i++) {
                    var title = titles[i];
                    var child = parent.children[title];
                    if (!child) {
                        child = new MenuOptions();
                        child.title = title;
                        if (i == titles.length - 1) {
                            child.launch = component.class_path;
                        }
                        parent.setChild(child);
                    }
                    parent = child;
                }
                dicFolders[component.class_path] = component;
                break;

            case t.WIDGET:

                dicWidgets[component.class_path] = component;
                break;

            case t.TOOL:
                component.initOnce = true;
                dicTools[component.class_path] = component;
                break;

            default:
                alert("Unrecognized type");
                break;

            }
        };
        Workspace = Class;
    }

    /********************************************************
     * Workspace Layers:
     * Folders, Desktop, Panel, Widgets
     ********************************************************/

    function createWorkspaceLayer() {

        var p = new Kinetic.Layer("WorkspaceLayer");
        p.constructor = Class;

        function Class() {

            this.dispatcher = new EventDispatcher();
        }

        WorkspaceLayer = Class;
    }

    /********************************************************
     * Workspace Component Handler where external libraries
     * are loaded and instantiated appropriately 
     ********************************************************/

    function createWorkspaceComponent() {

        const instances = [];
        var initOnce = false;

        function Class(component) {

        }

        Class.instantiate = function(classPath, onInstantiate) {

            var appDomain = new ApplicationDomain(VFOLD.appDomain);
            var comp = Core.currentWorkspace.getComponent(classPath);
            if (!comp) {
                alert("Component not found!");
                return;
            }
            var vobLib;
            // Dependency Loaded Count
            var dlc = 0;

            init();

            function init() {

                if (appDomain.hasDefinition(comp.class_path)) {

                    if (comp.initOnce && comp.instances.length > 0) {
                        onInstantiate(comp.instances[0]);
                    }
                    else {
                        var compClass = appDomain.getDefinition(comp.class_path),
                            inst = new compClass;
                        inst.name = comp.title;
                        onInstantiate(inst);
                    }

                }
                else if (vobLib) {

                    if (vobLib.dependencies.length > 0) {

                        for (var dependency in vobLib.dependencies) {
                            if (Core.libraries[dependency]) onDependencyLoaded();

                            else {

                                /***********************************************************
                                 * Get Dependency from Database
                                 ***********************************************************/

                                Core.appCall("Library.getByName", function(library) {
                                    loadLibrary(library.data, onDependencyLoaded);
                                }, [dependency]);
                            }
                        }
                    }
                    else {

                        loadLibrary(vobLib.data, onLibraryLoaded)
                    }
                }
                else if (!comp.libraryTitle) {

                    alert("Library ID not specified");
                }
                else {
                    /***********************************************************
                     * Get Library from Database
                     ***********************************************************/

                    Core.appCall("Library.get", function(library) {
                        vobLib = library;
                        init();
                    }, [comp.libraryTitle]);
                }
            }

            function loadLibrary(libraryData, onLibraryLoaded) {

                var rsl = new Loader();
                rsl.contentLoaderInfo.addEventListener(Event.COMPLETE, function() {

                    onLibraryLoaded();
                });
                rsl.loadBytes(libraryData, new LoaderContext(false, appDomain));
            }

            function onDependencyLoaded() {

                dlc++;
                if (dlc == vobLib.dependencies.length) {
                    dlc = 0;
                    loadLibrary(vobLib.data, onLibraryLoaded);
                }
            }

            function onLibraryLoaded() {

                vobLib = null;
                init();
            }

            WorkspaceComponent = Class;
        }
    }

});