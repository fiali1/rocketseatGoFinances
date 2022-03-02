import { addMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import React, { useCallback, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { VictoryPie } from 'victory-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';

import { HistoryCard } from '../../components/HistoryCard';
import { categories } from '../../utils/categories';
import {
  ChartContainer,
  Container,
  Content,
  Header,
  LoadContainer,
  Month,
  MonthSelect,
  MonthSelectButton,
  MonthSelectIcon,
  Title,
} from './styles';

interface ITransactionProps {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: string;
  date: string;
}

type CategoryData = {
  name: string;
  total: number;
  totalFormatted: string;
  percent: string;
  color: string;
};

export function Resume() {
  const [isLoading, setIsloading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategory, setTotalByCategory] = useState<CategoryData[]>([]);

  const theme = useTheme();
  const height = useBottomTabBarHeight();

  function handleDateChange(action: 'previous' | 'next') {
    const newDate =
      action === 'next'
        ? addMonths(selectedDate, 1)
        : addMonths(selectedDate, -1);

    setSelectedDate(newDate);
  }

  async function loadData() {
    setIsloading(true);

    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: ITransactionProps[] = response
      ? JSON.parse(response)
      : [];

    const sumByCategory: CategoryData[] = [];

    const expenses = responseFormatted.filter(
      expense =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear(),
    );

    const expenseTotals = expenses.reduce(
      (acc: number, expense: ITransactionProps) => acc + Number(expense.amount),
      0,
    );

    categories.forEach(category => {
      let categoriesSum = 0;

      expenses.forEach(transaction => {
        if (transaction.category === category.key) {
          categoriesSum += Number(transaction.amount);
        }
      });

      if (categoriesSum > 0) {
        const totalFormatted = categoriesSum.toLocaleString('pt-BR', {
          currency: 'BRL',
          style: 'currency',
        });

        const percent = `${((categoriesSum / expenseTotals) * 100).toFixed(
          0,
        )}%`;

        sumByCategory.push({
          name: category.name,
          total: categoriesSum,
          totalFormatted,
          percent,
          color: category.color,
        });
      }
    });

    setTotalByCategory(sumByCategory);
    setIsloading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]),
  );

  return (
    <Container>
      <Header>
        <Title>Resumo por categoria</Title>
      </Header>

      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size="large" />
        </LoadContainer>
      ) : (
        <Content
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingBottom: height,
          }}
        >
          <MonthSelect>
            <MonthSelectButton onPress={() => handleDateChange('previous')}>
              <MonthSelectIcon name="chevron-left" />
            </MonthSelectButton>

            <Month>
              {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
            </Month>

            <MonthSelectButton onPress={() => handleDateChange('next')}>
              <MonthSelectIcon name="chevron-right" />
            </MonthSelectButton>
          </MonthSelect>

          <ChartContainer>
            <VictoryPie
              data={totalByCategory}
              x="percent"
              y="total"
              colorScale={totalByCategory.map(category => category.color)}
              labelRadius={100}
              innerRadius={75}
              style={{
                labels: {
                  fontSize: RFValue(18),
                  fontWeight: 'bold',
                  fill: theme.colors.shape,
                },
              }}
            />
          </ChartContainer>

          {totalByCategory.map(category => (
            <HistoryCard
              key={category.name}
              title={category.name}
              amount={category.totalFormatted}
              color={category.color}
            />
          ))}
        </Content>
      )}
    </Container>
  );
}
