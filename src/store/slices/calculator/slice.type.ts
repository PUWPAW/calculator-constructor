interface CalculatorState {
  value: number | null;
  displayValue: string;
  operator: string | null;
  waitingForOperand: boolean;
  isEdit: boolean;
}

export default CalculatorState;
