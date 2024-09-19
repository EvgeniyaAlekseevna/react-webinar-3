import React from 'react';
import PropTypes from "prop-types";
import './style.css'

function CartItem(props) {
  const callbacks = {
    onDelete: e => {
      e.stopPropagation();
      props.onDelete(props.item.code);
    },
  };

  return (
    <div className={'CartItem'}>
      <div className="CartItem-code">{props.item.code}</div>
      <div className="CartItem-title">{props.item.title}</div>
      <div className="CartItem-cost">{props.item.price.toLocaleString()} ₽</div>
      <div className="CartItem-count">{props.item.count} шт</div>
      <div className="CartItem-actions">
        <button onClick={callbacks.onDelete}>Удалить</button>
      </div>
    </div>
  );

}

CartItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
};

export default React.memo(CartItem);
