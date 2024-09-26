import {cn as bem} from '@bem-react/classname'
import { memo } from 'react';
import useStore from '../../store/use-store';
import './style.css';

function LanguageSelector() {
  const store = useStore();

  const cn = bem('LanguageSelector');

  return (
    <div className={cn()}>
      <button onClick = {() => store.setLang('ru')}>RU</button>
      <button onClick = {() => store.setLang('en')}>EN</button>
    </div>
  )
}

export default memo(LanguageSelector);