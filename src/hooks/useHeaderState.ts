import useStore from "@/store";

export default function useHeaderState() {
    const { headerHeight, setHeaderHeight } = useStore((state) => ({
        headerHeight: state.headerHeight,
        setHeaderHeight: state.setHeaderHeight,
    }));

    return { headerHeight, setHeaderHeight };
}
