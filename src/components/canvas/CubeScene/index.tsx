import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import colors from "@/styles/colors";

const RotatingCube = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.01;
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
            {/* <torusGeometry args={[200, 120, 200, 200]} /> */}
            {/* <meshToonMaterial color={colors.yellow.DEFAULT} /> */}
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color={colors.yellow.DEFAULT} />
        </mesh>
    );
};

export default function CubeScene() {
    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 1]} intensity={1} />
            <color attach="background" args={[colors.black.DEFAULT]} />
            <RotatingCube />
        </>
    );
}
