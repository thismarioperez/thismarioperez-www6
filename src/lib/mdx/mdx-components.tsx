import * as runtime from "react/jsx-runtime";

import Image from "next/image";
import Container from "@/components/dom/common/Container";
import Link from "@/components/dom/common/Link";
import * as Themed from "@/components/dom/common/Themed";

const sharedComponents = {
    // Add your global components here
    Container,
    Image,
    Link,
    h1: Themed.H1Text,
    h2: Themed.H2Text,
    h3: Themed.H3Text,
    p: Themed.PText,
    Meta: Themed.MetaText,
    blockquote: Themed.QuoteText,
    button: Themed.ButtonText,
};

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
};

interface MDXProps {
    code: string;
    components?: Record<string, React.ComponentType>;
}

// MDXContent component
export const MDXContent = ({ code, components }: MDXProps) => {
    const Component = useMDXComponent(code);
    return <Component components={{ ...sharedComponents, ...components }} />;
};
