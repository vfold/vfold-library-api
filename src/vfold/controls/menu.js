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

        var p = new MenuButtons(VFOLD.color, intGAP);

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
                if (e.target is MenuButton) {

                    if (mbs) if (mbs != e.target.parent.parent) mbs.fadeOut();

                    mbt = e.target as MenuButton;
                    mbs = e.target.parent.buttonContainer as MenuButtons;

                    mbt.onMouseOver();
                    mbs.fadeIn();
                    mbs.previousIndex = mbt.index;
                }
            });

            addEventListener(MouseEvent.MOUSE_OUT, function(e) {
                if (e.target is MenuButton) {

                    mbt = e.target as MenuButton;
                    mbt.onMouseOut();
                }
            });

            addEventListener(MouseEvent.MOUSE_DOWN, function(e) {
                if (e.target is MenuButton) {

                    mbt = e.target as MenuButton;
                    mbt.onMouseDown();
                    if (fncDWN) fncDWN(mbt);
                }
            });
        }
        
        p.getGap(): int {
            return intGAP
        }
        
        p.setMenuButtonCallback(callback): void {
            fncDWN = callback;
        }

        Menu = Class;
    }

    /********************************************
     * Drop down list of menu Buttons that can 
     * have manu additional attributes
     ********************************************/

    function createMenuButton() {

        var p = new Kinetic.Group("menuButton");


        function Class() {
            
        }
        MenuButton = Class;
    }
    
        /********************************************
     * Drop down list of menu Buttons that can 
     * have manu additional attributes
     ********************************************/

    function createMenuButtons() {

        var p = new Kinetic.Layer("menuButtons");


        function Class() {
            
        }
        
            // Button Vector
    var bV:Vector.<MenuParent>=new Vector.<MenuParent>(),
    // Button Color
     bC,
    // Button Gap
     bG,

    // Tween Time-line Lite
     ttl,
    // Tween-Max Array
     tma=[],
    // Tween-Objects Array
     toa=[],
    // Tween Duration
     tdr=.35,

    // Previous Index
     pI:uint;

    p.MenuButtons(buttonColor:uint,buttonGap:uint) {

        mouseEnabled=false;
        mouseChildren=false;
        bC=buttonColor;
        bG=buttonGap;

        ttl = new TimelineLite({paused:true});
    }
    p.addButtons(dataButtons:Dictionary):void {

        var i:uint=0;
        var j:uint=bV.length;
        var mxW:Number=0;

        for each (var button:MenuOptions in dataButtons){
            bV[i]=new MenuParent(
                    bC,
                    bG,
                    button);
            bV[i].button.index=i;
            bV[i].button.alpha=0;
            if(i!=0){

                bV[i].y+=i*(bV[i-1].height+bG);
            }
            if(i!=j){

                mxW=Math.max(mxW,bV[i].button.width);
            }
            else{

                mxW=bV[i].button.width;
            }
            toa.push(bV[i].button);
            addChild(bV[i]);
            i++;
        }

        i=j;
        if(j>1)if(mxW>bV[j-1].button.width)i=0;

        for (i;i<bV.length;i++){

            bV[i].width=mxW;
        }
        ttl.clear();
        tma=TweenMax.allFromTo(toa,tdr,{alpha:0,y:"50"},{alpha:1,y:"-50"},tdr/toa.length);
        ttl.insertMultiple(tma);
    }
    p.fadeIn():void{

        ttl.play();
        mouseChildren=true;
    }
    p.fadeOut():void{

        ttl.reverse();
        mouseChildren=false;

        if(bV.length>0){

            bV[pI].buttonContainer.fadeOut();
        }
    }
    p.set previousIndex(value:uint):void{pI=value}
}
}


function MenuParent(){
    
    

    // Button Container
    var bC:MenuButtons;
    // Button Label
    var bL:MenuButton;
    // Button Gap
    var bG:uint;

    function Class(buttonColor,buttonGap,buttonData):void{
        bG=buttonGap;
        bC=new MenuButtons(buttonColor,bG);
        bL=new MenuButton(buttonColor,buttonData,buttonData.children.length>0);

        addChild(bC);
        addChild(bL);

        if(buttonData)bC.addButtons(buttonData.children);
    }
    p.getButtonContainer():MenuButtons{return bC}
    p.getButton():MenuButton{return bL}

    p.setWidth(value:Number):void {

        bL.width = value;
        bC.x=value+bG;
    }
    p.getHeight():Number {
    
    return bL.height;
    }
}

        MenuButtons = Class;
    }
});