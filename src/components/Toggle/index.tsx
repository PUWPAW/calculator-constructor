import React from 'react';
import clsx from 'clsx';
import { useDispatch } from 'react-redux';

import { setConstructorType, setRuntimeType } from 'store/slices/calculator';
import { useGetCalculatorStateSelector } from 'store/slices/calculator/selectors';

import EyeIcon from 'components/Icons/Eye';
import SelectorIcon from 'components/Icons/Selector';

import './style.css';

function Toggle() {
  const { isEdit } = useGetCalculatorStateSelector();
  const dispatch = useDispatch();
  return (
    <div className="toggle">
      <button
        className={clsx('toggle__button', {
          'toggle__button--active': !isEdit
        })}
        onClick={() => {
          dispatch(setRuntimeType());
        }}
      >
        <EyeIcon stroke={!isEdit ? '#5D5FEF' : '#4D5562'} />
        <span>Runtime</span>
      </button>
      <button
        className={clsx('toggle__button', {
          'toggle__button--active': isEdit
        })}
        onClick={() => {
          dispatch(setConstructorType());
        }}
      >
        <SelectorIcon stroke={isEdit ? '#5D5FEF' : '#4D5562'} />
        <span>Constructor</span>
      </button>
    </div>
  );
}

export default Toggle;
