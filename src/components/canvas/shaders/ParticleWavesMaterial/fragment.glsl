#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

uniform vec2 uResolution;
uniform vec3 uColor;

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;

    // gl_FragColor = vec4(vec3(0.0, st), 1.0);
    gl_FragColor = vec4(uColor, 1.0);
}