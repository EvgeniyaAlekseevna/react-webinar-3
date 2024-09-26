import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Controls({onAdd = () => {}}) {
  return (
    <div className='Controls'>
      <button id="btn-add" onClick={() => onAdd()}>Добавить</button>
    </div>
  )
}

Controls.propTypes = {
  onAdd: PropTypes.func
};

export default memo(Controls);
