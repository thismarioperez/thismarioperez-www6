uniform float uProgress;
uniform float uOffset;
uniform sampler2D uDiffuse;
varying vec2 vUv;

void main() {
    vec2 p = vUv;
    float normalizedOffset = uOffset * 0.01;
    vec2 offset = vec2(normalizedOffset, 0.);

    if(uProgress > 0.0) {
        offset += vec2(0.1, 0.) * uProgress;
    }

    float r, g, b, a = 1.;
    r = texture2D(uDiffuse, p + offset).r;
    g = texture2D(uDiffuse, p).g;
    b = texture2D(uDiffuse, p - offset).b;
    a = texture2D(uDiffuse, p).a;

    gl_FragColor = vec4(r, g, b, a);
}