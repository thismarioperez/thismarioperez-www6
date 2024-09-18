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
            typography: {
                white: {
                    css: {
                        "--tw-prose-body": colors.white,
                        "--tw-prose-headings": colors.white,
                        "--tw-prose-lead": colors.white,
                        "--tw-prose-links": colors.white,
                        "--tw-prose-bold": colors.white,
                        "--tw-prose-counters": colors.white,
                        "--tw-prose-bullets": colors.white,
                        "--tw-prose-hr": colors.white,
                        "--tw-prose-quotes": colors.white,
                        "--tw-prose-quote-borders": colors.white,
                        "--tw-prose-captions": colors.white,
                        "--tw-prose-code": colors.white,
                        "--tw-prose-pre-code": colors.white,
                        "--tw-prose-pre-bg": colors.white,
                        "--tw-prose-th-borders": colors.white,
                        "--tw-prose-td-borders": colors.white,
                        "--tw-prose-invert-body": colors.white,
                        "--tw-prose-invert-headings": colors.white,
                        "--tw-prose-invert-lead": colors.white,
                        "--tw-prose-invert-links": colors.white,
                        "--tw-prose-invert-bold": colors.white,
                        "--tw-prose-invert-counters": colors.white,
                        "--tw-prose-invert-bullets": colors.white,
                        "--tw-prose-invert-hr": colors.white,
                        "--tw-prose-invert-quotes": colors.white,
                        "--tw-prose-invert-quote-borders": colors.white,
                        "--tw-prose-invert-captions": colors.white,
                        "--tw-prose-invert-code": colors.white,
                        "--tw-prose-invert-pre-code": colors.white,
                        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders": colors.white,
                        "--tw-prose-invert-td-borders": colors.white,
                    },
                },
                black: {
                    css: {
                        "--tw-prose-body": colors.black.DEFAULT,
                        "--tw-prose-headings": colors.black.DEFAULT,
                        "--tw-prose-lead": colors.black.DEFAULT,
                        "--tw-prose-links": colors.black.DEFAULT,
                        "--tw-prose-bold": colors.black.DEFAULT,
                        "--tw-prose-counters": colors.black.DEFAULT,
                        "--tw-prose-bullets": colors.black.DEFAULT,
                        "--tw-prose-hr": colors.black.DEFAULT,
                        "--tw-prose-quotes": colors.black.DEFAULT,
                        "--tw-prose-quote-borders": colors.black.DEFAULT,
                        "--tw-prose-captions": colors.black.DEFAULT,
                        "--tw-prose-code": colors.black.DEFAULT,
                        "--tw-prose-pre-code": colors.black.DEFAULT,
                        "--tw-prose-pre-bg": colors.black.DEFAULT,
                        "--tw-prose-th-borders": colors.black.DEFAULT,
                        "--tw-prose-td-borders": colors.black.DEFAULT,
                        "--tw-prose-invert-body": colors.black.DEFAULT,
                        "--tw-prose-invert-headings": colors.black.DEFAULT,
                        "--tw-prose-invert-lead": colors.black.DEFAULT,
                        "--tw-prose-invert-links": colors.black.DEFAULT,
                        "--tw-prose-invert-bold": colors.black.DEFAULT,
                        "--tw-prose-invert-counters": colors.black.DEFAULT,
                        "--tw-prose-invert-bullets": colors.black.DEFAULT,
                        "--tw-prose-invert-hr": colors.black.DEFAULT,
                        "--tw-prose-invert-quotes": colors.black.DEFAULT,
                        "--tw-prose-invert-quote-borders": colors.black.DEFAULT,
                        "--tw-prose-invert-captions": colors.black.DEFAULT,
                        "--tw-prose-invert-code": colors.black.DEFAULT,
                        "--tw-prose-invert-pre-code": colors.black.DEFAULT,
                        "--tw-prose-invert-pre-bg": "rgb(0 0 0 / 50%)",
                        "--tw-prose-invert-th-borders": colors.black.DEFAULT,
                        "--tw-prose-invert-td-borders": colors.black.DEFAULT,
                    },
                },
            },
        },
    },
    plugins: [require("@tailwindcss/typography")],
};
export default config;
