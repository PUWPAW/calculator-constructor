import React, { type ReactNode } from 'react';
import clsx from 'clsx';

import './style.css';

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  children: ReactNode;
  className?: string;
}

function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={clsx('container', className)} {...props}>
      {children}
    </div>
  );
}

export default Container;
