import React, { useEffect, useRef, useContext } from 'react';

import { default as bemCssModules } from 'bem-css-modules';

import { StoreContext } from '../../stores/StoreProvider';

import { default as HistoryContainerStyle } from './HistoryContainer.module.scss';

const style = bemCssModules(HistoryContainerStyle);

const HistoryContainer = () => {
  const historyRef = useRef(null);
  const { calculatorStore, isActive } = useContext(StoreContext);

  useEffect(() => {
    if (historyRef.current && calculatorStore) {
      calculatorStore.historyElement = historyRef.current;
    }
  }, [historyRef, calculatorStore]);
  return (
    <div className={!isActive ? style() : style('is-visible')}>
      <p>Historia</p>
      <div className={style('history-list')} ref={historyRef}></div>
    </div>
  );
};

export default HistoryContainer;
