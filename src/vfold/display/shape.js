/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Shape;

define(

function() {


    var p=Class.prototype=new Child();

    function Class() {

    }   

    p.beginFill = function(red, green, blue, alpha) {
        
        // Set a random color.
        gl.uniform4f(colorLocation, red, green, blue, alpha);

    }

    // Fills the buffer with the values that define a rectangle.
    p.drawRectangle = function(x, y, width, height) {

        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
       
       gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2]), gl.STATIC_DRAW);

        // Draw the rectangle.
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    
    p.clear = function(){
            p.gl.clear(p.gl.COLOR_BUFFER_BIT);
    }

    Shape = Class;
});