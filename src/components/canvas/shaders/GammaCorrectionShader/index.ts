import * as THREE from "three";
import fs from "./fragment.glsl";
import vs from "./vertex.glsl";

class GammaCorrectionMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                uDiffuse: {
                    value: null,
                },
            },
            vertexShader: vs,
            fragmentShader: fs,
        });
    }
}

export default GammaCorrectionMaterial;
