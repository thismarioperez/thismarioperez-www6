import * as THREE from "three";
import randomUUID from "crypto-randomuuid";
import { Plane, useAspect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { dampE, damp } from "maath/easing";
import { useRef, useState } from "react";
import { Group } from "three";

type TProps = {
    src: string;
    [key: string]: any;
};

const IMAGE_COUNT = 3;
const PLANE_OFFSET = 0.75;

export default function MediaMesh({ src, ...rest }: TProps) {
    const [uuid] = useState(randomUUID());
    const [media] = useState(
        Array.from({ length: IMAGE_COUNT }).map((_, idx) => {
            return {
                uuid: `${uuid}-${idx}`,
                position: new THREE.Vector3(0, 0, PLANE_OFFSET),
            };
        })
    );
    const group = useRef<Group>(null);
    const ocilator = useRef<number>(0);
    const texture = useTexture(src);
    const mask = useTexture("/images/alpha-mask.jpg");
    const scale = useAspect(texture.image.width, texture.image.height);

    useFrame(({ pointer: { x, y }, clock: { elapsedTime: time } }, delta) => {
        if (group.current) {
            // mouse interaction
            dampE(group.current.rotation, [-y * 0.12, x * 0.12, 0], 0.5, delta);

            // ocilation
            ocilator.current = (Math.sin(time) + 1) / 10;
            group.current.children.forEach((child, idx) => {
                damp(
                    child.position,
                    "z",
                    idx * PLANE_OFFSET - ocilator.current * (idx + 1) * 0.5,
                    0.5,
                    delta,
                    1
                );
            });
        }
    });

    return (
        <group ref={group} {...rest}>
            {media.map(({ uuid, position }, idx) => (
                <Plane
                    scale={scale}
                    key={uuid}
                    name="media-plane"
                    position={position}
                >
                    <meshBasicMaterial
                        map={texture}
                        alphaMap={idx > 0 ? mask : undefined}
                        transparent={idx > 0}
                    />
                </Plane>
            ))}
        </group>
    );
}
