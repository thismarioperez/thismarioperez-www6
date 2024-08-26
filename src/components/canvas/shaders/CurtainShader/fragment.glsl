precision highp float;
uniform float uProgress;
uniform sampler2D uDiffuse;
varying vec2 vUv;

void main() {

    vec2 p = vUv;

    if(p.x < 0.3333333) {
    } else if(p.x < 0.6666666) {
        p.x = p.x - 0.3333333 * uProgress;
    } else if(p.x < 1.) {
        p.x = p.x - 0.6666666 * uProgress;
    }

    vec4 tex = texture2D(uDiffuse, p);

    gl_FragColor = tex;

}