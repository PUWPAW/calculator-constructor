import React from "react";
import { useDispatch } from "react-redux";

import { useGetCalculatorStateSelector } from "../../store/slices/calculator/selectors";
import { inputDigit, inputDot } from "../../store/slices/calculator";

import numbers from "../../constants/numbers";

import Button from "../Button";
import Container from "../Container";

import "./style.css";

function Numpad() {
  const { isEdit, displayValue, waitingForOperand } = useGetCalculatorStateSelector();
  const dispatch = useDispatch();

  return (
    <Container>
      <div className="numpad">
        {numbers.map((digit, idx) => (
          <Button
            key={idx}
            size={digit === 0 ? "large" : "medium"}
            value={digit}
            onClick={() => {
              if (!isEdit && (displayValue.length < 5 || waitingForOperand)) {
                dispatch(inputDigit(digit));
              }
            }}
          >
            {digit}
          </Button>
        ))}
        <Button
          size="medium"
          onClick={() => {
            if (!isEdit && (displayValue.length < 5 || waitingForOperand)) {
              dispatch(inputDot());
            }
          }}
        >
          ,
        </Button>
      </div>
    </Container>
  );
}

export default Numpad;
