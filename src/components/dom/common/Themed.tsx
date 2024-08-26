import cx from "classnames";
import { forwardRef } from "react";

type TBaseTextElement =
    | HTMLSpanElement
    | HTMLHeadingElement
    | HTMLParagraphElement
    | HTMLButtonElement
    | HTMLAnchorElement
    | HTMLInputElement
    | HTMLDivElement
    | HTMLLabelElement
    | HTMLQuoteElement;
type TBaseTextAs =
    | "span"
    | "h1"
    | "h2"
    | "h3"
    | "p"
    | "button"
    | "a"
    | "input"
    | "div"
    | "label"
    | "blockquote";
export type TTextProps = React.HTMLAttributes<TBaseTextElement> & {
    as?: TBaseTextAs;
};
const BaseText = forwardRef<TBaseTextElement, TTextProps>(
    ({ children, as = "span", ...rest }, ref) => {
        const Component = as;
        // const _ref =
        return (
            <Component ref={ref as any} {...rest}>
                {children}
            </Component>
        );
    }
);

const H1Text = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx("font-source-code-pro text-h1", className)}
            {...rest}
            ref={ref}
        />
    )
);
H1Text.displayName = "H1Text";
export { H1Text };

const H2Text = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx("font-source-code-pro text-h2", className)}
            {...rest}
            ref={ref}
        />
    )
);
H2Text.displayName = "H2Text";
export { H2Text };

const H3Text = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx("font-source-code-pro text-h3", className)}
            {...rest}
            ref={ref}
        />
    )
);
H3Text.displayName = "H3Text";
export { H3Text };

const PText = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx("font-source-code-pro text-p", className)}
            {...rest}
            ref={ref}
        />
    )
);
PText.displayName = "PText";
export { PText };

const MetaText = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx(
                "font-source-code-pro uppercase text-meta",
                className
            )}
            {...rest}
            ref={ref}
        />
    )
);
MetaText.displayName = "MetaText";
export { MetaText };

const QuoteText = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx("font-source-code-pro text-quote", className)}
            {...rest}
            ref={ref}
        />
    )
);
QuoteText.displayName = "QuoteText";
export { QuoteText };

const ButtonText = forwardRef<TBaseTextElement, TTextProps>(
    ({ className, ...rest }, ref) => (
        <BaseText
            className={cx("font-source-code-pro text-button", className)}
            {...rest}
            ref={ref}
        />
    )
);
ButtonText.displayName = "ButtonText";
export { ButtonText };
