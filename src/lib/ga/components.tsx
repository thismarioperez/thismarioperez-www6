"use client";

import { GoogleAnalytics as BaseGoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalytics() {
    if (
        !process.env.NEXT_PUBLIC_GA_ID ||
        process.env.NEXT_PUBLIC_GA_ID === ""
    ) {
        return null;
    }

    return (
        <BaseGoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID as string} />
    );
}
