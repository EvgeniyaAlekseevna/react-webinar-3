import React from 'react';
import PropTypes from "prop-types";
import List from "../list";
import './style.css'


function Cart({ basket, onClose, onDelete }) {
  return (
    <div className="Cart">
      <div className="Cart-header">
        <h2>Корзина</h2>
        <div className="Cart-close-button">
          <button onClick={onClose}>Закрыть</button>
        </div>
      </div>
      <div className="Cart-line" />
      <List list={basket.list} functionForItem={onDelete} modalLayout={true} />
      <div className="Cart-footer">
        <div className="Cart-footer-total">Итого</div>
        <div className="Cart-footer-amount">{basket.amount.toLocaleString()} ₽</div>
      </div>
    </div>
  );
}

Cart.propTypes = {
  basket: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.number,
        title: PropTypes.string,
        price: PropTypes.number,
        count: PropTypes.number,
      }),
    ),
    count: PropTypes.number,
    amount: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Cart);
