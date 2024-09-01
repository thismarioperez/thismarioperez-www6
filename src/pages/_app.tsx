import type { AppProps } from "next/app";
import { Source_Code_Pro } from "next/font/google";

import Layout from "@/components/dom/Layout";
import "@/styles/globals.css";
import Head from "next/head";
import "@/components/canvas/extend";

const sourceCodePro = Source_Code_Pro({
    subsets: ["latin"],
});

export default function App(props: AppProps) {
    return (
        <>
            <style jsx global>{`
                :root {
                    --source-code-pro-font: ${sourceCodePro.style.fontFamily};
                }
            `}</style>
            <Head>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href="/favicon/favicon.svg"
                />
                <link rel="icon" type="image/png" href="/favicon/favicon.png" />
                <title>Mario Perez - Creative Developer - 🤘</title>
            </Head>
            <Layout {...props} />
        </>
    );
}
