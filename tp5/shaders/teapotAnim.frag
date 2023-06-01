#ifdef GL_ES
precision highp float;
#endif

varying vec4 position;

void main() {
    if (position.y > 0.5) {
        gl_FragColor = vec4(1.0, 0.835, 0.0, 1.0); // yellow
    } else {
        gl_FragColor = vec4(0.0, 0.322, 0.647, 1.0); // blue
    }
}
