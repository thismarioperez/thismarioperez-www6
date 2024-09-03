import { TStoreStateCreator } from ".";

export interface IAppSlice {
    isReady: boolean;
    setIsReady: (value: boolean) => void;
}

export const createAppSlice: TStoreStateCreator<IAppSlice> = (
    set,
    get,
    api
) => ({
    isReady: false,
    setIsReady: (value: boolean) =>
        set((state) => ({ ...state, isReady: value })),
});
