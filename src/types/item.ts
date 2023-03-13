import { type COLUMN_NAME } from './column-name';
import { type ITEM_NAME } from './item-name';

export interface Item {
  id: number;
  name: ITEM_NAME;
  column: COLUMN_NAME;
  block: JSX.Element;
}

export interface DragItem {
  index: number;
  name: string;
}
