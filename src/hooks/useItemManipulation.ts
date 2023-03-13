import { useState } from 'react';

import { type Item } from 'types/item';
import { ITEM_NAME } from 'types/item-name';

const useItemManipulation = () => {
  const [items, setItems] = useState<Item[]>([]);

  const onRemoveItemHandler = (id: number) => {
    setItems((prev) => prev.filter((el) => el.id !== id));
  };

  const onMoveItemHandler = (dragIndex: number, hoverIndex: number) => {
    const dragItem: Item = items[dragIndex];

    if (dragItem === undefined) {
      return;
    }

    if (dragItem.name !== ITEM_NAME.DISPLAY) {
      setItems((prev) => {
        const copy = [...prev];
        const prevItem = copy.splice(hoverIndex, 1, dragItem);

        if (prevItem[0] === undefined) {
          return prev;
        }

        if (prevItem[0]?.name === ITEM_NAME.DISPLAY) {
          return prev;
        }

        copy.splice(dragIndex, 1, prevItem[0]);

        return copy;
      });
    }
  };

  return {
    items,
    setItems,
    onRemoveItemHandler,
    onMoveItemHandler
  };
};

export default useItemManipulation;
