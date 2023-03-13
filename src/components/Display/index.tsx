import React, { type HTMLAttributes } from "react";
import clsx from "clsx";

import { useGetCalculatorStateSelector } from "../../store/slices/calculator/selectors";

import Container from "../Container";

import "./style.css";

type DisplayProps = React.DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function Display({ className, onDoubleClick, ...props }: DisplayProps) {
  const { displayValue } = useGetCalculatorStateSelector();

  const value = displayValue === "Infinity" ? "Не определено" : displayValue;

  return (
    <Container>
      <div
        className={clsx("display", className, {
          "display--zero": typeof value === "string" && value === "0",
          "display--error": typeof value === "string" && value !== "0",
        })}
        {...props}
      >
        {value}
      </div>
    </Container>
  );
}

export default Display;
