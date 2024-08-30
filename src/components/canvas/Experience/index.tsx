"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import usePostProcess from "./usePostProcess";
import { RenderTexture } from "@react-three/drei";

import { gsap } from "@/lib/gsap";
import colors from "@/styles/colors";
import useMenuState from "@/hooks/useMenuState";
import SliderScene from "../SliderScene";

const Scene = () => {
    const { width, height } = useThree((state) => state.viewport);
    const { menuOpen } = useMenuState();
    const material = useRef(null);

    useEffect(() => {
        if (!material.current) return;
        if (menuOpen) {
            gsap.to(material.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut",
            });
        } else {
            gsap.to(material.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });
        }
    }, [menuOpen]);

    usePostProcess();

    return (
        <>
            <mesh>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial toneMapped={false}>
                    <RenderTexture attach="map">
                        <SliderScene />
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
            <mesh position={[0, 0, 0]} renderOrder={1}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    ref={material}
                    toneMapped={false}
                    opacity={0}
                    transparent
                >
                    <RenderTexture attach="map">
                        <color attach="background" args={[colors.yellow]} />
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
        </>
    );
};

export default function Experience() {
    return (
        <Canvas
            dpr={[1, 2]}
            gl={{
                toneMapping: THREE.NoToneMapping,
                antialias: true,
                outputColorSpace: THREE.SRGBColorSpace,
            }}
        >
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
}
