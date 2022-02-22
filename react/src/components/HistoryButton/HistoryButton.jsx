import React, { useContext } from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as HistoryButtonStyle } from './HistoryButton.module.scss';
import { StoreContext } from '../../stores/StoreProvider';

const style = bemCssModules(HistoryButtonStyle);

const HistoryButton = () => {
  const { setIsActive, isActive } = useContext(StoreContext);
  const showHistoryContainer = () => {
    setIsActive(!isActive);
  };

  return (
    <div className={style()}>
      <span className={`material-icons ${style('history')}`} onClick={showHistoryContainer}>
        history
      </span>
    </div>
  );
};

export default HistoryButton;
