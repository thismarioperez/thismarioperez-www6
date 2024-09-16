import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, RootState } from "@react-three/fiber";
import * as THREE from "three";
import { button, folder, useControls } from "leva";
import { gsap } from "@/lib/gsap";

import ChromaticAberrationMaterial from "../shaders/ChromaticAberrationShader";
import CurtainMaterial from "../shaders/CurtainShader";
import GammaCorrectionMaterial from "../shaders/GammaCorrectionShader";
import WarbleShaderMaterial from "../shaders/WarbleShader";
import useParsedPathname from "@/hooks/useParsedPathname";
import useSliderState from "@/hooks/useSliderState";
import { useWindowSize } from "usehooks-ts";
import useAppState from "@/hooks/useAppState";

function getFullscreenTriangle() {
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);

    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 2));
    geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));

    return geometry;
}

// Basic shader postprocess based on the template https://gist.github.com/RenaudRohlinger/bd5d15316a04d04380e93f10401c40e7
// USAGE: Simply call usePostprocess hook in your r3f component to apply the shader to the canvas as a postprocess effect
const usePostProcess = () => {
    const { isReady } = useAppState();
    const { slide } = useSliderState();
    const { width: windowWidth, height: windowHeight } = useWindowSize({
        initializeWithValue: true,
        debounceDelay: 100,
    });
    const uProgress = useRef<number>(0);
    const uProgress2 = useRef<number>(0);
    const uProgress3 = useRef<number>(0);
    const tl = useRef<gsap.core.Timeline>();
    const ChromaticAbPass = useRef(new ChromaticAberrationMaterial());
    const CurtainPass = useRef(new CurtainMaterial());
    const GammaCorrectionPass = useRef(new GammaCorrectionMaterial());
    const WarblePass = useRef(new WarbleShaderMaterial());

    const [
        {
            enablePostProcessing,
            enableGammaCorrectionPass,
            chromaticAbProgressIntesity,
            enableCurtainPass,
            enableChromaticAbPass,
            uOffset,
            enableWarblePass,
        },
        set,
    ] = useControls(() => ({
        FX: folder({
            enablePostProcessing: { value: true, label: "Enable" },
            ["play transition"]: button(() => {
                playTransition();
            }),
            GammaCorrection: folder({
                enableGammaCorrectionPass: {
                    value: true,
                    label: "Enable Gamma Correction",
                },
            }),
            Curtain: folder({
                enableCurtainPass: {
                    value: true,
                    label: "Enable Curtain",
                },
            }),
            ChromaticAb: folder({
                enableChromaticAbPass: {
                    value: true,
                    label: "Enable Chromatic Aberration",
                },
                chromaticAbProgressIntesity: {
                    value: 0.1,
                    min: 0.01,
                    max: 2,
                    step: 0.01,
                },
                uOffset: {
                    value: 0.33,
                    min: 0.0,
                    max: 1.0,
                    step: 0.01,
                },
            }),
            Warble: folder({
                enableWarblePass: {
                    value: true,
                    label: "Enable",
                },
            }),
        }),
    }));

    const playTransition = () => {
        tl.current?.kill();

        tl.current = gsap.timeline({ paused: true });

        // entire transition is 2 seconds
        // chromatic aberration
        tl.current.add(
            gsap
                .timeline()
                .to(uProgress, {
                    current: 1,
                    duration: 1,
                    ease: "power1.inOut",
                })
                .to(uProgress, {
                    current: 0,
                    duration: 1,
                    ease: "power1.inOut",
                })
        );

        // curtain
        tl.current.add(
            gsap
                .timeline()
                .to(uProgress2, {
                    current: 1,
                    duration: 0.25,
                    ease: "power1.inOut",
                })
                .to(uProgress2, {
                    current: 0,
                    duration: 0.75,
                    ease: "power1.inOut",
                }),
            0
        );

        // warble
        tl.current.add(
            gsap
                .timeline()
                .to(uProgress3, {
                    current: 1,
                    duration: 0.5,
                    ease: "power1.inOut",
                })
                .to(uProgress3, {
                    current: 0,
                    duration: 0.5,
                    ease: "power1.inOut",
                }),
            0.5
        );

        tl.current.play();
    };

    const [screenCamera, screenScene, screen, renderTarget] = useMemo(() => {
        const screenScene = new THREE.Scene();
        const screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const screen = new THREE.Mesh(getFullscreenTriangle());
        screen.frustumCulled = false;
        screenScene.add(screen);

        const renderTarget = new THREE.WebGLRenderTarget(512, 512, {
            samples: 4,
            type: THREE.HalfFloatType,
            format: THREE.RGBAFormat,
            depthBuffer: true,
            stencilBuffer: false,
            anisotropy: 1,
        });

        renderTarget.depthTexture = new THREE.DepthTexture(1, 1); // fix depth issues
        renderTarget.texture.colorSpace = THREE.SRGBColorSpace;

        return [screenCamera, screenScene, screen, renderTarget];
    }, []);

    const enabled = Boolean(
        screen &&
            renderTarget &&
            enablePostProcessing &&
            (enableWarblePass ||
                enableChromaticAbPass ||
                enableCurtainPass ||
                enableGammaCorrectionPass)
    );

    useEffect(() => {
        if (!isReady) return;
        const handlePlay = async () => {
            // wait for loading overlay to swip
            await new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 500);
            });
            playTransition();
        };

        handlePlay();
    }, [slide, isReady]);

    useEffect(() => {
        if (!renderTarget) return;
        renderTarget.setSize(windowWidth, windowHeight);
    }, [windowWidth, windowHeight, renderTarget]);

    useFrame(({ scene, camera, gl }, delta) => {
        // Initial Render
        gl.setRenderTarget(null);
        gl.render(scene, camera);

        if (enabled) {
            // Post Processing
            gl.setRenderTarget(renderTarget);
            gl.render(scene, camera);

            // Gamma Correction
            if (enableGammaCorrectionPass) {
                screen.material = GammaCorrectionPass.current;
                GammaCorrectionPass.current.uniforms.uDiffuse.value =
                    renderTarget.texture;
                gl.render(screenScene, screenCamera);
            }

            // Curtain Pass
            if (enableCurtainPass) {
                screen.material = CurtainPass.current;
                CurtainPass.current.uniforms.uProgress.value =
                    uProgress2.current;
                CurtainPass.current.uniforms.uDiffuse.value =
                    renderTarget.texture;
                gl.render(screenScene, screenCamera);
            }

            //Chromatic Ab. Pass
            if (enableChromaticAbPass) {
                screen.material = ChromaticAbPass.current;
                ChromaticAbPass.current.uniforms.uOffset.value = uOffset;
                ChromaticAbPass.current.uniforms.uProgress.value =
                    uProgress.current;
                ChromaticAbPass.current.uniforms.uProgressIntesity.value =
                    chromaticAbProgressIntesity;
                ChromaticAbPass.current.uniforms.uDiffuse.value =
                    renderTarget.texture;
                gl.render(screenScene, screenCamera);
            }

            // Warble Pass
            if (enableWarblePass) {
                screen.material = WarblePass.current;
                WarblePass.current.uniforms.diffuse.value =
                    renderTarget.texture;
                WarblePass.current.uniforms.time.value += delta;
                WarblePass.current.uniforms.uProgress.value =
                    uProgress3.current;
                gl.render(screenScene, screenCamera);
            }

            // Final Render
            gl.setRenderTarget(null);
            gl.render(screenScene, screenCamera);
        }
    }, 1);
    return null;
};

export default usePostProcess;
