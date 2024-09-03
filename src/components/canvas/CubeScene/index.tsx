import { useRef } from "react";
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
            <meshBasicMaterial color="teal" />
        </mesh>
    );
};

export default function CubeScene() {
    return (
        <>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <RotatingCube />
        </>
    );
}
