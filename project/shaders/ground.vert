attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vTextureCoord = aTextureCoord;
	vec3 height = aVertexNormal * texture2D(uSampler3, vTextureCoord).r * 140.0;
	gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + height, 1.0);
}
