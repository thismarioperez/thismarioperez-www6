import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { createSliderSlice, ISliderSlice } from "./sliderSlice";
import { createTransitionSlice, ITransitionSlice } from "./transitionSlice";

export type TStoreState = ISliderSlice & ITransitionSlice;

export type TStoreStateCreator<T> = StateCreator<
    TStoreState,
    [["zustand/devtools", never]],
    [],
    T
>;

const useStore = create<TStoreState>()(
    devtools((...a) => ({
        ...createSliderSlice(...a),
        ...createTransitionSlice(...a),
    }))
);

export default useStore;
