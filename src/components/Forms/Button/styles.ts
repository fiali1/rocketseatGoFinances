import styled from 'styled-components/native';

import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled(TouchableOpacity)`
  width: 100%;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.secondary};

  align-items: center;

  margin-top: ${RFValue(8)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;
  padding: ${RFValue(18)}px;
  color: ${({ theme }) => theme.colors.shape};
`;
