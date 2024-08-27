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

export type TSceneName =
    | "logo-scene"
    | "media-scene-1"
    | "media-scene-2"
    | "cube-scene";
export type TScene = {
    name: TSceneName;
    component: JSX.Element;
};

export const SCENES: TScene[] = [
    {
        name: "logo-scene",
        component: <LogoScene />,
    },
    {
        name: "media-scene-1",
        component: <MediaScene src="/images/image-1.jpg" />,
    },
    {
        name: "media-scene-2",
        component: <MediaScene src="/images/image-2.jpg" />,
    },
    {
        name: "cube-scene",
        component: <CubeScene />,
    },
];

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
    const { width, height } = useThree((state) => state.size);
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
            paddingTop: 16,
            paddingRight: 16,
            paddingBottom: 16,
            paddingLeft: 16,
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
            await cameraControls.current.fitToBox(currentSlide, true, {
                cover: true,
                paddingTop: 16,
                paddingRight: 16,
                paddingBottom: 16,
                paddingLeft: 16,
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

const Scene = () => {
    const { width, height } = useThree((state) => state.size);
    const { prevSlide, nextSlide } = useSliderState();

    const { slideDistance, dollyDistance } = useControls({
        slideshow: folder({
            dollyDistance: {
                value: 50,
                min: 0,
                max: 100,
            },
            slideDistance: {
                value: 500,
                min: 0,
                max: 1080,
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
                far={2000}
            />
            <color attach="background" args={[colors.yellow]} />
            <ambientLight intensity={2} />
            <group name="slides">
                {SCENES.map(({ name, component }, idx) => (
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

export default function Experience() {
    return (
        <Canvas
            dpr={[1, 1]}
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
