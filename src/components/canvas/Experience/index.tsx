"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import usePostProcess from "./usePostProcess";
import { RenderTexture } from "@react-three/drei";

import { gsap } from "@/lib/gsap";
import useMenuState from "@/hooks/useMenuState";
import SliderScene from "../SliderScene";
import MenuScene from "../MenuScene";
import useDebug from "@/hooks/useDebug";
import { Perf } from "r3f-perf";
import colors from "@/styles/colors";

const Scene = () => {
    const { width, height } = useThree((state) => state.viewport);
    const { menuOpen } = useMenuState();
    const sliderMaterial = useRef(null);
    const menuMaterial = useRef(null);

    useEffect(() => {
        if (!menuMaterial.current) return;
        if (menuOpen) {
            gsap.to(menuMaterial.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut",
            });

            gsap.to(sliderMaterial.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });
        } else {
            gsap.to(menuMaterial.current, {
                opacity: 0,
                duration: 0.5,
                ease: "power1.inOut",
            });

            gsap.to(sliderMaterial.current, {
                opacity: 1,
                duration: 0.5,
                ease: "power1.inOut",
            });
        }
    }, [menuOpen]);

    usePostProcess();

    return (
        <>
            <color attach="background" args={[colors.black]} />
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

export default function Experience() {
    const [debug] = useDebug();
    return (
        <div className="fixed top-0 left-0 size-full" aria-hidden>
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
                {debug && <Perf position="bottom-left" />}
            </Canvas>
        </div>
    );
}
