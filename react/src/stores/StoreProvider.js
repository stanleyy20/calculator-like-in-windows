import React, { createContext, useState } from 'react';

import { CalculatorStore } from './CalculatorStore';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const calculatorStore = new CalculatorStore();
  const [isActive, setIsActive] = useState(false);

  return <StoreContext.Provider value={{ calculatorStore, isActive, setIsActive }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
