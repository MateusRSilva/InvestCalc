import React, { createContext, useContext, useState, useEffect } from 'react';

// Criar o Contexto
const ThemeContext = createContext();

export function SimulatorContext({ children }) {
  const [amount, setAmount] = useState(() => {
    return sessionStorage.getItem('amount') || '0,00';
  });
  const [name, setName] = useState(() => {
    return sessionStorage.getItem('name') || '';
  });
  const [years, setYears] = useState(() => {
    return sessionStorage.getItem('years') || '1';
  });
  const [selectedIndex, setSelectedIndex] = useState(() => {
    return sessionStorage.getItem('selectedIndex') !== null ? JSON.parse(sessionStorage.getItem('selectedIndex')) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('amount', amount);
  }, [amount]);

  useEffect(() => {
    sessionStorage.setItem('name', name);
  }, [name]);

  useEffect(() => {
    sessionStorage.setItem('years', years);
  }, [years]);

  useEffect(() => {
    sessionStorage.setItem('selectedIndex', JSON.stringify(selectedIndex));
  }, [selectedIndex]);

  return (
    <ThemeContext.Provider value={{ amount, setAmount, name, setName, years, setYears, selectedIndex, setSelectedIndex }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useSimulatorContext() {
  return useContext(ThemeContext);
}

export default SimulatorContext; // Add this line
