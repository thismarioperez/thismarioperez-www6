"use client";

import { TransitionProvider } from "@/context/TransitionContext";
import Header from "./Header";

export default function Layout({ children }: { children: React.ReactNode }) {
    return <TransitionProvider>{children}</TransitionProvider>;
}
