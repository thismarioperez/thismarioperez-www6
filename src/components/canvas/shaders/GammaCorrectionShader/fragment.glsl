precision highp float;
uniform sampler2D uDiffuse;
varying vec2 vUv;

// vec3 LinearToSrgb(vec3 color) {
//     // Approximation http://chilliant.blogspot.com/2012/08/srgb-approximations-for-hlsl.html
//     vec3 linearColor = color.rgb;
//     vec3 S1 = sqrt(linearColor);
//     vec3 S2 = sqrt(S1);
//     vec3 S3 = sqrt(S2);
//     color.rgb = 0.662002687 * S1 + 0.684122060 * S2 - 0.323583601 * S3 - 0.0225411470 * linearColor;
//     return color;
// }

// vec4 LinearTosRGB(vec4 color) {
//     return vec4(LinearToSrgb(color.rgb), color.a);
// }

// vec4 sRGBTransferOETF(in vec4 value) {
//     return vec4(mix(pow(value.rgb, vec3(0.41666)) * 1.055 - vec3(0.055), value.rgb * 12.92, vec3(lessThanEqual(value.rgb, vec3(0.0031308)))), value.a);
// }

void main() {

    vec4 tex = texture2D(uDiffuse, vUv);

    gl_FragColor = sRGBTransferOETF(tex);

}