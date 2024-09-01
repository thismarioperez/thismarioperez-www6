"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";
import Menu from "./Menu";

const Noise = dynamic(() => import("@/components/dom/common/Noise"), {
    ssr: false,
});

const Experience = dynamic(() => import("@/components/canvas/Experience"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <>
            <Noise blendMode="overlay" opacity={30} />
            <Experience />
            <div className="relative  pointer-events-none">
                <Header />
                <TransitionComponent>
                    <Component {...pageProps} />
                </TransitionComponent>
                <Menu />
            </div>
            <LevaUI />
            <DebugHandler />
        </>
    );
}
