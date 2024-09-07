import cx from "classnames";

type TBackground = "white" | "black" | "yellow";

const BACKGROUND_COLOR_CLASSNAME: Record<TBackground, string> = {
    black: "bg-black",
    white: "bg-white",
    yellow: "bg-yellow",
};

export type TContainerProps = {
    bgColor?: TBackground;
    className?: string;
    children?: React.ReactNode;
    inset?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Container({
    bgColor = "black",
    className,
    children,
    inset = true,
    ...props
}: TContainerProps) {
    return (
        <div
            className={cx(
                "relative mx-8 px-8",
                inset && "mx-8 px-8",
                className
            )}
            {...props}
        >
            <div
                className={cx(
                    "w-full min-h-full py-12",
                    inset && "px-8 ",
                    !inset && "px-16 py-12",
                    BACKGROUND_COLOR_CLASSNAME[bgColor]
                )}
            >
                {children}
            </div>
        </div>
    );
}
