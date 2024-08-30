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

import useSliderState from "@/hooks/useSliderState";
import colors from "@/styles/colors";
import { getMeshByUserDataValue } from "@/util/3d";
import CubeScene from "@/components/canvas/CubeScene";
import LogoScene from "@/components/canvas/LogoScene";
import MediaScene from "@/components/canvas/MediaScene";
import { buttonGroup, folder, useControls } from "leva";
import useDebug from "@/hooks/useDebug";
import { SCENES, TSceneName } from "@/store/sliderSlice";

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

    const moveToSlide = async () => {
        if (!cameraControls.current) return;

        const currentSlide = getMeshByUserDataValue(scene, "slide", slide)[0];
        if (!currentSlide) return;
        if (lastSlide.current === slide) return;

        await cameraControls.current.setLookAt(
            lastSlide.current * (width + slideDistance),
            0,
            cameraControls.current.camera.position.z + dollyDistance,
            lastSlide.current * (width + slideDistance),
            0,
            0,
            true
        );

        await cameraControls.current.setLookAt(
            slide * (width + slideDistance),
            0,
            cameraControls.current.camera.position.z + dollyDistance,
            slide * (width + slideDistance),
            0,
            0,
            true
        );

        await cameraControls.current.fitToBox(currentSlide, true, {
            cover: true,
        });
    };

    useEffect(() => {
        // Used to reset the camera position when the viewport changes
        const resetTimeout = setTimeout(async () => {
            if (!cameraControls.current) return;
            const currentSlide = getMeshByUserDataValue(
                scene,
                "slide",
                slide
            )[0];

            if (!currentSlide) return;
            await cameraControls.current.fitToBox(currentSlide, false, {
                cover: true,
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
                value: 5,
                min: 0,
                max: 50,
                step: 1,
            },
            slideDistance: {
                value: 20,
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

    usePostProcess();

    return (
        <>
            <CameraHandler
                slideDistance={slideDistance}
                dollyDistance={dollyDistance}
            />
            <PerspectiveCamera
                makeDefault
                position={[0, 0, 5]}
                fov={75}
                near={0.1}
                far={1000}
            />
            <color attach="background" args={[colors.yellow]} />
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

    return (
        <>
            <mesh>
                <planeGeometry args={[width, height]} />
                <RenderTexture attach="map">
                    <MainScene />
                </RenderTexture>
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
