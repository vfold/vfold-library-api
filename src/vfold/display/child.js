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
        translationMatrix, rotationMatrix, scaleMatrix, rotation = 0,
        x = 0,
        p = Class;

    function Class() {
        // Increment count and covert to string
        this.id = (idCount++) + '';
        this.x = this.y = 0;

        this.buffer = gl.createBuffer();
        updatePosition();
        updateAngle();
        updateScale();

        this.draw = function() {

            // Multiply the matrices.
            var matrix = mat3.multiply(scaleMatrix, rotationMatrix);
            matrix = mat3.multiply(matrix, translationMatrix);
            matrix = mat3.multiply(matrix, gl.projectionMatrix);
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
            draw();
        }
    });


    function updatePosition() {
        translationMatrix = gl.makeTranslation(this.x, this.y);
    }

    function updateAngle() {
        var angleInDegrees = 360 - rotation;
        angleInRadians = angleInDegrees * Math.PI / 180;
        rotationMatrix = gl.makeRotation(angleInRadians);
    }

    function updateScale() {
        scaleMatrix = gl.makeScale(this.width, this.height);
    }

    function drawScene() {

        // Draw the geometry.
        gl.drawArrays(gl.TRIANGLES, 0, 18);
    }

    Child = Class;
});