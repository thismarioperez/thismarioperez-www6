import type { AppProps } from "next/app";
import { Source_Code_Pro } from "next/font/google";

import Layout from "@/components/dom/Layout";
import "@/styles/globals.css";

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
            <Layout {...props} />
        </>
    );
}
