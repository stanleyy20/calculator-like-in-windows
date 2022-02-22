import React from 'react';

import { default as bemCssModules } from 'bem-css-modules';
import { default as MainPartButyonsStyle } from './MainPartButtons.module.scss';

import Button from '../Button/Button';

const style = bemCssModules(MainPartButyonsStyle);

const MainPartButtons = () => {
  return (
    <div className={style()}>
      <Button content='%' />
      <Button content='CE' />
      <Button content='C' />
      <Button content={<span class='material-icons'> backspace </span>} />
      <Button content='1/x' />
      <Button content='x(2)' />
      <Button content='sqrt' />
      <Button content='/' />
      <Button content='7' isLighter />
      <Button content='8' isLighter />
      <Button content='9' isLighter />
      <Button content='X' />
      <Button content='4' isLighter />
      <Button content='5' isLighter />
      <Button content='6' isLighter />
      <Button content='-' />
      <Button content='1' isLighter />
      <Button content='2' isLighter />
      <Button content='3' isLighter />
      <Button content='+' />
      <Button content='+/-' isLighter />
      <Button content='0' isLighter />
      <Button content='.' isLighter />
      <Button content='=' isEqual />
    </div>
  );
};

export default MainPartButtons;
