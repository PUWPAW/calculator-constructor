import React, { type HTMLAttributes, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import clsx from 'clsx';

import { useGetCalculatorStateSelector } from 'store/slices/calculator/selectors';
import { setError } from 'store/slices/calculator';

import bigNumber from 'constants/big-number';
import ERROR_MESSAGE from 'constants/error-message';

import Container from 'components/Container';

import './style.css';

interface DisplayProps
  extends React.DetailedHTMLProps<
    HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  className?: string;
}

function Display({ className, ...props }: DisplayProps) {
  const {
    displayValue,
    value: calcValue,
    error
  } = useGetCalculatorStateSelector();
  const dispatch = useDispatch();

  useEffect(() => {
    if (displayValue === 'Infinity') {
      dispatch(setError(ERROR_MESSAGE.INFINITY));
    } else if (calcValue !== null && calcValue > bigNumber) {
      dispatch(setError(ERROR_MESSAGE.BIG_NUMBER));
    }
  }, [displayValue, calcValue]);

  return (
    <Container>
      <div
        className={clsx('display', className, {
          'display--zero': displayValue === '0',
          'display--error': error === ERROR_MESSAGE.INFINITY,
          'display--big-number-error': error === ERROR_MESSAGE.BIG_NUMBER
        })}
        {...props}
      >
        {error ?? displayValue}
      </div>
    </Container>
  );
}

export default Display;
