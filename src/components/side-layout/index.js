import React from 'react';
import {memo} from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SideLayout({ children, side }) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({side})}>
      {React.Children.map(children, (child) => (
        <div className={cn('item')} key={child.key}>{child}</div>
        )
      )}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
}

export default memo(SideLayout);
