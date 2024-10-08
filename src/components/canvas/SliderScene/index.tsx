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
import LavaLampScene from "@/components/canvas/LavaLampScene";
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
        case "fbi-safe-online-surfing-scene":
            component = (
                <MediaScene src="/images/fbi-safe-online-surfing.jpg" />
            );
            break;
        case "robin-knows-scene":
            component = <MediaScene src="/images/robin-knows.jpg" />;
            break;
        case "rodda-construction-scene":
            component = <MediaScene src="/images/rodda-construction.jpg" />;
            break;
        case "triptych-scene":
            component = <MediaScene src="/images/triptych.jpg" />;
            break;
        case "lloyd-goldstein-scene":
            component = <MediaScene src="/images/lloyd-goldstein.jpg" />;
            break;
        case "meta-your-personal-main-street-scene":
            component = (
                <MediaScene src="/images/meta-your-personal-mainstreet.jpg" />
            );
            break;
        case "qgiv-scene":
            component = <MediaScene src="/images/qgiv-donation-forms.jpg" />;
            break;
        case "wind-river-scene":
            component = <MediaScene src="/images/wind-river.jpg" />;
            break;
        case "lava-lamp-scene":
            component = <LavaLampScene />;
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
    const { scene } = useThree((state) => state);
    const { slide } = useSliderState();
    const lastSlide = useRef(0);
    const { width, height } = useThree((state) => state.viewport);
    const cameraControls = useRef<CameraControls>(null);

    const moveToSlide = useCallback(async () => {
        if (!cameraControls.current) return;

        const currentSlide = getMeshByUserDataValue(scene, "slide", slide)[0];
        if (!currentSlide) return;
        if (lastSlide.current === slide) return;

        await new Promise((resolve) => setTimeout(resolve, 500));

        await cameraControls.current.setLookAt(
            slide * (width + slideDistance),
            0,
            CAMERA_Z + dollyDistance,
            slide * (width + slideDistance),
            0,
            0,
            false
        );

        await new Promise((resolve) => setTimeout(resolve, 500));

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

            await cameraControls.current.fitToBox(currentSlide, false, {
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
            maxSpeed={500}
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
                value: 0,
                min: 0,
                max: 10,
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
            <color attach="background" args={[colors.yellow.DEFAULT]} />
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
