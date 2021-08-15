import React, { ReactElement } from "react";
import { joinClasses } from "../helpers";
import Button from "./Button";
import styles from "./OptionButton.module.css";

interface Props {
  src: string;
  bgColor: string;
  alt?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  value?: string;
  className?: string;
}

export default function OptionButton({
  src,
  bgColor = "gray",
  alt,
  onClick,
  value,
  className,
}: Props): ReactElement {
  return (
    <div
      data-choice={value}
      onClick={onClick ? onClick : () => {}}
      className={
        `${styles.shadowout} ` +
        joinClasses(
          `${
            bgColor === "yellow"
              ? "bg-yellow-500"
              : bgColor === "red"
              ? "bg-red-500"
              : bgColor === "blue"
              ? "bg-blue-500"
              : "bg-gray-500"
          }`,
          "rounded-full",
          "hover:opacity-80",
          "w-36",
          "h-36",
          "inline-flex",
          "justify-center",
          "items-center",
          "cursor-pointer",
          "m-4"
        ) +
        ` ${className}`
      }
    >
      <Button
        className={
          `${styles.shadowin} ` +
          joinClasses(
            "w-24",
            "h-24",
            "rounded-full",
            "border-10",
            "border-none",
            "bg-white",
            "shadow-lg"
          )
        }
      >
        <img alt={alt} src={src}></img>
      </Button>
    </div>
  );
}
