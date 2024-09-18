#define PI 3.14159265359

uniform float uTime;
uniform float uPointSize;
uniform float uNoiseAmp1;
uniform float uNoiseFreq1;
uniform float uSpdModifier1;
uniform float uNoiseAmp2;
uniform float uNoiseFreq2;
uniform float uSpdModifier2;

    // 2D Random
float random(in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

    // 2D Noise based on Morgan McGuire @morgan3d
    // https://www.shadertoy.com/view/4dS3Wd
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

        // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

        // Smooth Interpolation

        // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f * f * (3.0 - 2.0 * f);
        // u = smoothstep(0.,1.,f);

        // Mix 4 coorners percentages
    return mix(a, b, u.x) +
        (c - a) * u.y * (1.0 - u.x) +
        (d - b) * u.x * u.y;
}

mat2 rotate2d(float angle) {
    return mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
}

void main() {
    gl_PointSize = uPointSize;

    vec3 pos = position;
      // pos.xy is the original 2D dimension of the plane coordinates
    pos.z += noise(pos.xy * uNoiseFreq1 + uTime * uSpdModifier1) * uNoiseAmp1;
      // add noise layering
      // minus uTime makes the second layer of wave goes the other direction
    pos.z += noise(rotate2d(PI / 4.) * pos.yx * uNoiseFreq2 - uTime * uSpdModifier2 * 0.6) * uNoiseAmp2;

    vec4 mvm = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvm;
}