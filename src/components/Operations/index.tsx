import React from "react";
import { useDispatch } from "react-redux";

import { useGetCalculatorStateSelector } from "../../store/slices/calculator/selectors";
import { performOperation } from "../../store/slices/calculator";

import operations from "../../constants/operations";

import Button from "../Button";
import Container from "../Container";

import "./style.css";

function Operations() {
  const { isEdit } = useGetCalculatorStateSelector();
  const dispatch = useDispatch();
  return (
    <Container>
      <div className="operators">
        {operations.map((opt, idx) => (
          <Button
            key={idx}
            value={opt}
            onClick={() => {
              if (!isEdit) {
                dispatch(performOperation(opt));
              }
            }}
          >
            {opt}
          </Button>
        ))}
      </div>
    </Container>
  );
}

export default Operations;
