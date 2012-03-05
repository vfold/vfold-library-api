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

#extension GL_OES_standard_derivatives : enable

#ifdef GL_ES
precision highp float;
#endif

varying vec2 vBezierCoord;
varying vec vCommands;

void main(void) {
vec2 px = dFdx(vBezierCoord);
vec2 py = dFdy(vBezierCoord);
float fx = 2.0 * vBezierCoord.x * px.x - px.y;
float fy = 2.0 * vBezierCoord.y * py.x - py.y;
float sd = (vBezierCoord.x * vBezierCoord.x - vBezierCoord.y) / sqrt(fx * fx + fy * fy);
gl_FragColor = vec4(0.0, 0.0, 1.0, clamp(0.5 - sd, 0.0, 1.0));


for(int i=0;i < vCommands.length;i++){

switch(vCommands[i]){

// Move to (absolute)
case 0:
break;

// Move to (relative)
case 1:
break;

// Close Path
case 2:
break;

// Line to (absolute)
case 3:
break;

// Line to (relative)
case 4:
break;

// Horizontal Line to (absolute)
case 5:
break;

// Horizontal Line to (relative)
case 6:
break;

// Vertical Line to (absolute)
case 7:
break;

// Vertical Line to (relative)
case 8:
break;

// Quadratic Cuvre to (absolute)
case 9:
break;

// Quadratic Cuvre to (relative)
case 10:
break;

// Quadratic Smooth Cuvre to (absolute)
case 11:
break;

// Quadratic Smooth Cuvre to (relative)
case 12:
break;
}
}
}