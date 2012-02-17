/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

/*****************************************************************
 * Default Color Shader
 *****************************************************************/

precision mediump float
uniform vec4 u_color;
void main() {
    gl_FragColor = u_color;
}