import { TStoreStateCreator } from ".";

export interface IHeaderSlice {
    headerHeight: number;
    setHeaderHeight: (value: number) => void;
}

export const createHeaderSlice: TStoreStateCreator<IHeaderSlice> = (
    set,
    get,
    api
) => ({
    headerHeight: 0,
    setHeaderHeight: (value: number) =>
        set((state) => ({ ...state, headerHeight: value })),
});
