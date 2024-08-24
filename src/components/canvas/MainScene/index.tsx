import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import usePostProcess from "./usePostProcess";

const RotatingCube = () => {
    const meshRef = useRef<Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="teal" />
        </mesh>
    );
};

const Scene = () => {
    usePostProcess();
    return (
        <>
            <ambientLight />
            <RotatingCube />
        </>
    );
};

export default function MainScene() {
    return (
        <Canvas>
            <color attach="background" args={["white"]} />
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
}
