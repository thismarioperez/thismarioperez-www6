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
import Footer from "./Footer";

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
            <Header />
            <Menu />
            <div
                className={cx(
                    "relative w-full h-fit z-7 transition-all duration-500 ease-in-out pt-header",
                    menuOpen
                        ? "blur-3xl opacity-0 invisible"
                        : "blur-0 opacity-100 visible"
                )}
            >
                <ReactLenis root options={{ syncTouch: true }}>
                    <main className="flex flex-col min-h-[calc(100vh-var(--header-height))]">
                        <TransitionComponent>
                            <Component {...pageProps} />
                        </TransitionComponent>
                    </main>
                    <Footer />
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
