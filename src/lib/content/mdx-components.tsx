import * as runtime from "react/jsx-runtime";

import Image from "next/image";
import Container from "@/components/dom/common/Container";
import Link from "@/components/dom/common/Link";
import * as Themed from "@/components/dom/common/Themed";
import OpenMenuButton from "@/components/dom/common/OpenMenuButton";

const components = {
    // Add your global components here
    Container,
    Image,
    Link,
    OpenMenuButton,
};

declare global {
    type MDXProvidedComponents = typeof components;
}

// parse the Velite generated MDX code into a React component function
const useMDXComponent = (code: string) => {
    const fn = new Function(code);
    return fn({ ...runtime }).default;
};

interface MDXProps {
    code: string;
    components?: Record<string, React.ComponentType>; // Pass additional components here
}

// MDXContent component
export const MDXContent = ({ code, components: extraComponents }: MDXProps) => {
    const Component = useMDXComponent(code);
    return <Component components={{ ...components, ...extraComponents }} />;
};
