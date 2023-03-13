import React from 'react';
import { useDispatch } from 'react-redux';

import { useGetCalculatorStateSelector } from 'store/slices/calculator/selectors';
import {
  clearStore,
  inputDigit,
  inputDot,
  setError
} from 'store/slices/calculator';

import numbers from 'constants/numbers';

import Button from 'components/Button';
import Container from 'components/Container';

import './style.css';

function Numpad() {
  const { isEdit, displayValue, waitingForOperand, error } =
    useGetCalculatorStateSelector();
  const dispatch = useDispatch();

  const onClickNumberHandler = (digit: number) => {
    if (!isEdit && (displayValue.length < 5 || waitingForOperand) && !error) {
      dispatch(inputDigit(digit));
    } else if (error) {
      dispatch(setError(null));
      dispatch(clearStore());
    }
  };

  const onClickCommaHandler = () => {
    if (!isEdit && (displayValue.length < 5 || waitingForOperand)) {
      dispatch(inputDot());
    }
  };

  return (
    <Container>
      <div className="numpad">
        {numbers.map((digit, idx) => (
          <Button
            key={idx}
            size={digit === 0 ? 'large' : 'medium'}
            value={digit}
            onClick={() => {
              onClickNumberHandler(digit);
            }}
          >
            {digit}
          </Button>
        ))}
        <Button size="medium" onClick={onClickCommaHandler}>
          ,
        </Button>
      </div>
    </Container>
  );
}

export default Numpad;
