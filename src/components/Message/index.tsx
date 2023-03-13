import React from 'react';

import AddIcon from 'components/Icons/Add';

import './style.css';

function Message() {
  return (
    <div className="message">
      <AddIcon className="message__icon" />
      <div className="message__title">Перетащите сюда</div>
      <div className="message__subtitle">любой элемент из левой панели</div>
    </div>
  );
}

export default Message;
