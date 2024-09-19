import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item(props) {
  const callbacks = {
    onAddCartItem: e => {
      props.onAddCartItem(props.item.code);
    },
  };

  return (
    <div className={'Item'}>
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>
      <div className="Item-cost">{props.item.price.toLocaleString()} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddCartItem}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    price: PropTypes.number,
  }).isRequired,
  onAddCartItem: PropTypes.func,
};

export default React.memo(Item);
