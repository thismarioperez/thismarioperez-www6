import type { Config } from "tailwindcss";
import colors from "./src/styles/colors";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors,
            fontFamily: {
                ["source-code-pro"]: "var(--source-code-pro-font), monospace",
            },
            fontSize: {
                h1: [
                    "3.125rem",
                    {
                        lineHeight: "1.2em",
                        letterSpacing: "0em",
                        fontWeight: "300",
                    },
                ],
                h2: [
                    "2.5rem",
                    {
                        lineHeight: "1em",
                        letterSpacing: "0em",
                        fontWeight: "700",
                    },
                ],
                h3: [
                    "1.125rem",
                    {
                        lineHeight: "1.5em",
                        letterSpacing: "0em",
                        fontWeight: "700",
                    },
                ],
                p: [
                    "1rem",
                    {
                        lineHeight: "1.6em",
                        letterSpacing: "0em",
                        fontWeight: "400",
                    },
                ],
                meta: [
                    "0.9375rem",
                    {
                        lineHeight: "1.6em",
                        letterSpacing: "0em",
                        fontWeight: "400",
                    },
                ],
                quote: [
                    "1.1875rem",
                    {
                        lineHeight: "1.5em",
                        letterSpacing: "0em",
                        fontWeight: "300",
                    },
                ],
                button: [
                    "0.9375rem",
                    {
                        lineHeight: "1.5em",
                        letterSpacing: "0.2em",
                        fontWeight: "500",
                    },
                ],
            },
        },
    },
    plugins: [],
};
export default config;
