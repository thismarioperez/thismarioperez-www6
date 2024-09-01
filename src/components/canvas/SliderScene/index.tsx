"use client";

import { useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef } from "react";
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
import { useWindowSize } from "usehooks-ts";

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
        case "media-scene-3":
            component = <MediaScene src="/images/image-3.jpg" />;
            break;
        case "media-scene-4":
            component = <MediaScene src="/images/image-4.jpg" />;
            break;
        case "media-scene-5":
            component = <MediaScene src="/images/image-5.jpg" />;
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
    const { width: windowWidth, height: windowHeight } = useWindowSize();
    const cameraControls = useRef<CameraControls>(null);

    const moveToSlide = useCallback(async () => {
        if (!cameraControls.current) return;

        const currentSlide = getMeshByUserDataValue(scene, "slide", slide)[0];
        if (!currentSlide) return;
        if (lastSlide.current === slide) return;

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
    }, [slide, scene]);

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
            console.log("focusing on", slide);
            await cameraControls.current.fitToBox(currentSlide, false, {
                cover: true,
                paddingBottom: 0,
                paddingTop: 0,
                paddingLeft: 0,
                paddingRight: 0,
            });
        }, 200);
        return () => clearTimeout(resetTimeout);
    }, [windowWidth, windowHeight]);

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
                // right: debug ? 2 : 0,
                right: 0,
                // wheel: debug ? 8 : 0,
                wheel: 0,
            }}
        />
    );
};

export default function SliderScene() {
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
                value: 5,
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
}
