/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

define(

function() {
   
   Class.prototype = new Kinetic.Layer("panel");
   Class.prototype.constructor = Class;

        const menuLauncher = new PanelMenuLauncher, menu_ = new Menu(), toolbar_ = new PanelToolBar;

        var folderBar: DisplayObject;

        public static const CONTENT_GAP: uint = 3;
        public static const LOADER_BAR_HEIGHT: uint = 3;
        public static const CONTENT_HEIGHT: uint = VFOLD.PANEL_HEIGHT - LOADER_BAR_HEIGHT;

        function Class() {

        }

        p.init(): void {
            const background: PanelBackground = new PanelBackground;

            folderBar = Core.folderHandler.folderBar;
            menu_.x = menu_.gap;
            menu_.y = VFOLD.PANEL_HEIGHT + menu_.gap;
            menu_.onMenuButtonDown = function(btn: MenuButton): void {
                Core.folderHandler.addFolder(btn.options.launch);
            };

            addChild(background);
            addChild(menuLauncher);
            addChild(folderBar);
            addChild(toolbar_);
            addChild(menu_);

            mouseEnabled = false;

            VFOLD.onStageResize = function(): void {
                background.draw();
            }
        }
        p.addTool(tool: Tool): void {
            toolbar_.addTool(tool)
        }
        override protected
        function onWorkspaceChange(e: Event): void {
            // Default Logo
            var
            bmpDEF: Bitmap = Core.defaultWorkspace.menu.icon,
                bdtCUR: Bitmap = Core.currentWorkspace.menu.icon;

            menu_.addButtons(Core.currentWorkspace.menu.children);
            menuLauncher.changeLogo(bdtCUR ? bdtCUR : bmpDEF);

            toolbar_.x = folderBar.x = menuLauncher.width;
            toolbar_.onStageResize();
        }

        p.get menu(): Menu {
            return menu_
        }
        p.get toolbar(): DisplayObject {
            return toolbar_
        }

    }
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

    const gt: String = GradientType.LINEAR;
    var m: Matrix = new Matrix;

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

function PanelBackground() {

    var p = Class.prototype;
    p = new Kinetic.Group();
    p.constructor = Class;

    function {

        // Clicked Boolean
        var cB: Boolean = false;
        // Tween Max
        var TM: TweenMax;
        // Logo Bitmap
        var bL: Bitmap = new Images.VFoldMenu;
        // Height
        var h: Number;

        p.PanelMenuLauncher(): void {
            var c: Object = UtilityColor.hexToRGB(VFOLD.color);
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
        p.changeLogo(logo: Bitmap): void {
            if (logo) bL.bitmapData = logo.bitmapData;
            y = (height - bL.height) / 2;
        }

        function onMouseDown(e: MouseEvent = null): void {
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

        function onStageDown(e: Event): void {
            if (e.target != this) {
                onMouseDown()
            }
        }

        function onBtnOver(e: MouseEvent = null): void {
            if (!cB) TM.play()
        }

        function onBtnOut(e: MouseEvent = null): void {
            if (!cB) TM.reverse()
        }

        overridep.get width(): Number {
            return x * 2 + super.width
        }
        overridep.get height(): Number {
            return h
        }

    }
    class PanelToolBar extends Sprite {

        // Left Container
        var lc: Sprite = new Sprite;
        // Right Container
        var rc: Sprite = new Sprite;
        // Width
        var w: Number;
        // Height
        var h: Number;
        // Tool Gap
        const g: uint = 2;

        /******************************************
         * GLOBAL TOOLS *
         ******************************************/

        // Workspace Switcher Tool
        var ws: WorkspaceSwitcher;

        p.PanelToolBar() {

            y = PanelHandler.CONTENT_GAP;
            h = (PanelHandler.CONTENT_HEIGHT - PanelHandler.CONTENT_GAP) / 2 - PanelHandler.CONTENT_GAP;
            addEventListener(Tool.TOOL_CHANGE, onToolChange);

            ws = new WorkspaceSwitcher();
            addTool(ws);
            addChild(lc);
            addChild(rc);

            VFOLD.onStageResize = onStageResize;
        }
        p.onStageResize(): void {
            w = VFOLD.stage.stageWidth - x - PanelHandler.CONTENT_GAP - g;
            rc.x = w;
            dispatchEvent(new Event(DropBox.ADJUST_OFFSET));
        }

        function onToolChange(e: Event): void {
            var t: Tool = Tool(e.target);
            var i: uint;
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
        p.addTool(tool: Tool): void {
            var i: uint;
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
        overridep.get width(): Number {
            return w
        }
        overridep.get height(): Number {
            return h
        }

        return Class;
    });