import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as DisplayStyle } from './Display.module.scss';

const style = bemCssModules(DisplayStyle);

const Display = () => {
  return <div className={style()}>0</div>;
};

export default Display;
