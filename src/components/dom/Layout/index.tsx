"use client";

import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import cx from "classnames";

import TransitionComponent from "@/components/dom/Layout/TransitionComponent";
import Header from "@/components/dom/Layout/Header";
import DebugHandler from "@/components/dom/Layout/DebugHandler";
import LevaUI from "@/components/dom/Layout/LevaUI";
import Menu from "./Menu";
import Experience from "@/components/canvas/Experience";
import { ReactLenis } from "@/lib/lenis";
import ScrollHandler from "./ScrollHandler";
import useMenuState from "@/hooks/useMenuState";
import Loading from "./Loading";

const Canvas = dynamic(() => import("@/lib/webgl/components/Canvas"), {
    ssr: false,
});

const GSAP = dynamic(() => import("@/lib/gsap/components/GSAP"), {
    ssr: false,
});

const Noise = dynamic(() => import("@/components/dom/common/Noise"), {
    ssr: false,
});

export default function Layout({ Component, pageProps }: AppProps) {
    const { menuOpen } = useMenuState();
    return (
        <>
            <Loading />

            {/* canvas */}
            <Noise blendMode="overlay" opacity={30} />
            <Canvas>
                <Experience />
            </Canvas>

            {/* dom */}
            <div className="relative ">
                <Header />
                <Menu />
                <ReactLenis root options={{ syncTouch: true }}>
                    <div
                        className={cx(
                            "relative h-full w-full z-7 transition-all duration-1000 ease-in-out",
                            menuOpen
                                ? "blur-3xl opacity-0 invisible"
                                : "blur-0 opacity-100 visible"
                        )}
                    >
                        <TransitionComponent>
                            <Component {...pageProps} />
                        </TransitionComponent>
                    </div>
                    <ScrollHandler />
                </ReactLenis>
            </div>

            {/* util & config */}
            <DebugHandler />
            <LevaUI />
            <GSAP />
        </>
    );
}
