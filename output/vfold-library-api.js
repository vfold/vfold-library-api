
 /***************************************************** 
  * File path: ./src/common/event.js 
  *****************************************************/ 
//Copyright (c) 2010 Nicholas C. Zakas. All rights reserved.
//MIT License

function EventDispatcher(){
    this._listeners = {};
}

EventDispatcher.prototype = {

    addListener:function(type, listener){
        if (typeof this._listeners[type] == "undefined"){
            this._listeners[type] = [];
        }

        this._listeners[type].push(listener);
    },

    dispatch:function(event){
        if (typeof event == "string"){
            event = { type: event };
        }
        if (!event.target){
            event.target = this;
        }

        if (!event.type){
            throw new Error("Event object missing 'type' property.");
        }

        if (this._listeners[event.type] instanceof Array){
            var listeners = this._listeners[event.type];
            for (var i=0, len=listeners.length; i < len; i++){
                listeners[i].call(this, event);
            }
        }
    },

    removeListener:function(type, listener){
        if (this._listeners[type] instanceof Array){
            var listeners = _listeners[type];
            for (var i=0, len=listeners.length; i < len; i++){
                if (listeners[i] === listener){
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }
};
 /***************************************************** 
  * File path: ./src/common/matrix.js 
  *****************************************************/ 
/**
 * @fileoverview gl-matrix - High performance matrix and vector operations for WebGL
 * @author Brandon Jones
 * @version 1.2.3
 */

/*
 * Copyright (c) 2011 Brandon Jones
 *
 * This software is provided 'as-is', without any express or implied
 * warranty. In no event will the authors be held liable for any damages
 * arising from the use of this software.
 *
 * Permission is granted to anyone to use this software for any purpose,
 * including commercial applications, and to alter it and redistribute it
 * freely, subject to the following restrictions:
 *
 *    1. The origin of this software must not be misrepresented; you must not
 *    claim that you wrote the original software. If you use this software
 *    in a product, an acknowledgment in the product documentation would be
 *    appreciated but is not required.
 *
 *    2. Altered source versions must be plainly marked as such, and must not
 *    be misrepresented as being the original software.
 *
 *    3. This notice may not be removed or altered from any source
 *    distribution.
 */
    // Type declarations
    // account for CommonJS environments
    var _global = (typeof(exports) != 'undefined') ? global : window;
    _global.glMatrixArrayType = _global.MatrixArray = null;

    /**
     * @class 3 Dimensional Vector
     * @name vec3
     */
    _global.vec3 = {};

    /**
     * @class 3x3 Matrix
     * @name mat3
     */
    _global.mat3 = {};

    /**
     * @class 4x4 Matrix
     * @name mat4
     */
    _global.mat4 = {};

    /**
     * @class Quaternion
     * @name quat4
     */
    _global.quat4 = {};

    // explicitly sets and returns the type of array to use within glMatrix
    _global.setMatrixArrayType = function(type) {
        return glMatrixArrayType = MatrixArray = type;
    };

    // auto-detects and returns the best type of array to use within glMatrix, falling
    // back to Array if typed arrays are unsupported
    _global.determineMatrixArrayType = function() {
        return setMatrixArrayType((typeof Float32Array !== 'undefined') ? Float32Array : Array);
    };

    determineMatrixArrayType();

/*
 * vec3
 */

    /**
     * Creates a new instance of a vec3 using the default array type
     * Any javascript array-like objects containing at least 3 numeric elements can serve as a vec3
     *
     * @param {vec3} [vec] vec3 containing values to initialize with
     *
     * @returns {vec3} New vec3
     */
    vec3.create = function(vec) {
        var dest = new MatrixArray(3);

        if (vec) {
            dest[0] = vec[0];
            dest[1] = vec[1];
            dest[2] = vec[2];
        }
        else {
            dest[0] = dest[1] = dest[2] = 0;
        }

        return dest;
    };

    /**
     * Copies the values of one vec3 to another
     *
     * @param {vec3} vec vec3 containing values to copy
     * @param {vec3} dest vec3 receiving copied values
     *
     * @returns {vec3} dest
     */
    vec3.set = function(vec, dest) {
        dest[0] = vec[0];
        dest[1] = vec[1];
        dest[2] = vec[2];

        return dest;
    };

    /**
     * Performs a vector addition
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.add = function(vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] += vec2[0];
            vec[1] += vec2[1];
            vec[2] += vec2[2];
            return vec;
        }

        dest[0] = vec[0] + vec2[0];
        dest[1] = vec[1] + vec2[1];
        dest[2] = vec[2] + vec2[2];
        return dest;
    };

    /**
     * Performs a vector subtraction
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.subtract = function(vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] -= vec2[0];
            vec[1] -= vec2[1];
            vec[2] -= vec2[2];
            return vec;
        }

        dest[0] = vec[0] - vec2[0];
        dest[1] = vec[1] - vec2[1];
        dest[2] = vec[2] - vec2[2];
        return dest;
    };

    /**
     * Performs a vector multiplication
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.multiply = function(vec, vec2, dest) {
        if (!dest || vec === dest) {
            vec[0] *= vec2[0];
            vec[1] *= vec2[1];
            vec[2] *= vec2[2];
            return vec;
        }

        dest[0] = vec[0] * vec2[0];
        dest[1] = vec[1] * vec2[1];
        dest[2] = vec[2] * vec2[2];
        return dest;
    };

    /**
     * Negates the components of a vec3
     *
     * @param {vec3} vec vec3 to negate
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.negate = function(vec, dest) {
        if (!dest) {
            dest = vec;
        }

        dest[0] = -vec[0];
        dest[1] = -vec[1];
        dest[2] = -vec[2];
        return dest;
    };

    /**
     * Multiplies the components of a vec3 by a scalar value
     *
     * @param {vec3} vec vec3 to scale
     * @param {number} val Value to scale by
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.scale = function(vec, val, dest) {
        if (!dest || vec === dest) {
            vec[0] *= val;
            vec[1] *= val;
            vec[2] *= val;
            return vec;
        }

        dest[0] = vec[0] * val;
        dest[1] = vec[1] * val;
        dest[2] = vec[2] * val;
        return dest;
    };

    /**
     * Generates a unit vector of the same direction as the provided vec3
     * If vector length is 0, returns [0, 0, 0]
     *
     * @param {vec3} vec vec3 to normalize
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.normalize = function(vec, dest) {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0],
            y = vec[1],
            z = vec[2],
            len = Math.sqrt(x * x + y * y + z * z);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        }
        else if (len === 1) {
            dest[0] = x;
            dest[1] = y;
            dest[2] = z;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        return dest;
    };

    /**
     * Generates the cross product of two vec3s
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.cross = function(vec, vec2, dest) {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0],
            y = vec[1],
            z = vec[2],
            x2 = vec2[0],
            y2 = vec2[1],
            z2 = vec2[2];

        dest[0] = y * z2 - z * y2;
        dest[1] = z * x2 - x * z2;
        dest[2] = x * y2 - y * x2;
        return dest;
    };

    /**
     * Caclulates the length of a vec3
     *
     * @param {vec3} vec vec3 to calculate length of
     *
     * @returns {number} Length of vec
     */
    vec3.length = function(vec) {
        var x = vec[0],
            y = vec[1],
            z = vec[2];
        return Math.sqrt(x * x + y * y + z * z);
    };

    /**
     * Caclulates the dot product of two vec3s
     *
     * @param {vec3} vec First operand
     * @param {vec3} vec2 Second operand
     *
     * @returns {number} Dot product of vec and vec2
     */
    vec3.dot = function(vec, vec2) {
        return vec[0] * vec2[0] + vec[1] * vec2[1] + vec[2] * vec2[2];
    };

    /**
     * Generates a unit vector pointing from one vector to another
     *
     * @param {vec3} vec Origin vec3
     * @param {vec3} vec2 vec3 to point to
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.direction = function(vec, vec2, dest) {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0] - vec2[0],
            y = vec[1] - vec2[1],
            z = vec[2] - vec2[2],
            len = Math.sqrt(x * x + y * y + z * z);

        if (!len) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            return dest;
        }

        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        return dest;
    };

    /**
     * Performs a linear interpolation between two vec3
     *
     * @param {vec3} vec First vector
     * @param {vec3} vec2 Second vector
     * @param {number} lerp Interpolation amount between the two inputs
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.lerp = function(vec, vec2, lerp, dest) {
        if (!dest) {
            dest = vec;
        }

        dest[0] = vec[0] + lerp * (vec2[0] - vec[0]);
        dest[1] = vec[1] + lerp * (vec2[1] - vec[1]);
        dest[2] = vec[2] + lerp * (vec2[2] - vec[2]);

        return dest;
    };

    /**
     * Calculates the euclidian distance between two vec3
     *
     * Params:
     * @param {vec3} vec First vector
     * @param {vec3} vec2 Second vector
     *
     * @returns {number} Distance between vec and vec2
     */
    vec3.dist = function(vec, vec2) {
        var x = vec2[0] - vec[0],
            y = vec2[1] - vec[1],
            z = vec2[2] - vec[2];

        return Math.sqrt(x * x + y * y + z * z);
    };

    /**
     * Projects the specified vec3 from screen space into object space
     * Based on the <a href="http://webcvs.freedesktop.org/mesa/Mesa/src/glu/mesa/project.c?revision=1.4&view=markup">Mesa gluUnProject implementation</a>
     *
     * @param {vec3} vec Screen-space vector to project
     * @param {mat4} view View matrix
     * @param {mat4} proj Projection matrix
     * @param {vec4} viewport Viewport as given to gl.viewport [x, y, width, height]
     * @param {vec3} [dest] vec3 receiving unprojected result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    vec3.unproject = function(vec, view, proj, viewport, dest) {
        if (!dest) {
            dest = vec;
        }

        var m = mat4.create();
        var v = new MatrixArray(4);

        v[0] = (vec[0] - viewport[0]) * 2.0 / viewport[2] - 1.0;
        v[1] = (vec[1] - viewport[1]) * 2.0 / viewport[3] - 1.0;
        v[2] = 2.0 * vec[2] - 1.0;
        v[3] = 1.0;

        mat4.multiply(proj, view, m);
        if (!mat4.inverse(m)) {
            return null;
        }

        mat4.multiplyVec4(m, v);
        if (v[3] === 0.0) {
            return null;
        }

        dest[0] = v[0] / v[3];
        dest[1] = v[1] / v[3];
        dest[2] = v[2] / v[3];

        return dest;
    };

    /**
     * Returns a string representation of a vector
     *
     * @param {vec3} vec Vector to represent as a string
     *
     * @returns {string} String representation of vec
     */
    vec3.str = function(vec) {
        return '[' + vec[0] + ', ' + vec[1] + ', ' + vec[2] + ']';
    };

/*
 * mat3
 */

    /**
     * Creates a new instance of a mat3 using the default array type
     * Any javascript array-like object containing at least 9 numeric elements can serve as a mat3
     *
     * @param {mat3} [mat] mat3 containing values to initialize with
     *
     * @returns {mat3} New mat3
     */
    mat3.create = function(mat) {
        var dest = new MatrixArray(9);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
        }

        return dest;
    };

    /**
     * Copies the values of one mat3 to another
     *
     * @param {mat3} mat mat3 containing values to copy
     * @param {mat3} dest mat3 receiving copied values
     *
     * @returns {mat3} dest
     */
    mat3.set = function(mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        return dest;
    };

    /**
     * Sets a mat3 to an identity matrix
     *
     * @param {mat3} dest mat3 to set
     *
     * @returns dest if specified, otherwise a new mat3
     */
    mat3.identity = function(dest) {
        if (!dest) {
            dest = mat3.create();
        }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 1;
        dest[5] = 0;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 1;
        return dest;
    };

    /**
     * Transposes a mat3 (flips the values over the diagonal)
     *
     * Params:
     * @param {mat3} mat mat3 to transpose
     * @param {mat3} [dest] mat3 receiving transposed values. If not specified result is written to mat
     *
     * @returns {mat3} dest is specified, mat otherwise
     */
    mat3.transpose = function(mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a01 = mat[1],
                a02 = mat[2],
                a12 = mat[5];

            mat[1] = mat[3];
            mat[2] = mat[6];
            mat[3] = a01;
            mat[5] = mat[7];
            mat[6] = a02;
            mat[7] = a12;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[3];
        dest[2] = mat[6];
        dest[3] = mat[1];
        dest[4] = mat[4];
        dest[5] = mat[7];
        dest[6] = mat[2];
        dest[7] = mat[5];
        dest[8] = mat[8];
        return dest;
    };

    /**
     * Copies the elements of a mat3 into the upper 3x3 elements of a mat4
     *
     * @param {mat3} mat mat3 containing values to copy
     * @param {mat4} [dest] mat4 receiving copied values
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat3.toMat4 = function(mat, dest) {
        if (!dest) {
            dest = mat4.create();
        }

        dest[15] = 1;
        dest[14] = 0;
        dest[13] = 0;
        dest[12] = 0;

        dest[11] = 0;
        dest[10] = mat[8];
        dest[9] = mat[7];
        dest[8] = mat[6];

        dest[7] = 0;
        dest[6] = mat[5];
        dest[5] = mat[4];
        dest[4] = mat[3];

        dest[3] = 0;
        dest[2] = mat[2];
        dest[1] = mat[1];
        dest[0] = mat[0];

        return dest;
    };

    /**
     * Returns a string representation of a mat3
     *
     * @param {mat3} mat mat3 to represent as a string
     *
     * @param {string} String representation of mat
     */
    mat3.str = function(mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ']';
    };

/*
 * mat4
 */

    /**
     * Creates a new instance of a mat4 using the default array type
     * Any javascript array-like object containing at least 16 numeric elements can serve as a mat4
     *
     * @param {mat4} [mat] mat4 containing values to initialize with
     *
     * @returns {mat4} New mat4
     */
    mat4.create = function(mat) {
        var dest = new MatrixArray(16);

        if (mat) {
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        return dest;
    };

    /**
     * Copies the values of one mat4 to another
     *
     * @param {mat4} mat mat4 containing values to copy
     * @param {mat4} dest mat4 receiving copied values
     *
     * @returns {mat4} dest
     */
    mat4.set = function(mat, dest) {
        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };

    /**
     * Sets a mat4 to an identity matrix
     *
     * @param {mat4} dest mat4 to set
     *
     * @returns {mat4} dest
     */
    mat4.identity = function(dest) {
        if (!dest) {
            dest = mat4.create();
        }
        dest[0] = 1;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 1;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = 1;
        dest[11] = 0;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;
        return dest;
    };

    /**
     * Transposes a mat4 (flips the values over the diagonal)
     *
     * @param {mat4} mat mat4 to transpose
     * @param {mat4} [dest] mat4 receiving transposed values. If not specified result is written to mat
     *
     * @param {mat4} dest is specified, mat otherwise
     */
    mat4.transpose = function(mat, dest) {
        // If we are transposing ourselves we can skip a few steps but have to cache some values
        if (!dest || mat === dest) {
            var a01 = mat[1],
                a02 = mat[2],
                a03 = mat[3],
                a12 = mat[6],
                a13 = mat[7],
                a23 = mat[11];

            mat[1] = mat[4];
            mat[2] = mat[8];
            mat[3] = mat[12];
            mat[4] = a01;
            mat[6] = mat[9];
            mat[7] = mat[13];
            mat[8] = a02;
            mat[9] = a12;
            mat[11] = mat[14];
            mat[12] = a03;
            mat[13] = a13;
            mat[14] = a23;
            return mat;
        }

        dest[0] = mat[0];
        dest[1] = mat[4];
        dest[2] = mat[8];
        dest[3] = mat[12];
        dest[4] = mat[1];
        dest[5] = mat[5];
        dest[6] = mat[9];
        dest[7] = mat[13];
        dest[8] = mat[2];
        dest[9] = mat[6];
        dest[10] = mat[10];
        dest[11] = mat[14];
        dest[12] = mat[3];
        dest[13] = mat[7];
        dest[14] = mat[11];
        dest[15] = mat[15];
        return dest;
    };

    /**
     * Calculates the determinant of a mat4
     *
     * @param {mat4} mat mat4 to calculate determinant of
     *
     * @returns {number} determinant of mat
     */
    mat4.determinant = function(mat) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11],
            a30 = mat[12],
            a31 = mat[13],
            a32 = mat[14],
            a33 = mat[15];

        return (a30 * a21 * a12 * a03 - a20 * a31 * a12 * a03 - a30 * a11 * a22 * a03 + a10 * a31 * a22 * a03 + a20 * a11 * a32 * a03 - a10 * a21 * a32 * a03 - a30 * a21 * a02 * a13 + a20 * a31 * a02 * a13 + a30 * a01 * a22 * a13 - a00 * a31 * a22 * a13 - a20 * a01 * a32 * a13 + a00 * a21 * a32 * a13 + a30 * a11 * a02 * a23 - a10 * a31 * a02 * a23 - a30 * a01 * a12 * a23 + a00 * a31 * a12 * a23 + a10 * a01 * a32 * a23 - a00 * a11 * a32 * a23 - a20 * a11 * a02 * a33 + a10 * a21 * a02 * a33 + a20 * a01 * a12 * a33 - a00 * a21 * a12 * a33 - a10 * a01 * a22 * a33 + a00 * a11 * a22 * a33);
    };

    /**
     * Calculates the inverse matrix of a mat4
     *
     * @param {mat4} mat mat4 to calculate inverse of
     * @param {mat4} [dest] mat4 receiving inverse matrix. If not specified result is written to mat
     *
     * @param {mat4} dest is specified, mat otherwise, null if matrix cannot be inverted
     */
    mat4.inverse = function(mat, dest) {
        if (!dest) {
            dest = mat;
        }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11],
            a30 = mat[12],
            a31 = mat[13],
            a32 = mat[14],
            a33 = mat[15],

            b00 = a00 * a11 - a01 * a10,
            b01 = a00 * a12 - a02 * a10,
            b02 = a00 * a13 - a03 * a10,
            b03 = a01 * a12 - a02 * a11,
            b04 = a01 * a13 - a03 * a11,
            b05 = a02 * a13 - a03 * a12,
            b06 = a20 * a31 - a21 * a30,
            b07 = a20 * a32 - a22 * a30,
            b08 = a20 * a33 - a23 * a30,
            b09 = a21 * a32 - a22 * a31,
            b10 = a21 * a33 - a23 * a31,
            b11 = a22 * a33 - a23 * a32,

            d = (b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06),
            invDet;

        // Calculate the determinant
        if (!d) {
            return null;
        }
        invDet = 1 / d;

        dest[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        dest[1] = (-a01 * b11 + a02 * b10 - a03 * b09) * invDet;
        dest[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        dest[3] = (-a21 * b05 + a22 * b04 - a23 * b03) * invDet;
        dest[4] = (-a10 * b11 + a12 * b08 - a13 * b07) * invDet;
        dest[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        dest[6] = (-a30 * b05 + a32 * b02 - a33 * b01) * invDet;
        dest[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        dest[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        dest[9] = (-a00 * b10 + a01 * b08 - a03 * b06) * invDet;
        dest[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        dest[11] = (-a20 * b04 + a21 * b02 - a23 * b00) * invDet;
        dest[12] = (-a10 * b09 + a11 * b07 - a12 * b06) * invDet;
        dest[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        dest[14] = (-a30 * b03 + a31 * b01 - a32 * b00) * invDet;
        dest[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;

        return dest;
    };

    /**
     * Copies the upper 3x3 elements of a mat4 into another mat4
     *
     * @param {mat4} mat mat4 containing values to copy
     * @param {mat4} [dest] mat4 receiving copied values
     *
     * @returns {mat4} dest is specified, a new mat4 otherwise
     */
    mat4.toRotationMat = function(mat, dest) {
        if (!dest) {
            dest = mat4.create();
        }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[3];
        dest[4] = mat[4];
        dest[5] = mat[5];
        dest[6] = mat[6];
        dest[7] = mat[7];
        dest[8] = mat[8];
        dest[9] = mat[9];
        dest[10] = mat[10];
        dest[11] = mat[11];
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;

        return dest;
    };

    /**
     * Copies the upper 3x3 elements of a mat4 into a mat3
     *
     * @param {mat4} mat mat4 containing values to copy
     * @param {mat3} [dest] mat3 receiving copied values
     *
     * @returns {mat3} dest is specified, a new mat3 otherwise
     */
    mat4.toMat3 = function(mat, dest) {
        if (!dest) {
            dest = mat3.create();
        }

        dest[0] = mat[0];
        dest[1] = mat[1];
        dest[2] = mat[2];
        dest[3] = mat[4];
        dest[4] = mat[5];
        dest[5] = mat[6];
        dest[6] = mat[8];
        dest[7] = mat[9];
        dest[8] = mat[10];

        return dest;
    };

    /**
     * Calculates the inverse of the upper 3x3 elements of a mat4 and copies the result into a mat3
     * The resulting matrix is useful for calculating transformed normals
     *
     * Params:
     * @param {mat4} mat mat4 containing values to invert and copy
     * @param {mat3} [dest] mat3 receiving values
     *
     * @returns {mat3} dest is specified, a new mat3 otherwise, null if the matrix cannot be inverted
     */
    mat4.toInverseMat3 = function(mat, dest) {
        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],

            b01 = a22 * a11 - a12 * a21,
            b11 = -a22 * a10 + a12 * a20,
            b21 = a21 * a10 - a11 * a20,

            d = a00 * b01 + a01 * b11 + a02 * b21,
            id;

        if (!d) {
            return null;
        }
        id = 1 / d;

        if (!dest) {
            dest = mat3.create();
        }

        dest[0] = b01 * id;
        dest[1] = (-a22 * a01 + a02 * a21) * id;
        dest[2] = (a12 * a01 - a02 * a11) * id;
        dest[3] = b11 * id;
        dest[4] = (a22 * a00 - a02 * a20) * id;
        dest[5] = (-a12 * a00 + a02 * a10) * id;
        dest[6] = b21 * id;
        dest[7] = (-a21 * a00 + a01 * a20) * id;
        dest[8] = (a11 * a00 - a01 * a10) * id;

        return dest;
    };

    mat3.multiply = function(a, b) {
        var a00 = a[0 * 3 + 0];
        var a01 = a[0 * 3 + 1];
        var a02 = a[0 * 3 + 2];
        var a10 = a[1 * 3 + 0];
        var a11 = a[1 * 3 + 1];
        var a12 = a[1 * 3 + 2];
        var a20 = a[2 * 3 + 0];
        var a21 = a[2 * 3 + 1];
        var a22 = a[2 * 3 + 2];
        var b00 = b[0 * 3 + 0];
        var b01 = b[0 * 3 + 1];
        var b02 = b[0 * 3 + 2];
        var b10 = b[1 * 3 + 0];
        var b11 = b[1 * 3 + 1];
        var b12 = b[1 * 3 + 2];
        var b20 = b[2 * 3 + 0];
        var b21 = b[2 * 3 + 1];
        var b22 = b[2 * 3 + 2];
        return [a00 * b00 + a01 * b10 + a02 * b20, a00 * b01 + a01 * b11 + a02 * b21, a00 * b02 + a01 * b12 + a02 * b22, a10 * b00 + a11 * b10 + a12 * b20, a10 * b01 + a11 * b11 + a12 * b21, a10 * b02 + a11 * b12 + a12 * b22, a20 * b00 + a21 * b10 + a22 * b20, a20 * b01 + a21 * b11 + a22 * b21, a20 * b02 + a21 * b12 + a22 * b22];
    }

    /**
     * Performs a matrix multiplication
     *
     * @param {mat4} mat First operand
     * @param {mat4} mat2 Second operand
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.multiply = function(mat, mat2, dest) {
        if (!dest) {
            dest = mat;
        }

        // Cache the matrix values (makes for huge speed increases!)
        var a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11],
            a30 = mat[12],
            a31 = mat[13],
            a32 = mat[14],
            a33 = mat[15],

            b00 = mat2[0],
            b01 = mat2[1],
            b02 = mat2[2],
            b03 = mat2[3],
            b10 = mat2[4],
            b11 = mat2[5],
            b12 = mat2[6],
            b13 = mat2[7],
            b20 = mat2[8],
            b21 = mat2[9],
            b22 = mat2[10],
            b23 = mat2[11],
            b30 = mat2[12],
            b31 = mat2[13],
            b32 = mat2[14],
            b33 = mat2[15];

        dest[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        dest[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        dest[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        dest[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        dest[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        dest[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        dest[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        dest[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        dest[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        dest[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        dest[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        dest[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        dest[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        dest[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        dest[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        dest[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;

        return dest;
    };

    /**
     * Transforms a vec3 with the given matrix
     * 4th vector component is implicitly '1'
     *
     * @param {mat4} mat mat4 to transform the vector with
     * @param {vec3} vec vec3 to transform
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec3} dest if specified, vec otherwise
     */
    mat4.multiplyVec3 = function(mat, vec, dest) {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0],
            y = vec[1],
            z = vec[2];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];

        return dest;
    };

    /**
     * Transforms a vec4 with the given matrix
     *
     * @param {mat4} mat mat4 to transform the vector with
     * @param {vec4} vec vec4 to transform
     * @param {vec4} [dest] vec4 receiving operation result. If not specified result is written to vec
     *
     * @returns {vec4} dest if specified, vec otherwise
     */
    mat4.multiplyVec4 = function(mat, vec, dest) {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0],
            y = vec[1],
            z = vec[2],
            w = vec[3];

        dest[0] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12] * w;
        dest[1] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13] * w;
        dest[2] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14] * w;
        dest[3] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15] * w;

        return dest;
    };

    /**
     * Translates a matrix by the given vector
     *
     * @param {mat4} mat mat4 to translate
     * @param {vec3} vec vec3 specifying the translation
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.translate = function(mat, vec, dest) {
        var x = vec[0],
            y = vec[1],
            z = vec[2],
            a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23;

        if (!dest || mat === dest) {
            mat[12] = mat[0] * x + mat[4] * y + mat[8] * z + mat[12];
            mat[13] = mat[1] * x + mat[5] * y + mat[9] * z + mat[13];
            mat[14] = mat[2] * x + mat[6] * y + mat[10] * z + mat[14];
            mat[15] = mat[3] * x + mat[7] * y + mat[11] * z + mat[15];
            return mat;
        }

        a00 = mat[0];
        a01 = mat[1];
        a02 = mat[2];
        a03 = mat[3];
        a10 = mat[4];
        a11 = mat[5];
        a12 = mat[6];
        a13 = mat[7];
        a20 = mat[8];
        a21 = mat[9];
        a22 = mat[10];
        a23 = mat[11];

        dest[0] = a00;
        dest[1] = a01;
        dest[2] = a02;
        dest[3] = a03;
        dest[4] = a10;
        dest[5] = a11;
        dest[6] = a12;
        dest[7] = a13;
        dest[8] = a20;
        dest[9] = a21;
        dest[10] = a22;
        dest[11] = a23;

        dest[12] = a00 * x + a10 * y + a20 * z + mat[12];
        dest[13] = a01 * x + a11 * y + a21 * z + mat[13];
        dest[14] = a02 * x + a12 * y + a22 * z + mat[14];
        dest[15] = a03 * x + a13 * y + a23 * z + mat[15];
        return dest;
    };

    /**
     * Scales a matrix by the given vector
     *
     * @param {mat4} mat mat4 to scale
     * @param {vec3} vec vec3 specifying the scale for each axis
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @param {mat4} dest if specified, mat otherwise
     */
    mat4.scale = function(mat, vec, dest) {
        var x = vec[0],
            y = vec[1],
            z = vec[2];

        if (!dest || mat === dest) {
            mat[0] *= x;
            mat[1] *= x;
            mat[2] *= x;
            mat[3] *= x;
            mat[4] *= y;
            mat[5] *= y;
            mat[6] *= y;
            mat[7] *= y;
            mat[8] *= z;
            mat[9] *= z;
            mat[10] *= z;
            mat[11] *= z;
            return mat;
        }

        dest[0] = mat[0] * x;
        dest[1] = mat[1] * x;
        dest[2] = mat[2] * x;
        dest[3] = mat[3] * x;
        dest[4] = mat[4] * y;
        dest[5] = mat[5] * y;
        dest[6] = mat[6] * y;
        dest[7] = mat[7] * y;
        dest[8] = mat[8] * z;
        dest[9] = mat[9] * z;
        dest[10] = mat[10] * z;
        dest[11] = mat[11] * z;
        dest[12] = mat[12];
        dest[13] = mat[13];
        dest[14] = mat[14];
        dest[15] = mat[15];
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the specified axis
     * If rotating around a primary axis (X,Y,Z) one of the specialized rotation functions should be used instead for performance
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {vec3} axis vec3 representing the axis to rotate around 
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotate = function(mat, angle, axis, dest) {
        var x = axis[0],
            y = axis[1],
            z = axis[2],
            len = Math.sqrt(x * x + y * y + z * z),
            s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;

        if (!len) {
            return null;
        }
        if (len !== 1) {
            len = 1 / len;
            x *= len;
            y *= len;
            z *= len;
        }

        s = Math.sin(angle);
        c = Math.cos(angle);
        t = 1 - c;

        a00 = mat[0];
        a01 = mat[1];
        a02 = mat[2];
        a03 = mat[3];
        a10 = mat[4];
        a11 = mat[5];
        a12 = mat[6];
        a13 = mat[7];
        a20 = mat[8];
        a21 = mat[9];
        a22 = mat[10];
        a23 = mat[11];

        // Construct the elements of the rotation matrix
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;

        if (!dest) {
            dest = mat;
        }
        else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform rotation-specific matrix multiplication
        dest[0] = a00 * b00 + a10 * b01 + a20 * b02;
        dest[1] = a01 * b00 + a11 * b01 + a21 * b02;
        dest[2] = a02 * b00 + a12 * b01 + a22 * b02;
        dest[3] = a03 * b00 + a13 * b01 + a23 * b02;

        dest[4] = a00 * b10 + a10 * b11 + a20 * b12;
        dest[5] = a01 * b10 + a11 * b11 + a21 * b12;
        dest[6] = a02 * b10 + a12 * b11 + a22 * b12;
        dest[7] = a03 * b10 + a13 * b11 + a23 * b12;

        dest[8] = a00 * b20 + a10 * b21 + a20 * b22;
        dest[9] = a01 * b20 + a11 * b21 + a21 * b22;
        dest[10] = a02 * b20 + a12 * b21 + a22 * b22;
        dest[11] = a03 * b20 + a13 * b21 + a23 * b22;
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the X axis
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotateX = function(mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11];

        if (!dest) {
            dest = mat;
        }
        else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[0] = mat[0];
            dest[1] = mat[1];
            dest[2] = mat[2];
            dest[3] = mat[3];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[4] = a10 * c + a20 * s;
        dest[5] = a11 * c + a21 * s;
        dest[6] = a12 * c + a22 * s;
        dest[7] = a13 * c + a23 * s;

        dest[8] = a10 * -s + a20 * c;
        dest[9] = a11 * -s + a21 * c;
        dest[10] = a12 * -s + a22 * c;
        dest[11] = a13 * -s + a23 * c;
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the Y axis
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotateY = function(mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a20 = mat[8],
            a21 = mat[9],
            a22 = mat[10],
            a23 = mat[11];

        if (!dest) {
            dest = mat;
        }
        else if (mat !== dest) { // If the source and destination differ, copy the unchanged rows
            dest[4] = mat[4];
            dest[5] = mat[5];
            dest[6] = mat[6];
            dest[7] = mat[7];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[0] = a00 * c + a20 * -s;
        dest[1] = a01 * c + a21 * -s;
        dest[2] = a02 * c + a22 * -s;
        dest[3] = a03 * c + a23 * -s;

        dest[8] = a00 * s + a20 * c;
        dest[9] = a01 * s + a21 * c;
        dest[10] = a02 * s + a22 * c;
        dest[11] = a03 * s + a23 * c;
        return dest;
    };

    /**
     * Rotates a matrix by the given angle around the Z axis
     *
     * @param {mat4} mat mat4 to rotate
     * @param {number} angle Angle (in radians) to rotate
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to mat
     *
     * @returns {mat4} dest if specified, mat otherwise
     */
    mat4.rotateZ = function(mat, angle, dest) {
        var s = Math.sin(angle),
            c = Math.cos(angle),
            a00 = mat[0],
            a01 = mat[1],
            a02 = mat[2],
            a03 = mat[3],
            a10 = mat[4],
            a11 = mat[5],
            a12 = mat[6],
            a13 = mat[7];

        if (!dest) {
            dest = mat;
        }
        else if (mat !== dest) { // If the source and destination differ, copy the unchanged last row
            dest[8] = mat[8];
            dest[9] = mat[9];
            dest[10] = mat[10];
            dest[11] = mat[11];

            dest[12] = mat[12];
            dest[13] = mat[13];
            dest[14] = mat[14];
            dest[15] = mat[15];
        }

        // Perform axis-specific matrix multiplication
        dest[0] = a00 * c + a10 * s;
        dest[1] = a01 * c + a11 * s;
        dest[2] = a02 * c + a12 * s;
        dest[3] = a03 * c + a13 * s;

        dest[4] = a00 * -s + a10 * c;
        dest[5] = a01 * -s + a11 * c;
        dest[6] = a02 * -s + a12 * c;
        dest[7] = a03 * -s + a13 * c;

        return dest;
    };

    /**
     * Generates a frustum matrix with the given bounds
     *
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.frustum = function(left, right, bottom, top, near, far, dest) {
        if (!dest) {
            dest = mat4.create();
        }
        var rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);
        dest[0] = (near * 2) / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = (near * 2) / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = (right + left) / rl;
        dest[9] = (top + bottom) / tb;
        dest[10] = -(far + near) / fn;
        dest[11] = -1;
        dest[12] = 0;
        dest[13] = 0;
        dest[14] = -(far * near * 2) / fn;
        dest[15] = 0;
        return dest;
    };

    /**
     * Generates a perspective projection matrix with the given bounds
     *
     * @param {number} fovy Vertical field of view
     * @param {number} aspect Aspect ratio. typically viewport width/height
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.perspective = function(fovy, aspect, near, far, dest) {
        var top = near * Math.tan(fovy * Math.PI / 360.0),
            right = top * aspect;
        return mat4.frustum(-right, right, -top, top, near, far, dest);
    };

    /**
     * Generates a orthogonal projection matrix with the given bounds
     *
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.ortho = function(left, right, bottom, top, near, far, dest) {
        if (!dest) {
            dest = mat4.create();
        }
        var rl = (right - left),
            tb = (top - bottom),
            fn = (far - near);
        dest[0] = 2 / rl;
        dest[1] = 0;
        dest[2] = 0;
        dest[3] = 0;
        dest[4] = 0;
        dest[5] = 2 / tb;
        dest[6] = 0;
        dest[7] = 0;
        dest[8] = 0;
        dest[9] = 0;
        dest[10] = -2 / fn;
        dest[11] = 0;
        dest[12] = -(left + right) / rl;
        dest[13] = -(top + bottom) / tb;
        dest[14] = -(far + near) / fn;
        dest[15] = 1;
        return dest;
    };

    /**
     * Generates a look-at matrix with the given eye position, focal point, and up axis
     *
     * @param {vec3} eye Position of the viewer
     * @param {vec3} center Point the viewer is looking at
     * @param {vec3} up vec3 pointing "up"
     * @param {mat4} [dest] mat4 frustum matrix will be written into
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.lookAt = function(eye, center, up, dest) {
        if (!dest) {
            dest = mat4.create();
        }

        var x0, x1, x2, y0, y1, y2, z0, z1, z2, len, eyex = eye[0],
            eyey = eye[1],
            eyez = eye[2],
            upx = up[0],
            upy = up[1],
            upz = up[2],
            centerx = center[0],
            centery = center[1],
            centerz = center[2];

        if (eyex === centerx && eyey === centery && eyez === centerz) {
            return mat4.identity(dest);
        }

        //vec3.direction(eye, center, z);
        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;

        // normalize (no check needed for 0 because of early return)
        len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;

        //vec3.normalize(vec3.cross(up, z, x));
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        }
        else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        //vec3.normalize(vec3.cross(z, x, y));
        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;

        len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        }
        else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        dest[0] = x0;
        dest[1] = y0;
        dest[2] = z0;
        dest[3] = 0;
        dest[4] = x1;
        dest[5] = y1;
        dest[6] = z1;
        dest[7] = 0;
        dest[8] = x2;
        dest[9] = y2;
        dest[10] = z2;
        dest[11] = 0;
        dest[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        dest[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        dest[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        dest[15] = 1;

        return dest;
    };

    /**
     * Creates a matrix from a quaternion rotation and vector translation
     * This is equivalent to (but much faster than):
     *
     *     mat4.identity(dest);
     *     mat4.translate(dest, vec);
     *     var quatMat = mat4.create();
     *     quat4.toMat4(quat, quatMat);
     *     mat4.multiply(dest, quatMat);
     *
     * @param {quat4} quat Rotation quaternion
     * @param {vec3} vec Translation vector
     * @param {mat4} [dest] mat4 receiving operation result. If not specified result is written to a new mat4
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    mat4.fromRotationTranslation = function(quat, vec, dest) {
        if (!dest) {
            dest = mat4.create();
        }

        // Quaternion math
        var x = quat[0],
            y = quat[1],
            z = quat[2],
            w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;
        dest[3] = 0;
        dest[4] = xy - wz;
        dest[5] = 1 - (xx + zz);
        dest[6] = yz + wx;
        dest[7] = 0;
        dest[8] = xz + wy;
        dest[9] = yz - wx;
        dest[10] = 1 - (xx + yy);
        dest[11] = 0;
        dest[12] = vec[0];
        dest[13] = vec[1];
        dest[14] = vec[2];
        dest[15] = 1;

        return dest;
    };

    /**
     * Returns a string representation of a mat4
     *
     * @param {mat4} mat mat4 to represent as a string
     *
     * @returns {string} String representation of mat
     */
    mat4.str = function(mat) {
        return '[' + mat[0] + ', ' + mat[1] + ', ' + mat[2] + ', ' + mat[3] + ', ' + mat[4] + ', ' + mat[5] + ', ' + mat[6] + ', ' + mat[7] + ', ' + mat[8] + ', ' + mat[9] + ', ' + mat[10] + ', ' + mat[11] + ', ' + mat[12] + ', ' + mat[13] + ', ' + mat[14] + ', ' + mat[15] + ']';
    };

/*
 * quat4
 */

    /**
     * Creates a new instance of a quat4 using the default array type
     * Any javascript array containing at least 4 numeric elements can serve as a quat4
     *
     * @param {quat4} [quat] quat4 containing values to initialize with
     *
     * @returns {quat4} New quat4
     */
    quat4.create = function(quat) {
        var dest = new MatrixArray(4);

        if (quat) {
            dest[0] = quat[0];
            dest[1] = quat[1];
            dest[2] = quat[2];
            dest[3] = quat[3];
        }

        return dest;
    };

    /**
     * Copies the values of one quat4 to another
     *
     * @param {quat4} quat quat4 containing values to copy
     * @param {quat4} dest quat4 receiving copied values
     *
     * @returns {quat4} dest
     */
    quat4.set = function(quat, dest) {
        dest[0] = quat[0];
        dest[1] = quat[1];
        dest[2] = quat[2];
        dest[3] = quat[3];

        return dest;
    };

    /**
     * Calculates the W component of a quat4 from the X, Y, and Z components.
     * Assumes that quaternion is 1 unit in length. 
     * Any existing W component will be ignored. 
     *
     * @param {quat4} quat quat4 to calculate W component of
     * @param {quat4} [dest] quat4 receiving calculated values. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.calculateW = function(quat, dest) {
        var x = quat[0],
            y = quat[1],
            z = quat[2];

        if (!dest || quat === dest) {
            quat[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
            return quat;
        }
        dest[0] = x;
        dest[1] = y;
        dest[2] = z;
        dest[3] = -Math.sqrt(Math.abs(1.0 - x * x - y * y - z * z));
        return dest;
    };

    /**
     * Calculates the dot product of two quaternions
     *
     * @param {quat4} quat First operand
     * @param {quat4} quat2 Second operand
     *
     * @return {number} Dot product of quat and quat2
     */
    quat4.dot = function(quat, quat2) {
        return quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3];
    };

    /**
     * Calculates the inverse of a quat4
     *
     * @param {quat4} quat quat4 to calculate inverse of
     * @param {quat4} [dest] quat4 receiving inverse values. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.inverse = function(quat, dest) {
        var q0 = quat[0],
            q1 = quat[1],
            q2 = quat[2],
            q3 = quat[3],
            dot = q0 * q0 + q1 * q1 + q2 * q2 + q3 * q3,
            invDot = dot ? 1.0 / dot : 0;

        // TODO: Would be faster to return [0,0,0,0] immediately if dot == 0
        if (!dest || quat === dest) {
            quat[0] *= -invDot;
            quat[1] *= -invDot;
            quat[2] *= -invDot;
            quat[3] *= invDot;
            return quat;
        }
        dest[0] = -quat[0] * invDot;
        dest[1] = -quat[1] * invDot;
        dest[2] = -quat[2] * invDot;
        dest[3] = quat[3] * invDot;
        return dest;
    };


    /**
     * Calculates the conjugate of a quat4
     * If the quaternion is normalized, this function is faster than quat4.inverse and produces the same result.
     *
     * @param {quat4} quat quat4 to calculate conjugate of
     * @param {quat4} [dest] quat4 receiving conjugate values. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.conjugate = function(quat, dest) {
        if (!dest || quat === dest) {
            quat[0] *= -1;
            quat[1] *= -1;
            quat[2] *= -1;
            return quat;
        }
        dest[0] = -quat[0];
        dest[1] = -quat[1];
        dest[2] = -quat[2];
        dest[3] = quat[3];
        return dest;
    };

    /**
     * Calculates the length of a quat4
     *
     * Params:
     * @param {quat4} quat quat4 to calculate length of
     *
     * @returns Length of quat
     */
    quat4.length = function(quat) {
        var x = quat[0],
            y = quat[1],
            z = quat[2],
            w = quat[3];
        return Math.sqrt(x * x + y * y + z * z + w * w);
    };

    /**
     * Generates a unit quaternion of the same direction as the provided quat4
     * If quaternion length is 0, returns [0, 0, 0, 0]
     *
     * @param {quat4} quat quat4 to normalize
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.normalize = function(quat, dest) {
        if (!dest) {
            dest = quat;
        }

        var x = quat[0],
            y = quat[1],
            z = quat[2],
            w = quat[3],
            len = Math.sqrt(x * x + y * y + z * z + w * w);
        if (len === 0) {
            dest[0] = 0;
            dest[1] = 0;
            dest[2] = 0;
            dest[3] = 0;
            return dest;
        }
        len = 1 / len;
        dest[0] = x * len;
        dest[1] = y * len;
        dest[2] = z * len;
        dest[3] = w * len;

        return dest;
    };

    /**
     * Performs a quaternion multiplication
     *
     * @param {quat4} quat First operand
     * @param {quat4} quat2 Second operand
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.multiply = function(quat, quat2, dest) {
        if (!dest) {
            dest = quat;
        }

        var qax = quat[0],
            qay = quat[1],
            qaz = quat[2],
            qaw = quat[3],
            qbx = quat2[0],
            qby = quat2[1],
            qbz = quat2[2],
            qbw = quat2[3];

        dest[0] = qax * qbw + qaw * qbx + qay * qbz - qaz * qby;
        dest[1] = qay * qbw + qaw * qby + qaz * qbx - qax * qbz;
        dest[2] = qaz * qbw + qaw * qbz + qax * qby - qay * qbx;
        dest[3] = qaw * qbw - qax * qbx - qay * qby - qaz * qbz;

        return dest;
    };

    /**
     * Transforms a vec3 with the given quaternion
     *
     * @param {quat4} quat quat4 to transform the vector with
     * @param {vec3} vec vec3 to transform
     * @param {vec3} [dest] vec3 receiving operation result. If not specified result is written to vec
     *
     * @returns dest if specified, vec otherwise
     */
    quat4.multiplyVec3 = function(quat, vec, dest) {
        if (!dest) {
            dest = vec;
        }

        var x = vec[0],
            y = vec[1],
            z = vec[2],
            qx = quat[0],
            qy = quat[1],
            qz = quat[2],
            qw = quat[3],

            // calculate quat * vec
            ix = qw * x + qy * z - qz * y,
            iy = qw * y + qz * x - qx * z,
            iz = qw * z + qx * y - qy * x,
            iw = -qx * x - qy * y - qz * z;

        // calculate result * inverse quat
        dest[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
        dest[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
        dest[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;

        return dest;
    };

    /**
     * Calculates a 3x3 matrix from the given quat4
     *
     * @param {quat4} quat quat4 to create matrix from
     * @param {mat3} [dest] mat3 receiving operation result
     *
     * @returns {mat3} dest if specified, a new mat3 otherwise
     */
    quat4.toMat3 = function(quat, dest) {
        if (!dest) {
            dest = mat3.create();
        }

        var x = quat[0],
            y = quat[1],
            z = quat[2],
            w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;

        dest[3] = xy - wz;
        dest[4] = 1 - (xx + zz);
        dest[5] = yz + wx;

        dest[6] = xz + wy;
        dest[7] = yz - wx;
        dest[8] = 1 - (xx + yy);

        return dest;
    };

    /**
     * Calculates a 4x4 matrix from the given quat4
     *
     * @param {quat4} quat quat4 to create matrix from
     * @param {mat4} [dest] mat4 receiving operation result
     *
     * @returns {mat4} dest if specified, a new mat4 otherwise
     */
    quat4.toMat4 = function(quat, dest) {
        if (!dest) {
            dest = mat4.create();
        }

        var x = quat[0],
            y = quat[1],
            z = quat[2],
            w = quat[3],
            x2 = x + x,
            y2 = y + y,
            z2 = z + z,

            xx = x * x2,
            xy = x * y2,
            xz = x * z2,
            yy = y * y2,
            yz = y * z2,
            zz = z * z2,
            wx = w * x2,
            wy = w * y2,
            wz = w * z2;

        dest[0] = 1 - (yy + zz);
        dest[1] = xy + wz;
        dest[2] = xz - wy;
        dest[3] = 0;

        dest[4] = xy - wz;
        dest[5] = 1 - (xx + zz);
        dest[6] = yz + wx;
        dest[7] = 0;

        dest[8] = xz + wy;
        dest[9] = yz - wx;
        dest[10] = 1 - (xx + yy);
        dest[11] = 0;

        dest[12] = 0;
        dest[13] = 0;
        dest[14] = 0;
        dest[15] = 1;

        return dest;
    };

    /**
     * Performs a spherical linear interpolation between two quat4
     *
     * @param {quat4} quat First quaternion
     * @param {quat4} quat2 Second quaternion
     * @param {number} slerp Interpolation amount between the two inputs
     * @param {quat4} [dest] quat4 receiving operation result. If not specified result is written to quat
     *
     * @returns {quat4} dest if specified, quat otherwise
     */
    quat4.slerp = function(quat, quat2, slerp, dest) {
        if (!dest) {
            dest = quat;
        }

        var cosHalfTheta = quat[0] * quat2[0] + quat[1] * quat2[1] + quat[2] * quat2[2] + quat[3] * quat2[3],
            halfTheta, sinHalfTheta, ratioA, ratioB;

        if (Math.abs(cosHalfTheta) >= 1.0) {
            if (dest !== quat) {
                dest[0] = quat[0];
                dest[1] = quat[1];
                dest[2] = quat[2];
                dest[3] = quat[3];
            }
            return dest;
        }

        halfTheta = Math.acos(cosHalfTheta);
        sinHalfTheta = Math.sqrt(1.0 - cosHalfTheta * cosHalfTheta);

        if (Math.abs(sinHalfTheta) < 0.001) {
            dest[0] = (quat[0] * 0.5 + quat2[0] * 0.5);
            dest[1] = (quat[1] * 0.5 + quat2[1] * 0.5);
            dest[2] = (quat[2] * 0.5 + quat2[2] * 0.5);
            dest[3] = (quat[3] * 0.5 + quat2[3] * 0.5);
            return dest;
        }

        ratioA = Math.sin((1 - slerp) * halfTheta) / sinHalfTheta;
        ratioB = Math.sin(slerp * halfTheta) / sinHalfTheta;

        dest[0] = (quat[0] * ratioA + quat2[0] * ratioB);
        dest[1] = (quat[1] * ratioA + quat2[1] * ratioB);
        dest[2] = (quat[2] * ratioA + quat2[2] * ratioB);
        dest[3] = (quat[3] * ratioA + quat2[3] * ratioB);

        return dest;
    };

    /**
     * Returns a string representation of a quaternion
     *
     * @param {quat4} quat quat4 to represent as a string
     *
     * @returns {string} String representation of quat
     */
    quat4.str = function(quat) {
        return '[' + quat[0] + ', ' + quat[1] + ', ' + quat[2] + ', ' + quat[3] + ']';
    };
 /***************************************************** 
  * File path: ./src/vfold/vfold.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function VFold() {

    
    var p = Class.prototype,c=p.constructor;

    function Class() {

        this.color = 0x232323;
    }

    c.PANEL_HEIGHT=50;

    /****************************************************************
     * Core Components
     ****************************************************************/

    c.desktops;
    c.panels;
    c.folders;
    c.widgets;

    /****************************************************************
     * Event Constants
     ****************************************************************/

    c.WORKSPACE_CHANGE = "workspaceChange";
    c.WORKSPACE_ADD = "workspaceAdd";

    /****************************************************************
     * Rest of properties
     ****************************************************************/

    var intWorkspaceIndex;

    const dctLibraries = {};
    const vctWorkspaces = [];
    var eventDispatcher_;

    /*********************************
     * Core Options
     *********************************/
    var AES_KEY;
    var FACEBOOK_APP_ID;
    /*********************************
     * Secure Value Object for User
     *********************************/
    c.USER;
    /*********************************
     * Gateway Session and if is Root
     *********************************/
    c.HEADER;
    /**********************************
     * Gateway KEY for acceptable calls
     **********************************/
    var ROOT_ENCRYPTED;
    /*********************************
     * Net Connection Pool
     *********************************/
    var NET_POOL;

    function Core() {

        eventDispatcher_ = new EventDispatcher();
        NET_POOL = new Pooling(NetConn);
    }

    c.init = function(options, onReady) {


        /***********************************************
         * Set Core Configuration Options
         ***********************************************/

        AES_KEY = options.aesKey;
        FACEBOOK_APP_ID = options.facebookAppID;
        ROOT_ENCRYPTED = encrypt(options.rootPassword, 128);

        HEADER = new VOHeader();
        HEADER.session = new VOSession();

        /*********************************************************************
         * INIT your session via this validation and authentication Function
         *********************************************************************/

        rootCall("Session.init", function(session) {
            var
            sov = session,
                sobSES = SharedObject.getLocal("vfold_session", "/");

            HEADER.session.id = sobSES.data.id = sov.id;
            HEADER.session.code = sobSES.data.code = sov.code;
            sobSES.flush();
            onReady();
        }, [HEADER.session, ROOT_ENCRYPTED]);

        Facebook.init(FACEBOOK_APP_ID, function(success, failure) {
            onFacebookLogin(success, failure);
        });
    }
   
   c.startGUI = function(workspaces) {

        /*********************************************************
         * Init the the Secure Class for a session Request and
         * enable AMF calls to the gateway
         *********************************************************/

        panels = new PanelHandler();
        folders = new FolderHandler;
        desktops = new DesktopHandler();
        widgets = new WidgetHandler;

        for (var work in workspaces) {
            var workspace = new Workspace();
            workspace.title = work.title;
            for (var comp in work.components) {
                workspace.setComponent(new WorkspaceComponent(comp));
                if (comp.type == VOComponent.FOLDER) {

                    var path = comp.menu_path.split(".");

                    var parent = workspace.menu;
                    var child;

                    for (var i = 0;
                    i < path.length;
                    i++) {
                        child = parent.children[path[i]];
                        if (!child) {
                            child = new MenuOptions();
                            child.title = path[i];
                        }
                        if (i == path.length - 1) {
                            child.launch = comp.class_path;
                        }
                        parent.children[path[i]] = child;
                        parent = child;
                    }
                }
            }
            vctWorkspaces.push(workspace);
            eventDispatcher_.dispatchEvent(new Event(WORKSPACE_ADD));
        }

        /************************************************
         * Check POST URL Parameters
         ************************************************/

        var pr = VFOLD.stage.loaderInfo.parameters;
        if (pr.confirm) {
            rootCall("User.confirm", function(confirmed) {
                if (confirmed) {
                    notify("Your account has been confirmed!\nNow you can sign-in");
                }
            }, pr.confirm);
        }

        /*********************************************************
         * Call javascript methods
         *********************************************************/

        UtilityJavascript.initMouseWheel(VFOLD.stage);
        UtilityJavascript.changeDocumentTitle(VFOLD.projectTitle + "-" + vctWorkspaces[0].title);

        widgets.init();
        folders.init();
        panels.init();

        panels.addTool(new UserTool());

        stage.addChild(desktops);
        stage.addChild(widgets);
        stage.addChild(folders);
        stage.addChild(panels);

        useWorkspace(0);

        notify("Powered by vfold");
    }
    c.notif = function() {

        var t = " ";
        for (var s in rest) {
            t += String(s) + " ";
        }
        widgets.notifier.notify(t);
    }
    c.useWorkspace = function(index) {

        intWorkspaceIndex = index;
        dispatcher.dispatchEvent(new Event(WORKSPACE_CHANGE));
    }

    c.getDesktopHandler = function() {
        return desktops
    }
    c.getPanelHandler = function() {
        return panels
    }
    c.getFolderHandler = function() {
        return folders
    }
    c.getWidgetHandler = function() {
        return widgets
    }

    c.getDispatcher = function() {
        return eventDispatcher_;
    }
    c.getCurrentWorkspace = function() {
        return vctWorkspaces[intWorkspaceIndex];
    }
    c.getDefaultWorkspace = function() {
        return vctWorkspaces[0];
    }
    c.getCurrentWorkspaceIndex = function() {
        return intWorkspaceIndex;
    }
    c.getCurrentUser = function() {
        return USER;
    }

    c.getLibraries = function() {
        return dctLibraries;
    }

    c.appCall = function(command, onSuccess, params, onError) {

        getConnection(onSuccess, onError).amfCall(command, params, false);
    }
    c.rootCall = function(command, onSuccess, params, onError) {

        getConnection(onSuccess, onError).amfCall(command, params, true);
    }

    function getConnection(onSuccess, onError) {

        var conn = NetConn(NET_POOL.getObject());

        if (NET_POOL.instantiated) {
            conn.onClose = function(conn) {
                NET_POOL.returnToPool(conn)
            }
        }

        conn.onSuccess = onSuccess;
        conn.onError = onError;

        return conn;
    }

    c.getExternalClass = function(srcAppDomain, library, classPath) {

        var tgtAppDomain = dctLibraries[library];
        if (!tgtAppDomain) {
            return null;
        }
        if (!tgtAppDomain.hasDefinition(classPath)) {
            return null;
        }
        return tgtAppDomain.getDefinition(classPath)
    }
    c.checkRootPassword = function(password) {
        return AES_KEY == decrypt(ROOT_ENCRYPTED, password, 128);
    }
    c.signInFacebook = function() {
        Facebook.login(onFacebookLogin, {
            perms: "user_about_me, user_birthday, email, publish_stream, offline_access"
        });
    }
    c.onFacebookLogin = function(success, fail) {
        var m;
/* if(success){
Facebook.api("/me",
function(success:Object,failure:Object):void{
amfCall("Account.getAccountByFID",function(acc:UserPrivate):void{
if(acc){
USR=acc;
Core.dispatcher.dispatchEvent(new Event(Core.USER_CHANGE));
m="Welcome back "+USR.first_name+"!";
}
else{
acc = new UserPrivate();
acc.first_name=success.first_name;
acc.last_name=success.last_name;
acc.facebook_id=success.id;
acc.email=success.email;
acc.gender=success.male;
acc.birthday=success.birthday;
m="Registering Facebook account...";
amfCall("User.add",function():void{

},acc)
}
Core.notify(m);
},success.id)
});
}
else{

} */
    }
    c.signInUser = function(email, password, callback) {

        var strNTF;
        rootCall("User.getOneBy",

        function(response) {
            trace(response.role_value);
            if (response.role_value == UserRole.GUEST) {
                callback(false);
                Core.notify("User has not yet been confirmed..Check your email");
            }
            else {
                rootCall("User.get", function(user) {
                    if (AES_KEY == decrypt(user.password, password)) {
                        USER = user;
                        Core.dispatcher.dispatchEvent(new Event(VFOLD.USER_CHANGE));
                        callback(true);
                        strNTF = "Welcome back " + USER.first_name + "!";
                    }
                    else {
                        callback(false);
                        strNTF = "Wrong password, try again";
                    }
                    Core.notify(strNTF);
                }, response.id);
            }
        }, [{
            email: email
        }, ["role_value", "id"]],

        function(errorCode) {
            if (errorCode == ErrorUser.NOT_FOUND) Core.notify("Wrong email,try again");
        });
    }
    /************************************************
     * AES Encryption
     ************************************************/
    c.encrypt = function(password, bitKey) {
        return UtilityCryptography.encrypt(AES_KEY, password, bitKey ? bitKey : 256);
    }
    /************************************************
     * AES Decryption
     ************************************************/
    c.decrypt = function(encrypted, password, bitKey) {
        return UtilityCryptography.decrypt(encrypted, password, bitKey ? bitKey : 256);
    }
}
 /***************************************************** 
  * File path: ./src/vfold/layer/desktop.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/
 
    function Desktop(){
    Class.prototype = new Container();
    Class.prototype.constructor = Class;

}
 /***************************************************** 
  * File path: ./src/vfold/layer/panel.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Panel() {
    
    var p = new Container();
    p.constructor = Class;

    var menuLauncher, menu_, toolbar_;

    var folderBar,

    CONTENT_GAP = 3, LOADER_BAR_HEIGHT = 3, CONTENT_HEIGHT;

    function Class() {
        
        menuLauncher = new PanelMenuLauncher()
        menu_  = new Menu();
        PanelToolBar = new PanelToolbar();
        CONTENT_HEIGHT = VFold.PANEL_HEIGHT - LOADER_BAR_HEIGHT

    }

    p.init = function() {
        const background = new PanelBackground;

        folderBar = Core.folderHandler.folderBar;
        menu_.x = menu_.gap;
        menu_.y = VFOLD.PANEL_HEIGHT + menu_.gap;
        menu_.onMenuButtonDown = function(btn) {
            Core.folderHandler.addFolder(btn.options.launch);
        };

        p.add(background);
        p.add(menuLauncher);
        p.add(folderBar);
        p.add(toolbar_);
        p.add(menu_);

        mouseEnabled = false;

        VFOLD.onStageResize = function() {
            background.draw();
        }
    }
    p.addTool = function(tool) {
        toolbar_.addTool(tool)
    }
    p.onWorkspaceChange = function() {
        // Default Logo
        var
        bmpDEF = Core.defaultWorkspace.menu.icon,
            bdtCUR = Core.currentWorkspace.menu.icon;

        menu_.addButtons(Core.currentWorkspace.menu.children);
        menuLauncher.changeLogo(bdtCUR ? bdtCUR : bmpDEF);

        toolbar_.x = folderBar.x = menuLauncher.width;
        toolbar_.onStageResize();
    }

    p.getMenu = function() {
        return menu_
    }
    p.getToolbar = function() {
        return toolbar_
    }


    function PanelBackground() {

        var p = Class.prototype;
        p = new Kinetic.Group();
        p.constructor = Class;

        // Background
        var bg = new Kinetic.Shape("panelBackground");
        // Loader Line TODO: Make a Sync/ASync PreLoader
        var ln = new Kinetic.Shape("panelLoader");
        // Shadow
        var sh = new Kinetic.Shape("shadow");

        const gt = GradientType.LINEAR;
        var m = new Matrix;

        function Class() {

            bg.alpha = .8;
            addChild(bg);
            addChild(sh);
            addChild(ln);
            mouseEnabled = mouseChildren = false;
            ln.y = PanelHandler.CONTENT_HEIGHT;
            sh.y = VFOLD.PANEL_HEIGHT;
        }
        p.draw = function() {
            var g;
            /*********************************
             *  Background
             *********************************/
            g = bg.getContext();
            g.clear();
            g.beginFill(VFOLD.color, .7);
            g.drawRect(0, 0, VFOLD.stage.stageWidth, PanelHandler.CONTENT_HEIGHT);
            g.endFill();
            /*********************************
             *  Shadow
             *********************************/
            g = sh.getContext();
            g.clear();
            m.createGradientBox(VFOLD.stage.stageWidth, 20, Math.PI / 2);
            g.beginGradientFill(gt, [0, 0], [.7, 0], [0, 255], m);
            g.drawRect(0, 0, VFOLD.stage.stageWidth, 20);
            g.endFill();
            /*********************************
             *  Loader Line
             *********************************/
            g = ln.getContext();
            g.clear();
            g.beginFill(UtilityColor.brightness(VFOLD.color, .7));
            g.drawRect(0, 0, VFOLD.stage.stageWidth, PanelHandler.LOADER_BAR_HEIGHT);
            g.endFill();
        }
        return Class;
    }

    function PanelMenuLauncher() {

        var p = new Kinetic.Group();
        p.constructor = Class;

        // Clicked Boolean
        var cB = false;
        // Tween Max
        var TM;
        // Logo Bitmap
        var bL = VFold.call("System.getImage","menu");
        // Height
        var h;

        function Class() {


            var c = UtilityColor.hexToRGB(VFOLD.color);
            TweenMax.to(bL, 0, {
                colorTransform: {
                    redOffset: c.red,
                    greenOffset: c.green,
                    blueOffset: c.blue
                }
            });
            addChild(bL);
            h = PanelHandler.CONTENT_HEIGHT;
            x = 5;
            alpha = .8;

            addEventListener(MouseEvent.MOUSE_OVER, onBtnOver);
            addEventListener(MouseEvent.MOUSE_OUT, onBtnOut);
            addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);

            TweenMax.to(this, 0, {
                glowFilter: {
                    color: 0xFFFFFF,
                    blurX: 30,
                    blurY: 7,
                    alpha: 1,
                    strength: 1.3
                }
            });
            TM = TweenMax.to(this, .15, {
                paused: true,
                glowFilter: {
                    blurX: 7,
                    blurY: 7,
                    alpha: 1
                }
            });
        }
        p.changeLogo = function(logo) {
            if (logo) bL.bitmapData = logo.bitmapData;
            y = (height - bL.height) / 2;
        }

        function onMouseDown() {
            if (cB) {
                cB = false;
                Core.panelHandler.menu.fadeOut();
                onBtnOut();
                VFOLD.stage.removeEventListener(MouseEvent.MOUSE_DOWN, onStageDown);
                addEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
            }
            else {
                onBtnOver();
                Core.panelHandler.menu.fadeIn();
                cB = true;
                VFOLD.stage.addEventListener(MouseEvent.MOUSE_DOWN, onStageDown);
                removeEventListener(MouseEvent.MOUSE_DOWN, onMouseDown);
            }
        }

        function onStageDown() {
            if (e.target != this) {
                onMouseDown()
            }
        }

        function onBtnOver() {
            if (!cB) TM.play()
        }

        function onBtnOut() {
            if (!cB) TM.reverse()
        }

        p.getWidth = function() {
            return x * 2 + this.width
        }
        p.getHeight = function() {
            return h
        }

    }

    function PanelToolBar() {

        var p = Class.prototype;
        p = new Kinetic.Group();
        p.constructor = Class;


        // Left Container
        var lc = new Kinetic.Group();
        // Right Container
        var rc = new Kinetic.Group();
        // Width
        var w;
        // Height
        var h;
        // Tool Gap
        const g = 2;

        /******************************************
         * GLOBAL TOOLS *
         ******************************************/

        // Workspace Switcher Tool
        var ws;

        function Class() {

            y = CONTENT_GAP;
            h = (CONTENT_HEIGHT - CONTENT_GAP) / 2 - CONTENT_GAP;
            addEventListener(Tool.TOOL_CHANGE, onToolChange);

            ws = new WorkspaceSwitcher();
            addTool(ws);
            addChild(lc);
            addChild(rc);

            VFOLD.onStageResize = onStageResize;
        }

        p.onStageResize = function() {
            w = VFOLD.stage.stageWidth - x - CONTENT_GAP - g;
            rc.x = w;
            dispatchEvent(new Event(DropBox.ADJUST_OFFSET));
        }

        function onToolChange(e) {
            var t = Tool(e.target);
            var i;
            switch (t.align) {
            case Tool.ALIGN_LEFT:
                for (i = 0; i < lc.numChildren; i++) {
                    if (i != 0) lc.getChildAt(i).x = lc.getChildAt(i - 1).x + lc.getChildAt(i - 1).width + g;
                    else lc.getChildAt(i).x = g;
                }
                break;
            case Tool.ALIGN_RIGHT:
                for (i = 0; i < rc.numChildren; i++) {
                    if (i != 0) rc.getChildAt(i).x = -rc.getChildAt(i - 1).x - rc.getChildAt(i - 1).width - g;
                    else rc.getChildAt(i).x = -rc.getChildAt(i).width;
                }
                break;
            }
        }

        p.addTool = function(tool) {
            var i;
            switch (tool.align) {

            case Tool.ALIGN_LEFT:
                i = lc.numChildren;
                lc.addChild(tool);
                if (i != 0) tool.x = lc.getChildAt(i - 1).x + lc.getChildAt(i - 1).width + g;
                else tool.x = g;
                break;
            case Tool.ALIGN_RIGHT:
                i = rc.numChildren;
                rc.addChild(tool);
                if (i != 0) tool.x = -rc.getChildAt(i - 1).x - tool.width - g;
                else tool.x = -tool.width;
                break;
            }
        }

        p.getWidth = function() {
            return w
        }

        p.getHeight = function() {
            return h
        }

    }
}
 /***************************************************** 
  * File path: ./src/vfold/layer/widgets.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

inherit(Widget,Container);
    function Widget(){
   
    }
 /***************************************************** 
  * File path: ./src/vfold/layer/folders.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/


function Folders() {

    var p = new Container(),

        /*********************************
         *  Workspace Containers
         *********************************/
        wrkContainers = [],
        /*********************************
         *  Active Folder
         *********************************/
        actFolder,
        /*********************************
         *  Folder Tabs
         *********************************/
        fldTabs;

        this.dispatcher = new EventDispatcher();

    function onTabClose() {
        removeFolder(fldTabs.currentData);
    }

    function onTabSelect() {
        selectFolder(fldTabs.currentData);
    }

    function selectFolder(folder) {
        if (wSpace.numChildren > 0) Folder(wSpace.getChildAt(wSpace.numChildren - 1)).active = false;
        folder.active = true;
        fldTabs.selectTab(folder);
        actFolder = folder;
        wSpace.addChildAt(folder, wSpace.numChildren);
        dispatchEvent(new Event(FOLDER_SELECT));
    }

    p.constructor = Class;

    p.init = function() {

        // This is a dummy dashboard workspace
        this.add(new Kinetic.Layer());
        this.dispatcher.addListener(VFoldEvents.FOLDER_SELECT, function() {
            p.selectFolder(Folder(e.target));
        });

        fldTabs = new Tabs(Panel.CONTENT_HEIGHT / 2 - 3, VFold.color, .7, onTabSelect, onTabClose);
        fldTabs.y = PanelHandler.CONTENT_HEIGHT - fldTabs.height;
        addChild(fldTabs);

        VFold.addResizeCallback(function() {
            fldTabs.adjust(stage.width - x);
        });
    }

    p.addFolder = function(classPath) {
        WorkspaceComponent.instantiate(classPath, function(instance) {
            var f = instance;
            fldTabs.addTab(f.name, f);
            dispatchEvent(new Event(FOLDER_CREATE));
            selectFolder(f);
        });
    }

    p.removeFolder = function(folder) {
        actFolder = folder;
        wSpace.removeChild(folder);
        dispatchEvent(new Event(FOLDER_CLOSING));
        if (wSpace.numChildren > 0) Folder(wSpace.getChildAt(wSpace.numChildren - 1)).active = true;
    }

    p.closeFolder = function(folder) {
        fldTabs.removeTabByData(folder);
        removeFolder(folder);
    }

    p.selectFolder = selectFolder;

    p.getFolderBar = function() {
        return fldTabs
    }
    p.getActiveFolder = function() {
        return actFolder
    }

    p.onWorkspaceChange = function() {
        this.remove(0);
        this.add(wrkContainers[Core.currentWorkspaceIndex]);
    }

    function onWorkspaceAdd() {
        wrkContainers.push(new Kinetic.Container());
    }

    function getCurrentContainer() {
        return wrkContainers[Core.currentWorkspaceIndex]
    }
}
 /***************************************************** 
  * File path: ./src/vfold/component/folder.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/
 
        function Folder(){

        }
        Folder.prototype={

        };

 /***************************************************** 
  * File path: ./src/vfold/component/tool.js 
  *****************************************************/ 

 /***************************************************** 
  * File path: ./src/vfold/component/wallpaper.js 
  *****************************************************/ 

 /***************************************************** 
  * File path: ./src/vfold/component/widget.js 
  *****************************************************/ 

 /***************************************************** 
  * File path: ./src/vfold/page.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

var Page={}

    Page.init = function() {

        window.onresize();

        var shape = new Shape();

        shape.beginFill(1, .2, 0, 1);
        shape.x = 126;
        shape.drawRect(0, 0, 300, 100);
        //shape.endFill();
        //Stage.add(shape);
    }
 /***************************************************** 
  * File path: ./src/vfold/options.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Options(rootPassword, aesKey, facebookAppID) {

    /********************************************************************
     *  Security options for the vfold platform
     ********************************************************************/

        this.rootPassword = rootPassword;
        this.aesKey = aesKey;
        this.facebookAppID = facebookAppID;
    }
 /***************************************************** 
  * File path: ./src/vfold/workspace.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

    /********************************************
     * The workspace contains the main layers:
     * Folders, Widgets, Desktop, Panel
     ********************************************/

    function Workspace() {

        var p = Class.prorotype;

        /***************************************
         * Components
         ***************************************/

        var dicFolders = [],
            dicTools = [],
            dicWidgets = [],
            dicDesktops = [];

        function Class() {

        }

        p.title = "Untitled";

        p.menu = new MenuOptions;

        p.getFolders = function() {
            return dicFolders;
        };
        p.getTools = function() {
            return dicTools;
        };
        p.getWidgets = function() {
            return dicWidgets;
        };
        p.getDesktops = function() {
            return dicDesktops;
        };

        p.getComponent = function(classPath) {

            var
            f = dicFolders[classPath],
                d = dicDesktops[classPath],
                w = dicWidgets[classPath],
                t = dicTools[classPath];

            return f ? f : d ? d : w ? w : t ? t : null;
        };


        p.setComponent = function(component) {

            var t = WorkspaceComponent.type;

            switch (component.type) {

            case t.DESKTOP:
                component.initOnce = true;
                dicDesktops[component.class_path] = component;
                break;

            case t.FOLDER:

                var parent = menu;
                var titles = component.menu_path.split(".");
                for (var i;
                i < titles.length;
                i++) {
                    var title = titles[i];
                    var child = parent.children[title];
                    if (!child) {
                        child = new MenuOptions();
                        child.title = title;
                        if (i == titles.length - 1) {
                            child.launch = component.class_path;
                        }
                        parent.setChild(child);
                    }
                    parent = child;
                }
                dicFolders[component.class_path] = component;
                break;

            case t.WIDGET:

                dicWidgets[component.class_path] = component;
                break;

            case t.TOOL:
                component.initOnce = true;
                dicTools[component.class_path] = component;
                break;

            default:
                alert("Unrecognized type");
                break;

            }
        };
        Workspace = Class;
    }

    /********************************************************
     * Workspace Layers:
     * Folders, Desktop, Panel, Widgets
     ********************************************************/

    function WorkspaceLayer() {

        var p = new Kinetic.Layer("WorkspaceLayer");
        p.constructor = Class;

        function Class() {

            this.dispatcher = new EventDispatcher();
        }

        WorkspaceLayer = Class;
    }

    /********************************************************
     * Workspace Component Handler where external libraries
     * are loaded and instantiated appropriately 
     ********************************************************/

    function WorkspaceComponent() {

        const instances = [];
        var initOnce = false;

        function Class(component) {

        }

        Class.instantiate = function(classPath, onInstantiate) {

            var appDomain = new ApplicationDomain(VFOLD.appDomain);
            var comp = Core.currentWorkspace.getComponent(classPath);
            if (!comp) {
                alert("Component not found!");
                return;
            }
            var vobLib;
            // Dependency Loaded Count
            var dlc = 0;

            init();

            function init() {

                if (appDomain.hasDefinition(comp.class_path)) {

                    if (comp.initOnce && comp.instances.length > 0) {
                        onInstantiate(comp.instances[0]);
                    }
                    else {
                        var compClass = appDomain.getDefinition(comp.class_path),
                            inst = new compClass;
                        inst.name = comp.title;
                        onInstantiate(inst);
                    }

                }
                else if (vobLib) {

                    if (vobLib.dependencies.length > 0) {

                        for (var dependency in vobLib.dependencies) {
                            if (Core.libraries[dependency]) onDependencyLoaded();

                            else {

                                /***********************************************************
                                 * Get Dependency from Database
                                 ***********************************************************/

                                Core.appCall("Library.getByName", function(library) {
                                    loadLibrary(library.data, onDependencyLoaded);
                                }, [dependency]);
                            }
                        }
                    }
                    else {

                        loadLibrary(vobLib.data, onLibraryLoaded)
                    }
                }
                else if (!comp.libraryTitle) {

                    alert("Library ID not specified");
                }
                else {
                    /***********************************************************
                     * Get Library from Database
                     ***********************************************************/

                    Core.appCall("Library.get", function(library) {
                        vobLib = library;
                        init();
                    }, [comp.libraryTitle]);
                }
            }

            function loadLibrary(libraryData, onLibraryLoaded) {

                var rsl = new Loader();
                rsl.contentLoaderInfo.addEventListener(Event.COMPLETE, function() {

                    onLibraryLoaded();
                });
                rsl.loadBytes(libraryData, new LoaderContext(false, appDomain));
            }

            function onDependencyLoaded() {

                dlc++;
                if (dlc == vobLib.dependencies.length) {
                    dlc = 0;
                    loadLibrary(vobLib.data, onLibraryLoaded);
                }
            }

            function onLibraryLoaded() {

                vobLib = null;
                init();
            }

            WorkspaceComponent = Class;
        }
    }
 /***************************************************** 
  * File path: ./src/vfold/utility/webgl.js 
  *****************************************************/ 
// Licensed under a BSD license. See ../license.html for license
// These funcitions are meant solely to help unclutter the tutorials.
// They are not meant as production type functions.
var gl = {};

    gl.init = function(){
    
    var canvas;

        /**
         * Creates the HTLM for a failure message
         * @param {string} canvasContainerId id of container of the
         * canvas.
         * @return {string} The html.
         */
        var makeFailHTML = function(msg) {
                return '' + '<table style="background-color: #8CE; width: 100%; height: 100%;"><tr>' + '<td align="center">' + '<div style="display: table-cell; vertical-align: middle;">' + '<div style="">' + msg + '</div>' + '</div>' + '</td></tr></table>';
            };
        /**
         * Mesasge for getting a webgl browser
         * @type {string}
         */
        var GET_A_WEBGL_BROWSER = '' + 'This page requires a browser that supports WebGL.<br/>' + '<a href="http://get.webgl.org">Click here to upgrade your browser.</a>';
        /**
         * Mesasge for need better hardware
         * @type {string}
         */
        var OTHER_PROBLEM = '' + "It doesn't appear your computer can support WebGL.<br/>" + '<a href="http://get.webgl.org/troubleshooting/">Click here for more information.</a>';
        /**
         * Creates a webgl context. If creation fails it will
         * change the contents of the container of the <canvas>
         * tag to an error message with the correct links for WebGL.
         * @param {Element} canvas. The canvas element to create a
         * context from.
         * @param {WebGLContextCreationAttirbutes} opt_attribs Any
         * creation attributes you want to pass in.
         * @return {WebGLRenderingContext} The created context.
         */

        function setupWebGL(canvas, opt_attribs) {
            function showLink(str) {
                var container = canvas.parentNode;
                if (container) {
                    container.innerHTML = makeFailHTML(str);
                }
            }
            if (!window.WebGLRenderingContext) {
                showLink(GET_A_WEBGL_BROWSER);
                return null;
            }
            var context = create3DContext(canvas, opt_attribs);
            if (!context) {
                showLink(OTHER_PROBLEM);
            }
            return context;
        };
        /**
         * Creates a webgl context.
         * @param {!Canvas} canvas The canvas tag to get context
         * from. If one is not passed in one will be created.
         * @return {!WebGLContext} The created context.
         */

        function create3DContext(canvas, opt_attribs) {
            var names = ["webgl", "experimental-webgl"];
            var context = null;
            for (var ii = 0; ii < names.length; ++ii) {
                try {
                    context = canvas.getContext(names[ii], opt_attribs);
                }
                catch (e) {}
                if (context) {
                    break;
                }
            }
            return context;
        }
        /**
         * Loads a shader.
         * @param {!WebGLContext} gl The WebGLContext to use.
         * @param {string} shaderSource The shader source.
         * @param {number} shaderType The type of shader.
         * @param {function(string): void) opt_errorCallback callback for errors.
         * @return {!WebGLShader} The created shader.
         */

        function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
            var errFn = opt_errorCallback || error;
            // Create the shader object
            var shader = gl.createShader(shaderType);
            // Load the shader source
            gl.shaderSource(shader, shaderSource);
            // Compile the shader
            gl.compileShader(shader);
            // Check the compile status
            var compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compiled) {
                // Something went wrong during compilation; get the error
                error("*** Error compiling shader '" + shader + "':" + gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };
        /**
         * Provides requestAnimationFrame in a cross browser way.
         */
        window.requestAnimFrame = (function() {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
            function( /* function FrameRequestCallback */
            callback, /* DOMElement Element */
            element) {
                return window.setTimeout(callback, 1000 / 60);
            };
        })();
        /**
         * Provides cancelRequestAnimationFrame in a cross browser way.
         */
        window.cancelRequestAnimFrame = (function() {
            return window.cancelCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.clearTimeout;
        })();

        /*****************************************************************
         * Check the WebGL context support
         *****************************************************************/

        gl = setupWebGL(canvas = document.getElementById("canvas"));

        /**
         * Loads a shader from a script tag.
         * @param {!WebGLContext} gl The WebGLContext to use.
         * @param {string} scriptId The id of the script tag.
         * @param {number} opt_shaderType The type of shader. If not passed in it will
         * be derived from the type of the script tag.
         * @param {function(string): void) opt_errorCallback callback for errors.
         * @return {!WebGLShader} The created shader.
         */

        gl.createShaderFromScript=function(
        scriptId, opt_shaderType, opt_errorCallback) {
            var shaderSource = "";
            var shaderType;
            var shaderScript = document.getElementById(scriptId);
            if (!shaderScript) {
                throw ("*** Error: unknown script element: '" + scriptId +"'");
            }
            shaderSource = shaderScript.text;
            if (!opt_shaderType) {
                if (shaderScript.type == "x-shader/x-vertex") {
                    shaderType = gl.VERTEX_SHADER;
                }
                else if (shaderScript.type == "x-shader/x-fragment") {
                    shaderType = gl.FRAGMENT_SHADER;
                }
                else if (shaderType != gl.VERTEX_SHADER && shaderType != gl.FRAGMENT_SHADER) {
                    throw ("*** Error: unknown shader type");
                    return null;
                }
            }
            return loadShader(
            gl, shaderSource, opt_shaderType ? opt_shaderType : shaderType, opt_errorCallback);
        };

        gl.make2DProjection = function(width, height) {
            // Note: This matrix flips the Y axis so 0 is at the top.
            return [
            2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
        }
        gl.makeTranslation = function(tx, ty) {
            return [
            1, 0, 0, 0, 1, 0, tx, ty, 1];
        }
        gl.makeRotation = function(angleInRadians) {
            var c = Math.cos(angleInRadians);
            var s = Math.sin(angleInRadians);
            return [
            c, -s, 0, s, c, 0, 0, 0, 1];
        }
        gl.makeScale = function(sx, sy) {
            return [
            sx, 0, 0, 0, sy, 0, 0, 0, 1];
        }
        return canvas;
    }
 /***************************************************** 
  * File path: ./src/vfold/utility/pooling.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Pooling() {
   
   /*****************************************
     *  Objects in the Pool (Active/Inactive)
     *****************************************/
    var availableOBJs = [],
        activeOBJs = [],
        /*********************************
         *  Object Class
         *********************************/
        OC,
        /*****************************************
         *  If last Object got was instantiated
         *****************************************/
        ib;

    function Class(ObjectClass) {

        OC = ObjectClass;
    }

    Class.prototype = {

        getObject: function() {
            var o;
            if (availableOBJs.length > 0) {
                o = availableOBJs.pop();
                ib = false;
            }
            else {
                o = new OC();
                ib = true;
            }
            activeOBJs.push(o);
            return o;
        },

        returnToPool: function(object) {
            activeOBJs.splice(activeOBJs.indexOf(object), 1);
            availableOBJs.push(object);
        },

        returnAll: function() {
            while (activeOBJs.length > 0) {
                var o = activeOBJs[0];
                activeOBJs.splice(0, 1);
                availableOBJs.push(o);
            }
        },

        getObjects: function() {
            return activeOBJs;
        },

        isLastInstantiated: function() {
            return ib;
        },

        numActiveObjects: function() {
            return activeOBJs.length;
        }

    };
    Pooling=Class;
}
 /***************************************************** 
  * File path: ./src/vfold/utility/math.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

    // Returns a random integer from 0 to range - 1.
    Math.randomInt = function(range) {
        return Math.floor(Math.random() * range);
    };
 /***************************************************** 
  * File path: ./src/vfold/display/shape.js 
  *****************************************************/ 
/*********************************************************************
* Licensed under the Open Software License version 3.0 *
* *
* This Open Software License (OSL-3.0) applies to any original work *
* of authorship "vfold" whose owner Raphael Varonos has placed the *
* following licensing notice adjacent to the copyright notice for *
* the Original Work *
*********************************************************************/

function Shape() {

    var p = Class.prototype = new Child();

    function Class() {

        var path,

        /* Color*/
        r = 1,
        g = 1,
        b = 1,
        a = 1;

        p.beginFill = function(red, green, blue, alpha) {

            r = red;
            g = green;
            b = blue;;
            a = alpha;
        }

        // Fills the buffer with the values that define a rectangle.
        p.drawRect = function(x1, y1, width, height) {

            var
            x2 = x1 + width,
                y2 = y1 + height;

            path = new Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2]);

            draw();
        }
        
        p.bezierTo = function(){
            
        }

        function draw() {

            var pr = program.NORMAL;

            gl.useProgram(pr);
            gl.bindBuffer(gl.ARRAY_BUFFER, p.buffer);

            gl.enableVertexAttribArray(pr.positionLocation);
            gl.vertexAttribPointer(pr.positionLocation, 2, gl.FLOAT, false, 0, 0);

            gl.uniform4f(pr.colorLocation, r, g, b, a);
            gl.bufferData(gl.ARRAY_BUFFER, path, gl.STATIC_DRAW);

            p.compute();

            gl.drawArrays(gl.TRIANGLES, 0, 6);

        }
        p.lineStyle = function(thickness, color, alpha) {}
        p.moveTo = function(x, y) {
            path = [x, y];
        }
        p.lineTo = function(x, y) {
            path.push(x, y);
        }
    }
}
 /***************************************************** 
  * File path: ./src/vfold/display/sprite.js 
  *****************************************************/ 

 /***************************************************** 
  * File path: ./src/vfold/display/stage.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Stage() {

    var blnInit = false;
}

Stage.init = function(callback) {

    Stage = gl.init();

    program.init(function() {


        var callbacks = [];

        Stage.addResizeCallback = function(func) {

            callbacks.push(func);
        }

        /*****************************************************************
         * On Stage resize callback
         *****************************************************************/

        window.onresize = function() {
            // set the resolution
            Stage.width = window.innerWidth;
            Stage.height = window.innerHeight;
            gl.viewport(0, 0, Stage.width, Stage.height);
            gl.clear(gl.COLOR_BUFFER_BIT);
            render();
            Stage.projectionMatrix = gl.make2DProjection(Stage.width, Stage.height);

            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i]();
            }

            gl.flush();
            gl.finish();
        }

        callback();
    });
};
 /***************************************************** 
  * File path: ./src/vfold/display/container.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Container() {

    var p = Class.prototype;

    function Class() {

        this.children = [];
        this.childrenIDs = [];
    }

    /************************************************
     * Add Child to the container
     *************************************************/

    p.addChild = function(child) {
        this.childrenIDs[child.id] = child;
        child.index = this.children.length;
        child.parent = this;
        this.children.push(child);
    }

    /************************************************
     * Remove Display Object Child from the container
     *************************************************/

    p.removeChild = function(child) {
        this.childrenIDs[child.id] = undefined;
        this.children.splice(child.index, 1);
        setChildrenIndices();
        child = undefined;
    }

    /************************************************
     * Add Child at a specified index
     *************************************************/

    p.addChildAt = function(child, index) {
        this.childrenIDs[child.id] = child;
        child.index = index;
        child.parent = this;
        this.children.splice(index, 0, child);
        setChildrenIndices();
    }

    /************************************************
     * Remove Child from a specific index
     *************************************************/

    p.removeChildAt = function(index) {
        var child = this.children[index];
        this.childrenIDs[child.id] = undefined;
        this.children.splice(index, 1);
        setChildrenIndices();
        child = undefined;
    }
    /************************************************
     * Reorder Children based on their array index
     *************************************************/

    function setChildrenIndices() {
        for (var n = 0; n < this.children.length; n++) {
            this.children[n].index = n;
        }
    }
}
 /***************************************************** 
  * File path: ./src/vfold/display/child.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

    function Shape() {
        
            var idCount = 0,
        angleInRadians = 0,


        p = Class.prototype;

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
 /***************************************************** 
  * File path: ./src/vfold/display/program.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

function Program() {

    Program.init = function(callback) {

        var vertexShaders = {},
            fragmentShaders = {};

        Program.baseURL = 'vfold/shader/';

        var derivatesExt = "OES_standard_derivatives";
        var derivatesSupported = (gl.getSupportedExtensions().indexOf(derivatesExt) >= 0);
        if (derivatesSupported) {
            gl.getExtension(derivatesExt);
        }

        loadShaders([
            'vertex-matrix',
            'fragment-color',
            'fragment-bezier'
                ]);

        function loadShaders(filenames) {
            var loadCount = 0;
            for (var i = 0; i < filenames.length; i++) {
                loadShader(filenames[i], function() {
                    loadCount++;
                    if (loadCount == filenames.length) {
                        makeMaterials();
                    }
                })
            }
        }

        function loadShader(filename, callback) {

            var arr = filename.split("-");
            var script = document.createElement('script');
            script.id = filename;

            var shaders;

            switch (arr[0]) {
            case "vertex":
                script.type = "x-shader/x-vertex";
                shaders = vertexShaders;
                break;
            case "fragment":
                script.type = "x-shader/x-fragment";
                shaders = fragmentShaders;
                break;
            default:
                return;
                break;
            }

            require(["text!" + program.baseURL + filename + ".html"], function(text) {
                script.text = text;
                document.getElementsByTagName('head')[0].appendChild(script);
                shaders[arr[1]] = gl.createShaderFromScript(filename);
                callback();
            });
        }

        function makeMaterials() {
            /*****************************************************************
             * Setup a GLSL program for Matrix Positioning and Default Pixel 
             * Color assignment
             *****************************************************************/
            var prog = create([vertexShaders.matrix, fragmentShaders.color]);

            prog.positionLocation = gl.getAttribLocation(prog, "a_position");
            prog.colorLocation = gl.getUniformLocation(prog, "u_color");
            prog.matrixLocation = gl.getUniformLocation(prog, "u_matrix");

            program.NORMAL = prog;

            callback();
        }

        /**
         * Creates a program, attaches shaders, binds attrib locations
         * @param {!Array.<!WebGLShader>} shaders The shaders to attach
         * @param {!Array.<string>} opt_attribs The attribs names.
         * @param {!Array.<number>} opt_locations The locations for the attribs.
         */

        function create(shaders, opt_attribs, opt_locations) {
            var program = gl.createProgram();
            for (var i = 0; i < shaders.length; i++) {
                gl.attachShader(program, shaders[i]);
            }
            if (opt_attribs) {
                for (var i = 0; i < opt_attribs.length; i++) {
                    gl.bindAttribLocation(
                    program, opt_locations ? opt_locations[i] : i, opt_attribs[i]);
                }
            }
            gl.linkProgram(program);
            // Check the link status
            var linked = gl.getProgramParameter(program, gl.LINK_STATUS);
            if (!linked) {
                // something went wrong with the link
                error("Error in program linking:" + gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };
    }
}
 /***************************************************** 
  * File path: ./src/vfold/core.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/


function Core() {

}
 /***************************************************** 
  * File path: ./src/vfold/tool/workspaceList.js 
  *****************************************************/ 

 /***************************************************** 
  * File path: ./src/vfold/control/menu.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

    /********************************************
     * Drop down list of menu Buttons that can 
     * have manu additional attributes
     ********************************************/

    function Menu() {
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

    function MenuButtons() {

        var p = new Container();

        function Class(buttonColor, buttonGap) {

            bC = buttonColor;
            bG = buttonGap;

           // ttl = new TimelineLite({
        //        paused: true
          //  });
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
                return bC;
            }
            p.getButton = function() {
                return bL;
            }

            p.setWidth = function(value) {

                bL.width = value;
                bC.x = value + bG;
            }
            p.getHeight = function() {

                return bL.height;
            }
        }
    }

    /********************************************
     * The Child Button of a group belonging in   
     * menu tree hierarchy
     ********************************************/

    function MenuButton() {

        var p = new Container();


    }
 /***************************************************** 
  * File path: ./main.js 
  *****************************************************/ 
/*********************************************************************
 * Licensed under the Open Software License version 3.0 *
 * *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the *
 * following licensing notice adjacent to the copyright notice for *
 * the Original Work *
 *********************************************************************/

/********************************************
 * Global Constants
 ********************************************/
const VFoldEvent = {
    WORKSPACE_CHANGE: "workspaceChange",
    WORKSPACE_ADD: "workspaceAdd",
    FOLDER_CREATE: "FolderAdd",
    FOLDER_CLOSING: "FolderClose",
    FOLDER_SELECT: "FolderSelect"
};


(function() {

    var opt = new Options();

    opt.aesKey = "796x9qh27xcrb69q27xcrb61274xcr6b";
    opt.facebookAppID = "";
    opt.rootPassword = "w957cbnooo5796";
    Stage.init(function() {
        Page.init();
    });
})();

/*********************************************
 * Wrapped logging function.
 * @param {string} msg The message to log.
 *********************************************/
var log = function(msg) {
        if (window.console && window.console.log) {
            window.console.log(msg);
        }
    };
/**********************************************
 * Wrapped logging function.
 * @param {string} msg The message to log.
 **********************************************/
var error = function(msg) {
        if (window.console) {
            if (window.console.error) {
                window.console.error(msg);
            }
            else if (window.console.log) {
                window.console.log(msg);
            }
        }
    };

function inherit(Child, Parent) {
    Child.prototype = new Parent();
    Child.prototype.constructor = Child;
}