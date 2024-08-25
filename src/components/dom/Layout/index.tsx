"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TransitionProvider } from "@/context/TransitionContext";
import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugEvents from "@/components/dom/Layout/DebugEvents";
import LevaUI from "@/components/dom/Layout/LevaUI";

const MainScene = dynamic(() => import("@/components/canvas/MainScene"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <>
            <TransitionProvider>
                <div className="absolute top-0 left-0 size-full">
                    <MainScene />
                </div>
                <div className="relative size-full pointer-events-none">
                    <Header />
                    <TransitionComponent>
                        <Component {...pageProps} />
                    </TransitionComponent>
                </div>
                <LevaUI />
                <DebugEvents />
            </TransitionProvider>
        </>
    );
}
