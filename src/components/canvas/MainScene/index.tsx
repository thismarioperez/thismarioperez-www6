import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { Mesh } from "three";
import usePostProcess from "./usePostProcess";
import { MeshPortalMaterial, Plane } from "@react-three/drei";
import MediaScene from "@/components/canvas/MediaScene";

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
    const { width, height } = useThree((state) => state.size);

    usePostProcess();
    return (
        <>
            <Plane name="media-scene" args={[width, height]}>
                <MeshPortalMaterial>
                    <MediaScene />
                </MeshPortalMaterial>
            </Plane>
        </>
    );
};

export default function MainScene() {
    return (
        <Canvas dpr={[1, 2]}>
            <color attach="background" args={["white"]} />
            <ambientLight />
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </Canvas>
    );
}
