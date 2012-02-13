/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Container;

define(
    function (){
        
        var children = [];
   
    var p = Class.prototype;

    function Class() {

    }
    
    p.addChild=function(child){
       if(typeof child == "Shape"){
       children[child.name]=child;
       }
       else{
           error("Child is not a Display Object");
       }
    }
    p.removeChild=function(child){
      if(children[child]){
      children.pop(child);
      }  
      else{
          error("Child does exist ");
      }
    }
    

    Container = Class;
    }
);
