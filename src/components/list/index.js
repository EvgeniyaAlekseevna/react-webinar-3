import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartItem from "../cart_item";
import './style.css';

function List({ list, functionForItem, modalLayout=false}) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {modalLayout === false ? (
            <Item item={item} onAddCartItem={functionForItem} />
          ) : (
            <CartItem item={item} onDelete={functionForItem} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  functionForItem: PropTypes.func,
  modalLayout: PropTypes.bool,
};

export default React.memo(List);
