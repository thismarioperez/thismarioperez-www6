import Layout from "@/components/Layout";
import TransitionComponent from "@/components/TransitionComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <Layout>
            <TransitionComponent>
                <Component {...pageProps} />
            </TransitionComponent>
        </Layout>
    );
}
