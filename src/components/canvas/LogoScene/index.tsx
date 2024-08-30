import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls, PerspectiveCamera, Text3D } from "@react-three/drei";

import colors from "@/styles/colors";
import { damp3 } from "maath/easing";

const SPEED = 0.75;
const ROTATION_X_FACTOR = 0.05;
const ROTATION_Y_FACTOR = 0.05;
const ROTATION_Z_FACTOR = 0.05;

export default function LogoScene() {
    const mesh = useRef<THREE.Mesh>(null);
    const translationGroup = useRef<THREE.Group>(null);
    const oscillationGroup = useRef<THREE.Group>(null);
    const cameraControls = useRef<CameraControls>(null);
    const { width, height } = useThree((state) => state.viewport);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (cameraControls.current && mesh.current) {
                cameraControls.current.fitToBox(mesh.current, true, {
                    paddingBottom: 0.5,
                    paddingTop: 0.5,
                    paddingLeft: 0.5,
                    paddingRight: 0.5,
                });
            }
        }, 200);

        return () => clearTimeout(timeout);
    }, [width, height]);

    useFrame(({ clock: { elapsedTime: time }, pointer: { x, y } }, delta) => {
        if (oscillationGroup.current) {
            // oscillation rotation effect
            oscillationGroup.current.rotation.x =
                Math.sin(time) * SPEED * Math.PI * 0.5 * ROTATION_X_FACTOR;
            oscillationGroup.current.rotation.y =
                Math.sin(time) * SPEED * Math.PI * 0.5 * ROTATION_Y_FACTOR;
            oscillationGroup.current.rotation.z =
                Math.sin(time) * SPEED * Math.PI * 0.5 * ROTATION_Z_FACTOR;
        }

        if (translationGroup.current) {
            // mouse interaction
            damp3(
                translationGroup.current.position,
                [-x * 0.25, -y * 0.25, 0],
                0.5,
                delta
            );
        }
    });

    return (
        <>
            <Suspense fallback={null}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
                <CameraControls
                    makeDefault
                    mouseButtons={{
                        left: 0,
                        middle: 0,
                        right: 0,
                        wheel: 0,
                    }}
                    touches={{
                        one: 0,
                        two: 0,
                        three: 0,
                    }}
                    ref={cameraControls}
                />
                <ambientLight intensity={0.75} />
                <pointLight position={[2, 0, 5]} intensity={20} />
                <color attach="background" args={[colors.black]} />

                <group ref={translationGroup}>
                    <group ref={oscillationGroup}>
                        <Text3D
                            font="/fonts/PrestigeEliteStd_Bold.json"
                            castShadow
                            receiveShadow
                            scale={5}
                            position={[0, 0, 0]}
                            rotation={[0, 0, 0]}
                            ref={mesh}
                        >
                            M
                            <meshPhongMaterial color={colors.white} />
                        </Text3D>
                    </group>
                </group>
            </Suspense>
        </>
    );
}
