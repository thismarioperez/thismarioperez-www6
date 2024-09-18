import * as THREE from "three";
import fs from "./fragment.glsl";
import vs from "./vertex.glsl";

class ChromaticAberrationMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                uProgress: {
                    value: 0,
                },
                uProgressIntesity: {
                    value: 0.1,
                },
                uDiffuse: {
                    value: null,
                },
                uOffset: {
                    value: 0.1,
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

export default ChromaticAberrationMaterial;
