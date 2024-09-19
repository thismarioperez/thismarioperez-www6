"use client";

import { GoogleAnalytics as BaseGoogleAnalytics } from "@next/third-parties/google";

export default function GoogleAnalytics() {
    if (
        !process.env.NEXT_PUBLIC_GTM_ID ||
        process.env.NEXT_PUBLIC_GTM_ID === ""
    ) {
        return null;
    }

    return (
        <BaseGoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID as string} />
    );
}
