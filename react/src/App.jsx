import React, { useState } from 'react';
import { default as bemCssModules } from 'bem-css-modules';
import { default as AppStyles } from './App.module.scss';

import Display from './components/Display/Display';
import MemoryButons from './components/MemoryButtons/MemoryButtons';
import MainPartButons from './components/MainPartButtons/MainPartButtons';
import HistoryButton from './components/HistoryButton/HistoryButton';
import HistoryContainer from './components/HistoryContainer/HistoryContainer';
import StoreProvider from './stores/StoreProvider';

bemCssModules.setSettings({
  modifierDelimiter: '--',
});

const style = bemCssModules(AppStyles);

const App = () => {
  const [isActive, setIsActive] = useState(false);
  const showHistoryContainer = () => {
    setIsActive(!isActive);
  };

  return (
    <StoreProvider>
      <div className={style()}>
        <HistoryButton showHistoryContainer={showHistoryContainer} />
        <Display />
        <MemoryButons />
        <MainPartButons />
        <HistoryContainer isActive={isActive} />
      </div>
    </StoreProvider>
  );
};

export default App;
