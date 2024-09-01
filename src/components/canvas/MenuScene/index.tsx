import * as THREE from "three";

import colors from "@/styles/colors";
import { Grid, PerspectiveCamera } from "@react-three/drei";
import { useMemo, useRef } from "react";
import ParticleWavesMaterial from "@/components/canvas/shaders/ParticleWavesMaterial";
import { useFrame, useThree } from "@react-three/fiber";
import { folder, useControls } from "leva";

export default function MenuScene() {
    const particleWavesMaterial = useRef<ParticleWavesMaterial>(null!);
    const {
        uPointSize,
        uNoiseFreq1,
        uNoiseAmp1,
        uSpdModifier1,
        uNoiseFreq2,
        uNoiseAmp2,
        uSpdModifier2,
    } = useControls({
        ParticleWavesMaterial: folder({
            uPointSize: {
                value: 2.0,
                min: 1.0,
                max: 10.0,
                step: 1.0,
            },
            // wave 1
            "Wave 1": folder({
                uNoiseFreq1: {
                    value: 3.0,
                    min: 0.1,
                    max: 3.0,
                    step: 0.1,
                },
                uNoiseAmp1: {
                    value: 0.2,
                    min: 0.1,
                    max: 3.0,
                    step: 0.1,
                },
                uSpdModifier1: {
                    value: 1.0,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1,
                },
            }),
            // wave 2
            "Wave 2": folder({
                uNoiseFreq2: {
                    value: 2.0,
                    min: 0.1,
                    max: 3.0,
                    step: 0.1,
                },
                uNoiseAmp2: {
                    value: 0.3,
                    min: 0.1,
                    max: 3.0,
                    step: 0.1,
                },
                uSpdModifier2: {
                    value: 0.8,
                    min: 0.1,
                    max: 2.0,
                    step: 0.1,
                },
            }),
        }),
    });

    const { height, width, dpr, aspect } = useThree((state) => state.viewport);
    const uResolution = useMemo(
        () => new THREE.Vector2(width * dpr, height * dpr),
        [width, height, dpr]
    );

    useFrame(({ clock: { elapsedTime: uTime } }) => {
        if (particleWavesMaterial.current) {
            particleWavesMaterial.current.uniforms.uTime.value = uTime;
            particleWavesMaterial.current.uniforms.uResolution.value =
                uResolution;
            particleWavesMaterial.current.uniforms.uPointSize.value =
                uPointSize;
            particleWavesMaterial.current.uniforms.uNoiseFreq1.value =
                uNoiseFreq1;
            particleWavesMaterial.current.uniforms.uNoiseAmp1.value =
                uNoiseAmp1;
            particleWavesMaterial.current.uniforms.uSpdModifier1.value =
                uSpdModifier1;
            particleWavesMaterial.current.uniforms.uNoiseFreq2.value =
                uNoiseFreq2;
            particleWavesMaterial.current.uniforms.uNoiseAmp2.value =
                uNoiseAmp2;
            particleWavesMaterial.current.uniforms.uSpdModifier2.value =
                uSpdModifier2;
        }
    });
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 4.5, 5]} fov={75} />
            <ambientLight intensity={1} />

            <points
                position={[0, 0.1, -32]}
                rotation={[Math.PI * -0.5, 0, 0]}
                scale={4 * aspect}
            >
                <planeGeometry args={[16, 16, 256, 256]} attach={"geometry"} />
                <particleWavesMaterial
                    ref={particleWavesMaterial}
                    attach="material"
                />
            </points>

            <Grid cellColor={colors.yellow} infiniteGrid fadeDistance={75} />
        </>
    );
}
