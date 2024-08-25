import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree, RootState } from "@react-three/fiber";
import * as THREE from "three";
import { folder, useControls } from "leva";

import WarbleShaderMaterial from "../shaders/WarbleShader";
import ChromaticAberrationMaterial from "../shaders/ChromaticAberrationShader";
import GammaCorrectionMaterial from "../shaders/GammaCorrectionShader";

export const LinearEncoding = 3000;
export const sRGBEncoding = 3001;

/**
 * TextureEncoding was deprecated in r152, and removed in r162.
 */
export type TextureEncoding = typeof LinearEncoding | typeof sRGBEncoding;

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
    const WarblePass = useRef(new WarbleShaderMaterial());
    const ChromaticAbPass = useRef(new ChromaticAberrationMaterial());
    const GammaCorrectionPass = useRef(new GammaCorrectionMaterial());

    const {
        enablePostProcessing,
        enableGammaCorrectionPass,
        enableChromaticAbPass,
        uRedOffset,
        uGreenOffset,
        uBlueOffset,
        uIntensity,
        uRadius,
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
            ChromaticAb: folder({
                enableChromaticAbPass: {
                    value: false,
                    label: "Enable Chromatic Aberration",
                },
                chromaticAbProggress: {
                    value: 0.0,
                    min: 0.0,
                    max: 1.0,
                    step: 0.01,
                },
                uRedOffset: {
                    value: 16,
                    min: -100.0,
                    max: 100.0,
                    step: 1.0,
                },
                uGreenOffset: {
                    value: -12,
                    min: -100.0,
                    max: 100.0,
                    step: 1.0,
                },
                uBlueOffset: {
                    value: -29.0,
                    min: -100.0,
                    max: 100.0,
                    step: 1.0,
                },
                uIntensity: { value: 10, min: 1, max: 50.0, step: 1 },
                uRadius: { value: 30, min: 1, max: 100, step: 5 },
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

            //Chromatic Ab. Pass
            if (enableChromaticAbPass) {
                screen.material = ChromaticAbPass.current;
                ChromaticAbPass.current.uniforms.uRedOffset.value = uRedOffset;
                ChromaticAbPass.current.uniforms.uGreenOffset.value =
                    uGreenOffset;
                ChromaticAbPass.current.uniforms.uBlueOffset.value =
                    uBlueOffset;
                ChromaticAbPass.current.uniforms.uIntensity.value = uIntensity;
                ChromaticAbPass.current.uniforms.uRadius.value = uRadius;
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
