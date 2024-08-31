import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

import colors from "@/styles/colors";
import { Grid, OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function MenuScene() {
    const points = useRef<THREE.Points>(null!);

    useFrame(({ clock: { elapsedTime: time } }, delta) => {
        if (!points.current) return;

        // rotate
        points.current.rotation.y = time * 0.15;

        // scale
        points.current.scale.x = 1 + Math.sin(time) * 0.5;

        points.current.scale.y = 1 + Math.sin(time) * 0.25;

        points.current.scale.z = 1 + Math.sin(time) * 0.4;
    });

    return (
        <>
            <color attach="background" args={[colors.yellow]} />
            <PerspectiveCamera makeDefault position={[0, 3, 5]} fov={75} />
            <ambientLight intensity={2} />
            <points ref={points}>
                <sphereGeometry args={[1, 32, 32]} />
                <pointsMaterial
                    color={colors.black}
                    size={0.02}
                    sizeAttenuation={true}
                />
            </points>

            <Grid cellColor={colors.black} infiniteGrid />
        </>
    );
}
