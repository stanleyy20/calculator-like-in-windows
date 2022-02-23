import React, { useEffect, useRef, useContext } from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as DisplayStyle } from './Display.module.scss';
import { StoreContext } from '../../stores/StoreProvider';

const style = bemCssModules(DisplayStyle);

const Display = () => {
  const displayRef = useRef(null);
  const { calculatorStore } = useContext(StoreContext);

  useEffect(() => {
    if (displayRef.current && calculatorStore) {
      calculatorStore.displayElement = displayRef.current;
    }
  }, [displayRef, calculatorStore]);

  return (
    <div className={style()} ref={displayRef}>
      0
    </div>
  );
};

export default Display;
