/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

/*****************************************************************
 * Matrix positioning Vertex Shader
 * Multiply the position by the matrix
 *****************************************************************/

attribute vec2 a_position;
uniform mat3 u_matrix;
void main() {
    gl_Position = vec4((u_matrix * vec3(a_position, 1)).xy, 0, 1);
}