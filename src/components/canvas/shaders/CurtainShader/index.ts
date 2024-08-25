import * as THREE from "three";
import fs from "./fragment.glsl";
import vs from "./vertex.glsl";

class CurtainMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                uProgress: {
                    value: 0,
                },
                uDiffuse: {
                    value: null,
                },
            },
            vertexShader: vs,
            fragmentShader: fs,
            blending: THREE.NoBlending,
            depthWrite: false,
            depthTest: false,
        });
    }
}

export default CurtainMaterial;
