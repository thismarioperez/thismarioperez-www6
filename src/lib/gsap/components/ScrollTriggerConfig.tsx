"use client";

import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/all";
import { useLenis } from "@/lib/lenis";
import { useEffect, useLayoutEffect } from "react";

export default function ScrollTriggerConfig() {
    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.clearScrollMemory("manual");
        ScrollTrigger.defaults({
            markers: process.env.NODE_ENV === "development",
        });
    }, []);

    const lenis = useLenis(ScrollTrigger.update);
    useEffect(() => ScrollTrigger.refresh(), [lenis]);

    return null;
}
