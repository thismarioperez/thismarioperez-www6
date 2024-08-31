import colors from "@/styles/colors";
import { Grid, PerspectiveCamera } from "@react-three/drei";

export default function MenuScene() {
    return (
        <>
            <color attach="background" args={[colors.yellow]} />
            <PerspectiveCamera makeDefault position={[0, 3, 5]} fov={75} />
            <ambientLight intensity={2} />

            <Grid cellColor={colors.black} infiniteGrid />
        </>
    );
}
