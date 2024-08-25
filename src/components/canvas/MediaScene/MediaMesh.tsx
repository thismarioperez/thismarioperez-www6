import { Plane, useAspect, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { dampE } from "maath/easing";
import { useRef } from "react";
import { Group } from "three";

type TProps = {
    src: string;
};

const IMAGE_COUNT = 4;

export default function MediaMesh({ src }: TProps) {
    const uuid = crypto.randomUUID();
    const group = useRef<Group>(null);
    const texture = useTexture(src);
    const mask = useTexture("/images/alpha-mask.jpg");
    const scale = useAspect(texture.image.width, texture.image.height);

    useFrame(({ pointer: { x, y } }, delta) => {
        if (group.current) {
            dampE(
                group.current.rotation,
                [-y * 0.025, -x * 0.025, 0],
                0.1,
                delta
            );
        }
    });

    return (
        <group ref={group}>
            {Array.from({ length: IMAGE_COUNT }).map((_, idx) => (
                <Plane
                    scale={scale}
                    key={`media-scene-${uuid}-${idx}`}
                    position={[0, 0, idx * 0.75]}
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
