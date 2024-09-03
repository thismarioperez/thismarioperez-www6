"use client";

import { useFrame } from "@darkroom.engineering/hamo";
import { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "usehooks-ts";

const NOISE_COLOR = 0xffffffff;

const DEFAULT_OPACITY = 100;

type TCssMixBlendMode =
    | "normal"
    | "multiply"
    | "screen"
    | "overlay"
    | "darken"
    | "lighten"
    | "color-dodge"
    | "color-burn"
    | "hard-light"
    | "soft-light"
    | "difference"
    | "exclusion"
    | "hue"
    | "saturation"
    | "color"
    | "luminosity";

function noise(image: ImageData): void {
    const buffer32 = new Uint32Array(image.data.buffer);
    const len = buffer32.length;

    for (let i = 0; i < len; i++)
        if (Math.random() < 0.5) buffer32[i] = NOISE_COLOR;
}

type TNoiseProps = {
    blendMode?: TCssMixBlendMode;
    opacity?: NumericRange<0, 100>;
    animate?: boolean;
};

export default function Noise({ blendMode, opacity, animate }: TNoiseProps) {
    const el = useRef<HTMLDivElement>(null);
    const { width, height } = useWindowSize();
    const canvas = useMemo(() => document.createElement("canvas"), []);
    const context = useMemo(() => canvas.getContext("2d"), []);
    const dpr = Math.min(window.devicePixelRatio, 2);
    const image = useRef<ImageData>();

    const style: React.CSSProperties = useMemo(() => {
        return {
            mixBlendMode: blendMode ?? "normal",
            opacity: (opacity !== undefined ? opacity : DEFAULT_OPACITY) * 0.01, // normalize to 0-1 value
        };
    }, [blendMode, opacity]);

    const drawNoise = () => {
        image.current = context?.createImageData(width * dpr, height * dpr);
        noise(image.current!);
        context?.putImageData(image.current!, 0, 0);
    };

    // Mount canvas to DOM
    useEffect(() => {
        if (!el.current) return;

        el.current.appendChild(canvas);

        return () => {
            canvas.remove();
        };
    }, [canvas]);

    // Sync Canvas size to window size
    useEffect(() => {
        canvas.width = width;
        canvas.height = height;

        drawNoise();
    }, [width, height]);

    useFrame(() => {
        if (animate) drawNoise();
    });

    return (
        <div
            ref={el}
            className="fixed top-0 left-0 w-[100dvw] h-[100dvh] pointer-events-none z-in-front"
            style={style}
            aria-hidden
        />
    );
}
