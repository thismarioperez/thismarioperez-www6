"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import usePostProcess from "./usePostProcess";
import {
    CameraControls,
    PerspectiveCamera,
    RenderTexture,
} from "@react-three/drei";

import { gsap } from "@/lib/gsap";
import useSliderState from "@/hooks/useSliderState";
import colors from "@/styles/colors";
import { getMeshByUserDataValue } from "@/util/3d";
import CubeScene from "@/components/canvas/CubeScene";
import LogoScene from "@/components/canvas/LogoScene";
import MediaScene from "@/components/canvas/MediaScene";
import { buttonGroup, folder, useControls } from "leva";
import useDebug from "@/hooks/useDebug";
import { SCENES, TSceneName } from "@/store/sliderSlice";
import useMenuState from "@/hooks/useMenuState";

export type TSlide = {
    name: TSceneName;
    component: JSX.Element;
};

const SLIDES: TSlide[] = SCENES.map((name) => {
    let component: JSX.Element = <></>;
    switch (name) {
        case "logo-scene":
            component = <LogoScene />;
            break;
        case "media-scene-1":
            component = <MediaScene src="/images/image-1.jpg" />;
            break;
        case "media-scene-2":
            component = <MediaScene src="/images/image-2.jpg" />;
            break;
        case "cube-scene":
            component = <CubeScene />;
            break;
    }
    return {
        name,
        component,
    };
});

const CAMERA_Z = 5;

const CameraHandler = ({
    slideDistance,
    dollyDistance,
}: {
    slideDistance: number;
    dollyDistance: number;
}) => {
    const [debug] = useDebug();
    const { scene } = useThree((state) => state);
    const { slide } = useSliderState();
    const lastSlide = useRef(0);
    const { width, height } = useThree((state) => state.viewport);
    const cameraControls = useRef<CameraControls>(null);
    const isAnimating = useRef(false);

    const moveToSlide = async () => {
        if (!cameraControls.current) return;

        const currentSlide = getMeshByUserDataValue(scene, "slide", slide)[0];
        if (!currentSlide) return;
        if (lastSlide.current === slide) return;

        isAnimating.current = true;

        await cameraControls.current.setLookAt(
            lastSlide.current * (width + slideDistance),
            0,
            CAMERA_Z + dollyDistance,
            lastSlide.current * (width + slideDistance),
            0,
            0,
            true
        );

        await cameraControls.current.setLookAt(
            slide * (width + slideDistance),
            0,
            CAMERA_Z + dollyDistance,
            slide * (width + slideDistance),
            0,
            0,
            true
        );

        await cameraControls.current.fitToBox(currentSlide, true, {
            cover: true,
            paddingBottom: 0,
            paddingTop: 0,
            paddingLeft: 0,
            paddingRight: 0,
        });

        isAnimating.current = false;
    };

    useEffect(() => {
        // Used to reset the camera position when the viewport changes
        const resetTimeout = setTimeout(async () => {
            if (isAnimating.current) return;
            if (!cameraControls.current) return;
            const currentSlide = getMeshByUserDataValue(
                scene,
                "slide",
                slide
            )[0];

            if (!currentSlide) return;
            await cameraControls.current.fitToBox(currentSlide, true, {
                cover: true,
                paddingBottom: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
            });
        }, 200);
        return () => clearTimeout(resetTimeout);
    }, [width, height]);

    useEffect(() => {
        moveToSlide();

        lastSlide.current = slide;
    }, [slide]);

    return (
        <CameraControls
            makeDefault
            ref={cameraControls}
            touches={{
                one: 0,
                two: 0,
                three: 0,
            }}
            mouseButtons={{
                left: 0,
                middle: 0,
                right: debug ? 2 : 0,
                wheel: debug ? 8 : 0,
            }}
        />
    );
};

const MainScene = () => {
    const { width, height } = useThree((state) => state.viewport);
    const { prevSlide, nextSlide } = useSliderState();

    const { slideDistance, dollyDistance } = useControls({
        slideshow: folder({
            dollyDistance: {
                value: 1,
                min: 0,
                max: 50,
                step: 1,
            },
            slideDistance: {
                value: 50,
                min: 0,
                max: 50,
                step: 1,
            },
            nav: buttonGroup({
                previous: () => {
                    prevSlide();
                },
                next: () => {
                    nextSlide();
                },
            }),
        }),
    });

    return (
        <>
            <CameraHandler
                slideDistance={slideDistance}
                dollyDistance={dollyDistance}
            />
            <PerspectiveCamera
                makeDefault
                position={[0, 0, CAMERA_Z]}
                fov={75}
                near={0.1}
                far={1000}
            />
            <color attach="background" args={[colors.black]} />
            <ambientLight intensity={2} />
            <group name="slides">
                {SLIDES.map(({ name, component }, idx) => (
                    <mesh
                        key={name}
                        name={name}
                        position-x={idx * (width + slideDistance)}
                        userData={{ slide: idx }}
                    >
                        <planeGeometry args={[width, height]} />
                        <meshStandardMaterial>
                            <RenderTexture attach="map">
                                {component}
                            </RenderTexture>
                        </meshStandardMaterial>
                    </mesh>
                ))}
            </group>
        </>
    );
};

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
                        <MainScene />
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
