import React from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { useSimulatorContext } from './simulatorContext';

export default function SimulatorProvide({ children }) {
  const { themeMode } = useSimulatorContext();

  const theme = createTheme({

  });

  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
