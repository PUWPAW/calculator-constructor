interface CalculatorState {
  value: number | null;
  displayValue: string;
  operator: string | null;
  waitingForOperand: boolean;
  isEdit: boolean;
  error: string | null;
}

export default CalculatorState;
