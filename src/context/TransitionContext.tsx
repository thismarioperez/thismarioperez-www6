import React, { createContext } from "react";
import { useState } from "react";

export type TTransitionContext = {
    completed: boolean;
    toggleCompleted: (value: boolean) => void;
};
const TransitionContext = createContext<TTransitionContext>({
    completed: false,
    toggleCompleted: () => {},
});

export type TTransitionProviderProps = {
    children: React.ReactNode;
};

export const TransitionProvider = ({ children }: TTransitionProviderProps) => {
    const [completed, setCompleted] =
        useState<TTransitionContext["completed"]>(false);

    const toggleCompleted: TTransitionContext["toggleCompleted"] = (value) => {
        setCompleted(value);
    };

    return (
        <TransitionContext.Provider
            value={{
                toggleCompleted,
                completed,
            }}
        >
            {children}
        </TransitionContext.Provider>
    );
};

export default TransitionContext;
