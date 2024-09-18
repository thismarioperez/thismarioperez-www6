import { create, StateCreator } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import { createMenuSlice, IMenuSlice } from "./menuSlice";
import { createSliderSlice, ISliderSlice } from "./sliderSlice";
import { createTransitionSlice, ITransitionSlice } from "./transitionSlice";
import { IAppSlice, createAppSlice } from "./appSlice";

export type TStoreState = IAppSlice &
    IMenuSlice &
    ISliderSlice &
    ITransitionSlice;

export type TStoreStateCreator<T> = StateCreator<
    TStoreState,
    [["zustand/devtools", never], ["zustand/persist", any]],
    [],
    T
>;

const useStore = create<TStoreState>()(
    devtools(
        persist(
            (...a) => ({
                ...createAppSlice(...a),
                ...createMenuSlice(...a),
                ...createSliderSlice(...a),
                ...createTransitionSlice(...a),
            }),
            {
                name: "thismarioperez-store",
                storage: createJSONStorage(() => sessionStorage),
                partialize: (state) => ({
                    isReady: state.isReady,
                }),
            }
        )
    )
);

export default useStore;
