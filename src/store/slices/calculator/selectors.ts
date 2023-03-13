import { useSelector } from "react-redux";
import { type RootState } from "../../index";

export const useGetCalculatorStateSelector = () => {
  const { displayValue, operator, value, waitingForOperand, isEdit } = useSelector(
    (state: RootState) => state.calculator
  );

  return { displayValue, operator, value, waitingForOperand, isEdit };
};
