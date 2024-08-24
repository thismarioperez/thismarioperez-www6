import { useFrame, useThree, RootState } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import WarbleShaderMaterial from "../shaders/WarbleShader";
import { folder, useControls } from "leva";
import { useFBO } from "@react-three/drei";
import ChromaticAberrationMaterial from "../shaders/ChromaticAberrationShader";

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
    const [{ dpr }, size, gl] = useThree<
        [RootState["viewport"], RootState["size"], RootState["gl"]]
    >((s) => [s.viewport, s.size, s.gl]);
    const renderTarget = useFBO(512, 512, {
        samples: 4,
    });
    const WarblePass = useRef(new WarbleShaderMaterial());
    const ChromaticAbPass = useRef(new ChromaticAberrationMaterial());

    const {
        enablePostProcessing,
        enableWarblePass,
        enableChromaticAbPass,
        uRedOffset,
        uGreenOffset,
        uBlueOffset,
        uIntensity,
        uRadius,
    } = useControls({
        FX: folder({
            enablePostProcessing: { value: true, label: "Enable" },
            Warble: folder({
                enableWarblePass: {
                    value: false,
                    label: "Enable",
                },
            }),
            ChromaticAb: folder({
                enableChromaticAbPass: {
                    value: true,
                    label: "Enable Chromatic Aberration",
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
        }),
    });

    useEffect(() => {
        const { width, height } = size;
        const { w, h } = {
            w: width * dpr,
            h: height * dpr,
        };
        renderTarget.setSize(w, h);
    }, [dpr, size, renderTarget]);

    const [screenCamera, screenScene, screen] = useMemo(() => {
        let screenScene = new THREE.Scene();
        const screenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const screen = new THREE.Mesh(getFullscreenTriangle());
        screen.frustumCulled = false;
        screenScene.add(screen);

        renderTarget.depthTexture = new THREE.DepthTexture(1, 1); // fix depth issues

        return [screenCamera, screenScene, screen];
    }, [renderTarget]);

    const enabled = Boolean(
        screen &&
            enablePostProcessing &&
            (enableWarblePass || enableChromaticAbPass)
    );

    useFrame(({ scene, camera, gl }, delta) => {
        gl.render(scene, camera);

        if (enabled) {
            // Initial Render
            gl.setRenderTarget(renderTarget);
            gl.render(scene, camera);

            // Warble Pass
            if (enableWarblePass) {
                screen.material = WarblePass.current;
                WarblePass.current.uniforms.diffuse.value =
                    renderTarget.texture;
                WarblePass.current.uniforms.time.value += delta;
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
                ChromaticAbPass.current.uniforms.uTexture.value =
                    renderTarget.texture;
                gl.render(screenScene, screenCamera);
            }

            // Final Render
            gl.setRenderTarget(null);
            gl.render(screenScene, screenCamera);
        } else {
            gl.setRenderTarget(null);
            gl.render(scene, camera);
        }
    }, 1);
    return null;
};

export default usePostProcess;
