import { memo } from 'react'
import { cn as bem } from '@bem-react/classname'
import { Link } from 'react-router-dom';
import './style.css';

function NavBar() {
  const cn = bem('Navbar');

  return (
    <ul className={cn()}>
      <li className={cn('Item')}>
        <Link to="/" id="main">Главная</Link>
      </li>
    </ul>
  )
}

export default memo(NavBar);