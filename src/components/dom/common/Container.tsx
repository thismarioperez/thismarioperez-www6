import cx from "classnames";

type TBackground = "white" | "black" | "yellow" | "transparent";

const BACKGROUND_COLOR_CLASSNAME: Record<TBackground, string> = {
    black: "bg-black/90",
    white: "bg-white/90",
    yellow: "bg-yellow/90",
    transparent: "bg-transparent",
};

export type TContainerProps = {
    bgColor?: TBackground;
    className?: string;
    children?: React.ReactNode;
    fullWidth?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Container({
    bgColor = "black",
    className,
    children,
    fullWidth = false,
    ...props
}: TContainerProps) {
    return (
        <div className={cx("w-full h-fit")} {...props}>
            <div className={cx("container mx-auto", fullWidth && "max-w-full")}>
                <div
                    className={cx(
                        "w-full min-w-full min-h-full py-12 px-16",
                        BACKGROUND_COLOR_CLASSNAME[bgColor],
                        className
                    )}
                >
                    {children}
                </div>
            </div>
        </div>
    );
}
