import { TStoreStateCreator } from ".";

export interface IAppSlice {
    isReady: boolean;
    setIsReady: (value: boolean) => void;
    headerHeight: number;
    setHeaderHeight: (value: number) => void;
}

export const createAppSlice: TStoreStateCreator<IAppSlice> = (
    set,
    get,
    api
) => ({
    isReady: false,
    setIsReady: (value: boolean) =>
        set((state) => ({ ...state, isReady: value })),
    headerHeight: 0,
    setHeaderHeight: (value: number) =>
        set((state) => ({ ...state, headerHeight: value })),
});
