import { Suspense } from "react";
import MediaMesh from "./MediaMesh";
import { PerspectiveCamera } from "@react-three/drei";

export default function MediaScene() {
    return (
        <>
            <ambientLight />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <Suspense fallback={null}>
                <MediaMesh src="/images/image-1.jpg" />
            </Suspense>
        </>
    );
}
