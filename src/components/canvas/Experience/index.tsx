"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import usePostProcess from "./usePostProcess";
import { RenderTexture, useDetectGPU } from "@react-three/drei";

import { gsap } from "@/lib/gsap";
import useMenuState from "@/hooks/useMenuState";
import SliderScene from "../SliderScene";
import MenuScene from "../MenuScene";
import useDebug from "@/hooks/useDebug";
import { Perf } from "r3f-perf";
import colors from "@/styles/colors";
import useAppState from "@/hooks/useAppState";

const Scene = () => {
    const { width, height } = useThree((state) => state.viewport);
    const { menuOpen } = useMenuState();
    const sliderMaterial = useRef(null);
    const menuMaterial = useRef(null);

    useEffect(() => {
        if (!menuMaterial.current) return;
        if (menuOpen) {
            gsap.timeline({ paused: true })
                .to(menuMaterial.current, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .to(
                    sliderMaterial.current,
                    {
                        opacity: 0,
                        duration: 0.5,
                        ease: "power1.inOut",
                    },
                    0
                )
                .play();
        } else {
            gsap.timeline({ paused: true })
                .to(menuMaterial.current, {
                    opacity: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .to(sliderMaterial.current, {
                    opacity: 1,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .play();
        }
    }, [menuOpen]);

    usePostProcess();

    return (
        <>
            <color attach="background" args={[colors.black.DEFAULT]} />
            <mesh>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    toneMapped={false}
                    transparent
                    opacity={0}
                    ref={sliderMaterial}
                >
                    <RenderTexture attach="map">
                        <SliderScene />
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
            <mesh position={[0, 0, 0]} renderOrder={1}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial
                    ref={menuMaterial}
                    toneMapped={false}
                    opacity={0}
                    transparent
                >
                    <RenderTexture attach="map">
                        <MenuScene />
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
        </>
    );
};

const Loading = () => {
    const { setIsReady } = useAppState();

    useEffect(() => {
        return () => setIsReady(true);
    }, []);

    return null;
};

export default function Experience() {
    const [debug] = useDebug();
    // const GPUTier = useDetectGPU();

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh]" aria-hidden>
            <Canvas
                gl={{
                    toneMapping: THREE.NoToneMapping,
                    antialias: true,
                    outputColorSpace: THREE.SRGBColorSpace,
                }}
            >
                <Suspense fallback={<Loading />}>
                    <Scene />
                </Suspense>
                {debug && <Perf position="bottom-left" />}
            </Canvas>
        </div>
    );
}
