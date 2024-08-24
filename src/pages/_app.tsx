import Layout from "@/components/dom/Layout";
import usePathname from "@/hooks/usePathname";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";

export default function App(props: AppProps) {
    return <Layout {...props} />;
}
