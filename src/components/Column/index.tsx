import React from 'react';
import clsx from 'clsx';
import { useDrop } from 'react-dnd';

import { COLUMN_NAME } from 'types/column-name';

import Message from 'components/Message';

import './style.css';

interface ColumnProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type: COLUMN_NAME;
  isEmpty?: boolean;
}

function Column({ children, className, type, isEmpty, ...props }: ColumnProps) {
  const [{ isOver }, drop] = useDrop({
    accept: 'drag',
    drop: () => ({ name: type }),
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  });

  return (
    <div
      ref={drop}
      className={clsx('column', className, {
        'column--editor': type === COLUMN_NAME.EDITOR && isEmpty,
        'column--hover': isOver && isEmpty
      })}
      {...props}
    >
      {isEmpty ?? false ? <Message /> : children}
    </div>
  );
}

export default Column;
