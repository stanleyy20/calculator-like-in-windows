import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as HistoryButtonStyle } from './HistoryButton.module.scss';

const style = bemCssModules(HistoryButtonStyle);

const HistoryButton = ({ showHistoryContainer }) => {
  return (
    <div className={style()}>
      <span className={`material-icons ${style('history')}`} onClick={showHistoryContainer}>
        history
      </span>
    </div>
  );
};

export default HistoryButton;
