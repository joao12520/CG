#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
uniform sampler2D uSampler;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	gl_FragColor = color;
	if(color.a < 1.0)
		discard;
}


