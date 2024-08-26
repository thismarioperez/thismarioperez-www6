import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const RotatingCube = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="magenta" />
        </mesh>
    );
};

export default function LogoScene() {
    return (
        <>
            <Suspense fallback={null}>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <color attach="background" args={["black"]} />
                <RotatingCube />
            </Suspense>
        </>
    );
}
