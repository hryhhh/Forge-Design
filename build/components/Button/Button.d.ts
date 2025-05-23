import React from "react";
export declare enum ButtonSize {
    /** Small size button */
    Small = "small",
    /** Medium size button */
    Medium = "medium",
    /** Large size button */
    Large = "large"
}
export declare enum ButtonType {
    /** Primary button style */
    Primary = "primary",
    /** Default button style */
    Default = "default",
    /** Danger button style */
    Danger = "danger",
    /** Link button style */
    Link = "link"
}
interface BaseButtonProps {
    /** Button content */
    children?: React.ReactNode;
    /** Size of the button */
    size?: ButtonSize;
    /** Type of the button */
    btnType?: ButtonType;
    /** Whether the button is disabled */
    disabled?: boolean;
    /** Custom CSS class name */
    className?: string;
    /** Target URL if the button is a link */
    href?: string;
}
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
};
export type ButtonProps = NativeButtonProps | AnchorButtonProps;
export declare const Button: React.FC<ButtonProps>;
export default Button;
