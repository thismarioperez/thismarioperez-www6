import { TStoreStateCreator } from ".";

export interface IMenuSlice {
    menuOpen: boolean;
    setMenuOpen: (value: boolean) => void;
    toggleMenuOpen: () => void;
}

export const createMenuSlice: TStoreStateCreator<IMenuSlice> = (
    set,
    get,
    api
) => ({
    menuOpen: false,
    setMenuOpen: (value: boolean) =>
        set((state) => ({ ...state, menuOpen: value })),
    toggleMenuOpen: () => {
        set((state) => ({ ...state, menuOpen: !state.menuOpen }));
    },
});
