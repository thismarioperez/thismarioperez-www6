import { SetState } from "zustand";

import { TStoreState } from ".";

import { SCENES, TSceneName } from "@/components/canvas/Experience";

export interface ISliderSlice {
    slide: number;
    setSlide: (value: number) => void;
    setSlideByName: (value: TSceneName) => void;
    nextSlide: () => void;
    prevSlide: () => void;
}

export const createSliderSlice: (set: SetState<TStoreState>) => ISliderSlice = (
    set
) => ({
    slide: 0,
    setSlide: (value: number) => set((state) => ({ ...state, slide: value })),
    setSlideByName: (value: TSceneName) => {
        const index = SCENES.findIndex((scene) => scene.name === value);
        if (index === -1) {
            throw new Error(`Slide scene named "${value}" not found`);
        }
        set((state) => ({ ...state, slide: index }));
    },
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
