"use client";

import { useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { RenderTexture } from "@react-three/drei";

import usePostProcess from "./usePostProcess";
import { gsap } from "@/lib/gsap";
import useMenuState from "@/hooks/useMenuState";
import SliderScene from "../SliderScene";
import MenuScene from "../MenuScene";
import colors from "@/styles/colors";

const Experience = () => {
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
                <meshBasicMaterial transparent opacity={0} ref={sliderMaterial}>
                    <RenderTexture attach="map">
                        <SliderScene />
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
            <mesh position={[0, 0, 0]} renderOrder={1}>
                <planeGeometry args={[width, height]} />
                <meshBasicMaterial ref={menuMaterial} opacity={0} transparent>
                    <RenderTexture attach="map">
                        <MenuScene />
                    </RenderTexture>
                </meshBasicMaterial>
            </mesh>
        </>
    );
};

export default Experience;
