import type { Config } from "tailwindcss";
import colors from "./src/styles/colors";

const config: Config = {
    content: [
        "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
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
                    "1rem",
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
                    "1rem",
                    {
                        lineHeight: "1.5em",
                        letterSpacing: "0.2em",
                        fontWeight: "500",
                    },
                ],
            },
            zIndex: {
                "-1": "-1",
                "1": "1",
                "2": "2",
                "3": "3",
                "4": "4",
                "5": "5",
                "6": "6",
                "7": "7",
                "8": "8",
                "9": "9",
                "in-front": "9999",
            },
            padding: {
                header: "var(--header-height)",
            },
            margin: {
                header: "var(--header-height)",
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
