#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform float timeFactor;

void main() {
	vec2 offset = vec2(mod(timeFactor, 1.0), mod(timeFactor, 1.0));
	vec4 filter = texture2D(uSampler2, vec2(0.0,0.1)+vTextureCoord+offset);
	vec4 color = texture2D(uSampler1, vTextureCoord+offset) - filter * 0.15;
	color.a = 1.0;
	

	gl_FragColor = color;
}