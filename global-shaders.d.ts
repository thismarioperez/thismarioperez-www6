import type ParticleWavesMaterial from "@/components/canvas/shaders/ParticleWavesMaterial";

declare global {
    namespace JSX {
        interface IntrinsicElements {
            particleWavesMaterial: ReactThreeFiber.Object3DNode<
                ParticleWavesMaterial,
                typeof ParticleWavesMaterial
            >;
        }
    }
}
