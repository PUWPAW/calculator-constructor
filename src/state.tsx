import React from "react";

import { COLUMN_NAME } from "./types/column-name";
import { ITEM_NAME } from "./types/item-name";
import { Item } from "./types/item";

import Display from "./components/Display";
import EqualsButton from "./components/EqualsButton";
import Numpad from "./components/Numpad";
import Operations from "./components/Operations";

export const state: Array<Item> = [
  {
    id: 0,
    name: ITEM_NAME.DISPLAY,
    column: COLUMN_NAME.CONSTRUCTOR,
    block: <Display />,
  },
  {
    id: 1,
    name: ITEM_NAME.OPERATIONS,
    column: COLUMN_NAME.CONSTRUCTOR,
    block: <Operations />,
  },
  {
    id: 2,
    name: ITEM_NAME.NUMPAD,
    column: COLUMN_NAME.CONSTRUCTOR,
    block: <Numpad />,
  },
  {
    id: 3,
    name: ITEM_NAME.EQUALS_BUTTON,
    column: COLUMN_NAME.CONSTRUCTOR,
    block: <EqualsButton />,
  },
];
