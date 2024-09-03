import useStore from "@/store";

export default function useAppState() {
    const { isReady, setIsReady } = useStore((state) => ({
        isReady: state.isReady,
        setIsReady: state.setIsReady,
    }));

    return { isReady, setIsReady };
}
