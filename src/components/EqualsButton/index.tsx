import React from 'react';
import { useDispatch } from 'react-redux';

import { performOperation } from 'store/slices/calculator';
import { useGetCalculatorStateSelector } from 'store/slices/calculator/selectors';

import Button from 'components/Button';
import Container from 'components/Container';

function EqualsButton() {
  const { isEdit } = useGetCalculatorStateSelector();
  const dispatch = useDispatch();

  return (
    <Container>
      <Button
        size="extraLarge"
        onClick={() => {
          if (!isEdit) {
            dispatch(performOperation('='));
          }
        }}
      >
        =
      </Button>
    </Container>
  );
}

export default EqualsButton;
