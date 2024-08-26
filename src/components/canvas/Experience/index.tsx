"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import usePostProcess from "./usePostProcess";
import {
    CameraControls,
    PerspectiveCamera,
    RenderTexture,
} from "@react-three/drei";

import CubeScene from "@/components/canvas/CubeScene";
import LogoScene from "@/components/canvas/LogoScene";
import MediaScene from "@/components/canvas/MediaScene";

const CameraHandler = () => {
    const box = useRef<THREE.Box3>(new THREE.Box3());
    const { width, height } = useThree((state) => state.size);
    const cameraControls = useRef<CameraControls>(null);

    useEffect(() => {
        // Used to reset the camera position when the viewport changes
        box.current = new THREE.Box3(
            new THREE.Vector3(width / -2, height / -2, 0),
            new THREE.Vector3(width / 2, height / 2, 0)
        );

        const resetTimeout = setTimeout(() => {
            if (!cameraControls.current) return;
            cameraControls.current.fitToBox(box.current, false);
        }, 100);
        return () => clearTimeout(resetTimeout);
    }, [width, height]);

    return <CameraControls makeDefault ref={cameraControls} />;
};

const Scene = () => {
    const { width, height } = useThree((state) => state.size);

    usePostProcess();
    return (
        <>
            <CameraHandler />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <color attach="background" args={["yellow"]} />
            <ambientLight intensity={1} />

            <mesh>
                <planeGeometry args={[width, height]} />
                <meshStandardMaterial>
                    <RenderTexture attach="map">
                        <LogoScene />
                    </RenderTexture>
                </meshStandardMaterial>
            </mesh>

            <mesh position-x={width}>
                <planeGeometry args={[width, height]} />
                <meshStandardMaterial>
                    <RenderTexture attach="map">
                        <MediaScene />
                    </RenderTexture>
                </meshStandardMaterial>
            </mesh>

            <mesh position-x={width * 2}>
                <planeGeometry args={[width, height]} />
                <meshStandardMaterial>
                    <RenderTexture attach="map">
                        <CubeScene />
                    </RenderTexture>
                </meshStandardMaterial>
            </mesh>
        </>
    );
};

export default function Experience() {
    return (
        <Canvas
            dpr={[1, 1]}
            gl={{
                toneMapping: THREE.ACESFilmicToneMapping,
                toneMappingExposure: 2,
                outputColorSpace: THREE.SRGBColorSpace,
            }}
        >
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
}
