import { Plane, useAspect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { dampE, damp } from "maath/easing";
import { useEffect, useRef, useState } from "react";
import { Group } from "three";

type TProps = {
    src: string;
    [key: string]: any;
};

const IMAGE_COUNT = 3;
const PLANE_OFFSET = 0.75;

export default function MediaMesh({ src, ...rest }: TProps) {
    const [uuid] = useState(crypto.randomUUID());
    const group = useRef<Group>(null);
    const ocilator = useRef<number>(0);
    const texture = useTexture(src);
    const mask = useTexture("/images/alpha-mask.jpg");
    const scale = useAspect(texture.image.width, texture.image.height);

    useFrame(({ pointer: { x, y }, clock: { elapsedTime: time } }, delta) => {
        if (group.current) {
            // mouse interaction
            dampE(
                group.current.rotation,
                [-y * 0.025, x * 0.025, 0],
                0.5,
                delta,
                1
            );

            // ocilation
            ocilator.current = (Math.sin(time) + 1) / 2;
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
            {Array.from({ length: IMAGE_COUNT }).map((_, idx) => (
                <Plane
                    scale={scale}
                    key={`media-scene-${uuid}-${idx}`}
                    name="media-plane"
                    position={[0, 0, idx * PLANE_OFFSET]}
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
