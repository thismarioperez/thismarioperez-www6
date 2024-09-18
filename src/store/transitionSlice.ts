import { TStoreStateCreator } from ".";

export interface ITransitionSlice {
    transitionCompleted: boolean;
    setTransitionCompleted: (value: boolean) => void;
}

export const createTransitionSlice: TStoreStateCreator<ITransitionSlice> = (
    set,
    get,
    api
) => ({
    transitionCompleted: false,
    setTransitionCompleted: (value: boolean) =>
        set((state) => ({ ...state, transitionCompleted: value })),
});
