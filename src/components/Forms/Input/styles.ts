import styled from 'styled-components/native';

import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TextInput)`
  width: 100%;
  padding: ${RFValue(16)}px ${RFValue(18)}px;

  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  color: ${({ theme }) => theme.colors.text_dark};

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};

  margin-bottom: ${RFValue(8)}px;
`;

export const Header = styled.View``;

export const Title = styled.Text``;
