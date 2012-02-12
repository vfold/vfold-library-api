/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Menu, MenuButton, MenuButtons;

define(

function() {

    createMenuButton();
    createMenuButtons();
    createMenu();

    /********************************************
     * Drop down list of menu Buttons that can 
     * have manu additional attributes
     ********************************************/

    function createMenu() {
        // Menu Parent
        var p = new MenuButtons(VFold.color, intGAP);

        // Target Event ParentContainer
        var intGAP = 7;
        var fncDWN;

        function Class() {

            var
            /*********************************
             * Parent Menu Button
             *********************************/
            mbt,
            /*********************************
             * Child Menu Buttons
             *********************************/
            mbs;
            
            addEventListener(MouseEvent.MOUSE_OVER, function(e) {
                if (MenuButton) {

                    if (mbs) if (mbs != e.target.parent.parent) mbs.fadeOut();

                    mbt = e.target;
                    mbs = e.target.parent.buttonContainer;

                    mbt.onMouseOver();
                    mbs.fadeIn();
                    mbs.previousIndex = mbt.index;
                }
            });

            addEventListener(MouseEvent.MOUSE_OUT, function(e) {
                if (e.target) {

                    mbt = e.target;
                    mbt.onMouseOut();
                }
            });

            addEventListener(MouseEvent.MOUSE_DOWN, function(e) {
                if (MenuButton) {

                    mbt = e.target;
                    mbt.onMouseDown();
                    if (fncDWN) fncDWN(mbt);
                }
            });
        }

        p.getGap = function() {
            return intGAP;
        }

        p.setMenuButtonCallback = function(callback) {
            fncDWN = callback;
        }

        Menu = Class;
    }

    /********************************************
     * Drop down list of menu Buttons that can 
     * have manu additional attributes
     ********************************************/

    function createMenuButtons() {

        var p = new Kinetic.Layer("menuButtons");

        function Class(buttonColor, buttonGap) {

            bC = buttonColor;
            bG = buttonGap;

            ttl = new TimelineLite({
                paused: true
            });
        }

        // Button Vector
        var bV = [],
            // Button Color
            bC,
            // Button Gap
            bG,
            // Tween Time-line Lite
            ttl,
            // Tween-Max Array
            tma = [],
            // Tween-Objects Array
            toa = [],
            // Tween Duration
            tdr = .35,

            // Previous Index
            pI;

        p.addButtons = function(dataButtons) {

            var i = 0;
            var j = bV.length;
            var mxW = 0;

            for (var button in dataButtons) {
                bV[i] = new MenuParent(
                bC, bG, button);
                bV[i].button.index = i;
                bV[i].button.alpha = 0;
                if (i != 0) {

                    bV[i].y += i * (bV[i - 1].height + bG);
                }
                if (i != j) {

                    mxW = Math.max(mxW, bV[i].button.width);
                }
                else {

                    mxW = bV[i].button.width;
                }
                toa.push(bV[i].button);
                addChild(bV[i]);
                i++;
            }

            i = j;
            if (j > 1) if (mxW > bV[j - 1].button.width) i = 0;

            for (i; i < bV.length; i++) {

                bV[i].width = mxW;
            }
            ttl.clear();
            tma = TweenMax.allFromTo(toa, tdr, {
                alpha: 0,
                y: "50"
            }, {
                alpha: 1,
                y: "-50"
            }, tdr / toa.length);
            ttl.insertMultiple(tma);
        }
        p.fadeIn = function() {

            ttl.play();
            mouseChildren = true;
        }
        p.fadeOut = function() {

            ttl.reverse();
            mouseChildren = false;

            if (bV.length > 0) {

                bV[pI].buttonContainer.fadeOut();
            }
        }
        p.setPreviousIndex = function(value) {
            pI = value
        }

        function MenuParent() {

            var p = MenuParent.prototype;

            // Button Container
            var bC;
            // Button Label
            var bL;
            // Button Gap
            var bG;

            function Class(buttonColor, buttonGap, buttonData) {
                bG = buttonGap;
                bC = new MenuButtons(buttonColor, bG);
                bL = new MenuButton(buttonColor, buttonData, buttonData.children.length > 0);

                addChild(bC);
                addChild(bL);

                if (buttonData) bC.addButtons(buttonData.children);
            }
            p.getButtonContainer = function() {
                return bC
            }
            p.getButton = function() {
                return bL
            }

            p.setWidth = function(value) {

                bL.width = value;
                bC.x = value + bG;
            }
            p.getHeight = function() {

                return bL.height;
            }
        }
            MenuButtons = Class;
    }

    /********************************************
     * The Child Button of a group belonging in   
     * menu tree hierarchy
     ********************************************/

    function createMenuButton() {

        var p = new Kinetic.Group("menuButton");


        function Class() {

        }
        MenuButton = Class;
    }
});