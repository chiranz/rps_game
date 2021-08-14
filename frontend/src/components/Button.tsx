import {
  ForwardedRef,
  forwardRef,
  ReactNode,
  ButtonHTMLAttributes,
} from "react";
import { joinClasses } from "../helpers";

interface BtnPropsWithChildren {}
type ColorProps = "primary" | "success" | "danger" | "warning" | "dark";

interface BtnProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    BtnPropsWithChildren {
  block?: boolean;
  children: ReactNode;
  className?: string;
  color?: ColorProps;
  disabled?: boolean;
  outline?: boolean;
  rounded?: boolean;
  size?: "sm" | "md" | "lg";
  submit?: boolean;
}

type ButtonRef = ForwardedRef<HTMLButtonElement>;

const style = {
  base: joinClasses(
    "border",
    "rounded",
    "font-bold",
    "focus:outline-none",
    "transition",
    "duration-100",
    "ease-in"
  ),
  default: joinClasses("hover:bg-gray-200", "border", "text-gray-700"),
  block: `flex justify-center w-full`,
  rounded: `rounded-full`,
  disabled: `opacity-60 cursor-not-allowed`,
  sizes: {
    sm: "px-6 py-1 text-sm",
    md: "px-6 py-2",
    lg: "px-6 py-3 text-lg",
  },
  primary: joinClasses("hover:bg-blue-800", "bg-blue-600", "text-white"),
  success: joinClasses("hover:bg-green-800", "bg-green-600", "text-white"),
  danger: joinClasses("hover:bg-red-800", "bg-red-600", "text-white"),
  warning: joinClasses("hover:bg-yellow-800", "bg-yellow-600", "text-white"),
  dark: joinClasses("hover:bg-gray-800", "bg-gray-600", "text-white"),
};
const Button = forwardRef(
  (
    {
      block = false,
      children,
      className,
      color,
      disabled = false,
      rounded,
      size = "md",
      submit,
      ...props
    }: BtnProps,
    ref: ButtonRef
  ) => (
    <button
      ref={ref}
      {...props}
      type={submit ? "submit" : "button"}
      disabled={disabled}
      className={`${style.base} ${block ? style.block : ""}
        ${disabled ? style.disabled : ""} ${style.sizes[size]} 
        ${rounded ? style.rounded : "rounded"}
        ${color ? style[color] : style.default} ${className}`}
    >
      {children}
    </button>
  )
);

export default Button;
