import MediaMesh from "@/components/canvas/common/MediaMesh";
import { PerspectiveCamera } from "@react-three/drei";

export default function MediaScene({ src }: { src: string }) {
    return (
        <>
            <ambientLight />
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
            <MediaMesh src={src} />
        </>
    );
}
