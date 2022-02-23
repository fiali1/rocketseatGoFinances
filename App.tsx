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

import { NavigationContainer } from '@react-navigation/native';

import globalTheme from './src/global/styles/theme';

// eslint-disable-next-line import/extensions
import { AppRoutes } from './src/routes/app.routes';

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
      <NavigationContainer>
        <StatusBar />
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}
