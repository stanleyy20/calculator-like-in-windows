import React from 'react';
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
  return (
    <StoreProvider>
      <div className={style()}>
        <HistoryButton />
        <Display />
        <MemoryButons />
        <MainPartButons />
        <HistoryContainer />
      </div>
    </StoreProvider>
  );
};

export default App;
