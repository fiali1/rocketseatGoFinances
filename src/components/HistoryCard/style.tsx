import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface IContainerProps {
  color: string;
}

export const Container = styled.View<IContainerProps>`
  width: 100%;
  border-radius: 5px;
  border-left-width: 5px;
  border-color: ${({ color }) => color};
  background-color: ${({ theme }) => theme.colors.shape};

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(12)}px ${RFValue(24)}px;

  margin-bottom: ${RFValue(8)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(16)}px;
`;

export const Amount = styled.Text`
  font-family: ${({ theme }) => theme.fonts.bold};
  font-size: ${RFValue(16)}px;
`;
