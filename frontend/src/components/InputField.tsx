import { ForwardedRef, forwardRef, InputHTMLAttributes } from "react";
import { joinClasses } from "../helpers";
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

type InputRef = ForwardedRef<HTMLInputElement>;

const InputField = forwardRef(
  (
    {
      onChange,
      value,
      type,
      name,
      placeholder,
      id,
      className,
      ...props
    }: InputProps,
    ref: InputRef
  ) => (
    <input
      ref={ref}
      className={
        joinClasses("block", "p-2", "border", "rounded") + " " + className
      }
      type={type}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
);

export default InputField;
