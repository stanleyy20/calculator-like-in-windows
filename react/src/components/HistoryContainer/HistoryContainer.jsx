import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as HistoryContainerStyle } from './HistoryContainer.module.scss';

const style = bemCssModules(HistoryContainerStyle);

const HistoryContainer = () => {
  return (
    <div className={style()}>
      <p>Historia</p>
      <div className={style('history-list')}></div>
    </div>
  );
};

export default HistoryContainer;
