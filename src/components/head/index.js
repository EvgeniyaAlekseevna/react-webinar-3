import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import LanguageSelector from '../language-selector';

function Head({ title }) {
  return (
    <div className="Head">
      <h1 id="head">{title}</h1>
      <LanguageSelector />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
