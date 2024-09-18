import useStore from "@/store";

export default function useAppState() {
    const { isReady, setIsReady, headerHeight, setHeaderHeight } = useStore(
        (state) => ({
            isReady: state.isReady,
            setIsReady: state.setIsReady,
            headerHeight: state.headerHeight,
            setHeaderHeight: state.setHeaderHeight,
        })
    );

    return { isReady, setIsReady, headerHeight, setHeaderHeight };
}
