import { SetState } from "zustand";

import { TStoreState } from ".";

import { SCENES } from "@/components/canvas/Experience";

export interface ISliderSlice {
    slide: number;
    setSlide: (value: number) => void;
    nextSlide: () => void;
    prevSlide: () => void;
}

export const createSliderSlice: (set: SetState<TStoreState>) => ISliderSlice = (
    set
) => ({
    slide: 0,
    setSlide: (value: number) => set((state) => ({ ...state, slide: value })),
    prevSlide: () =>
        set((state) => ({
            ...state,
            slide: state.slide > 0 ? state.slide - 1 : SCENES.length - 1,
        })),
    nextSlide: () =>
        set((state) => ({
            ...state,
            slide: state.slide < SCENES.length - 1 ? state.slide + 1 : 0,
        })),
});
