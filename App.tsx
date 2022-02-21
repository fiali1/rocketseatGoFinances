/* eslint-disable camelcase */
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { StatusBar } from 'expo-status-bar';

import AppLoading from 'expo-app-loading';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';

import { Dashboard } from './src/screens/Dashboard';
import { Register } from './src/screens/Register';

import globalTheme from './src/global/styles/theme';
import { CategorySelect } from './src/screens/CategorySelect';

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={globalTheme}>
      <StatusBar />
      <Register />
    </ThemeProvider>
  );
}
