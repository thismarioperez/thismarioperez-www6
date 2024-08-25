import useDebug from "@/hooks/useDebug";
import { CameraControls } from "@react-three/drei";
import { Suspense } from "react";
import MediaMesh from "./MediaMesh";

export default function MediaScene() {
    const [debug] = useDebug();

    return (
        <>
            <CameraControls enabled={debug} />

            <Suspense>
                <MediaMesh src="/images/image-1.jpg" />
            </Suspense>
        </>
    );
}
