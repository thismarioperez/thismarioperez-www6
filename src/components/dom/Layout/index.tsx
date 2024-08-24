"use client";

import { TransitionProvider } from "@/context/TransitionContext";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <TransitionProvider>{children}</TransitionProvider>;
}
