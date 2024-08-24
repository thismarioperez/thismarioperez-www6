import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

class WarbleShader extends THREE.RawShaderMaterial {
    constructor() {
        super({
            uniforms: {
                diffuse: { value: null },
                time: { value: 0 },
                uProgress: { value: 0 },
            },
            vertexShader,
            fragmentShader,
            glslVersion: THREE.GLSL3,
        });
    }
}

export default WarbleShader;
