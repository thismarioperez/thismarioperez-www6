interface Window {
    [key: string]: any;
}

declare module "*.svg" {
    import React from "react";
    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement>
    >;
}

declare module "*.glsl" {
    const content: string;
    export default content;
}

type NumericRange<
    start extends number,
    end extends number,
    arr extends unknown[] = [],
    acc extends number = never
> = arr["length"] extends end
    ? acc | start | end
    : NumericRange<
          start,
          end,
          [...arr, 1],
          arr[start] extends undefined ? acc : acc | arr["length"]
      >;
