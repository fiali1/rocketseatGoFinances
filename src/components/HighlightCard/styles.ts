import styled, { css } from 'styled-components/native';

import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

interface ICardProps {
  type: 'up' | 'down' | 'total';
}

export const Container = styled.View<ICardProps>`
  width: ${RFValue(300)}px;
  padding: ${RFValue(20)}px ${RFValue(24)}px;
  padding-bottom: ${RFValue(42)}px;
  margin: 0 ${RFValue(8)}px;
  border-radius: 5px;
  background-color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.secondary : theme.colors.shape};
`;

export const Header = styled.View`
  justify-content: space-between;
  flex-direction: row;
`;

export const Title = styled.Text<ICardProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;

export const Icon = styled(Feather)<ICardProps>`
  font-size: ${RFValue(40)}px;

  ${({ type }) =>
    type === 'up' &&
    css`
      color: ${({ theme }) => theme.colors.success};
    `}

  ${({ type }) =>
    type === 'down' &&
    css`
      color: ${({ theme }) => theme.colors.attention};
    `}

  ${({ type }) =>
    type === 'total' &&
    css`
      color: ${({ theme }) => theme.colors.shape};
    `}
`;

export const Content = styled.View``;

export const Amount = styled.Text<ICardProps>`
  margin-top: 38px;
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text_dark};
`;

export const LastTransaction = styled.Text<ICardProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;
  color: ${({ theme, type }) =>
    type === 'total' ? theme.colors.shape : theme.colors.text};
`;
