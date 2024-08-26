import { Suspense } from "react";
import MediaMesh from "./MediaMesh";

export default function MediaScene() {
    return (
        <>
            <Suspense fallback={null}>
                <MediaMesh src="/images/image-1.jpg" />
            </Suspense>
        </>
    );
}
