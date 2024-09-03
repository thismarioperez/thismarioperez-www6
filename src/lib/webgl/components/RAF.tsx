import { useFrame } from "@darkroom.engineering/hamo";
import { useThree } from "@react-three/fiber";

export type TProps = {
    render?: boolean;
};

export function RAF({ render = true }: TProps) {
    const { advance } = useThree();

    useFrame((time: number) => {
        if (render) {
            advance(time / 1000);
        }
    }, 1);

    return null;
}
