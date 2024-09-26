import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import useStore from '../../store/use-store';

function BasketTool({sum = 0, amount = 0, onOpen = () => {}}) {
  const cn = bem('BasketTool');
  const store = useStore();
  const lang = store.state.lang;

  return (
    <div className={cn()}>
      <span className={cn('label')} id="cart">В корзине:</span>
      <span className={cn('total')}>
        {lang === 'en' ?
          (amount ?
             `${amount} ${amount === 1 ? 'item' : 'items'} / ${numberFormat(sum)} ₽`
          : 'empty') :
          (amount ?
            `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров'
            })} / ${numberFormat(sum)} ₽`
          : `пусто`)
        }
      </span>
      <button onClick={onOpen} id="btn-cart">Перейти</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

export default memo(BasketTool);
