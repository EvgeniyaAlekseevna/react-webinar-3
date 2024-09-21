import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function ModalLayout({isOpen, onClose, children}) {
  const cn = bem('ModalLayout');
  if (!isOpen) return null;

  return (
    <div className={cn()} onClick={onClose}>
      <div className={cn('center')} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

ModalLayout.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default React.memo(ModalLayout);
