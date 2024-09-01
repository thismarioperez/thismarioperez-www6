import * as THREE from "three";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";
import { extend } from "@react-three/fiber";

interface IParticleWavesUniforms {
    uTime: { value: number };
    uResolution: { value: THREE.Vector2 };
    uPointSize: { value: number };
    uNoiseFreq1: { value: number };
    uNoiseAmp1: { value: number };
    uSpdModifier1: { value: number };
    uNoiseFreq2: { value: number };
    uNoiseAmp2: { value: number };
    uSpdModifier2: { value: number };
}

class ParticleWavesMaterial extends THREE.ShaderMaterial {
    constructor() {
        super({
            uniforms: {
                uTime: {
                    value: 1.0,
                },
                uResolution: {
                    value: new THREE.Vector2(
                        window.innerWidth,
                        window.innerHeight
                    ),
                },
                uPointSize: {
                    value: 2.0,
                },
                uColor: {
                    value: new THREE.Color(0xfee000),
                },
                // wave 1
                uNoiseFreq1: {
                    value: 3.0,
                },
                uNoiseAmp1: {
                    value: 0.2,
                },
                uSpdModifier1: {
                    value: 1.0,
                },
                // wave 2
                uNoiseFreq2: {
                    value: 2.0,
                },
                uNoiseAmp2: {
                    value: 0.3,
                },
                uSpdModifier2: {
                    value: 0.8,
                },
            },
            vertexShader,
            fragmentShader,
        });
    }
}

export default ParticleWavesMaterial;
extend({ ParticleWavesMaterial });
