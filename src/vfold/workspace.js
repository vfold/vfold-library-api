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

    createWorkspaceLayer();
    
function createWorkspace(){
    
    var p=Class.prorotype;

    /********************************************************************
* Components
********************************************************************/

    var dicFolders=[],
    dicTools=[],
    dicWidgets=[],
    dicDesktops=[];
    
    function Class(){
        
    }
    
            p.title="Untitled";
    p.menu=new MenuOptions;

    p.getFolders=function(){return dicFolders}
    p.getTools=function(){return dicTools}
    p.getWidgets=function(){return dicWidgets}
    p.getDesktops=function(){return dicDesktops}

    p.getComponent=function(classPath){

        var
                f=dicFolders[classPath],
                d=dicDesktops[classPath],
                w=dicWidgets[classPath],
                t=dicTools[classPath];

        return f?f:d?d:w?w:t?t:null;
    }


    p.setComponent=function(component){

        switch(component.type){

            case VOComponent.DESKTOP:
                component.initOnce=true;
                dicDesktops[component.class_path]=component;
                break;

            case VOComponent.FOLDER:
                
                var parent:MenuOptions=menu;
                var titles:Array = component.menu_path.split(".");
                for (var i:int;i<titles.length;i++){
                    var title:String = titles[i];
                    var child:MenuOptions=parent.children[title];
                    if(!child){
                        child=new MenuOptions();
                        child.title=title;
                        if(i==titles.length-1){
                            child.launch=component.class_path;
                        }
                        parent.setChild(child);
                    }
                    parent=child;
                }
                dicFolders[component.class_path]=component;
                break;

            case VOComponent.WIDGET:

                dicWidgets[component.class_path]=component;
                break;

            case VOComponent.TOOL:
                component.initOnce=true;
                dicTools[component.class_path]=component;
                break;

            default:
                trace("Unrecognized type");
                break;

        }
    }
}

    function createWorkspaceLayer() {

        var p = new Kinetic.Layer("WorkspaceLayer");
        p.constructor = Class;

        function Class() {

            this.dispatcher = new EventDispatcher();
        }

        WorkspaceLayer = Class;
    }


});