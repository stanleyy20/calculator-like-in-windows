import React, { createContext } from 'react';

import { CalculatorStore } from './CalculatorStore';

export const StoreContext = createContext(null);

const StoreProvider = ({ children }) => {
  const calculatorStore = new CalculatorStore();

  return <StoreContext.Provider value={{ calculatorStore }}>{children}</StoreContext.Provider>;
};

export default StoreProvider;
