import React, { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import clsx from "clsx";

import { useGetCalculatorStateSelector } from "../../store/slices/calculator/selectors";

import "./style.css";

interface ButtonProps extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: "default" | "medium" | "large" | "extraLarge";
}

function Button({ children, size = "default", className, ...props }: ButtonProps) {
  const { isEdit } = useGetCalculatorStateSelector();

  return (
    <button
      className={clsx("button", className, {
        medium: size === "medium",
        large: size === "large",
        "extra-large": size === "extraLarge",
        edit: isEdit,
      })}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
