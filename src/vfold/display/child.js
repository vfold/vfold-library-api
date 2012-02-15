/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Child;

define(
function() {

    var idCount = 0;

    function Class() {
        // Increment count and covert to string
        this.id = (idCount++) + '';
        this.x = this.y = 0;
        
        this.buffer = gl.createBuffer();
    }

    var translation = [100, 150];
    var angleInRadians = 0;
    var scale = [1, 1];

    function updatePosition(index) {
        return function(event, ui) {
            translation[index] = ui.value;
            drawScene();
        }
    }

    function updateAngle(event, ui) {
        var angleInDegrees = 360 - ui.value;
        angleInRadians = angleInDegrees * Math.PI / 180;
        drawScene();
    }

    function updateScale(index) {
        return function(event, ui) {
            scale[index] = ui.value;
            drawScene();
        }
    }

    function drawScene() {
        // Clear the canvas.
        gl.clear(gl.COLOR_BUFFER_BIT);
        // Compute the matrices
        var projectionMatrix = Math.make2DProjection(canvas.width, canvas.height);
        var translationMatrix = Math.makeTranslation(translation[0], translation[1]);
        var rotationMatrix = Math.makeRotation(angleInRadians);
        var scaleMatrix = Math.makeScale(scale[0], scale[1]);
        // Multiply the matrices.
        var matrix = Math.matrixMultiply(scaleMatrix, rotationMatrix);
        matrix = Math.matrixMultiply(matrix, translationMatrix);
        matrix = Math.matrixMultiply(matrix, projectionMatrix);
        // Set the matrix.
        gl.uniformMatrix3fv(Math.matrixLocation, false, matrix);
        // Draw the geometry.
        gl.drawArrays(gl.TRIANGLES, 0, 18);
    }

    Child = Class;
});