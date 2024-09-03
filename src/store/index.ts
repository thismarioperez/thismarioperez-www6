import { create, StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { createMenuSlice, IMenuSlice } from "./menuSlice";
import { createSliderSlice, ISliderSlice } from "./sliderSlice";
import { createTransitionSlice, ITransitionSlice } from "./transitionSlice";
import { IHeaderSlice, createHeaderSlice } from "./headerSlice";
import { IAppSlice, createAppSlice } from "./appSlice";

export type TStoreState = IAppSlice &
    IHeaderSlice &
    IMenuSlice &
    ISliderSlice &
    ITransitionSlice;

export type TStoreStateCreator<T> = StateCreator<
    TStoreState,
    [["zustand/devtools", never]],
    [],
    T
>;

const useStore = create<TStoreState>()(
    devtools((...a) => ({
        ...createAppSlice(...a),
        ...createHeaderSlice(...a),
        ...createMenuSlice(...a),
        ...createSliderSlice(...a),
        ...createTransitionSlice(...a),
    }))
);

export default useStore;
