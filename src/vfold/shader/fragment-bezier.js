/*********************************************************************
 * Licensed under the Open Software License version 3.0              *
 *                                                                   *
 * This Open Software License (OSL-3.0) applies to any original work *
 * of authorship "vfold" whose owner Raphael Varonos has placed the  *
 * following licensing notice adjacent to the copyright notice for   *
 * the Original Work                                                 *
 *********************************************************************/

/*****************************************************************
 * Bezier Curve Shader
 *****************************************************************/

#extension GL_OES_standard_derivatives: enable#ifdef GL_ES
precision highp float;#endif

varying vec2 vBezierCoord;

void main() {
    vec2 px = dFdx(vBezierCoord);
    vec2 py = dFdy(vBezierCoord);
    float fx = 2.0 * vBezierCoord.x * px.x - px.y;
    float fy = 2.0 * vBezierCoord.y * py.x - py.y;
    float sd = (vBezierCoord.x * vBezierCoord.x - vBezierCoord.y) / sqrt(fx * fx + fy * fy);
    gl_FragColor = vec4(0.0, 0.0, 1.0, clamp(0.5 - sd, 0.0, 1.0));
}