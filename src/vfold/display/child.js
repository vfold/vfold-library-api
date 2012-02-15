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
    var angleInRadians = 0;
    var scale = [1, 1];
    var translationMatrix;
            var rotationMatrix;
        var scaleMatrix;

    function Class() {
        // Increment count and covert to string
        this.id = (idCount++) + '';
        this.x = this.y = 0;

        this.buffer = gl.createBuffer();
    }

    Class.prototype = {
        get x() {
            return this.x;
        },

        set x(value) {
            this.x = value;
            updatePosition();
        }
    };


    function updatePosition() {
        translationMatrix = Math.makeTranslation(this.x,this.y);
    }

    function updateAngle(event, ui) {
        var angleInDegrees = 360 - ui.value;
        angleInRadians = angleInDegrees * Math.PI / 180;
        Math.makeRotation(angleInRadians);
    }

    function updateScale() {
        Math.makeScale(this.width,this.height);
    }
    
    function draw(){
       
       // Multiply the matrices.
        var matrix = Math.matrixMultiply(scaleMatrix, rotationMatrix);
        matrix = Math.matrixMultiply(matrix, translationMatrix);
        matrix = Math.matrixMultiply(matrix, gl.projectionMatrix);
        // Set the matrix.
        gl.uniformMatrix3fv(Math.matrixLocation, false, matrix);
    }

    function drawScene() {

        // Draw the geometry.
        gl.drawArrays(gl.TRIANGLES, 0, 18);
    }

    Child = Class;
});