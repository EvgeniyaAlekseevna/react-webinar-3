import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {plural} from "../../utils";

function Controls({ count, amount, openShoppingCart }) {
  const callbacks = {
    openShoppingCart: () => {
      openShoppingCart();
    },
  };

  const amountOfCart = (count === 0) ? 'пусто' :
    `${count} ${plural(count, {one: 'товар', few: 'товара', many: 'товаров',})} / ${amount.toLocaleString()} ₽`

  return (
    <div className="Controls">
      <div>В корзине:</div>
      <div className="Controls-in-cart">{amountOfCart}</div>
      <div className="Controls-actions">
        <button onClick={callbacks.openShoppingCart}>Перейти</button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  openShoppingCart: PropTypes.func,
};

export default React.memo(Controls);
