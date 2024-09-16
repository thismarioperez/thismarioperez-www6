import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import colors from "@/styles/colors";

const LavaLamp = () => {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.001;
            meshRef.current.rotation.y += 0.001;
            meshRef.current.rotation.z += 0.001;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 0, 0]} castShadow receiveShadow>
            <torusGeometry args={[10, 5, 200, 200]} />
            <meshToonMaterial color={colors.yellow.DEFAULT} />
        </mesh>
    );
};

export default function LavaLampScene() {
    return (
        <>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 2, 1]} intensity={1} />
            <color attach="background" args={[colors.black.DEFAULT]} />
            <LavaLamp />
        </>
    );
}
