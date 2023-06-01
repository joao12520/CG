#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler1;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	float height = texture2D(uSampler3, vTextureCoord).r;
	vec4 altiColor = texture2D(uSampler2, vec2(vTextureCoord.x, 1.0-height));
	vec4 color = texture2D(uSampler1, vTextureCoord);
	color.r = color.r * 0.7 + altiColor.r * 0.3;
	color.g = color.g * 0.7 + altiColor.g * 0.3;
	color.b = color.b * 0.7 + altiColor.b * 0.3;

	gl_FragColor = color;
}