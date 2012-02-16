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

    var idCount = 0,
        angleInRadians = 0,


        p = Class;

    function Class() {

        /* Position */
        var x = 0,
            y = 0,
            /* Rotation */
            rotation = 0,
            /*Scale*/
            scaleX = 1,
            scaleY = 1,
            /* Deformation Matrices*/
            translationMatrix, rotationMatrix, scaleMatrix;
       
       // Increment count and covert to string
        this.id = (idCount++) + '';

        this.buffer = gl.createBuffer();

        this.computeDrawing = function() {

            translationMatrix = gl.makeTranslation(x,y);
            scaleMatrix = gl.makeScale(scaleX, scaleY);
            rotationMatrix = gl.makeRotation(rotation);

            // Multiply the matrices.
            var matrix = mat3.multiply(scaleMatrix,rotationMatrix);
            matrix = mat3.multiply(matrix,translationMatrix);
            matrix = mat3.multiply(matrix,stage.projectionMatrix);

            // Set the matrix.
            gl.uniformMatrix3fv(gl.matrixLocation, false, matrix);
        }
    }
    Object.defineProperty(p, "x", {
        get: function() {
            return x;
        },
        set: function(value) {
            x = value;
            updatePosition();
            this.draw();
        }
    });

    function updateAngle() {
        var angleInDegrees = 360 - rotation;
        angleInRadians = angleInDegrees * Math.PI / 180;
        this.rotationMatrix = gl.makeRotation(angleInRadians);
    }

    function updateScale() {
        thisscaleMatrix = gl.makeScale(this.scaleX_, this.scaleY_);
    }

    Child = Class;
});