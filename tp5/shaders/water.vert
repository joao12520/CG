attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vTextureCoord = aTextureCoord;
	vec2 offset = vec2(mod(timeFactor, 1.0), mod(timeFactor, 1.0));
	vec3 height = aVertexNormal * texture2D(uSampler2, vTextureCoord+offset).r * 0.04;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + height, 1.0);
}
