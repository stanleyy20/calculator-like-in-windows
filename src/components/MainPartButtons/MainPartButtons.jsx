import React, { useContext } from 'react';

import { StoreContext } from '../../stores/StoreProvider';
import { default as bemCssModules } from 'bem-css-modules';
import { default as MainPartButyonsStyle } from './MainPartButtons.module.scss';

import Button from '../Button/Button';

const style = bemCssModules(MainPartButyonsStyle);

const MainPartButtons = () => {
  const { calculatorStore } = useContext(StoreContext);

  return (
    <div className={style()}>
      <Button content='%' onClick={() => calculatorStore.percent()} />
      <Button content='CE' onClick={() => calculatorStore.cancel()} />
      <Button content='C' onClick={() => calculatorStore.clear()} />
      <Button content={<span className='material-icons'> backspace </span>} onClick={() => calculatorStore.back()} />
      <Button content='1/x' onClick={() => calculatorStore.fraction()} />
      <Button content='x(2)' onClick={() => calculatorStore.power()} />
      <Button content='sqrt' onClick={() => calculatorStore.square()} />
      <Button content='/' onClick={() => calculatorStore.divide()} />
      <Button content='7' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='8' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='9' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='X' onClick={() => calculatorStore.multiplication()} />
      <Button content='4' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='5' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='6' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='-' onClick={() => calculatorStore.substraction()} />
      <Button content='1' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='2' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='3' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='+' onClick={() => calculatorStore.addition()} />
      <Button content='+/-' isLighter onClick={() => calculatorStore.inversion()} />
      <Button content='0' isLighter onClick={(e) => calculatorStore.concatenateNumber(e)} />
      <Button content='.' isLighter onClick={() => calculatorStore.addComma()} />
      <Button content='=' isEqual onClick={() => calculatorStore.equal()} />
    </div>
  );
};

export default MainPartButtons;
