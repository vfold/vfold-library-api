/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Panel;

define(

function() {
    
    var p = new Kinetic.Layer("panel");
    p.constructor = Class;

    var menuLauncher, menu_, toolbar_;

    var folderBar,

    CONTENT_GAP = 3, LOADER_BAR_HEIGHT = 3, CONTENT_HEIGHT;

    function Class() {
        
        menuLauncher = new PanelMenuLauncher()
        menu_  = new Menu();
        PanelToolBar = new PanelToolbar();
        CONTENT_HEIGHT = VFold.PANEL_HEIGHT - LOADER_BAR_HEIGHT

    }

    p.init = function() {
        const background = new PanelBackground;

        folderBar = Core.folderHandler.folderBar;
        menu_.x = menu_.gap;
        menu_.y = VFOLD.PANEL_HEIGHT + menu_.gap;
        menu_.onMenuButtonDown = function(btn) {
            Core.folderHandler.addFolder(btn.options.launch);
        };

        p.add(background);
        p.add(menuLauncher);
        p.add(folderBar);
        p.add(toolbar_);
        p.add(menu_);

        mouseEnabled = false;

        VFOLD.onStageResize = function() {
            background.draw();
        }
    }
    p.addTool = function(tool) {
        toolbar_.addTool(tool)
    }
    p.onWorkspaceChange = function() {
        // Default Logo
        var
        bmpDEF = Core.defaultWorkspace.menu.icon,
            bdtCUR = Core.currentWorkspace.menu.icon;

        menu_.addButtons(Core.currentWorkspace.menu.children);
        menuLauncher.changeLogo(bdtCUR ? bdtCUR : bmpDEF);

        toolbar_.x = folderBar.x = menuLauncher.width;
        toolbar_.onStageResize();
    }

    p.getMenu = function() {
        return menu_
    }
    p.getToolbar = function() {
        return toolbar_
    }


    function PanelBackground() {

        var p = Class.prototype;
        p = new Kinetic.Group();
        p.constructor = Class;

        // Background
        var bg = new Kinetic.Shape("panelBackground");
        // Loader Line TODO: Make a Sync/ASync PreLoader
        var ln = new Kinetic.Shape("panelLoader");
        // Shadow
        var sh = new Kinetic.Shape("shadow");

        const gt = GradientType.LINEAR;
        var m = new Matrix;

        function Class() {

            bg.alpha = .8;
            addChild(bg);
            addChild(sh);
            addChild(ln);
            mouseEnabled = mouseChildren = false;
            ln.y = PanelHandler.CONTENT_HEIGHT;
            sh.y = VFOLD.PANEL_HEIGHT;
        }
        p.draw = function() {
            var g;
            /*********************************
             *  Background
             *********************************/
            g = bg.getContext();
            g.clear();
            g.beginFill(VFOLD.color, .7);
            g.drawRect(0, 0, VFOLD.stage.stageWidth, PanelHandler.CONTENT_HEIGHT);
            g.endFill();
            /*********************************
             *  Shadow
             *********************************/
            g = sh.getContext();
            g.clear();
            m.createGradientBox(VFOLD.stage.stageWidth, 20, Math.PI / 2);
            g.beginGradientFill(gt, [0, 0], [.7, 0], [0, 255], m);
            g.drawRect(0, 0, VFOLD.stage.stageWidth, 20);
            g.endFill();
            /*********************************
             *  Loader Line
             *********************************/
            g = ln.getContext();
            g.clear();
            g.beginFill(UtilityColor.brightness(VFOLD.color, .7));
            g.drawRect(0, 0, VFOLD.stage.stageWidth, PanelHandler.LOADER_BAR_HEIGHT);
            g.endFill();
        }
        return Class;
    }

    function PanelMenuLauncher() {

        var p = new Kinetic.Group();
        p.constructor = Class;

        // Clicked Boolean
        var cB = false;
        // Tween Max
        var TM;
        // Logo Bitmap
        var bL = VFold.call("System.getImage","menu");
        // Height
        var h;

        function Class() {


            var c = UtilityColor.hexToRGB(VFOLD.color);
            TweenMax.to(bL, 0, {
                colorTransform: {
                    redOffset: c.red,
                    greenOffset: c.green,
                    blueOffset: c.blue
                }
            });
            addChild(bL);
            h = PanelHandler.CONTENT_HEIGHT;
            x = 5;
            alpha = .8;

            addEventListener(MouseEvent.MOUSE_OVER, onBtnOver);
            addEventListener(MouseEvent.MOUSE_OUT, onBtnOut);
            addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);

            TweenMax.to(this, 0, {
                glowFilter: {
                    color: 0xFFFFFF,
                    blurX: 30,
                    blurY: 7,
                    alpha: 1,
                    strength: 1.3
                }
            });
            TM = TweenMax.to(this, .15, {
                paused: true,
                glowFilter: {
                    blurX: 7,
                    blurY: 7,
                    alpha: 1
                }
            });
        }
        p.changeLogo = function(logo) {
            if (logo) bL.bitmapData = logo.bitmapData;
            y = (height - bL.height) / 2;
        }

        function onMouseDown() {
            if (cB) {
                cB = false;
                Core.panelHandler.menu.fadeOut();
                onBtnOut();
                VFOLD.stage.removeEventListener(MouseEvent.MOUSE_DOWN, onStageDown);
                addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
            }
            else {
                onBtnOver();
                Core.panelHandler.menu.fadeIn();
                cB = true;
                VFOLD.stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageDown);
                removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
            }
        }

        function onStageDown() {
            if (e.target != this) {
                onMouseDown()
            }
        }

        function onBtnOver() {
            if (!cB) TM.play()
        }

        function onBtnOut() {
            if (!cB) TM.reverse()
        }

        p.getWidth = function() {
            return x * 2 + this.width
        }
        p.getHeight = function() {
            return h
        }

    }

    function PanelToolBar() {

        var p = Class.prototype;
        p = new Kinetic.Group();
        p.constructor = Class;


        // Left Container
        var lc = new Kinetic.Group();
        // Right Container
        var rc = new Kinetic.Group();
        // Width
        var w;
        // Height
        var h;
        // Tool Gap
        const g = 2;

        /******************************************
         * GLOBAL TOOLS *
         ******************************************/

        // Workspace Switcher Tool
        var ws;

        function Class() {

            y = CONTENT_GAP;
            h = (CONTENT_HEIGHT - CONTENT_GAP) / 2 - CONTENT_GAP;
            addEventListener(Tool.TOOL_CHANGE, onToolChange);

            ws = new WorkspaceSwitcher();
            addTool(ws);
            addChild(lc);
            addChild(rc);

            VFOLD.onStageResize = onStageResize;
        }

        p.onStageResize = function() {
            w = VFOLD.stage.stageWidth - x - CONTENT_GAP - g;
            rc.x = w;
            dispatchEvent(new Event(DropBox.ADJUST_OFFSET));
        }

        function onToolChange(e) {
            var t = Tool(e.target);
            var i;
            switch (t.align) {
            case Tool.ALIGN_LEFT:
                for (i = 0; i < lc.numChildren; i++) {
                    if (i != 0) lc.getChildAt(i).x = lc.getChildAt(i - 1).x + lc.getChildAt(i - 1).width + g;
                    else lc.getChildAt(i).x = g;
                }
                break;
            case Tool.ALIGN_RIGHT:
                for (i = 0; i < rc.numChildren; i++) {
                    if (i != 0) rc.getChildAt(i).x = -rc.getChildAt(i - 1).x - rc.getChildAt(i - 1).width - g;
                    else rc.getChildAt(i).x = -rc.getChildAt(i).width;
                }
                break;
            }
        }

        p.addTool = function(tool) {
            var i;
            switch (tool.align) {

            case Tool.ALIGN_LEFT:
                i = lc.numChildren;
                lc.addChild(tool);
                if (i != 0) tool.x = lc.getChildAt(i - 1).x + lc.getChildAt(i - 1).width + g;
                else tool.x = g;
                break;
            case Tool.ALIGN_RIGHT:
                i = rc.numChildren;
                rc.addChild(tool);
                if (i != 0) tool.x = -rc.getChildAt(i - 1).x - tool.width - g;
                else tool.x = -tool.width;
                break;
            }
        }

        p.getWidth = function() {
            return w
        }

        p.getHeight = function() {
            return h
        }

    }
    Panel = Class;
});