import useStore from "@/store";

export default function useSliderState() {
    const { slide, setSlide, nextSlide, prevSlide } = useStore((state) => ({
        slide: state.slide,
        setSlide: state.setSlide,
        nextSlide: state.nextSlide,
        prevSlide: state.prevSlide,
    }));

    return { slide, setSlide, nextSlide, prevSlide };
}
