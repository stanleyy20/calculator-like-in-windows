import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as MemoryButonsStyles } from './MemoryButtons.module.scss';

import Button from '../Button/Button';

const style = bemCssModules(MemoryButonsStyles);

const MemoryButons = () => {
  return (
    <div className={style()}>
      <Button content='MC' isMemory />
      <Button content='MR' isMemory />
      <Button content='M+' isMemory />
      <Button content='M-' isMemory />
      <Button content='MS' isMemory />
    </div>
  );
};

export default MemoryButons;
