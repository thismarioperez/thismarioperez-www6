precision highp float;
uniform float uProgress;
uniform sampler2D uDiffuse;
varying vec2 vUv;

void main() {

    vec2 p = vUv;

    if(p.x < 0.25) {
    } else if(p.x < 0.5) {
        p.x = p.x - 0.25 * uProgress;
    } else if(p.x < 0.75) {
        p.x = p.x - 0.5 * uProgress;
    } else {
        p.x = p.x - 0.75 * uProgress;
    }

    vec4 tex = texture2D(uDiffuse, p);

    gl_FragColor = tex;

}