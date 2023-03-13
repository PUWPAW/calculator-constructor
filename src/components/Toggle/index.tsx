import React from "react";
import clsx from "clsx";
import { useDispatch } from "react-redux";

import { setEdit } from "../../store/slices/calculator";
import { useGetCalculatorStateSelector } from "../../store/slices/calculator/selectors";

import EyeIcon from "../Icons/Eye";
import SelectorIcon from "../Icons/Selector";

import "./style.css";

function Toggle() {
  const { isEdit } = useGetCalculatorStateSelector();
  const dispatch = useDispatch();
  return (
    <div className="toggle">
      <button
        className={clsx("toggle__button", {
          "toggle__button--active": !isEdit,
        })}
        onClick={() => {
          dispatch(setEdit());
        }}
      >
        <EyeIcon stroke={!isEdit ? "#5D5FEF" : "#4D5562"} />
        <span>Runtime</span>
      </button>
      <button
        className={clsx("toggle__button", {
          "toggle__button--active": isEdit,
        })}
        onClick={() => {
          dispatch(setEdit());
        }}
      >
        <SelectorIcon stroke={isEdit ? "#5D5FEF" : "#4D5562"} />
        <span>Constructor</span>
      </button>
    </div>
  );
}

export default Toggle;