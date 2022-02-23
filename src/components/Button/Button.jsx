import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as ButonStyles } from './Button.module.scss';

const style = bemCssModules(ButonStyles);

const Button = (props) => {
  const { onClick, content } = props;

  const modifires = {
    'is-equal': props.isEqual,
    'is-lighter': props.isLighter,
    'is-memory': props.isMemory,
  };

  const handleOnClick = (e) => {
    onClick(e);
  };

  return (
    <div className={style(modifires)} onClick={handleOnClick}>
      {content}
    </div>
  );
};

export default Button;
