import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface IContainerProps {
  type: 'up' | 'down';
  isActive: boolean;
}

interface IIconProps {
  type: 'up' | 'down';
}

export const Container = styled.View<IContainerProps>`
  width: 48%;
  border-width: ${({ isActive }) => (isActive ? 0 : 1.5)}px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.text_light};
  border-radius: 5px;

  ${({ theme, type, isActive }) =>
    isActive &&
    type === 'up' &&
    css`
      background-color: ${theme.colors.success_light};
    `}

  ${({ theme, type, isActive }) =>
    isActive &&
    type === 'down' &&
    css`
      background-color: ${theme.colors.attention_light};
    `}
`;

export const Button = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  padding: ${RFValue(16)}px;
`;

export const Icon = styled(Feather)<IIconProps>`
  font-size: ${RFValue(24)}px;
  margin-right: ${RFValue(12)}px;

  color: ${({ theme, type }) =>
    type === 'up' ? theme.colors.success : theme.colors.attention};
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
`;
