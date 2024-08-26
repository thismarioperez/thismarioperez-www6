import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import {
    Bounds,
    Center,
    Float,
    PerspectiveCamera,
    PresentationControls,
    Text3D,
} from "@react-three/drei";

export default function LogoScene() {
    return (
        <>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <color attach="background" args={["black"]} />

                <Float floatingRange={[undefined, 0.01]} speed={2}>
                    <Center>
                        <Text3D
                            font="/fonts/PrestigeEliteStd_Bold.json"
                            castShadow
                            receiveShadow
                            scale={5}
                        >
                            M
                            <meshPhongMaterial color={"white"} />
                        </Text3D>
                    </Center>
                </Float>
            </Suspense>
        </>
    );
}
