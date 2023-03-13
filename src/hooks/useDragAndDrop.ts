import { useRef } from 'react';
import { useDrop, useDrag } from 'react-dnd';

import { ITEM_NAME } from 'types/item-name';
import { COLUMN_NAME } from 'types/column-name';
import { type DragItem, type Item } from 'types/item';

import { useGetCalculatorStateSelector } from 'store/slices/calculator/selectors';

import { state } from 'constants/state';

interface DragAndDrop {
  setItems: React.Dispatch<React.SetStateAction<Item[]>>;
  index: number;
  name: string;
  canDrag: boolean;
  onMoveItemHandler: (dragIndex: number, hoverIndex: number) => void;
}

const useDragAndDrop = ({
  index,
  onMoveItemHandler,
  setItems,
  canDrag,
  name
}: DragAndDrop) => {
  const { isEdit } = useGetCalculatorStateSelector();

  const ref = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, drop] = useDrop({
    accept: 'drag',
    hover(item: { index: number; name: string }, monitor) {
      if (ref.current == null) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset() ?? { x: 0, y: 0 };
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      if (!item.name.includes(ITEM_NAME.DISPLAY)) {
        onMoveItemHandler(dragIndex, hoverIndex);
        item.index = hoverIndex;
      }
    }
  });

  const changeItemColumn = (currentItem: DragItem, columnName: string) => {
    if (columnName === COLUMN_NAME.EDITOR) {
      const item = state.find((el) => el.name === currentItem.name);

      if (item !== null && item !== undefined) {
        item.column = COLUMN_NAME.EDITOR;

        setItems((prev) => {
          if (prev.includes(item)) {
            return prev;
          } else if (item.name === ITEM_NAME.DISPLAY) {
            return [item, ...prev];
          } else {
            return [...prev, item];
          }
        });
      }
    }
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'drag',
    item: { index, name },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    }),
    end: (item, monitor) => {
      const dropResult: DragItem | null = monitor.getDropResult();

      if (dropResult != null && dropResult.name === COLUMN_NAME.CONSTRUCTOR) {
        changeItemColumn(item, COLUMN_NAME.CONSTRUCTOR);
      } else {
        changeItemColumn(item, COLUMN_NAME.EDITOR);
      }
    },
    canDrag: canDrag && isEdit
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
    isEdit
  };
};

export default useDragAndDrop;
