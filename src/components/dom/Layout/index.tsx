"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TransitionProvider } from "@/context/TransitionContext";
import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <TransitionProvider>
            <div className="absolute top-0 left-0 size-full">
                <Experience />
            </div>
            <div className="relative  pointer-events-none">
                <Header />
                <TransitionComponent>
                    <Component {...pageProps} />
                </TransitionComponent>
            </div>
            <LevaUI />
            <DebugHandler />
        </TransitionProvider>
    );
}
