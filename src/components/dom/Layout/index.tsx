"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";
import Menu from "./Menu";
import { Suspense } from "react";

const Noise = dynamic(() => import("@/components/dom/common/Noise"), {
    ssr: false,
});

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <>
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
            <Header />
            <div className="relative  pointer-events-none">
                <TransitionComponent>
                    <Component {...pageProps} />
                </TransitionComponent>
                <Menu />
            </div>
            <Noise blendMode="overlay" opacity={30} />
            <LevaUI />
            <DebugHandler />
        </>
    );
}
