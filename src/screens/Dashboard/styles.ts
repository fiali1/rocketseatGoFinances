import styled from 'styled-components/native';

import { FlatList, FlatListProps, StatusBar } from 'react-native';

import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import { ITransactionListProps } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
  width: 100%;
  height: ${RFPercentage(42)}px;
  background-color: ${({ theme }) => theme.colors.primary};
`;

export const UserWrapper = styled.View`
  width: 100%;
  margin-top: ${(StatusBar.currentHeight || getStatusBarHeight()) +
  RFValue(28)}px;
  padding: 0 ${RFValue(24)}px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const Photo = styled.Image`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
`;

export const User = styled.View`
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${RFValue(16)}px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.medium};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlightCards = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: true,
  contentContainerStyle: {
    paddingHorizontal: RFValue(16),
  },
})`
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1;
  margin-top: ${RFPercentage(12)}px;
  padding: 0 ${RFValue(24)}px;
`;

export const Title = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(18)}px;

  margin-bottom: ${RFValue(16)}px;
`;

export const TransactionsList = styled(
  FlatList as new (
    props: FlatListProps<ITransactionListProps>,
  ) => FlatList<ITransactionListProps>,
).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { paddingBottom: 16 },
})``;
