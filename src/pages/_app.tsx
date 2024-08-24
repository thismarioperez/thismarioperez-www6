import Layout from "@/components/dom/Layout";
import Header from "@/components/dom/Layout/Header";
import TransitionComponent from "@/components/dom/TransitionComponent";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App(props: AppProps) {
    return <Layout {...props} />;
}
