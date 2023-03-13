import React from "react";
import clsx from "clsx";

import { Item } from "../../types/item";
import { ITEM_NAME } from "../../types/item-name";

import useDragAndDrop from "../../hooks/useDragAndDrop";

import "./style.css";

interface DndWrapperProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  name: string;
  index: number;
  canDrag?: boolean;
  onMoveItemHandler: (dragIndex: number, hoverIndex: number) => void;
  removeItemHandler?: () => void;
  isForbid?: boolean;
  isEditor?: boolean;
}

function DndWrapper({
  children,
  className,
  index,
  onMoveItemHandler,
  setItems,
  name,
  canDrag = true,
  isForbid = false,
  isEditor = false,
  removeItemHandler,
  ...props
}: DndWrapperProps) {
  const { isDragging, isEdit, ref } = useDragAndDrop({ index, onMoveItemHandler, setItems, name, canDrag });

  return (
    <div
      ref={ref}
      onDoubleClick={removeItemHandler}
      className={clsx({
        hover: isDragging && isEditor,
        forbid: isForbid,
        editable: isEdit,
        blocked: isEdit && name === ITEM_NAME.DISPLAY && isEditor,
        "non-shadow": isEditor,
      })}
      {...props}
    >
      {children}
    </div>
  );
}

export default DndWrapper;
