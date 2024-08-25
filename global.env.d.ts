interface Window {
    [key: string]: any;
}

declare module "*.glsl" {
    const content: string;
    export default content;
}
