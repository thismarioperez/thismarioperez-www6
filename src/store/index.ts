import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { createSliderSlice, ISliderSlice } from "./sliderSlice";

export type TStoreState = ISliderSlice;

const useStore = create<TStoreState>(
    // @ts-ignore
    devtools((set, get) => ({
        ...createSliderSlice(set),
    }))
);

export default useStore;
