import React from "react";
import clsx from "clsx";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { COLUMN_NAME } from "./types/column-name";
import { ITEM_NAME } from "./types/item-name";

import { state } from "./state";
import { useGetCalculatorStateSelector } from "./store/slices/calculator/selectors";

import useItemManipulation from "./hooks/useItemManipulation";

import Column from "./components/Column";
import DndWrapper from "./components/DndWrapper";
import Toggle from "./components/Toggle";

import "./App.css";

function App() {
  const { isEdit } = useGetCalculatorStateSelector();
  const { items, setItems, onMoveItemHandler, onRemoveItemHandler } = useItemManipulation();

  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div
          className={clsx("App__constructor", {
            "App__constructor--hidden": !isEdit,
          })}
        >
          <Column type={COLUMN_NAME.CONSTRUCTOR}>
            {state.map((item, idx) => (
              <DndWrapper
                key={item.id}
                index={idx}
                onMoveItemHandler={onMoveItemHandler}
                name={item.name}
                setItems={setItems}
                isForbid={!!items.find((el) => el?.id === item?.id)}
              >
                {item.block}
              </DndWrapper>
            ))}
          </Column>
        </div>
        <div className="App__editor">
          <Toggle />
          <Column isEmpty={!items.length} type={COLUMN_NAME.EDITOR}>
            {items.map((item, idx) => (
              <DndWrapper
                key={item?.id}
                index={idx}
                canDrag={item?.name !== ITEM_NAME.DISPLAY}
                onMoveItemHandler={onMoveItemHandler}
                name={item?.name}
                isEditor
                setItems={setItems}
                removeItemHandler={() => {
                  if (isEdit) {
                    onRemoveItemHandler(item?.id);
                  }
                }}
              >
                {item?.block}
              </DndWrapper>
            ))}
          </Column>
        </div>
      </DndProvider>
    </div>
  );
}

export default App;
