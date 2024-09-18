import useStore from "@/store";

export default function useTransitionState() {
    const { transitionCompleted, setTransitionCompleted } = useStore(
        (state) => ({
            transitionCompleted: state.transitionCompleted,
            setTransitionCompleted: state.setTransitionCompleted,
        })
    );

    return { transitionCompleted, setTransitionCompleted };
}
