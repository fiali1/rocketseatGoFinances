import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  ITransactionCardProps,
} from '../../components/TransactionCard';
import {
  Container,
  Header,
  Photo,
  User,
  UserGreeting,
  UserInfo,
  UserName,
  UserWrapper,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,
} from './styles';

export interface ITransactionListProps extends ITransactionCardProps {
  id: string;
}

type HighlightData = {
  amount: string;
  latestTransaction: string;
};

interface IHighlightCardProps {
  income: HighlightData;
  expenses: HighlightData;
  total: HighlightData;
}

export function Dashboard() {
  const dataKey = '@gofinances:transactions';

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<ITransactionListProps[]>([]);
  const [highlightData, setHighlightData] = useState<IHighlightCardProps>(
    {} as IHighlightCardProps,
  );
  const theme = useTheme();

  function getLastTransactionDate(
    collection: ITransactionListProps[],
    type: 'positive' | 'negative',
  ): string {
    // eslint-disable-next-line prefer-spread
    const itemDates = collection
      .filter(transaction => transaction.type === type)
      .map(transaction => transaction.date);

    if (itemDates.length < 1) {
      return '';
    }

    const latestItemDate = itemDates.sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime(),
    )[0];

    const latestItemDateFormatted = new Date(latestItemDate).toLocaleString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
      },
    );

    return latestItemDateFormatted;
  }

  async function loadTransactions(): Promise<void> {
    let incomeSum = 0;
    let expenseSum = 0;

    const response = await AsyncStorage.getItem(dataKey);
    if (response) {
      const localTransactions = response ? JSON.parse(response) : [];

      const formattedTransactions: ITransactionListProps[] =
        localTransactions.map((transaction: ITransactionListProps) => {
          if (transaction.type === 'positive') {
            incomeSum += Number(transaction.amount);
          } else {
            expenseSum += Number(transaction.amount);
          }

          const amountFormatted = Number(transaction.amount).toLocaleString(
            'pt-BR',
            { currency: 'BRL', style: 'currency' },
          );

          const dateFormatted = Intl.DateTimeFormat('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit',
          }).format(new Date(transaction.date));

          return {
            id: transaction.id,
            title: transaction.title,
            amount: amountFormatted,
            date: dateFormatted,
            category: transaction.category,
            type: transaction.type,
          };
        });

      const formattedIncomeSum = incomeSum.toLocaleString('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      });

      const formattedExpenseSum = expenseSum.toLocaleString('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      });

      const formattedTotal = (incomeSum - expenseSum).toLocaleString('pt-BR', {
        currency: 'BRL',
        style: 'currency',
      });

      const latestIncomeTransactions = getLastTransactionDate(
        localTransactions,
        'positive',
      );

      const latestExpenseTransactions = getLastTransactionDate(
        localTransactions,
        'negative',
      );

      const totalTransactionsInterval = `01 a ${latestExpenseTransactions}`;

      const highlightDataFormatted: IHighlightCardProps = {
        income: {
          amount: formattedIncomeSum,
          latestTransaction: latestIncomeTransactions,
        },
        expenses: {
          amount: formattedExpenseSum,
          latestTransaction: latestExpenseTransactions,
        },
        total: {
          amount: formattedTotal,
          latestTransaction: totalTransactionsInterval,
        },
      };

      setTransactions(formattedTransactions);
      setHighlightData(highlightDataFormatted);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{
                    uri: 'https://assets.nintendo.com/image/upload/c_pad,f_auto,h_490,q_auto,w_360/ncom/en_US/games/switch/r/rain-world-switch/description-image?v=2021120411',
                  }}
                />
                <User>
                  <UserGreeting>Olá,</UserGreeting>
                  <UserName>Josney</UserName>
                </User>
              </UserInfo>
              {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
              <LogoutButton onPress={() => {}}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>

          <HighlightCards>
            <HighlightCard
              title="Entradas"
              amount={highlightData.income.amount}
              lastTransaction={`Última entrada dia ${highlightData.income.latestTransaction}`}
              type="up"
            />
            <HighlightCard
              title="Saídas"
              amount={highlightData.expenses.amount}
              lastTransaction={`Última saída dia ${highlightData.expenses.latestTransaction}`}
              type="down"
            />
            <HighlightCard
              title="Total"
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.latestTransaction}
              type="total"
            />
          </HighlightCards>

          <Transactions>
            <Title>Listagem</Title>

            <TransactionsList
              data={transactions}
              keyExtractor={item => item.id}
              renderItem={({ item }) => <TransactionCard data={item} />}
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
