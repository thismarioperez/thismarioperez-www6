import { MDXProvider as Provider } from "@mdx-js/react";
import Link from "@/components/dom/common/Link";
import * as Themed from "@/components/dom/common/Themed";
import { MDXComponents } from "mdx/types";

const components: MDXComponents = {
    Link,
    h1: Themed.H1Text,
    h2: Themed.H2Text,
    h3: Themed.H3Text,
    p: Themed.PText,
    Meta: Themed.MetaText,
    blockquote: Themed.QuoteText,
    button: Themed.ButtonText,
};

export default function MDXProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    return <Provider components={components}>{children}</Provider>;
}
