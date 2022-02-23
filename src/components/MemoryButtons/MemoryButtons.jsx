import React, { useContext } from 'react';

import { StoreContext } from '../../stores/StoreProvider';
import { default as bemCssModules } from 'bem-css-modules';
import { default as MemoryButonsStyles } from './MemoryButtons.module.scss';

import Button from '../Button/Button';

const style = bemCssModules(MemoryButonsStyles);

const MemoryButons = () => {
  const { calculatorStore } = useContext(StoreContext);

  return (
    <div className={style()}>
      <Button content='MC' isMemory onClick={() => calculatorStore.memoryClear()} />
      <Button content='MR' isMemory onClick={() => calculatorStore.memoryRead()} />
      <Button content='M+' isMemory onClick={() => calculatorStore.memoryAdd()} />
      <Button content='M-' isMemory onClick={() => calculatorStore.memoryMinus()} />
      <Button content='MS' isMemory onClick={() => calculatorStore.memorySet()} />
    </div>
  );
};

export default MemoryButons;
