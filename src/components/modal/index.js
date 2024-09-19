import React from 'react';
import PropTypes from "prop-types";
import './style.css'
import CartItem from "../cart_item";

function Modal({ basket, isOpen, onClose, onDelete }) {
  if (!isOpen) return null;

  return (
    <div className="Modal-overlay" onClick={onClose}>
      <div className="Modal-content" onClick={e => e.stopPropagation()}>
        <div className="Modal-header">
          <h2>Корзина</h2>
          <div className="Modal-close-button">
            <button onClick={onClose}>Закрыть</button>
          </div>
        </div>
        <div className="Modal-list-item">
          {basket.list.map(item => (
            <div key={item.code} className="Modal-item">
              <CartItem item={item} onDelete={onDelete} />
            </div>
          ))}
        </div>
        <div className="Modal-line"></div>
        <div className="Modal-footer">
          <div className="Modal-footer-total">Итого</div>
          <div className="Modal-footer-amount">{basket.amount.toLocaleString()} ₽</div>
        </div>
      </div>
    </div>
  );
}

Modal.propTypes = {
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
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
};

export default React.memo(Modal);
