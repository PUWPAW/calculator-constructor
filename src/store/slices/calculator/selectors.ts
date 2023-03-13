import { useSelector } from 'react-redux';

import { type RootState } from 'store';

export const useGetCalculatorStateSelector = () => {
  const { displayValue, operator, value, waitingForOperand, isEdit, error } =
    useSelector((state: RootState) => state.calculator);

  return { displayValue, operator, value, waitingForOperand, isEdit, error };
};
