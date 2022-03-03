/* eslint-disable import/extensions */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

/* eslint-disable camelcase */
import AppLoading from 'expo-app-loading';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { NavigationContainer } from '@react-navigation/native';

import globalTheme from './src/global/styles/theme';
import { AuthProvider } from './src/hooks/auth';
import { SignIn } from './src/screens/SignIn';
// import { AppRoutes } from './src/routes/app.routes';

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
        {/* eslint-disable-next-line react/style-prop-object */}
        <StatusBar style="light" />
        <AuthProvider value={['Joana']}>
          <SignIn />
        </AuthProvider>
      </NavigationContainer>
    </ThemeProvider>
  );
}
