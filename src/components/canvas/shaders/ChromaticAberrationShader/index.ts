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
                uDiffuse: {
                    value: null,
                },
                uRedOffset: {
                    value: 16.0,
                },
                uGreenOffset: {
                    value: -12.0,
                },
                uBlueOffset: {
                    value: -29.0,
                },
                uIntensity: {
                    value: 10.0,
                },
                uRadius: {
                    value: 30,
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
