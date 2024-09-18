import type { Config } from "tailwindcss";
import colors from "./src/styles/colors";

const config: Config = {
    content: [
        "./src/content/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/styles/**/*.{js,ts,jsx,tsx,mdx}",
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
            typography: (theme: any) => ({
                white: {
                    css: {
                        "--tw-prose-body": theme("colors.white"),
                        "--tw-prose-headings": theme("colors.white"),
                        "--tw-prose-lead": theme("colors.white"),
                        "--tw-prose-links": theme("colors.white"),
                        "--tw-prose-bold": theme("colors.white"),
                        "--tw-prose-counters": theme("colors.white"),
                        "--tw-prose-bullets": theme("colors.white"),
                        "--tw-prose-hr": theme("colors.white"),
                        "--tw-prose-quotes": theme("colors.white"),
                        "--tw-prose-quote-borders": theme("colors.white"),
                        "--tw-prose-captions": theme("colors.white"),
                        "--tw-prose-code": theme("colors.white"),
                        "--tw-prose-pre-code": theme("colors.white"),
                        "--tw-prose-pre-bg": theme("colors.white"),
                        "--tw-prose-th-borders": theme("colors.white"),
                        "--tw-prose-td-borders": theme("colors.white"),
                        "--tw-prose-invert-body": theme("colors.white"),
                        "--tw-prose-invert-headings": theme("colors.white"),
                        "--tw-prose-invert-lead": theme("colors.white"),
                        "--tw-prose-invert-links": theme("colors.white"),
                        "--tw-prose-invert-bold": theme("colors.white"),
                        "--tw-prose-invert-counters": theme("colors.white"),
                        "--tw-prose-invert-bullets": theme("colors.white"),
                        "--tw-prose-invert-hr": theme("colors.white"),
                        "--tw-prose-invert-quotes": theme("colors.white"),
                        "--tw-prose-invert-quote-borders":
                            theme("colors.white"),
                        "--tw-prose-invert-captions": theme("colors.white"),
                        "--tw-prose-invert-code": theme("colors.white"),
                        "--tw-prose-invert-pre-code": theme("colors.white"),
                        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders": theme("colors.white"),
                        "--tw-prose-invert-td-borders": theme("colors.white"),
                    },
                },
                black: {
                    css: {
                        "--tw-prose-body": theme("colors.black"),
                        "--tw-prose-headings": theme("colors.black"),
                        "--tw-prose-lead": theme("colors.black"),
                        "--tw-prose-links": theme("colors.black"),
                        "--tw-prose-bold": theme("colors.black"),
                        "--tw-prose-counters": theme("colors.black"),
                        "--tw-prose-bullets": theme("colors.black"),
                        "--tw-prose-hr": theme("colors.black"),
                        "--tw-prose-quotes": theme("colors.black"),
                        "--tw-prose-quote-borders": theme("colors.black"),
                        "--tw-prose-captions": theme("colors.black"),
                        "--tw-prose-code": theme("colors.black"),
                        "--tw-prose-pre-code": theme("colors.black"),
                        "--tw-prose-pre-bg": theme("colors.black"),
                        "--tw-prose-th-borders": theme("colors.black"),
                        "--tw-prose-td-borders": theme("colors.black"),
                        "--tw-prose-invert-body": theme("colors.black"),
                        "--tw-prose-invert-headings": theme("colors.black"),
                        "--tw-prose-invert-lead": theme("colors.black"),
                        "--tw-prose-invert-links": theme("colors.black"),
                        "--tw-prose-invert-bold": theme("colors.black"),
                        "--tw-prose-invert-counters": theme("colors.black"),
                        "--tw-prose-invert-bullets": theme("colors.black"),
                        "--tw-prose-invert-hr": theme("colors.black"),
                        "--tw-prose-invert-quotes": theme("colors.black"),
                        "--tw-prose-invert-quote-borders":
                            theme("colors.black"),
                        "--tw-prose-invert-captions": theme("colors.black"),
                        "--tw-prose-invert-code": theme("colors.black"),
                        "--tw-prose-invert-pre-code": theme("colors.black"),
                        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders": theme("colors.black"),
                        "--tw-prose-invert-td-borders": theme("colors.black"),
                    },
                },
            }),
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
