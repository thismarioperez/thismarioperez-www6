import { getSceneNames } from "@/lib/content";
import { TStoreStateCreator } from ".";

export const SCENES = getSceneNames();
export type TSceneName = (typeof SCENES)[number];

export interface ISliderSlice {
    slide: number;
    setSlide: (value: number) => void;
    setSlideByName: (value: TSceneName) => void;
    nextSlide: () => void;
    prevSlide: () => void;
}

export const createSliderSlice: TStoreStateCreator<ISliderSlice> = (
    set,
    get,
    api
) => ({
    slide: 0,
    setSlide: (value: number) => set((state) => ({ ...state, slide: value })),
    setSlideByName: (value: TSceneName) => {
        const index = SCENES.findIndex((name) => name === value);
        if (index === -1) {
            throw new Error(`Slide scene named "${String(value)}" not found`);
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
