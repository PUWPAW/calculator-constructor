import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type CalculatorState from './slice.type';
import type ERROR_MESSAGE from 'constants/error-message';

import round from 'utils/round';
import replaceSign from 'utils/replaceSign';
import calculation from 'utils/calculation';

const initialState: CalculatorState = {
  value: null,
  displayValue: '0',
  operator: null,
  waitingForOperand: false,
  isEdit: true,
  error: null
};

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    inputDot: (state) => {
      if (!state.displayValue.includes('.')) {
        state.displayValue = state.displayValue + ',';
        state.waitingForOperand = false;
      }
    },
    inputDigit: (state, action: PayloadAction<number>) => {
      if (state.waitingForOperand) {
        state.displayValue = String(action.payload);
        state.waitingForOperand = false;
      } else {
        state.displayValue =
          state.displayValue === '0'
            ? String(action.payload)
            : state.displayValue + `${action.payload}`;
      }
    },
    performOperation: (state, action: PayloadAction<string>) => {
      let inputValue = 0;

      if (state.displayValue.includes(',')) {
        inputValue = parseFloat(replaceSign(state.displayValue));
      } else {
        inputValue = parseFloat(state.displayValue);
      }

      if (state.value === null) {
        state.value = inputValue;
      } else if (state.operator !== null) {
        const currentValue = state.value;
        const newValue = calculation(currentValue, inputValue, state.operator);

        state.value = newValue;
        state.displayValue = String(replaceSign(round(newValue, 5).toString()));
      }

      state.waitingForOperand = true;
      state.operator = action.payload;
    },
    setConstructorType: (state) => {
      state.isEdit = true;

      state.value = null;
      state.displayValue = '0';
      state.operator = null;
      state.waitingForOperand = false;
      state.error = null;
    },
    setRuntimeType: (state) => {
      state.isEdit = false;

      state.value = null;
      state.displayValue = '0';
      state.operator = null;
      state.waitingForOperand = false;
      state.error = null;
    },
    clearStore: (state) => {
      state.value = null;
      state.displayValue = '0';
      state.operator = null;
      state.waitingForOperand = false;
      state.error = null;
    },
    setError: (state, action: PayloadAction<ERROR_MESSAGE | null>) => {
      state.error = action.payload;
    }
  }
});

export const {
  inputDigit,
  inputDot,
  performOperation,
  setConstructorType,
  setRuntimeType,
  clearStore,
  setError
} = calculatorSlice.actions;

export default calculatorSlice.reducer;
