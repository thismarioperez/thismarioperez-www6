import cx from "classnames";

const base =
    "prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl 2xl:prose-2xl";
const headings =
    "prose-headings:font-source-code-pro prose-h1:font-normal prose-h2:font-normal prose-h3:font-normal";
const body = "prose-p:font-source-code-pro";
const blockquote = "prose-blockquote:font-source-code-pro";
const code = "prose-code:font-source-code-pro";
const li = "prose-li:font-source-code-pro";

export type TProseTheme = "black" | "white";
const PROSE_THEMES: Record<TProseTheme, string> = {
    black: "prose-black",
    white: "prose-white prose-a:decoration-yellow",
};

export const getProseClassnames = (theme: TProseTheme) => {
    return cx(base, PROSE_THEMES[theme], headings, body, blockquote, code, li);
};
