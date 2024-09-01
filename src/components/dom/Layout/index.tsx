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
        <div className="relative pointer-events-none">
            <DebugHandler />
            <LevaUI />
            <Noise blendMode="overlay" opacity={30} />
            <Header />
            <Menu />
            <div className="relative h-fit w-full z-10">
                <TransitionComponent>
                    <Component {...pageProps} />
                </TransitionComponent>
            </div>
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </div>
    );
}
