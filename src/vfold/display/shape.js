/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Shape;

define(["./child"],

function() {

    var p = Class.prototype = new Child();

    function Class() {

        var path;


        p.beginFill = function(red, green, blue, alpha) {

            var buffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
            gl.enableVertexAttribArray(gl.positionLocation);
            gl.vertexAttribPointer(gl.positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.uniform4f(gl.colorLocation, red, green, blue, alpha);
        }

        // Fills the buffer with the values that define a rectangle.
        p.drawRect = function(x1, y1, width, height) {

            var
            x2 = x1 + width,
                y2 = y1 + height;

            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2]), gl.STATIC_DRAW);
           draw();
        }

        function draw() {

            p.computeDrawing();
            gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
        p.lineStyle = function(thickness, color, alpha) {
        }
        p.moveTo = function(x, y) {
            path = [x, y];
        }
        p.lineTo = function(x, y) {
            path.push(x, y);
        }
    }
    Shape = Class;
});