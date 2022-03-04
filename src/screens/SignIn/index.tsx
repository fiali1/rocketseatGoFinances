/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';

import AppleSVG from '../../assets/apple.svg';
import GoogleSVG from '../../assets/google.svg';
import LogoSVG from '../../assets/logo.svg';
import { SignInSocialButton } from '../../components/SignInSocialButton';
import { useAuth } from '../../hooks/auth';
import {
  Container,
  Footer,
  FooterWrapper,
  Header,
  SignInTitle,
  Title,
  TitleWrapper,
} from './styles';

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle } = useAuth();
  const theme = useTheme();

  const platform = Platform.OS;

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('Não foi possível conectar à conta Google.');
      setIsLoading(false);
    }
  }

  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      await handleSignInWithApple();
    } catch (error) {
      Alert.alert('Não foi possível conectar à conta Apple.');
      setIsLoading(false);
    }
  }

  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSVG width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {'\n'} finanças de forma {'\n'} simples
          </Title>
        </TitleWrapper>

        <SignInTitle>Faça o seu login</SignInTitle>
      </Header>
      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            title="Entrar com Google"
            svg={GoogleSVG}
            onPress={handleSignInWithGoogle}
          />
          {platform === 'ios' && (
            <SignInSocialButton
              title="Entrar com Apple"
              svg={AppleSVG}
              onPress={handleSignInWithApple}
            />
          )}
        </FooterWrapper>

        {isLoading && (
          <ActivityIndicator
            color={theme.colors.primary}
            size="large"
            style={{ marginTop: 24 }}
          />
        )}
      </Footer>
    </Container>
  );
}
