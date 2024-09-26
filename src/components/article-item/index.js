import { memo } from 'react';
import PropTypes from 'prop-types';
import { numberFormat } from '../../utils';
import {cn as bem} from '@bem-react/classname';
import './style.css';

function ArticleItem(props) {
  const {title, code} = props.item.madeIn;
  const cn = bem('ArticleItem');

  const callbacks = {
    onAdd: (e) => props.onAdd(props.item._id)
  }

  return (
    <div className={cn()}>
      <p className={cn('description')}>{props.item.description}</p>
      <p className={cn('country')}>Страна производитель: <strong>{title} ({code})</strong> </p>
      <p className={cn('category')}>Категория: <strong>{props.item.category.title}</strong></p>
      <p className={cn('year')}>Год выпуска: <strong>{props.item.edition}</strong></p>
      <p className={cn('price')}><strong>Цена: {numberFormat(props.item.price)} ₽</strong></p>
      <button onClick={callbacks.onAdd} id="btn-add">Добавить</button>
    </div>
  )
}

ArticleItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    madeIn: PropTypes.shape({
      title: PropTypes.string,
      code: PropTypes.string,
    }),
    category: PropTypes.shape({
      title: PropTypes.string,
    }),
    edition: PropTypes.number,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

ArticleItem.defaultProps = {
  onAdd: () => {},
};

export default memo(ArticleItem);