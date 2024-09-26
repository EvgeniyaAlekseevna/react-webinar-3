import {cn as bem} from '@bem-react/classname';
import PropTypes from 'prop-types';
import {memo} from 'react';
import './style.css'
import {Link} from 'react-router-dom';

function Menu({items = []}) {
  const cn = bem('Menu')
  return(
    <ul className={cn()}>
      {items.map(item => (
        <li className={cn('item')} key={item.key}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  )
}

Menu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.number,
    link: PropTypes.string,
    title: PropTypes.string,
  })),
}

export default memo(Menu);
