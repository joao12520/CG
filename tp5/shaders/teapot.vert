#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform float normScale;

varying vec4 position;

const float normOffset = 0.1;

void main() {
    vec4 vertex = vec4(aVertexPosition + aVertexNormal * normScale * normOffset, 1.0);
    position = uPMatrix * uMVMatrix * vertex;
    gl_Position = position;
}
