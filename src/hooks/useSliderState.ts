import useStore from "@/store";

export default function useSliderState() {
    const { slide, setSlide, setSlideByName, nextSlide, prevSlide } = useStore(
        (state) => ({
            slide: state.slide,
            setSlide: state.setSlide,
            setSlideByName: state.setSlideByName,
            nextSlide: state.nextSlide,
            prevSlide: state.prevSlide,
        })
    );

    return { slide, setSlide, setSlideByName, nextSlide, prevSlide };
}
