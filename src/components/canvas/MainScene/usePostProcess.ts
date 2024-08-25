import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, RootState } from "@react-three/fiber";
import * as THREE from "three";
import { folder, useControls } from "leva";

import ChromaticAberrationMaterial from "../shaders/ChromaticAberrationShader";
import CurtainMaterial from "../shaders/CurtainShader";
import GammaCorrectionMaterial from "../shaders/GammaCorrectionShader";
import WarbleShaderMaterial from "../shaders/WarbleShader";

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
    const [{ dpr }, size] = useThree<
        [RootState["viewport"], RootState["size"]]
    >((s) => [s.viewport, s.size]);
    const ChromaticAbPass = useRef(new ChromaticAberrationMaterial());
    const CurtainPass = useRef(new CurtainMaterial());
    const GammaCorrectionPass = useRef(new GammaCorrectionMaterial());
    const WarblePass = useRef(new WarbleShaderMaterial());

    const {
        enablePostProcessing,
        enableGammaCorrectionPass,
        enableCurtainPass,
        curtainProgress,
        enableChromaticAbPass,
        chromaticAbProgress,
        uOffset,
        enableWarblePass,
    } = useControls({
        FX: folder({
            enablePostProcessing: { value: true, label: "Enable" },
            GammaCorrection: folder({
                enableGammaCorrectionPass: {
                    value: false,
                    label: "Enable Gamma Correction",
                },
            }),
            Curtain: folder({
                enableCurtainPass: {
                    value: true,
                    label: "Enable Curtain",
                },
                curtainProgress: {
                    value: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.01,
                },
            }),
            ChromaticAb: folder({
                enableChromaticAbPass: {
                    value: true,
                    label: "Enable Chromatic Aberration",
                },
                chromaticAbProgress: {
                    value: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.01,
                },
                uOffset: {
                    value: 0.1,
                    min: 0.0,
                    max: 1.0,
                    step: 0.01,
                },
            }),
            Warble: folder({
                enableWarblePass: {
                    value: false,
                    label: "Enable",
                },
            }),
        }),
    });

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
        if (!renderTarget) return;
        const { width, height } = size;
        const { w, h } = {
            w: width * dpr,
            h: height * dpr,
        };
        renderTarget.setSize(w, h);
    }, [dpr, size, renderTarget]);

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
                CurtainPass.current.uniforms.uProgress.value = curtainProgress;
                CurtainPass.current.uniforms.uDiffuse.value =
                    renderTarget.texture;
                gl.render(screenScene, screenCamera);
            }

            //Chromatic Ab. Pass
            if (enableChromaticAbPass) {
                screen.material = ChromaticAbPass.current;
                ChromaticAbPass.current.uniforms.uOffset.value = uOffset;
                ChromaticAbPass.current.uniforms.uProgress.value =
                    chromaticAbProgress;
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
