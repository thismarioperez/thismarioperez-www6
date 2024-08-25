uniform float uProgress;
uniform sampler2D uDiffuse;
uniform float uRedOffset;
uniform float uGreenOffset;
uniform float uBlueOffset;
uniform float uIntensity;
uniform float uRadius;
varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    vec2 center = vec2(0.5, 0.5); // Center of the screen in normalized coordinates
    float dist = distance(uv, center); // Distance from center

    // Modify scaleFactor to incorporate uRadius
    float normalizedDist = dist / uRadius; // Normalize distance based on the radius
    // float scaleFactor = smoothstep(0.0, 1.0, normalizedDist * uIntensity);
    float scaleFactor = smoothstep(0.0, 1.0, normalizedDist * uIntensity);

    // Apply the radial factor to the offsets
    float rOffset = 0.001 * uRedOffset * scaleFactor;
    float gOffset = 0.001 * uGreenOffset * scaleFactor;
    float bOffset = 0.001 * uBlueOffset * scaleFactor;

    float r, g, b = 1.;
    r = texture2D(uDiffuse, uv + vec2(rOffset, 0.0)).r;
    g = texture2D(uDiffuse, uv + vec2(gOffset, 0.0)).g;
    b = texture2D(uDiffuse, uv + vec2(bOffset, 0.0)).b;

    gl_FragColor = vec4(r, g, b, 1.0);
}