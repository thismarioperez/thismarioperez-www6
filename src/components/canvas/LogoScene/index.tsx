import { useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import {
    Center,
    Environment,
    Lightformer,
    OrbitControls,
    PerspectiveCamera,
    Text3D,
} from "@react-three/drei";

import colors from "@/styles/colors";
import { damp3, dampE } from "maath/easing";
import useDebug from "@/hooks/useDebug";

const SPEED = 0.75;
const ROTATION_X_FACTOR = 0.05;
const ROTATION_Y_FACTOR = 0.2;
const ROTATION_Z_FACTOR = 0.05;

export default function LogoScene() {
    const [debug] = useDebug();
    const mesh = useRef<THREE.Mesh>(null);
    const translationGroup = useRef<THREE.Group>(null);
    const floatGroup = useRef<THREE.Group>(null);
    const { width, height } = useThree((state) => state.viewport);

    useFrame(({ clock: { elapsedTime: time }, pointer: { x, y } }, delta) => {
        if (floatGroup.current) {
            // float effect
            floatGroup.current.rotation.x =
                Math.sin(time) * SPEED * Math.PI * 0.5 * ROTATION_X_FACTOR;
            floatGroup.current.rotation.y =
                Math.sin(time) * SPEED * Math.PI * 0.5 * ROTATION_Y_FACTOR;
            floatGroup.current.rotation.z =
                Math.sin(time) * SPEED * Math.PI * 0.5 * ROTATION_Z_FACTOR;
        }

        if (translationGroup.current) {
            // mouse interaction
            damp3(
                translationGroup.current.position,
                [-x * 0.5, -y * 0.5, 0],
                0.5,
                delta
            );
        }
    });

    return (
        <>
            <ambientLight intensity={0.75} />
            <pointLight position={[2, 0, 5]} intensity={20} />
            <color attach="background" args={[colors.black.DEFAULT]} />
            {debug && <axesHelper args={[10]} position={[0, 0, 0]} />}
            <group ref={translationGroup}>
                <group ref={floatGroup}>
                    <Center
                        onCentered={({
                            container,
                            height: _height,
                            width: _width,
                        }) =>
                            container.scale.setScalar(
                                Math.min(height / _height, width / _width) * 0.5
                            )
                        }
                    >
                        <Text3D
                            font="/fonts/PrestigeEliteStd_Bold.json"
                            castShadow
                            receiveShadow
                            // scale={scale}
                            ref={mesh}
                        >
                            M
                            <meshPhongMaterial color={colors.white} />
                        </Text3D>
                    </Center>
                </group>
            </group>
        </>
    );
}
