"use client";

import { AppProps } from "next/app";
import MainScene from "@/components/canvas/MainScene";
import { TransitionProvider } from "@/context/TransitionContext";
import Header from "@/components/dom/Layout/Header";
import TransitionComponent from "@/components/dom/TransitionComponent";
import DebugEvents from "../DebugEvents";

export default function Layout({ Component, pageProps }: AppProps) {
    return (
        <TransitionProvider>
            <div className="absolute top-0 left-0 size-full">
                <MainScene />
            </div>
            <div className="relative size-full">
                <Header />
                <TransitionComponent>
                    <Component {...pageProps} />
                </TransitionComponent>
            </div>
            <DebugEvents />
        </TransitionProvider>
    );
}
