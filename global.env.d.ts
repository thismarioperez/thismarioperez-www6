interface Window {
    [key: string]: any;
}

declare module "*.glsl" {
    const content: string;
    export default content;
}

declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >;
}
