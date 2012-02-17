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


        p = Class.prototype;

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
            translationMatrix, angleMatrix, scaleMatrix;

        // Increment count and covert to string
        this.id = (idCount++) + '';

        updateAngle();
        updateScale();
        updateTranslation();

        this.buffer = gl.createBuffer();
        
        this.compute=function(){
                        // Multiply the matrices.
            var matrix = mat3.multiply(scaleMatrix, angleMatrix);
            matrix = mat3.multiply(matrix, translationMatrix);
            matrix = mat3.multiply(matrix, stage.projectionMatrix);
            // Set the matrix.
            gl.uniformMatrix3fv(program.NORMAL.matrixLocation, false, matrix);
        }

        function updateAngle() {
            var angleInDegrees = 360 - rotation;
            angleInRadians = angleInDegrees * Math.PI / 180;
            angleMatrix = gl.makeRotation(angleInRadians);
        }

        function updateScale() {
            scaleMatrix = gl.makeScale(scaleX, scaleY);
        }

        function updateTranslation() {
            translationMatrix = gl.makeTranslation(x, y);
        }

        Object.defineProperty(p, "x", {
            get: function() {
                return x;
            },
            set: function(value) {
                x = value;
                updateTranslation();
            }
        });
    }



    Child = Class;
});