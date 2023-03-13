import React from "react";
import clsx from "clsx";

import "./style.css";

type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={clsx("container", className)} {...props}>
      {children}
    </div>
  );
}

export default Container;
